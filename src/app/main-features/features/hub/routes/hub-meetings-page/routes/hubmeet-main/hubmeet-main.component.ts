import { Component } from '@angular/core';
import { HubMeetMainMeetingsHistoryComponent } from './components/hub-meet-main-meetings-history/hub-meet-main-meetings-history.component';
import { HubMeetMainUpcomingMeetingComponent } from './components/hub-meet-main-upcoming-meeting/hub-meet-main-upcoming-meeting.component';
import { HubBasicHeaderComponent } from '../../../../components/hub-basic-header/hub-basic-header.component';

@Component({
  selector: 'app-hubmeet-main',
  imports: [
    HubBasicHeaderComponent,
    HubMeetMainUpcomingMeetingComponent,
    HubMeetMainMeetingsHistoryComponent
  ],
  template: `
    <app-hub-basic-header Title="meetings"></app-hub-basic-header>

    <app-hub-meet-main-upcoming-meeting></app-hub-meet-main-upcoming-meeting>

    <app-hub-meet-main-meetings-history></app-hub-meet-main-meetings-history>
  `,
  styleUrl: './hubmeet-main.component.scss'
})
export class HubmeetMainComponent {

}
