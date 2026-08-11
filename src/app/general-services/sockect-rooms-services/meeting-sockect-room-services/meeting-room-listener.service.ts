import { inject, Injectable } from '@angular/core';
import { SocketSegmentListener } from '../classes/sockect-segment-listener.class';
import { MeetingRoomListenerEvent } from '@shared/socket-rooms-types'
import { MainSocketService } from 'src/app/server/socket-service/main-socket.service';

@Injectable({
  providedIn: 'any'
})
export class MeetingRoomListenerService extends SocketSegmentListener<MeetingRoomListenerEvent> {
  protected override sockectService: MainSocketService = inject(MainSocketService);

  
}
