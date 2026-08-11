import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client'
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MainSocketService {
  #socket_main!: Socket

  private connected = false

  private connectionSubs?: Subscription

  private connectionEventName = "connection"

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

    this.connectionSubs = this.listen<string>(this.connectionEventName).subscribe(() => {
      this.connected = true
    })

    this.emit(this.connectionEventName)
  }
  
  private emit (eventName: string, payload?: any) {
    this.#socket_main.emit(eventName, payload)
  }

  private listen<Payload = unknown>(eventName: string) {
    return new Observable(obvs => {
      this.#socket_main.on(eventName, payload => {
        obvs.next(payload as Payload)
      })
    })
  }
}