import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { UserService } from 'src/app/general-services/user-service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';

export const bookMeetingGuard: CanActivateFn = async (route, state) => {
  let result = true

  const GC_Modal = inject(GCenteredModalsService),

  userService = inject(UserService),

  appMainService = inject(AppMainService),

  MeetingApiCall = inject(MeetingsRouteApiCallService)

  try {
    const {MyCell, MyAccount} = userService,

    {currentMembership, currentLeadership} = MyAccount

    if(!MyCell) throw Error("you need to own or be part of a cell to book a meeting")

    if(MyCell.suspension) throw Error("cell is currently suspended")

    if(currentMembership?.suspension) throw Error("oops suspended members cannot book meetings")

    const permission = currentLeadership?.cell_permission ?? currentMembership?.cell_permission

    if(!permission) throw Error("oops you are not authorized to book meetings")

    if(!permission.meeting_permissions.create)
      if(currentMembership)
        throw Error("oops you do not have the permission to book meetings, please consult your cell leader")
      else
        throw Error("oops you do not have the permission to book meetings")

    const {status, data: meeting, errMessage} = await GC_Modal.openLoader(MeetingApiCall.getUpcomingMeeting(MyCell.id ?? 0, true), {"four-circles": {color_theme: 'black'}})

    if(status != "success") throw Error(errMessage)

    if(meeting) {
      const {status} = meeting

      if(status == "booked") throw Error('new meetings cannot be booked while there is still a meeting to be held')
      
      else throw Error('new meetings cannot be booked while there is still an unfinished meeting')
    }

  } catch (error: any) {    

    GC_Modal.openDialogue({
      message: error.message ?? "we are unable to book meetings at the moment due to unforseen circumstances, try again later",
      
      title: 'cannot book meeting'
    }, () => appMainService.routeBack("hub"))
  
    result = false

  } finally {
    return result
  }
};