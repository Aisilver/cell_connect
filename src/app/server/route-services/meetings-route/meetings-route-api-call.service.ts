import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { ApiResponse, Pagination, PaginatedData } from '@shared/common';
import { Attendance, CellVenueLocation, Meeting } from '@shared/entities';
import { GetMeetingAttendantsRouteQuery, GetUpcomingMeetingRouteQuery, MeetingCreationRequestData, MeetingEditRequestData } from '@shared/route-types';

@Injectable({
  providedIn: 'any'
})
export class MeetingsRouteApiCallService extends BaseRouteService {
  protected override route_base: string = "meetings";
 
  bookMeeting = (data: MeetingCreationRequestData) => this.httpService.httpCall<ApiResponse>([this.route_base, 'book-meeting'] ).post(data)

  bookAMeetingValidator = () => this.httpService.httpCall<ApiResponse>([this.route_base, 'book-a-meeting-validator']).get()

  editMeeting = (meetingId: number, data: MeetingEditRequestData) => this.httpService.httpCall<ApiResponse>([this.route_base, 'edit-meeting', meetingId]).update(data)

  editAMeetingValidator = () => this.httpService.httpCall<ApiResponse>([this.route_base, 'edit-a-meeting-validator']).get()

  getMeetingAttendants = (meetingId: number, query: GetMeetingAttendantsRouteQuery = {}) => this.httpService.httpCall<ApiResponse<PaginatedData<Attendance>>>([this.route_base, 'get-meet-attendants', meetingId], query).get() 

  getUpcomingMeeting = (cellId: number, query: GetUpcomingMeetingRouteQuery) => this.httpService.httpCall<ApiResponse<Meeting | null>>([this.route_base, 'get-upcoming-meet', cellId], query).get()
  
  getUserCellAttendanceHistory = (memberId: number, pagination: Pagination) => this.httpService.httpCall<ApiResponse<PaginatedData<Attendance>>>([this.route_base, 'get-cell-attendance-history', memberId], pagination).get()

  getMeetingDefaultVenue = (cellId: number) => this.httpService.httpCall<ApiResponse<CellVenueLocation>>([this.route_base, 'get-meet-default-venue', cellId]).get()
}