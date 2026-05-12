import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { ApiResponse, Pagination, PaginatedData } from '@shared/common';
import { Attendance, CellVenueLocation, Meeting } from '@shared/entities';
import { MeetingAttendantsRequestQuery, MeetingCreationRequestData, MeetingEditRequestData } from '@shared/route-types';

@Injectable({
  providedIn: 'any'
})
export class MeetingsRouteApiCallService extends BaseRouteService {
  protected override route_base: string = "meetings";
 
  bookMeeting = (data: MeetingCreationRequestData) => this.httpService.httpCall<ApiResponse>([this.route_base, 'book-meeting'] ).post(data)

  editMeeting = (meetingId: number, data: MeetingEditRequestData) => this.httpService.httpCall<ApiResponse>([this.route_base, 'edit-meeting', meetingId]).update(data)

  getMeetingAttendants = (meetingId: number, query: MeetingAttendantsRequestQuery = {}) => this.httpService.httpCall<ApiResponse<PaginatedData<Attendance>>>([this.route_base, 'get-meet-attendants', meetingId], query).get() 

  getUpcomingMeeting = (cellId: number, flat = false) => this.httpService.httpCall<ApiResponse<Meeting | null>>([this.route_base, 'get-upcoming-meet', cellId], {flat}).get()
  
  getAttendanceHistory = (pagination: Pagination) => this.httpService.httpCall<ApiResponse<PaginatedData<Attendance>>>([this.route_base, 'get-user-attds-history'], pagination).get()

  getMeetingDefaultVenue = (cellId: number) => this.httpService.httpCall<ApiResponse<CellVenueLocation>>([this.route_base, 'get-meet-default-venue', cellId]).get()
}