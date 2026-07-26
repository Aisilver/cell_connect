import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, signal, SimpleChanges } from '@angular/core';
import { MeetingHubMeetingSlideNavigationConfig, MeetingHubMeetingSlideNavigationPageTypes } from '../../types';
import { CommonModule } from '@angular/common';
import { IconComponent } from 'src/app/main-features/shared/components/icon/icon.component';

@Component({
  selector: 'app-meeting-slide-bottom-navigation',
  imports: [
    CommonModule,
    IconComponent
  ],
  templateUrl: './meeting-slide-bottom-navigation.component.html',
  styleUrl: './meeting-slide-bottom-navigation.component.scss'
})
export class MeetingSlideBottomNavigationComponent implements OnChanges {
  private mainNavCount = 4

  @Input()
  navigations?: MeetingHubMeetingSlideNavigationConfig[]

  @Output("navigateTo")
  navigationOutput = new EventEmitter<MeetingHubMeetingSlideNavigationPageTypes>()

  Initialized = signal(false)

  MainNavigations = signal<MeetingHubMeetingSlideNavigationConfig[]>([])

  ngOnChanges(changes: SimpleChanges): void {
    const {currentValue: navigations} = changes['navigations']

    if(!navigations) return

    this.MainNavigations.set((navigations as MeetingHubMeetingSlideNavigationConfig[]).slice(0, this.mainNavCount))
  }

  NavigateTo(config?: MeetingHubMeetingSlideNavigationConfig) {
    if(!this.Initialized()) this.Initialized.set(true)

    this.navigationOutput.emit(config?.route)
  }
}