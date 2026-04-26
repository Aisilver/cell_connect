import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/general-services/user-service';

@Injectable({
  providedIn: 'any'
})
export class MainFeaturesRouteService {
  private router = inject(Router)

  private userService = inject(UserService)

  toAuth(where: "login" | "sign-up"){
    if(where == 'login') this.router.navigateByUrl("/auth")
    else this.router.navigateByUrl("/auth/sign-up")
  }

  toHub (...params: string[]) {
    this.router.navigate(["hub", ...params])
  }

  toHome() {
    this.router.navigateByUrl("/")
  }

  toProfile (username: string) {
    this.router.navigate([`@${username}`])
  }

  toMyProfile () {  
    this.toProfile(this.userService.MyAccount.username)
  }

  toMeetingHub (meetingId: number) {
    this.router.navigate(['meeting-hub', meetingId])
  }

  toMeetingDetails (meetingId: number) {
    this.router.navigate(['meeting-details', meetingId])
  }
}