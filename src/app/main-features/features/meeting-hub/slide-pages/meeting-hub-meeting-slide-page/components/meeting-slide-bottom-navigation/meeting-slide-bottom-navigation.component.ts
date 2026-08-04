import { Component, EventEmitter, inject, Input, OnChanges, OnInit, Output, signal, SimpleChanges, ViewChild } from '@angular/core';
import { MeetingHubMeetingSlideNavigationConfig, MeetingHubMeetingSlideNavigationPageTypes } from '../../types';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/main-features/shared/components/icon/icon.component';
import { MeetingSlidePageNavService } from '../../services/meeting-slide-page-nav.service';
import { MessageComponent } from "src/app/main-features/shared/components/message/message.component";

@Component({
  selector: 'app-meeting-slide-bottom-navigation',
  imports: [
    CommonModule,
    IconComponent,
    MessageComponent
],
  templateUrl: './meeting-slide-bottom-navigation.component.html',
  styleUrl: './meeting-slide-bottom-navigation.component.scss'
})
export class MeetingSlideBottomNavigationComponent implements OnInit, OnChanges {
  private mainNavCount = 4

  private meetingSlideNavService = inject(MeetingSlidePageNavService)

  @Input()
  navigations?: MeetingHubMeetingSlideNavigationConfig[]

  @Output("navigateTo")
  navigationOutput = new EventEmitter<MeetingHubMeetingSlideNavigationPageTypes>()

  @ViewChild(MessageComponent)
  private messager!: MessageComponent

  Initialized = signal(false)

  MainNavigations = signal<MeetingHubMeetingSlideNavigationConfig[]>([])

  ReservedNavigations = signal<MeetingHubMeetingSlideNavigationConfig[]>([])

  ReserveOpened = signal(false)

  CurrentActiveReservedNavConfig = signal<MeetingHubMeetingSlideNavigationConfig | null>(null)

  ngOnInit(): void {
    document.addEventListener("click", () => {
      if(this.ReserveOpened()) this.CloseReserveNavs()
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    const {currentValue} = changes['navigations']

    const navigations: MeetingHubMeetingSlideNavigationConfig[] = currentValue ?? []

    this.MainNavigations.set(navigations.slice(0, this.mainNavCount))
  
    const reservedNavConfigs = this.meetingSlideNavService.reserveNavTransformer(navigations.slice(this.mainNavCount))

    this.ReservedNavigations.set(reservedNavConfigs)

    this.CurrentActiveReservedNavConfig.update(() => {
      return reservedNavConfigs.find(config => config.active) ?? null
    })
  }

  NavigateTo(config?: MeetingHubMeetingSlideNavigationConfig) {
    if(!this.Initialized()) this.Initialized.set(true)

    this.navigationOutput.emit(config?.route)

    if(!config?.reserved) this.messager.showMessage(String(config?.name ?? config?.route))
  }

  OpenReserveNavs (e: Event) {
    e.stopPropagation()

    if(this.ReserveOpened()) this.CloseReserveNavs()

    else this.ReserveOpened.set(true) 
  }

  private CloseReserveNavs () {
    this.ReserveOpened.set(false)
  }
}