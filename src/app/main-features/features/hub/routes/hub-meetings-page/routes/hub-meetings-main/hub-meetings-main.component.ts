import { Component, inject } from '@angular/core';
import { HubBasicHeaderComponent } from "src/app/main-features/features/hub/components/hub-basic-header/hub-basic-header.component";
import { HubMeetingsRouterService } from '../../../../services/hub-meetings-router.service';
import { HubMeetMainUpcomingMeetingComponent } from "./components/hub-meet-main-upcoming-meeting/hub-meet-main-upcoming-meeting.component";
import { HubMeetMainMeetingsHistoryComponent } from "./components/hub-meet-main-meetings-history/hub-meet-main-meetings-history.component";

@Component({
  selector: 'app-hub-meetings-main',
  imports: [
    HubBasicHeaderComponent,
    HubMeetMainUpcomingMeetingComponent,
    HubMeetMainMeetingsHistoryComponent
],
  templateUrl: './hub-meetings-main.component.html',
  styleUrl: './hub-meetings-main.component.scss'
})
export class HubMeetingsMainComponent {
  private hubMeetingsRouterService = inject(HubMeetingsRouterService)

  OnHeaderBasicEvent() {
    this.hubMeetingsRouterService.toNewMeeting()
  }
}