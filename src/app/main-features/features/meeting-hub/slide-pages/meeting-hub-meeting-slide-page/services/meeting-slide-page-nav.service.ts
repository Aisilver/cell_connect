import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MeetingHubMeetingSlideNavigationPageTypes } from '../types';
import { MEETING_HUB_MEETING_SLIDE_NAVIGATIONS_CONFIG } from '../configurations/meeting-slide-navigations.config';
import { MeetgingHubRole } from '@shared/common';
import { CELL_PERMISSION_MODEL } from 'src/app/models/cell-permission-model/cell-permission-model';
import { UserService } from 'src/app/general-services/user-service';
import { MeetingHubService } from '../../../services/meeting-hub.service';

@Injectable({
  providedIn: 'any'
})
export class MeetingSlidePageNavService {
  private declare CurrNavigationParam: any 

  private meetingHubService = inject(MeetingHubService)

  private userService = inject(UserService)

  private devCellPermission = inject(CELL_PERMISSION_MODEL)

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

      {id} = this.getUserRoleConfig()

      if(visibilty_level == "adminstrative") {
        
        if(id == "member") return false

      } else if (visibilty_level == "member-only") {
        
        if(id != "member") return false
      
      }

      return true
    })
  }

  private   getUserRoleConfig (): MeetgingHubRole {
    const {MyAccount} = this.userService,

    {currentLeadership, currentMembership} = MyAccount,

    // permission = currentLeadership?.cell_permission ?? currentMembership?.cell_permission

    permission = this.devCellPermission.getModel(),

    {id: MeetingId} = this.meetingHubService.getActiveMeeting()

    if(!permission) throw Error("meetinghub permission not found")
    
    return {
      id: currentLeadership ? "leader" : currentMembership?.roles == 'cell-admin' ? "assistant" : "member",
      accountId: MyAccount.id ?? 0,
      meetingId: MeetingId ?? 0,
      permission,
      leaderId: currentLeadership?.id,
      memberId: currentMembership?.id
    }
  }
}
