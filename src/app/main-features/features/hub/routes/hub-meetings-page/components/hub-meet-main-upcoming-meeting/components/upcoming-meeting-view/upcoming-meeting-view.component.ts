import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnChanges, OnDestroy, signal, SimpleChanges, ViewChild } from '@angular/core';
import { PaginatedData } from '@shared/common/pagination';
import { Attendance, Cell, Meeting, MeetingStatusTypes, UserAccount } from '@shared/entities';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/general-services/user-service';
import { HubRouterService } from 'src/app/main-features/features/hub/services/hub-router.service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';
import { ElementsOverlapperComponent } from 'src/app/main-features/shared/components/elements-overlapper/elements-overlapper.component';
import { ImageComponent } from 'src/app/main-features/shared/components/image/image.component';
import { LoadersComponent } from 'src/app/main-features/shared/components/loaders/loaders.component';
import { TimeLeftComponent } from 'src/app/main-features/shared/components/time-left/time-left.component';
import { MaxTextLenghtPipe } from 'src/app/main-features/shared/pipes/max-text-lenght-pipe';
import { SlugTextDeserailizerPipe } from 'src/app/main-features/shared/pipes/slug-text-deserailizer-pipe';
import { TimeAheadPipe } from 'src/app/main-features/shared/pipes/time-ahead-pipe';
import { ATTENDANCE_MODEL } from 'src/app/models/attendance-model/attendance-model';
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';

@Component({
  selector: 'app-upcoming-meeting-view',
  imports: [
    LoadersComponent,
    MaxTextLenghtPipe,
    ElementsOverlapperComponent,
    TimeLeftComponent,
    SlugTextDeserailizerPipe,
    TimeAheadPipe,
    ImageComponent,
    CommonModule
  ],
  templateUrl: './upcoming-meeting-view.component.html',
  styleUrl: './upcoming-meeting-view.component.scss'
})
export class UpcomingMeetingViewComponent implements OnChanges, AfterViewInit, OnDestroy {
  private MeetingsApiCall = inject(MeetingsRouteApiCallService)

  private mainFeaturesRouter = inject(MainFeaturesRouteService)

  private HubRouterService = inject(HubRouterService)

  private AttendanceModel = inject(ATTENDANCE_MODEL)

  private userService = inject(UserService)

  private meetingUpdateEvent = new Subject<Meeting | null>() 
  
  private meetingUpdateSubs?: Subscription

  @Input()
  UpcomingMeetingInput?: Meeting

  UpcomingMeeting = signal<Meeting | null>(null)

  Attendances = signal<Attendance[]>([])

  Host = signal<UserAccount | undefined> (undefined)

  MeetingStartTime = signal(new Date())

  MeetingActualStartTime = signal<Date | null>(null)

  MeetingStatus = signal<MeetingStatusTypes>('booked')

  NoOfPendingMembers = signal(0)

  TimeExceeded = signal(false)

  IsMeetingStartDateToday = signal(false)

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  ngOnChanges(changes: SimpleChanges): void {
    this.UpcomingMeeting.update(() => this.UpcomingMeetingInput ?? null)

    if(this.UpcomingMeeting())
      this.meetingUpdateEvent.next(this.UpcomingMeeting())
  }

  ngAfterViewInit(): void {
    this.HandleUpcomingMeeting(this.UpcomingMeeting())

    this.meetingUpdateSubs = this.meetingUpdateEvent.subscribe(meet => this.HandleUpcomingMeeting(meet))
  }

  private HandleUpcomingMeeting (meeting: Meeting | null) {
    if(!meeting) return

    const {host, startTime, status} = meeting

    this.Host.update(() => host)

    this.MeetingStartTime.update(() => new Date(startTime))

    this.MeetingStatus.update(() => status)
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
    
    response = await this.loader.LoadAsync(obvs)

    if(!this.MeetingsApiCall.responseChecker(response)) return

    this.onMeetingAttendancesRecieved(response.data)
  }

  ToHostProfile (host?: UserAccount) {
    this.mainFeaturesRouter.toProfile(host?.username ?? '')
  }

  ToMeetingHub () {
    this.mainFeaturesRouter.toMeetingHub(this.UpcomingMeeting()?.id ?? 0)
  }

  ToMeetingDetails () {
    this.HubRouterService.toHubMeeting("details", Number(this.UpcomingMeeting()?.id))
  }

  OnMeetingStartimeExceeded () {
    this.TimeExceeded.update(() => true)
  }

  IsUserHostOfMeeting(host?: UserAccount) {
    if(!host) return false

    return host.id == this.userService.MyAccount.id
  }

  IsUserLeaderOfCellHoldingMeeting (cell?: Cell) {
    if(!cell) return false

    return cell.id == this.userService.MyAccount.currentLeadership?.cell?.id
  }
  

  private onMeetingAttendancesRecieved (paginatedData: PaginatedData<Attendance>) {
    const {data, unitsLeft, limit} = paginatedData

    this.Attendances.update(() => this.AttendanceModel.getMultipleDummyData(4, attd => {
      return {
        ...attd,
        account: this.userService.MyAccount
      }
    }))

    const noOfMembers = this.UpcomingMeeting()?.cell?.no_of_members ?? 0,

    attendantsCount = limit + unitsLeft,

    pendingMembersCount = noOfMembers - attendantsCount

    this.NoOfPendingMembers.update(() => Math.max(pendingMembersCount, 0))
  }

  ngOnDestroy(): void {
    this.meetingUpdateSubs?.unsubscribe()
  }
}