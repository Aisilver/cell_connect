import { inject, Injectable } from '@angular/core';
import { MainSocketService } from 'src/app/server/socket-service/main-socket.service';
import { SocketSegmentEmitter } from '../classes/sockect-segment-emitter.class';
import { MeetingRoomEmitterEvent } from '@shared/socket-rooms-types';

@Injectable({
  providedIn: 'any'
})
export class MeetingRoomEmitterService extends SocketSegmentEmitter<MeetingRoomEmitterEvent> {
  protected override sockectService: MainSocketService = inject(MainSocketService);

  enterRoom = () => this.emit("meeting:enter")
}