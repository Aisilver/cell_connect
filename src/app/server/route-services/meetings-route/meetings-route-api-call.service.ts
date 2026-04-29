import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { ApiResponse, Pagination, PaginatedData } from '@shared/common';
import { AppLocation, Attendance, Meeting } from '@shared/entities';
import { MeetingAttendantsRequestQuery } from '@shared/route-types';

@Injectable({
  providedIn: 'any'
})
export class MeetingsRouteApiCallService extends BaseRouteService {
  protected override route_base: string = "meetings";
 
  getMeetingAttendants = (meetingId: number, query: MeetingAttendantsRequestQuery = {}) => this.httpService.httpCall<ApiResponse<PaginatedData<Attendance>>>([this.route_base, 'get-meet-attendants', meetingId], query).get() 

  getUpcomingMeeting = (cellId: number) => this.httpService.httpCall<ApiResponse<Meeting | null>>([this.route_base, 'get-upcoming-meet', cellId]).get()
  
  getAttendanceHistory = (pagination: Pagination) => this.httpService.httpCall<ApiResponse<PaginatedData<Attendance>>>([this.route_base, 'get-user-attds-history'], pagination).get()

  getMeetingDefaultVenue = (cellId: number) => this.httpService.httpCall<ApiResponse<AppLocation>>([this.route_base, 'get-meet-default-venue', cellId]).get()
}