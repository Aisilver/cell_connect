import { MainSocketService } from "src/app/server/socket-service/main-socket.service";

export abstract class SocketSegmentEmitter <SockectSegment = any> {
    protected abstract sockectService: MainSocketService

    protected emit<SockectEvent extends keyof SockectSegment>(event: SockectEvent, payload?: SockectSegment[SockectEvent]) {
        //@ts-ignore
        this.sockectService.SockectInstance.emit(event, payload)
    }
}