import { AfterViewInit, Component, DoCheck, ElementRef, inject, Input, OnDestroy, OnInit, Query, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { Meeting } from '@shared/entities';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { MeetingHubService } from '../../services/meeting-hub.service';
import { MeetingHubMeetingSlideNavigationPageTypes } from './types';
import { MEETING_HUB_MEETING_SLIDE_NAVIGATIONS_CONFIG } from './configurations/meeting-slide-navigations.config';
import { NavigationConfig } from 'src/app/main-features/types/navigation-configuration.type';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { CommonModule } from '@angular/common';
import { AllChildDOMElementFlexer } from 'src/app/functions/all-child-flexer.func';
import { MeetingSlideOverviewPageComponent } from "./pages/meeting-slide-overview-page/meeting-slide-overview-page.component";
import { MeetingSlideMembersPageComponent } from "./pages/meeting-slide-members-page/meeting-slide-members-page.component";
import { Subscription } from 'rxjs';
import { MeetingSlidePageNavService } from './services/meeting-slide-page-nav.service';

@Component({
  selector: 'app-meeting-hub-meeting-slide-page',
  imports: [
    CommonModule,
    IconComponent,
    MeetingSlideOverviewPageComponent,
    MeetingSlideMembersPageComponent
  ],
  templateUrl: 'meeting-hub-meeting-slide-page.component.html',
  styleUrls: [
    './meeting-hub-meeting-slide-page.component.scss',
    './other-styles/meeting-hub-meeting-slide-page-aside-styling.scss',
    './other-styles/meeting-hub-meeting-slide-page-footer-styling.scss' 
  ]
})
export class MeetingHubMeetingSlidePageComponent implements SlickChildInstance, OnInit, DoCheck, AfterViewInit, OnDestroy {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  private meetingHubService = inject(MeetingHubService)

  private navigationService = inject(MeetingSlidePageNavService)

  private NavigationConfig = inject(MEETING_HUB_MEETING_SLIDE_NAVIGATIONS_CONFIG)

  @ViewChild("mainSection", {static: true})
  mainSectionDomRef!: ElementRef<HTMLElement>

  @ViewChildren("pages")
  private PagesComponentRef!: QueryList<SlickChildInstance>

  Meeting!: Meeting

  Page = signal<MeetingHubMeetingSlideNavigationPageTypes | null>(null)

  Navigations = signal<NavigationConfig<MeetingHubMeetingSlideNavigationPageTypes>[]>([])

  NavigationSubs?: Subscription

  ngOnInit(): void {
    this.Meeting = this.meetingHubService.getActiveMeeting()

    this.Navigations.set(this.NavigationConfig)

    this.NavigationSubs = this.navigationService.$onNavigate.subscribe(routeConfig => this.NavigateTo(routeConfig.route))
  }

  ngDoCheck(): void {
    this.FlexAllPages()    
  }


  ngAfterViewInit(): void {
    this.FlexAllPages()

    this.NavigateTo("overview")
  }

  onVisible () {
    this.PagesComponentRef.forEach(compRef => {
      if(compRef.onVisible) compRef.onVisible()
    })
  }

  onNotVisible () {
    this.PagesComponentRef.forEach(compRef => {
      if(compRef.onNotVisible) compRef.onNotVisible()
    })
  }

  NavigateTo(page?: MeetingHubMeetingSlideNavigationPageTypes) {
    this.Navigations.update(navs => {
      const copy = [...navs],

      indexOfConfig = copy.findIndex(config => config.route == page)

      copy.forEach(config => config.active = false)

      if(indexOfConfig != -1) copy[indexOfConfig].active = true

      return copy
    })

    this.Page.set(page ?? null)
  }

  FlexAllPages () {
    AllChildDOMElementFlexer(this.mainSectionDomRef.nativeElement)
  }

  ngOnDestroy(): void {
    this.NavigationSubs?.unsubscribe()
  }
}