import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { ApiResponse } from '@shared/common';
import { List } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class AppRouteApiCallService extends BaseRouteService {
  protected override route_base: string = "app";

  getCities = () => this.httpService.httpCall<ApiResponse<List[]>>([this.route_base, 'get-cities'], undefined, {dontIncludeAuthenticationHeader: true}).get()

  getMeetingTypes = () => this.httpService.httpCall<ApiResponse<List[]>>([this.route_base, "get-meeting-types"], undefined, {dontIncludeAuthenticationHeader: true}).get()
}
