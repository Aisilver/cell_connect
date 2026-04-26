import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, Output, signal, ViewChild } from '@angular/core';
import { BoxedInputsComponent } from "src/app/main-features/shared/components/boxed-inputs/boxed-inputs.component";
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { CommonModule } from '@angular/common';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { AppMainService } from 'src/app/general-services/app-main.service';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { AuthEmailVerificationStageTypes } from '../../types';
import { MessageComponent } from "src/app/main-features/shared/components/message/message.component";
import { TimeLeftComponent } from "src/app/main-features/shared/components/time-left/time-left.component";
import { addMinutes } from 'date-fns';
import { AuthEmailVerificationService } from '../../services/auth-email-verification.service';

@Component({
  selector: 'app-auth-e-v-validate-otp',
  imports: [
    CommonModule,
    BoxedInputsComponent,
    IconComponent,
    MessageComponent,
    TimeLeftComponent
],
  template: `
    <main>
      <app-icon [ngClass]="{disabled: OtpResendBufferTIme()}" (click)="OutOfEmailVerification()" name="arrow-left"></app-icon>

      <h3>Verify One Time Password</h3>

      <app-message></app-message>

      <p>A six digit passcode has been sent to "{{Email}}"</p>

      <app-boxed-inputs [inputCount]="6" [size]="BoxSize()" (result)="OnBoxedInputResult($event)"></app-boxed-inputs>

      <div [ngClass]="{active: Verifying()}">
        <p>Verifiying Code...</p>
        <app-icon name="spinner"></app-icon>
      </div>

      <p>Didn't receive code? <span [ngClass]="{disabled: OtpResendBufferTIme()}" (click)="Resend()">Resend code</span></p>

      <p *ngIf="OtpResendBufferTIme()" >Resend in: <app-time-left [InputedTargetTime]="OtpResendBufferTIme()" (timeReached)="OnTimeOutReached()"></app-time-left></p>
    </main>
  `
  ,
  styleUrl: './auth-e-v-validate-otp.component.scss'
})
export class AuthEVValidateOtpComponent implements SlickChildInstance, AfterViewInit {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  private appSerivice = inject(AppMainService)

  private AuthApiCall = inject(AuthRouteAPICallService)

  private service = inject(AuthEmailVerificationService)

  @Input()
  Email?: string

  @ViewChild(BoxedInputsComponent)
  boxedInput!: BoxedInputsComponent

  @ViewChild(LoadersComponent)
  loader!: LoadersComponent

  @ViewChild(MessageComponent)
  messagerComp!: MessageComponent

  @Output("toStage")
  private output: EventEmitter<AuthEmailVerificationStageTypes> = new EventEmitter()

  Verifying = signal(false)

  BoxSize = signal<number | null>(null)

  OtpResendBufferTIme = signal<null | Date>(null)

  ngAfterViewInit(): void {
    this.BoxSize.update(() => this.appSerivice.isMobileView() ? 20 : null)
  }

  onVisible () {
    this.boxedInput.initialze()
  }

  onNotVisible () {
    this.boxedInput.reset()
  }

  OutOfEmailVerification () {
    this.output.emit("out-of-email-verification")
  }

  Resend() {
    this.OtpResendBufferTIme.update(() => addMinutes(new Date(), 2))

    this.output.emit("send-otp")
  }

  OnTimeOutReached () {
    this.OtpResendBufferTIme.update(() => null)
  }

  async OnBoxedInputResult(result: string) {
    const ref = this.service.getOtpReference()
    
    this.Verifying.update( () => true)

    try {
      const response = await ObservableToPromise(this.AuthApiCall.verifyOtp(ref, result))

      this.AuthApiCall.responseChecker(response, data => {
        const {valid} = data

        if(valid) this.output.emit("email-verified")
        
        else  this.messagerComp.showMessage("Incorrect code entered", true)

      }, res => {
        this.messagerComp.showMessage(String(res.errMessage), true)
      })

    } catch {
      this.output.emit("out-of-email-verification")
    }
    finally{
      this.Verifying.update(() => false)
      this.boxedInput.reset()
    }

  }
}