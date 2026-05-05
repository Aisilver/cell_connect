import { Component, inject } from '@angular/core';
import { HubBasicHeaderComponent } from "src/app/main-features/features/hub/components/hub-basic-header/hub-basic-header.component";
import { HubMeetMainUpcomingMeetingComponent } from "./components/hub-meet-main-upcoming-meeting/hub-meet-main-upcoming-meeting.component";
import { HubMeetMainMeetingsHistoryComponent } from "./components/hub-meet-main-meetings-history/hub-meet-main-meetings-history.component";
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';

@Component({
  selector: 'app-hub-meetings-main',
  imports: [
    HubBasicHeaderComponent,
    HubMeetMainUpcomingMeetingComponent,
    HubMeetMainMeetingsHistoryComponent
],
  templateUrl: './hub-meetings-page.component.html',
  styleUrl: './hub-meetings-page.component.scss'
})
export class HubMeetingsPageComponent {
  private mainFeaturesRouter = inject(MainFeaturesRouteService)

  OnHeaderBasicEvent() {
    this.mainFeaturesRouter.toMeeting("book")
  }
}