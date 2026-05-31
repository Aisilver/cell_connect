import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { Meeting } from '@shared/entities';
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { UserService } from 'src/app/general-services/user-service';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { UpcomingMeetingViewComponent } from "./components/upcoming-meeting-view/upcoming-meeting-view.component";

@Component({
  selector: 'app-hub-meet-main-upcoming-meeting',
  imports: [
    CommonModule,
    LoadersComponent,
    ImageComponent,
    UpcomingMeetingViewComponent
],
  templateUrl: `./hub-meet-main-upcoming-meeting.component.html`,
  styleUrl: './hub-meet-main-upcoming-meeting.component.scss'
})
export class HubMeetMainUpcomingMeetingComponent {
  private userService = inject(UserService)

  private MeetingsApiCall = inject(MeetingsRouteApiCallService)
    
  AppVectorPaths = inject(APP_VECTOR_PATHS)

  Title = signal("no upcoming meeting")

  UpcomingMeeting = signal<Meeting | undefined>(undefined)

  @ViewChild("UpcomingMeetingLoader", {read: LoadersComponent})
  private upcomingMeetingLoader!: LoadersComponent

  async onUpcomingMeetingLoaderReady () {

    const {Cell_ID} = this.userService

    if(!Cell_ID) return
    
    const obvs = this.MeetingsApiCall.getUpcomingMeeting(Cell_ID, {
      inc_cell: true
    }),
    
    response = await this.upcomingMeetingLoader.LoadAsync(obvs)

    if(!this.MeetingsApiCall.responseChecker(response)) return

    const {data} = response

    if(!data) return
    
    const {status} = data

    this.Title.update(() => status == "booked" ? "upcoming meeting" : "active meeting")

    this.UpcomingMeeting.set(data)
  }
}