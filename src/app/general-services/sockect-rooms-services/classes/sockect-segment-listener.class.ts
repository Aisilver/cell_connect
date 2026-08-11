import { Observable } from "rxjs";
import { MainSocketService } from "src/app/server/socket-service/main-socket.service";

export abstract class SocketSegmentListener <SockectSegment = any> {
    protected abstract sockectService: MainSocketService
    
    listen<T extends keyof SockectSegment>(eventName: T) {
        return new Observable(obvs => {
            this.sockectService.SockectInstance.on(eventName as string, payload => {
                obvs.next(payload as SockectSegment[T])
            })
        })
    }
}