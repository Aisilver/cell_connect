import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/general-services/user-service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';

@Injectable({
  providedIn: 'any'
})
export class HubRouterService {
  private mainFeaturesRouter = inject(MainFeaturesRouteService)

  toHubHome(){
    this.mainFeaturesRouter.toHub()
  }

  toHubMeeting() {
    this.mainFeaturesRouter.toHub("meetings")
  }
}