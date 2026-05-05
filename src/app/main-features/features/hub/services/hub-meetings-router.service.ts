import { inject, Injectable } from '@angular/core';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';

@Injectable({
  providedIn: 'any'
})
export class HubMeetingsRouterService {
  private featureRouter = inject(MainFeaturesRouteService)

  toMain(){
    this.featureRouter.toHub("meetings")
  }

  toNewMeeting(){
    this.featureRouter.toHub("meetings", "new-meeting")
  }
}
