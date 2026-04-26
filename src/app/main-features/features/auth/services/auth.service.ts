import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthEventsKeyTypes } from '../types';
import { UserSignInResponse } from '@shared/route-types';
import { UserService } from 'src/app/general-services/user-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  declare private EmailVerified: boolean

  declare private JWTAuthenticationAccessToken: string

  private userService = inject(UserService)

  AuthEventsSubject = new Subject<AuthEventsKeyTypes>()

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
  }
}