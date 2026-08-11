import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MeetingHubMeetingSlideNavigationConfig, MeetingHubMeetingSlideNavigationPageTypes } from '../types';
import { MEETING_HUB_MEETING_SLIDE_NAVIGATIONS_CONFIG } from '../configurations/meeting-slide-navigations.config';
import { MeetingHubService } from '../../../services/meeting-hub.service';

@Injectable({
  providedIn: 'any'
})
export class MeetingSlidePageNavService {
  private declare CurrNavigationParam: any 

  private meetingHubService = inject(MeetingHubService)

  private NavigationConfig = inject(MEETING_HUB_MEETING_SLIDE_NAVIGATIONS_CONFIG)

  get CurrentPageParam () {
    return this.CurrNavigationParam
  }

  $onNavigate = new Subject<{route: MeetingHubMeetingSlideNavigationPageTypes, data: any}>()

  navigateTo(route: MeetingHubMeetingSlideNavigationPageTypes, data: any) {
    this.CurrNavigationParam = data

    this.$onNavigate.next({route, data})
  }

  getUserNavigations () {
    return this.NavigationConfig.filter(navConfig => {
      const {visibilty_level} = navConfig,

      {id} = this.meetingHubService.getUserRoleConfig()

      if(visibilty_level == "adminstrative") {
        
        if(id == "member") return false

      } else if (visibilty_level == "member-only") {
        
        if(id != "member") return false
      
      }

      return true
    })
  }

  reserveNavTransformer (navConfigs: MeetingHubMeetingSlideNavigationConfig[]): MeetingHubMeetingSlideNavigationConfig[] {
    return navConfigs.map(config => {
      return {
        ...config,
        reserved: true
      }
    })
  }
}
