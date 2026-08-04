import { inject, Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthEventsKeyTypes } from '../types';
import { UserSignInResponse } from '@shared/route-types';
import { UserService } from 'src/app/general-services/user-service';
import { MainSSEService } from 'src/app/server/sse-service/sse.service';
import { MainSocketService } from 'src/app/server/socket-service/main-socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  declare private EmailVerified: boolean

  declare private JWTAuthenticationAccessToken: string

  private userService = inject(UserService)

  private Main_SSE_Service = inject(MainSSEService)

  private Main_WebSockect_Service = inject(MainSocketService)

  private AuthAutoLoginState = signal<"successful"| "neutral" | "failed">("neutral")

  AuthEventsSubject = new Subject<AuthEventsKeyTypes>()

  getAutoAuthLoginState () {
    return this.AuthAutoLoginState()
  }

  setAutoAuthLoginState (state: "successful" | "neutral" | "failed") {
    this.AuthAutoLoginState.update(() => state)
  }

  getAccessToken () {
    if(!this.JWTAuthenticationAccessToken) throw Error("Authorization key has not been set"); 
    
    return this.JWTAuthenticationAccessToken
  }

  setAccesToken = (key: string) => this.JWTAuthenticationAccessToken = key

  setEmailVerified() {
    this.EmailVerified = true
  }

  isEmailVerified = () => this.EmailVerified

  reset() {
    this.EmailVerified = false
  }

  triggerAuthRouteChangeAnimation = () => this.AuthEventsSubject.next("change-route")

  triggerAuthProgress = () => this.AuthEventsSubject.next('auth-in-progress')

  triggerAuthPaused = () => this.AuthEventsSubject.next('auth-paused')

  runSignInProcess (param: UserSignInResponse) {
    const {accessToken, account} = param

    this.setAccesToken(accessToken)

    this.userService.setMyAccount(account)

    this.Main_SSE_Service.Init()

    this.Main_WebSockect_Service.Init(accessToken)
  }
}