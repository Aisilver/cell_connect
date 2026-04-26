import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { AuthPageSlide, HomePageSlide } from "@shared/entities";
import { ApiResponse } from "@shared/common";

@Injectable({
  providedIn: 'root'
})
export class PagesRouteApiCallService extends BaseRouteService {
  protected override route_base: string = 'pages';
  
  getHomeSlides = () => this.httpService.httpCall<ApiResponse<HomePageSlide[]>>([this.route_base, 'home-slides'], undefined, {dontIncludeAuthenticationHeader: true}).get()
  
  getAuthSlides = () => this.httpService.httpCall<ApiResponse<AuthPageSlide[]>>([this.route_base, 'auth-slides'], undefined, {dontIncludeAuthenticationHeader: true}).get()
}