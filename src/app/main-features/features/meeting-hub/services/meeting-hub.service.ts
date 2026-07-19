import { inject, Injectable } from '@angular/core';
import { Meeting, MeetingStatusTypes } from '@shared/entities';
import { BehaviorSubject } from 'rxjs';
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';

@Injectable({
  providedIn: 'root'
})
export class MeetingHubService {
  private ActiveMeeting!: Meeting

  private MeetingModel = inject(MEETING_MODEL)

  $MeetingStatusChangeEvent = new BehaviorSubject<MeetingStatusTypes>("booked")

  setActiveMeeting(meeting: Meeting) {
    this.ActiveMeeting = meeting

    this.$MeetingStatusChangeEvent.next(this.ActiveMeeting.status)
  }

  getActiveMeeting() {
    // return this.ActiveMeeting

    return this.MeetingModel.getDummyModel(met => {
      return {
        ...met,
        status: "in-session"
      }
    })
  }

}