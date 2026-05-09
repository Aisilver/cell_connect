import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { UserService } from 'src/app/general-services/user-service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MeetingPageService } from '../services/meeting-page.service';

export const editMeetingGuard: CanActivateFn = async (route, state) => {
  let result = true

  const GC_Modal = inject(GCenteredModalsService),

  appMainService = inject(AppMainService),

  userService = inject(UserService),

  meetingPageService = inject(MeetingPageService)

  try {
    const meetingId = Number(route.params['meetingId'])

    if(isNaN(meetingId)) throw Error("meeting to be edited was not specified")

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
