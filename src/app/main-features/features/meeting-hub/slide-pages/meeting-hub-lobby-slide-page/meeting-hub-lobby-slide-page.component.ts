import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { MeetingHubService } from '../../services/meeting-hub.service';
import { MeetingRoomEmitterService } from 'src/app/general-services/sockect-rooms-services/meeting-sockect-room-services/meeting-room-emitter.service';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { Meeting } from '@shared/entities';
import { MeetingRoomListenerService } from 'src/app/general-services/sockect-rooms-services/meeting-sockect-room-services/meeting-room-listener.service';

@Component({
  selector: 'app-meeting-hub-lobby-slide-page',
  imports: [
    LoadersComponent
],
  templateUrl: './meeting-hub-lobby-slide-page.component.html',
  styleUrl: './meeting-hub-lobby-slide-page.component.scss'
})
export class MeetingHubLobbySlidePageComponent implements SlickChildInstance, OnInit, AfterViewInit {

  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  private hubService = inject(MeetingHubService)

  private meetingSocketEmitterService = inject(MeetingRoomEmitterService)

  private meetingSocketListenerService = inject(MeetingRoomListenerService)

  declare Meeting: Meeting

  ngOnInit(): void {
    this.Meeting = this.hubService.getActiveMeeting()

    this.meetingSocketListenerService.$onJoin.subscribe(payload => {
      console.log("received", payload)
    })
  }

  ngAfterViewInit(): void {
    this.meetingSocketEmitterService.enterRoom(this.hubService.getUserRoleConfig())
  }
}