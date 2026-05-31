import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, Input, OnChanges, OnDestroy, signal, SimpleChanges, ViewChild } from '@angular/core';
import { PaginatedData } from '@shared/common/pagination';
import { Attendance, Cell, Meeting, MeetingStatusTypes, UserAccount } from '@shared/entities';
import { isToday } from 'date-fns';
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

  AttenanceUnitsLeft = signal(0)

  Host = signal<UserAccount | undefined> (undefined)

  MeetingStartTime = signal<null | Date>(null)

  MeetingActualStartTime = signal<Date | null>(null)

  MeetingStatus = signal<MeetingStatusTypes>('booked')

  NoOfPendingMembers = signal(0)

  TimeExceeded = signal(false)

  IsMeetingStartDateToday = signal(false)

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  ngOnChanges(changes: SimpleChanges): void {
    const upcomingMeetingChanges = changes['UpcomingMeetingInput']

    if(!upcomingMeetingChanges) return

    const {firstChange, currentValue} = upcomingMeetingChanges

    if(firstChange)
      this.UpcomingMeeting.set(currentValue)
    else
      this.meetingUpdateEvent.next(currentValue)
  
    console.log(this.MeetingStartTime())
  }

  ngAfterViewInit(): void {
    this.HandleUpcomingMeetingUpdate()

    this.meetingUpdateSubs = this.meetingUpdateEvent.subscribe(meet => {
      this.UpcomingMeeting.set(meet)

      this.HandleUpcomingMeetingUpdate()
    })
  }

  private HandleUpcomingMeetingUpdate () {
    const meeting = this.UpcomingMeeting()

    if(!meeting) return

    const {startTime, status, cell, actualStartTime} = meeting

    this.Host.set(cell?.leader?.account)

    this.MeetingStartTime.set(new Date(startTime))

    console.log(this.MeetingStartTime(), "hello")

    this.MeetingStatus.set(status)

    this.MeetingActualStartTime.set(actualStartTime ? new Date(actualStartTime) : null)

    this.IsMeetingStartDateToday.set(isToday(this.MeetingStartTime() ?? new Date()))
  }

  async onAttendanceLoaderReady () {
    const obvs = this.MeetingsApiCall.getMeetingAttendants(this.UpcomingMeeting()?.id ?? 0, 
      {
        exclude_user: true,
        exclude_leader: true,
        limit: 5
      }
    ),
    
    response = await this.loader.LoadAsync(obvs)

    if(!this.MeetingsApiCall.responseChecker(response)) return

    this.onMeetingAttendancesRecieved(response.data)
  }

  private onMeetingAttendancesRecieved (paginatedData: PaginatedData<Attendance>) {
    const {data, unitsLeft} = paginatedData

    this.Attendances.set(data)

    this.AttenanceUnitsLeft.set(unitsLeft)
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

  ngOnDestroy(): void {
    this.meetingUpdateSubs?.unsubscribe()
  }
}