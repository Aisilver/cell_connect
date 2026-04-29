import { Component, EventEmitter, Input, Output, signal, ViewChild } from '@angular/core';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { SlickCarouselWrapperComponent } from "src/app/main-features/shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component";
import { AuthEmailVerificationEventTypes, AuthEmailVerificationStageTypes } from './types';
import { AuthEVSendOtpComponent } from './components/auth-e-v-send-otp/auth-e-v-send-otp.component';
import { AuthEVValidateOtpComponent } from './components/auth-e-v-validate-otp/auth-e-v-validate-otp.component';

@Component({
  selector: 'app-auth-email-verification',
  imports: [
    AuthEVSendOtpComponent,
    AuthEVValidateOtpComponent
],
  template: `
    @if(Stage() == 'send-otp'){
      <app-auth-e-v-send-otp class="view" (toStage)="OnToStage($event)" [Email]="UserEmail"></app-auth-e-v-send-otp>
    }@else {
      <app-auth-e-v-validate-otp class="view" (toStage)="OnToStage($event)" [Email]="UserEmail"></app-auth-e-v-validate-otp>
    }
  `,
  styleUrl: './auth-email-verification.component.scss'
})
export class AuthEmailVerificationComponent implements SlickChildInstance {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  Stage = signal<AuthEmailVerificationStageTypes>("send-otp");

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

  private ChangeView (stage: 'verify-otp' | 'send-otp') {
    this.Stage.update(() => stage)
  }

  OnToStage(stage: AuthEmailVerificationStageTypes) {
    switch(stage) {      
      case 'verify-otp': this.ChangeView(stage)
        break
      case 'out-of-email-verification': this.output.emit("not-verified"); this.ChangeView('send-otp');
        break
      case 'email-verified': this.output.emit("verified"); this.ChangeView('send-otp');
        break
      default: this.ChangeView('send-otp'); setTimeout(() => this.sendOtpComp.TriggerOtpSending(), 500);
    }
  }
}