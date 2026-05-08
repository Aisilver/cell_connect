import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { UserService } from 'src/app/general-services/user-service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';

export const bookMeetingGuard: CanActivateFn = async (route, state) => {
  let result = false, errMessage: string | undefined 

  const GC_Modal = inject(GCenteredModalsService),

  userService = inject(UserService),

  MeetingApiCall = inject(MeetingsRouteApiCallService),
  
  obvs = new Observable<boolean>(obvs => {
    try {
      const {MyCell, MyAccount} = userService,

      {currentMembership} = MyAccount

      if(!MyCell) throw Error("you need to own or be part of a cell to book a meeting")

      if(MyCell.suspension) throw Error("cell is currently suspended")

      if(currentMembership?.suspension) throw Error("oops suspended members cannot book meetings")

      ObservableToPromise(MeetingApiCall.getUpcomingMeeting(MyCell.id ?? 0, true))

      .then(res => MeetingApiCall.responseChecker(res, 
        meeting => {
          if(meeting) {
            const {status} = meeting

            //Continue
          } else {
            obvs.next(true)
          }
        },
        () => {
          errMessage = `we are unable to book meetings at the moment because: ${res.errMessage}`

          obvs.next(false)
        }
      ))

      .catch(() => {
        errMessage = "we are unable to book meetings at the moment due to unforseen circumstances, try again later"

        obvs.next(false)
      })

    } catch (err: any){
      errMessage = err.message

      obvs.next(false)
    }
  })

  // result = await ObservableToPromise(obvs)

  result = true

  if(errMessage)
    GC_Modal.openDialogue({
      message: errMessage,
      type: "message",
      title: 'cannot book meeting'
    })

  return result
};
