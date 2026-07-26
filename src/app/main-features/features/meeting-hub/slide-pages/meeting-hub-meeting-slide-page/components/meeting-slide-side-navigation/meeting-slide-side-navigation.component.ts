import { Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { NavigationConfig } from 'src/app/main-features/types/navigation-configuration.type';
import { MeetingHubMeetingSlideNavigationConfig, MeetingHubMeetingSlideNavigationPageTypes } from '../../types';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/main-features/shared/components/icon/icon.component';
import { CloneOf } from 'src/app/functions/clone-of.func';
import { config } from 'rxjs';

@Component({
  selector: 'app-meeting-slide-side-navigation',
  imports: [
    CommonModule,
    IconComponent
  ],
  templateUrl: './meeting-slide-side-navigation.component.html',
  styleUrl: './meeting-slide-side-navigation.component.scss'
})
export class MeetingSlideSideNavigationComponent implements  OnChanges {
  @Input()
  navigations?: MeetingHubMeetingSlideNavigationConfig[]

  @Output("navigateTo")
  navigationOutput = new EventEmitter<MeetingHubMeetingSlideNavigationPageTypes>()

  private mainNavCount = 3

  MainNavigations = signal<MeetingHubMeetingSlideNavigationConfig[]>([])

  ReservedNavigations = signal<MeetingHubMeetingSlideNavigationConfig[]>([])

  ReservedNavsOpened = signal(false)

  ngOnChanges(changes: SimpleChanges): void {
    this.MainNavigations.set(this.navigations?.slice(0, this.mainNavCount) ?? [])

    this.ReservedNavigations.set(this.reserveNavTransformer(this.navigations?.slice(this.mainNavCount) ?? []))

    setTimeout(() => this.onNavigate([...this.MainNavigations(), ...this.ReservedNavigations()]), 100);
  }

  private reserveNavTransformer (navConfigs: MeetingHubMeetingSlideNavigationConfig[]): MeetingHubMeetingSlideNavigationConfig[] {
    return navConfigs.map(config => {
      return {
        ...config,
        reserved: true
      }
    })
  }

  private onNavigate (navConfigs: MeetingHubMeetingSlideNavigationConfig[]) {
    const activeNavigation = navConfigs.find(config => config.active)

    if(!activeNavigation) return

    const {reserved} = activeNavigation

    if(reserved) {
      this.MainNavigations.update(navs => {
        const copy = CloneOf(navs)

        copy.push(activeNavigation)
        
        return copy
      })

      this.ReservedNavigations.update(navs => {
        const copy = CloneOf(navs),

        curr_act_reserved_nav_index = copy.findIndex(nav => nav.route == activeNavigation.route)

        copy[curr_act_reserved_nav_index].hidden = true

        return copy
      })
    }
  }

  NavigateTo (config?: MeetingHubMeetingSlideNavigationConfig) {
    this.navigationOutput.emit(config?.route)

    if(this.ReservedNavsOpened()) this.ToggleReservedNavs()
  }

  ToggleReservedNavs () {
    this.ReservedNavsOpened.update(state => !state)
  }
}
