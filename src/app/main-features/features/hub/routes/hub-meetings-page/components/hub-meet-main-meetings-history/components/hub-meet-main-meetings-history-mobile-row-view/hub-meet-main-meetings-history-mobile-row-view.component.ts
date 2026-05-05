import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Attendance, UserAccount } from '@shared/entities';
import { isToday } from 'date-fns';
import { TextDeserailizerPipe } from 'src/app/main-features/shared/pipes/text-deserailizer-pipe';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { HubMeetMainMeetingsHistoryAttdsViewComponent } from "../hub-meet-main-meetings-history-attds-view/hub-meet-main-meetings-history-attds-view.component";
import { UserService } from 'src/app/general-services/user-service';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";

@Component({
  selector: 'app-hub-meet-main-meetings-history-mobile-row-view',
  imports: [
    CommonModule,
    TextDeserailizerPipe,
    IconComponent,
    HubMeetMainMeetingsHistoryAttdsViewComponent,
    ImageComponent
],
  templateUrl: './hub-meet-main-meetings-history-mobile-row-view.component.html',
  styleUrl: './hub-meet-main-meetings-history-mobile-row-view.component.scss'
})
export class HubMeetMainMeetingsHistoryMobileRowViewComponent {
  private userService = inject(UserService)

  @Input()
  Attendance!: Attendance

  get Meeting () {
    return this.Attendance.meeting
  }

  get Host () {
    return this.Meeting?.host
  }

  get MeetingStartTimeIsToday () {
    return isToday(this.Meeting?.startTime ?? new Date())
  }

  get MeetingIsNotActive () {
    const status = this.Meeting?.status

    if(!status) return true

    switch(status){
      case 'pending':
      case 'in-session': return false
        
      default: return true 
    }
  }

  get Location () {
    return this.Meeting?.venue
  }

  get Cell () {
    return this.Meeting?.cell
  }

  @Output("to_details")
  private output: EventEmitter<number> = new EventEmitter()

  ToDetails () {
    this.output.emit(this.Meeting?.id)
  }

  IsUserHostOfMeeting (host?: UserAccount) {
    return !host ? false : host.id == this.userService.MyAccount.id
  }
}