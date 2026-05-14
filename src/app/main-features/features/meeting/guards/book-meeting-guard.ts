import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';

export const bookMeetingGuard: CanActivateFn = async (route, state) => {
  let result = true

  const GC_Modal = inject(GCenteredModalsService),

  appMainService = inject(AppMainService),

  MeetingApiCall = inject(MeetingsRouteApiCallService)

  try {
    const {status, errMessage} = await GC_Modal.openLoader(MeetingApiCall.bookAMeetingValidator())

    if(status != "success") throw Error(errMessage)

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