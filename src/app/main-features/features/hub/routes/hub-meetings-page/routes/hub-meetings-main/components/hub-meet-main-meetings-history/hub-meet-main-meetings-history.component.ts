import { Component, inject, signal, ViewChild } from '@angular/core';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { MeetingsRouteApiCallService } from 'src/app/server/route-services/meetings-route/meetings-route-api-call.service';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { CommonModule } from '@angular/common';
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { PaginatedData, Pagination } from '@shared/common';
import { Attendance, UserAccount } from '@shared/entities';
import { PaginationComponent } from "src/app/main-features/shared/components/pagination/pagination.component";
import { AppMainService } from 'src/app/general-services/app-main.service';
import { UserService } from 'src/app/general-services/user-service';
import { isToday } from 'date-fns';
import { HubMeetMainMeetingsHistoryAttdsViewComponent } from "./components/hub-meet-main-meetings-history-attds-view/hub-meet-main-meetings-history-attds-view.component";
import { HubMeetMainMeetingsHistoryMobileRowViewComponent } from "./components/hub-meet-main-meetings-history-mobile-row-view/hub-meet-main-meetings-history-mobile-row-view.component";
import { TextDeserailizerPipe } from 'src/app/main-features/shared/pipes/text-deserailizer-pipe';
import { ATTENDANCE_MODEL } from 'src/app/models/attendance-model/attendance-model';
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';
import { CELL_MODEL } from 'src/app/models/cell-model/cell-model';
import { APP_LOCATION_MODEL } from 'src/app/models/app-location-model/app-location-model';
import { MainFeaturesRouteService } from 'src/app/main-features/service/main-features-route.service';

@Component({
  selector: 'app-hub-meet-main-meetings-history',
  imports: [
    CommonModule,
    LoadersComponent,
    ImageComponent,
    PaginationComponent,
    TextDeserailizerPipe,
    HubMeetMainMeetingsHistoryAttdsViewComponent,
    HubMeetMainMeetingsHistoryMobileRowViewComponent
],
  templateUrl: './hub-meet-main-meetings-history.component.html',
  styleUrl: './hub-meet-main-meetings-history.component.scss'
})
export class HubMeetMainMeetingsHistoryComponent {
  private userService = inject(UserService)

  private MeetingApiCall = inject(MeetingsRouteApiCallService)

  private AppMainService = inject(AppMainService)

  private mainFeaturesRouter = inject(MainFeaturesRouteService)

  Attendances = signal<Attendance[]>([])

  Page = signal(1)

  NumberOfPagesLeft = signal(0)

  AppVectors = inject(APP_VECTOR_PATHS)

  HasHistory = signal(false)

  get IsMobileView () {
    return this.AppMainService.isMobileView()
  }

  @ViewChild(LoadersComponent)
  loader!: LoadersComponent

  async LoadAttendanceHistory (pagination: Pagination) {
    const response = await this.loader.LoadAsync(this.MeetingApiCall.getAttendanceHistory(pagination))

    this.MeetingApiCall.responseChecker(response, data => this.onSuccess(data))
  }

  private onSuccess (responseData: PaginatedData<Attendance>) {
    const {data, page, numberOfPagesLeft} = responseData

    this.Page.update(() => page)

    this.NumberOfPagesLeft.update(() => numberOfPagesLeft)

    this.Attendances.update(() => data)

    this.HasHistory.update(() => this.Attendances().length > 0)
  }

  UserIsMeetingHost(host?: UserAccount) {
    if(!host) return false

    return host.id == this.userService.MyAccount.id
  }

  isMeetingDateToday(date?: Date) {
    if(!date) return false

    return isToday(date)
  }


  RouteToUserProfile (username = "") {
    this.mainFeaturesRouter.toProfile(username)
  }

  RouteToMeetingDetails (meetingId = 0) { 
    this.mainFeaturesRouter.toMeetingDetails(meetingId)
  }
}