import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { UserService } from 'src/app/general-services/user-service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MeetingPageService } from '../services/meeting-page.service';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { differenceInHours } from 'date-fns';

export const editMeetingGuard: CanActivateFn = async (route, state) => {
  let result = true

  const GC_Modal = inject(GCenteredModalsService),

  appMainService = inject(AppMainService),

  userService = inject(UserService),

  meetingPageService = inject(MeetingPageService),

  MeetingApiCall = inject(MeetingsRouteApiCallService),

  {APP_SETTINGS} = appMainService

  try {
    const {MyCell, MyAccount} = userService,

    {currentMembership, currentLeadership} = MyAccount

    if(!MyCell) throw Error("you need to own or be part of a cell to edit a meeting")

    if(MyCell.suspension) throw Error("cell is currently suspended")

    if(currentMembership?.suspension) throw Error("oops suspended members cannot edit meetings")

    const permission = currentLeadership?.cell_permission ?? currentMembership?.cell_permission

    if(!permission) throw Error("oops you are not authorized to edit meetings")

    if(!permission.meeting_permissions.update)
      if(currentMembership)
        throw Error("oops you do not have the permission to edit meetings, please consult your cell leader")
      else
        throw Error("oops you do not have the permission to edit meetings")

    const {status, data: meeting, errMessage} = await GC_Modal.openLoader(MeetingApiCall.getUpcomingMeeting(MyCell.id ?? 0), {"four-circles": {color_theme: 'black'}})

    if(status != "success") throw Error(errMessage)

    if(!meeting) throw Error("oops meeting to be edited was not found")

    const {status: meetingStatus, startTime, editLogs} = meeting,

    {max_meeting_editable_deadline_hours, max_meeting_edit_chances} = APP_SETTINGS.meeting_settings
   
    switch(meetingStatus) {
      case 'pending':
      case 'in-session': throw Error("on-going meetings cannot be edited")

      case 'concluded': throw Error("this meeting has already been held, hence cannot be edited")

      case 'canceled':
      case 'not-hosted': throw Error("this meeting is in an uneditable state")
    }

    const hourDiff = differenceInHours(startTime, new Date()),

    editlogsCount = editLogs?.length ?? 0

    if(max_meeting_editable_deadline_hours >= hourDiff) throw Error("meeting edit deadline has passed")
    
    if(editlogsCount >= max_meeting_edit_chances) throw Error("meeting edit chances has been exceeded")

    meetingPageService.setMeetingToEdit(meeting)

  } catch (error: any) {
    
    GC_Modal.openDialogue({
      message: error.message ?? "we are unable to edit meetings at the moment due to unforseen circumstances, try again later",
    
      title: "cannot edit meeting"
    }, () => appMainService.routeBack("hub"))

    result = false

  } finally {
    return result
  }
};
