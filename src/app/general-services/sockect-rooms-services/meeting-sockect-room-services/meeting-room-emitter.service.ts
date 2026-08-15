import { inject, Injectable } from '@angular/core';
import { MainSocketService } from 'src/app/server/socket-service/main-socket.service';
import { SocketSegmentEmitter } from '../classes/sockect-segment-emitter.class';
import { Meeting_WS_EntranceData, MeetingRoomEmitterEvent } from '@shared/socket-rooms-types';

@Injectable({
  providedIn: 'any'
})
export class MeetingRoomEmitterService extends SocketSegmentEmitter<MeetingRoomEmitterEvent> {
  protected override sockectService: MainSocketService = inject(MainSocketService);

  enterRoom = (payload: Meeting_WS_EntranceData) => this.emit("meeting", payload)
}