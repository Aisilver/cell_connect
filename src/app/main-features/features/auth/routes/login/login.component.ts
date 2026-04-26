import { Component, inject, OnDestroy, ViewChild } from '@angular/core';
import { AuthSharedHeaderComponent } from "../../components/auth-shared-header/auth-shared-header.component";
import { SlickCarouselWrapperComponent } from "src/app/main-features/shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component";
import { LoginMainComponent } from "./components/login-main/login-main.component";
import { LoginStagesTypes } from './types';
import { SignInCredentials } from '@shared/route-types';
import { LoginForgotPasswordEmailComponent } from "./components/login-forgot-password-email/login-forgot-password-email.component";
import { AuthEmailVerificationComponent } from "../../components/auth-email-verification/auth-email-verification.component";
import { AuthEmailVerificationEventTypes } from '../../components/auth-email-verification/types';
import { AuthService } from '../../services/auth.service';
import { AuthPasswordSetComponent } from "../../components/auth-password-set/auth-password-set.component";
import { LoginUpdatePasswordComponent } from "./components/login-update-password/login-update-password.component";

@Component({
  selector: 'app-login',
  imports: [
    AuthSharedHeaderComponent,
    SlickCarouselWrapperComponent,
    LoginMainComponent,
    LoginForgotPasswordEmailComponent,
    AuthEmailVerificationComponent,
    AuthPasswordSetComponent,
    LoginUpdatePasswordComponent
],
  template: `
    <app-auth-shared-header></app-auth-shared-header>

    <app-slick-carousel-wrapper [options]="{draggable: false, swipe: false}">
      <ng-template #slick_temp>
        <app-login-main #slick_item [credentials]="Cred" (toStage)="onStage($event)"></app-login-main>
      </ng-template>

      <ng-template #slick_temp>
        <app-login-forgot-password-email #slick_item [Credentials]="Cred" (toStage)="onStage($event)"></app-login-forgot-password-email>
      </ng-template>

      <ng-template #slick_temp>
        <app-auth-email-verification #slick_item [UserEmail]="Cred.email" (events)="onEmailVerificationEvents($event)"></app-auth-email-verification>
      </ng-template>

      <ng-template #slick_temp>
        <app-auth-password-set #slick_item HeaderText="Reset Password" (canceled)="onStage('login-main')" (password)="onPassword($event)"></app-auth-password-set>
      </ng-template>

      <ng-template #slick_temp>
        <app-login-update-password #slick_item [Credentials]="Cred" (toStage)="onStage($event)"></app-login-update-password>
      </ng-template>
    </app-slick-carousel-wrapper>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnDestroy {
  private authService = inject(AuthService)

  Cred: SignInCredentials = {
    email: "",
    password: ""
  }

  @ViewChild(SlickCarouselWrapperComponent)
  carousel!: SlickCarouselWrapperComponent

  onEmailVerificationEvents(event: AuthEmailVerificationEventTypes) {
    switch (event) {
      case 'verified': this.onStage("login-reset-poassword")
        break
      case 'not-verified': this.onStage("login-main")
        break
    }
  }

  onPassword (passord: string) {
    this.Cred.password = passord

    this.onStage("login-update-password")
  }

  onStage(stage: LoginStagesTypes) {
    switch(stage){
      case 'login-forgot-password-email': this.authService.triggerAuthProgress(); this.carousel.Slick.slickGoTo(1)
        break
      case 'login-email-verification': this.carousel.Slick.slickGoTo(2);
        break
      case 'login-reset-poassword': this.carousel.Slick.slickGoTo(3)
        break
      case 'login-update-password': this.carousel.Slick.slickGoTo(4)
        break
      default: this.Cred.password = ""; this.authService.triggerAuthPaused(); this.carousel.Slick.slickGoTo(0)
    }
  }

  ngOnDestroy(): void {
    this.authService.reset()
  }
}