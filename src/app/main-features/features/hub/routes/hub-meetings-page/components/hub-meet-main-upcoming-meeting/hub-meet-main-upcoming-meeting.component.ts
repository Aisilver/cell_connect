import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { ApiResponse, PaginatedData } from '@shared/common';
import { Attendance, Meeting, UserAccount } from '@shared/entities';
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { UserService } from 'src/app/general-services/user-service';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { MaxTextLenghtPipe } from 'src/app/main-features/shared/pipes/max-text-lenght-pipe';
import { isToday } from 'date-fns';
import { ElementsOverlapperComponent } from "src/app/main-features/shared/components/elements-overlapper/elements-overlapper.component";
import { TimeLeftComponent } from "src/app/main-features/shared/components/time-left/time-left.component";
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';
import { USER_LOCATION_MODEL } from 'src/app/models/user-location-model/user-location-model';
import { TextDeserailizerPipe } from 'src/app/main-features/shared/pipes/text-deserailizer-pipe';
import { ATTENDANCE_MODEL } from 'src/app/models/attendance-model/attendance-model';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';

@Component({
  selector: 'app-hub-meet-main-upcoming-meeting',
  imports: [
    CommonModule,
    LoadersComponent,
    ImageComponent,
    MaxTextLenghtPipe,
    ElementsOverlapperComponent,
    TimeLeftComponent,
    TextDeserailizerPipe,
    IconComponent
],
  templateUrl: `./hub-meet-main-upcoming-meeting.component.html`,
  styleUrl: './hub-meet-main-upcoming-meeting.component.scss'
})
export class HubMeetMainUpcomingMeetingComponent {
  private userService = inject(UserService)

  private mainFeaturesRouter = inject(MainFeaturesRouteService)

  private MeetingsApiCall = inject(MeetingsRouteApiCallService)

  AppVectorPaths = inject(APP_VECTOR_PATHS)

  Title = signal("no upcoming meeting")

  UpcomingMeeting = signal<Meeting | undefined>(undefined)

  Attendances = signal<Attendance[]>([])

  Host = signal<UserAccount | undefined> (undefined)

  NoOfPendingMembers = signal(0)

  TimeExceeded = signal(false)

  DetailsOpen = signal(false)

  get IsMeetingStartDateToday () {
    const date = this.UpcomingMeeting()?.startTime

    if(!date) return false

    return isToday(date)
  }

  @ViewChild("UpcomingMeetingLoader", {read: LoadersComponent})
  private upcomingMeetingLoader!: LoadersComponent

  @ViewChild("MeetingAttendantsLoader", {read: LoadersComponent})
  private meetingAttendantsLoader!: LoadersComponent


  async onUpcomingMeetingLoaderReady () {
    const response = await this.upcomingMeetingLoader.LoadAsync(this.MeetingsApiCall.getUpcomingMeeting(this.userService.Cell_ID))

    if(!this.MeetingsApiCall.responseChecker(response)) return

    const {data} = response

    if(!data) return
    
    this.Title.update(() => data.status == "booked" ? "upcoming meeting" : "active meeting")

    this.onUpcomingMeetingReceived(data)
  }

  async onAttendanceLoaderReady () {
    const obvs = this.MeetingsApiCall.getMeetingAttendants(this.UpcomingMeeting()?.id ?? 0, 
      {
        exclude_user: true,
        exclude_absent: true,
        exclude_leader: true,
        limit: 5
      }
    ),
    
    response = await this.meetingAttendantsLoader.LoadAsync(obvs)

    if(!this.MeetingsApiCall.responseChecker(response)) return

    this.onMeetingAttendancesRecieved(response.data)
  }

  ToggleDetails () {
    this.DetailsOpen.update(value => !value)
  }

  OnMeetingStartimeExceeded () {
    this.TimeExceeded.update(() => true)
  }

  IsUserHostOfMeeting (host?: UserAccount) {
    if(!host) return false

    return host.id == this.userService.MyAccount.id
  }

  ToHostProfile (host?: UserAccount) {
    this.mainFeaturesRouter.toProfile(host?.username ?? '')
  }

  ToMeetingHub () {
    this.mainFeaturesRouter.toMeetingHub(this.UpcomingMeeting()?.id ?? 0)
  }

  private onUpcomingMeetingReceived (meeting: Meeting) {
    this.UpcomingMeeting.update(() => meeting)

    this.Host.update(() => meeting.host)
  }

  private onMeetingAttendancesRecieved (paginatedData: PaginatedData<Attendance>) {
    const {data, unitsLeft, limit} = paginatedData

    this.Attendances.update(() => data)

    const noOfMembers = this.UpcomingMeeting()?.cell?.no_of_members ?? 0,

    attendantsCount = limit + unitsLeft,

    pendingMembersCount = noOfMembers - attendantsCount

    this.NoOfPendingMembers.update(() => Math.max(pendingMembersCount, 0))
  }
}