import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { Slide, SlideTypes } from "@shared/entities";
import { ApiResponse } from "@shared/common";

@Injectable({
  providedIn: 'root'
})
export class PagesRouteApiCallService extends BaseRouteService {
  protected override route_base: string = 'pages';
  
  getPageSlide = (type: SlideTypes) => this.httpService.httpCall<ApiResponse<Slide[]>>([this.route_base, "get-page-slides", type], undefined, {dontIncludeAuthenticationHeader: true}).get()
}