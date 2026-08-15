import { inject, Injectable } from '@angular/core';
import { Meeting, MeetingStatusTypes } from '@shared/entities';
import { BehaviorSubject } from 'rxjs';
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';
import { CELL_PERMISSION_MODEL } from 'src/app/models/cell-permission-model/cell-permission-model';
import { UserService } from 'src/app/general-services/user-service';
import { Meeting_WS_EntranceData } from '@shared/socket-rooms-types';
@Injectable({
  providedIn: 'root'
})
export class MeetingHubService {
  private ActiveMeeting!: Meeting

  private MeetingModel = inject(MEETING_MODEL)

  private userService = inject(UserService)

  private devCellPermission = inject(CELL_PERMISSION_MODEL)

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

  getUserRoleConfig (): Meeting_WS_EntranceData {
    const {MyAccount} = this.userService,

    {currentLeadership, currentMembership} = MyAccount,

    {id: MeetingId} = this.getActiveMeeting(),

    // permission = currentLeadership?.cell_permission ?? currentMembership?.cell_permission

    permission = this.devCellPermission.getModel()

    if(!permission) throw Error("meetinghub permission not found")
    
    return {
      id: currentLeadership ? "leader" : currentMembership?.roles ?? 'member',
      permission,
      meetingId: Number(MeetingId),
      leaderId: currentLeadership?.id,
      memberId: currentMembership?.id
    }
  }
}