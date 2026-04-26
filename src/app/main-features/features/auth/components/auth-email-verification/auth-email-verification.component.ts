import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { SlickCarouselWrapperComponent } from "src/app/main-features/shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component";
import { AuthEmailVerificationEventTypes, AuthEmailVerificationStageTypes } from './types';
import { AuthEVSendOtpComponent } from './components/auth-e-v-send-otp/auth-e-v-send-otp.component';
import { AuthEVValidateOtpComponent } from './components/auth-e-v-validate-otp/auth-e-v-validate-otp.component';

@Component({
  selector: 'app-auth-email-verification',
  imports: [
    SlickCarouselWrapperComponent,
    AuthEVSendOtpComponent,
    AuthEVValidateOtpComponent
],
  template: `
    <app-slick-carousel-wrapper [options]="{swipe: false, draggable: false}">
      <ng-template #slick_temp>
        <app-auth-e-v-send-otp (toStage)="OnToStage($event)" [Email]="UserEmail" #slick_item></app-auth-e-v-send-otp>
      </ng-template>

      <ng-template #slick_temp>
        <app-auth-e-v-validate-otp #slick_item (toStage)="OnToStage($event)" [Email]="UserEmail"></app-auth-e-v-validate-otp>
      </ng-template>
    </app-slick-carousel-wrapper>
  `,
  styleUrl: './auth-email-verification.component.scss'
})
export class AuthEmailVerificationComponent implements SlickChildInstance {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  declare Stage: AuthEmailVerificationStageTypes;

  @Input()
  UserEmail?: string

  @ViewChild(SlickCarouselWrapperComponent)
  private slickComp!: SlickCarouselWrapperComponent

  @ViewChild(AuthEVSendOtpComponent)
  sendOtpComp!: AuthEVSendOtpComponent

  @Output("events")
  private output: EventEmitter<AuthEmailVerificationEventTypes> = new EventEmitter()

  beforeVisible() {
    this.slickComp.Revap()
  }

  onVisible( ) {    
    this.sendOtpComp.TriggerOtpSending()
  }

  OnToStage(stage: AuthEmailVerificationStageTypes) {
    switch(stage) {      
      case 'verify-otp': this.slickComp.Slick.slickGoTo(1)
        break
      case 'out-of-email-verification': this.output.emit("not-verified"); this.slickComp.Slick.slickGoTo(0);
        break
      case 'email-verified': this.output.emit("verified"); this.slickComp.Slick.slickGoTo(0);
        break
      default: this.slickComp.Slick.slickGoTo(0); setTimeout(() => this.sendOtpComp.TriggerOtpSending(), 500);
    }
  }
}