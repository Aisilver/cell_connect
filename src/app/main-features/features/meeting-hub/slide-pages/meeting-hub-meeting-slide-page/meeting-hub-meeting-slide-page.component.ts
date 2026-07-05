import { Component, inject, Input, OnInit } from '@angular/core';
import { Meeting } from '@shared/entities';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { MeetingHubService } from '../../services/meeting-hub.service';

@Component({
  selector: 'app-meeting-hub-meeting-slide-page',
  imports: [],
  templateUrl: './meeting-hub-meeting-slide-page.component.html',
  styleUrl: './meeting-hub-meeting-slide-page.component.scss'
})
export class MeetingHubMeetingSlidePageComponent implements SlickChildInstance, OnInit {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  private meetingHubService = inject(MeetingHubService)

  Meeting!: Meeting

  ngOnInit(): void {
    this.Meeting = this.meetingHubService.getActiveMeeting()
  }
}