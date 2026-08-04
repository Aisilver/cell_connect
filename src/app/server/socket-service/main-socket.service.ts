import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client'
import { enviroment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class MainSocketService {
  private socket_main!: Socket

  private connectionSubs?: Subscription

  get Socket () {
    if(!this.socket_main.connected) throw Error("websocket is not connected yet")

    return this.socket_main
  }


  Init (accessToken: string) {
    const {apiBaseUrl} = enviroment

    this.socket_main = io(apiBaseUrl, {
      transports: ["websocket"],
      auth: { 
        token: accessToken
      }
    })

    this.connectionSubs = this.socketListener<string>("connection").subscribe(payload => {
      
    })
  }

  socketListener<Payload = unknown>(eventName: string) {
    return new Observable(obvs => {
      try {
        this.Socket.on(eventName, payload => {
          obvs.next(payload as Payload)
        })
      } catch (error: any) {
        obvs.error(error)
      }
    })
  }
}