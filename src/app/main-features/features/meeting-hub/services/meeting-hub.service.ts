import { inject, Injectable } from '@angular/core';
import { Meeting } from '@shared/entities';
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';

@Injectable({
  providedIn: 'root'
})
export class MeetingHubService {
  private ActiveMeeting!: Meeting

  private MeetingModel = inject(MEETING_MODEL)

  setActiveMeeting(meeting: Meeting) {
    this.ActiveMeeting = meeting
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