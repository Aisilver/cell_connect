import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { ApiResponse } from '@shared/common';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { AuthEmailVerificationStageTypes } from '../../types';
import { NgClass } from '@angular/common';
import { AuthEmailVerificationService } from '../../services/auth-email-verification.service';

@Component({
  selector: 'app-auth-e-v-send-otp',
  imports: [
    NgClass,
    LoadersComponent
  ],
  template: `
    <main>
      <app-loaders #loader [options]="{'four-circles': {size: 100}}">
        <section #loadTarget>
          <img [src]="">
        </section>
      </app-loaders>

      <p>Sending One Time Password to:</p>

      <b>{{Email}}</b>

      <div>
        <button [ngClass]="{disabled: loader.Loading()}" (click)="TriggerOtpSending()">Retry</button>

        <button (click)="Cancel()">Cancel</button>
      </div>
    </main>
  `,
  styleUrl: './auth-e-v-send-otp.component.scss'
})
export class AuthEVSendOtpComponent implements SlickChildInstance {
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  private AuthApiCall = inject(AuthRouteAPICallService)

  private service = inject(AuthEmailVerificationService)

  @Input()
  Email?: string

  @ViewChild(LoadersComponent)
  private loader!: LoadersComponent

  @Output("toStage")
  private output: EventEmitter<AuthEmailVerificationStageTypes> = new EventEmitter() 

  async TriggerOtpSending() {
    if(!this.Email) return

    this.loader.Load(this.AuthApiCall.sendOtp(this.Email), data => this.OnResponse(data))
  }

  Cancel(){
    this.loader.CancelLoad()

    this.output.emit("out-of-email-verification")
  }
 
  private OnResponse (response: ApiResponse<string>){    
    this.AuthApiCall.responseChecker(response, data => {
      this.service.setOtpReference(data)

      if(!response.message)
        this.output.emit("verify-otp")
      else {
        this.AuthApiCall.showError(response.message, undefined, () => this.output.emit("verify-otp"))
      }
    }, () => this.output.emit("out-of-email-verification"))
  }
}