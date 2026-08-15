import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'
import { UserService } from 'src/app/general-services/user-service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MainSocketService {
  #socket_main!: Socket

  private connectionEventName = "connection"

  private connectionErrorEventName = "connect_error"

  private GC_Modal = inject(GCenteredModalsService)

  private userService = inject(UserService)

  private mainFeaturesRouter = inject(MainFeaturesRouteService)

  get SockectInstance () {
    return this.#socket_main
  }

  Init (accessToken: string) {
    const {apiBaseUrl} = enviroment

    this.#socket_main = io(apiBaseUrl, {
      transports: ["websocket"],
      auth: { 
        token: accessToken
      }
    })
    
    this.listen<string>(this.connectionErrorEventName).subscribe((payload) => this.onConnectionFailed(payload))

    this.emit(this.connectionEventName)
  }
  
  private emit (eventName: string, payload?: any) {
    this.#socket_main.emit(eventName, payload)
  }

  private listen<Payload = unknown>(eventName: string) {
    return new Observable<Payload>(obvs => {
      this.#socket_main.on(eventName, payload => {
        obvs.next(payload)
      })
    })
  }

  private onConnectionFailed (message: string) {
    this.GC_Modal.openDialogue({
      title: "stream authentication failed",
      message: `authentication failed cause "${message}". You will be redirected to home.`
    }, () => {
      this.userService.logout()

      this.mainFeaturesRouter.toHome()
    })
  }
}