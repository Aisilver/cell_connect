import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { Cell, Meeting, UserAccount } from '@shared/entities';
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { UserService } from 'src/app/general-services/user-service';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { subMinutes } from 'date-fns';
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';
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

  private MeetingModel = inject(MEETING_MODEL)
    
  AppVectorPaths = inject(APP_VECTOR_PATHS)

  Title = signal("no upcoming meeting")

  UpcomingMeeting = signal<Meeting | undefined>(undefined)

  @ViewChild("UpcomingMeetingLoader", {read: LoadersComponent})
  private upcomingMeetingLoader!: LoadersComponent

  async onUpcomingMeetingLoaderReady () {
    const response = await this.upcomingMeetingLoader.LoadAsync(this.MeetingsApiCall.getUpcomingMeeting(this.userService.Cell_ID))

    //@ts-ignore
    this.onUpcomingMeetingReceived(response)

    if(!this.MeetingsApiCall.responseChecker(response)) return

    const {data} = response

    if(!data) return
    
    this.Title.update(() => data.status == "booked" ? "upcoming meeting" : "active meeting")

    this.onUpcomingMeetingReceived(data)
  }

  private onUpcomingMeetingReceived (meeting: Meeting) {
    const dumMeeting = this.MeetingModel.getDummyModel((meet => {
      return {
        ...meet, 
        title: undefined, 
        startTime: subMinutes(new Date(), 10),
        status: "in-session",
        actualStartTime: subMinutes(meet.startTime, 30),
        host: this.userService.MyAccount
      }
    }))

    this.UpcomingMeeting.update(() => dumMeeting)
  }
}