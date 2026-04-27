import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SlickCarouselWrapperComponent } from "src/app/main-features/shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component";
import { SignUpMainComponent } from "./components/sign-up-main/sign-up-main.component";
import { USER_MODEL } from 'src/app/models/user-model/user.model';
import { SignUpStagesTypes } from './types';
import { AuthService } from '../../services/auth.service';
import { SignUpBioComponent } from "./components/sign-up-bio/sign-up-bio.component";
import { SIgnUpLocationComponent } from "./components/sign-up-location/sign-up-location.component";
import { FinishSignUpComponent } from "./components/finish-sign-up/finish-sign-up.component";
import { AuthEmailVerificationComponent } from '../../components/auth-email-verification/auth-email-verification.component';
import { AuthEmailVerificationEventTypes } from '../../components/auth-email-verification/types';
import { AuthSharedHeaderComponent } from "../../components/auth-shared-header/auth-shared-header.component";
import { APP_LOCATION_MODEL } from 'src/app/models/app-location-model/app-location-model';
import { ACCOUNT_MODEL } from 'src/app/models/account-model/account-model';
import { UserCreationRequest } from '@shared/route-types';
import { AppLocation, User, UserAccount } from '@shared/entities';
import { AuthPasswordSetComponent } from "../../components/auth-password-set/auth-password-set.component";

@Component({
  selector: 'app-sign-up',
  imports: [
    SlickCarouselWrapperComponent,
    SignUpMainComponent,
    SignUpBioComponent,
    SIgnUpLocationComponent,
    AuthEmailVerificationComponent,
    FinishSignUpComponent,
    AuthSharedHeaderComponent,
    AuthPasswordSetComponent
],
  template: `
    <app-auth-shared-header></app-auth-shared-header>

    <app-slick-carousel-wrapper [options]="{draggable: false, swipe: false}" class="carousel">

      <ng-template #slick_temp>
        <app-sign-up-main #slick_item [NewUser]="User" (toStage)="OnStageChange($event)"></app-sign-up-main>
      </ng-template>

      <ng-template #slick_temp>
        <app-sign-up-location #slick_item [NewLocation]="Location" (toStage)="OnStageChange($event)"></app-sign-up-location>
      </ng-template>

      <ng-template #slick_temp>
        <app-auth-email-verification #slick_item [UserEmail]="User.email" (events)="OnEmailValidationEvents($event)"></app-auth-email-verification>
      </ng-template>

      <ng-template #slick_temp>
        <app-sign-up-bio #slick_item [NewUser]="User" [NewAccount]="Account" (toStage)="OnStageChange($event)" (profileImageRef)="UserCreationData.accountImageRef = $event"></app-sign-up-bio>
      </ng-template>

      <ng-template #slick_temp>
        <app-auth-password-set #slick_item HeaderText="Set Password" (canceled)="OnStageChange('sign-up-bio')" (password)="OnPassword($event)"></app-auth-password-set>
      </ng-template>

      <ng-template #slick_temp>
        <app-finish-sign-up #slick_item [UserCreationData]="UserCreationData"></app-finish-sign-up>
      </ng-template>

    </app-slick-carousel-wrapper>
  `,
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  private authService = inject(AuthService)

  declare ProfileImageMediaRef: string

  declare UserCreationData: UserCreationRequest

  private accountModel = inject(ACCOUNT_MODEL)

  private locationModel = inject(APP_LOCATION_MODEL)

  private userModel = inject(USER_MODEL)

  declare User: User

  declare Account: UserAccount

  declare Location: AppLocation

  @ViewChild(SlickCarouselWrapperComponent)
  private carousel?: SlickCarouselWrapperComponent

  ngOnInit () {
    this.User = this.userModel.getModel()

    this.Account = this.accountModel.getModel()

    this.Location = this.locationModel.getModel()
  }

  OnProfileImageRef(ref: string) {
    this.ProfileImageMediaRef = ref
  }

  OnEmailValidationEvents(ev: AuthEmailVerificationEventTypes) {
    switch(ev) {
      case 'verified': {
        this.authService.setEmailVerified()

        this.OnStageChange('sign-up-bio')
      } break
      case 'not-verified': this.OnStageChange("sign-up-location")
        break
    }
  }

  OnPassword (password: string) {
    this.UserCreationData = {
      account: {
        ...this.Account,
        
        user: {
          ...this.User,
          password,
          location: this.Location
        }
      },
      accountImageRef: this.ProfileImageMediaRef
    }

    this.OnStageChange("finish-sign-up")
  }

  OnStageChange(stageTypes: SignUpStagesTypes){
    switch(stageTypes){
      case 'sign-up-bio': this.carousel?.Slick.slickGoTo(3);
        break
      case 'sign-up-location': this.authService.triggerAuthProgress(); this.carousel?.Slick.slickGoTo(1);
        break
      case 'sign-up-email-verification': this.carousel?.Slick.slickGoTo(2);
        break
      case 'sign-up-password-set': this.carousel?.Slick.slickGoTo(4);
        break
      case 'finish-sign-up': this.carousel?.Slick.slickGoTo(5);
        break
      default: this.authService.triggerAuthPaused(); this.carousel?.Slick.slickGoTo(0);
    }
  }
}