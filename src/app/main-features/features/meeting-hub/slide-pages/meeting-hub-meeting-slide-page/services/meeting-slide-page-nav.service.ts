import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MeetingHubMeetingSlideNavigationPageTypes } from '../types';

@Injectable({
  providedIn: 'any'
})
export class MeetingSlidePageNavService {
  private declare CurrNavigationParam: any 

  get CurrentPageParam () {
    return this.CurrNavigationParam
  }

  $onNavigate = new Subject<{route: MeetingHubMeetingSlideNavigationPageTypes, data: any}>()

  navigateTo(route: MeetingHubMeetingSlideNavigationPageTypes, data: any) {
    this.CurrNavigationParam = data

    this.$onNavigate.next({route, data})
  }
}
