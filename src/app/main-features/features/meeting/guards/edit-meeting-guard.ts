import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { UserService } from 'src/app/general-services/user-service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MeetingPageService } from '../services/meeting-page.service';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { firstValueFrom, Observable } from 'rxjs';
import { Meeting } from '@shared/entities';

type EditMeetingValidValue = {
  allowedToEdit: boolean, 
  
  meetingToEdit?: Meeting,

  message?: string
}

export const editMeetingGuard: CanActivateFn = async (route, state) => {
  let result = true

  const GC_Modal = inject(GCenteredModalsService),

  appMainService = inject(AppMainService),

  userService = inject(UserService),

  meetingPageService = inject(MeetingPageService),

  MeetingApiCall = inject(MeetingsRouteApiCallService)

  try {
     
    const { allowedToEdit, meetingToEdit, message } = await GC_Modal.openLoader(new Observable<EditMeetingValidValue>( obvs => {
      (async () => {
        try {
          const editAMeetingValidatorResponse = await firstValueFrom(MeetingApiCall.editAMeetingValidator())

          if(!MeetingApiCall.responseChecker(editAMeetingValidatorResponse)) throw Error(editAMeetingValidatorResponse.errMessage)

          const upComingMeetingResponse = await firstValueFrom(MeetingApiCall.getUpcomingMeeting(userService.Cell_ID))
          
          if(!MeetingApiCall.responseChecker(upComingMeetingResponse)) throw Error(upComingMeetingResponse.errMessage)

          const {data: upcomingMeeting} = upComingMeetingResponse
          
          if(!upcomingMeeting) throw Error("there is no booked meeting to be edited")

          obvs.next({allowedToEdit: true, meetingToEdit: upcomingMeeting})
          
        } catch (error: any) {
          obvs.next({allowedToEdit: false, message: error.message})
        }
      })()
    }))

    if(!allowedToEdit || !meetingToEdit) throw Error(message)

    meetingPageService.setMeetingToEdit(meetingToEdit)

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
