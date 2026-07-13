import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';
import { UserService } from 'src/app/general-services/user-service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { MeetingHubService } from '../services/meeting-hub.service';
import { differenceInMinutes } from 'date-fns';

type GuardOutput = {
  msg?: string,
  valid: boolean
} 

export const meetingHubGuard: CanActivateFn = async (route, state) => {
  const service = inject(MeetingHubService),
  
  userService = inject(UserService),

  MeetingApiCall = inject(MeetingsRouteApiCallService),

  GC_Modal = inject(GCenteredModalsService),

  {valid, msg} = await GC_Modal.openLoader(new Observable<GuardOutput>(obvs => {

    (async () => {

      try {
        
        const {Cell_ID, MyCell, MyAccount} = userService,

        {currentMembership} = MyAccount

        if(!Cell_ID || !MyCell) throw Error("you need to be part of a cell to access this page")

        const {suspension: cellSuspension} = MyCell

        if(cellSuspension) throw Error("this cell is currently suspended. Meetings cannot be held at this time.")

        if(currentMembership?.suspension) throw Error("You are currently suspended and cannot participate in meetings.")

        const getUpcomingMeetingResponse = await firstValueFrom(MeetingApiCall.getUpcomingMeeting(Cell_ID, {
          inc_agendas: true,
          inc_venue: true,
        }))

        if(!MeetingApiCall.responseChecker(getUpcomingMeetingResponse)) throw Error(getUpcomingMeetingResponse.errMessage)

        const {data: meeting} = getUpcomingMeetingResponse

        if(!meeting) throw Error("no meeting is currently scheduled or in session.")

        const {startTime, status} = meeting,

        minsLeftToStart = differenceInMinutes(startTime, new Date())

        if(minsLeftToStart > 5) throw Error("no meeting is currently in session. Your next meeting is scheduled but has not started yet.")

        service.setActiveMeeting(meeting)

        obvs.next({valid: true})
      } catch (error: any) {
        obvs.next({valid: false, msg: error.message})
      }
    })()
  }))

  if(msg) GC_Modal.openDialogue({
    title: userService.MyAccount.currentLeadership ? 'cannot start meeting' : 'cannot join meeting',
    message: msg
  })

  return valid;
};
