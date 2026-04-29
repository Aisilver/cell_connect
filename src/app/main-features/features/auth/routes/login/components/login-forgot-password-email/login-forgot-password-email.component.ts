import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { InputFieldDecoratorComponent } from "src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component";
import { EmailValidatorDirective } from "src/app/main-features/shared/directives/email-validator.directive";
import { APP_REGEXS } from 'src/app/configurations/app-regexs/app-regexs.confguration';
import { FormErrorMessageComponent } from "src/app/main-features/shared/components/form-error-message/form-error-message.component";
import { LoginStagesTypes } from '../../types';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { MessageComponent } from "src/app/main-features/shared/components/message/message.component";
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { SignInCredentials } from '@shared/route-types';

@Component({
  selector: 'app-login-forgot-password-email',
  imports: [
    CommonModule,
    FormsModule,
    InputFieldDecoratorComponent,
    EmailValidatorDirective,
    FormErrorMessageComponent,
    IconComponent,
    LoadersComponent,
    MessageComponent
],
  template: `
    <form #form="ngForm" (ngSubmit)="RunValidation()">
      <nav>
        <app-icon (click)="Back()" name="chevron-left"></app-icon>
      </nav>

      <header>
        <h3>Your Email</h3>
        <p>Enter the email you used to register with us.</p>
      </header>

      <img [src]="AppVectorPaths.FORGOT_PASSWORD_BANNER" alt="">

      <main>
        <app-message></app-message>

        <label>
          <app-input-field-decorator [model]="emailFieldModel">
            <input 
              type="email"
              name="email"
              [DoNotRunEmailExistsCheck]="true"
              appEmailValidator
              required
              placeholder="Enter Email"
              #textField
              [(ngModel)]="Credentials.email"
              #emailFieldModel="ngModel"
              [disabled]="Validating()">
          </app-input-field-decorator>
          
          <app-form-error-message *ngIf="emailFieldModel.dirty && emailFieldModel.errors?.['required']">This field cannot be empty</app-form-error-message>
          
          <app-form-error-message *ngIf="emailFieldModel.errors?.['invalidEmailFormat']">Invalid email formart, Enter a valid email</app-form-error-message>                    
        </label>

        <app-loaders class="button-loader">
            <div #loadTarget>
                <input type="submit"[disabled]="form.invalid" value="Verify">
            </div>
        </app-loaders>
      </main>
    </form>
  `,
  styleUrl: './login-forgot-password-email.component.scss'
})
export class LoginForgotPasswordEmailComponent implements SlickChildInstance {
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  private AuthApiCall = inject(AuthRouteAPICallService)

  private App_Regex = inject(APP_REGEXS)

  AppVectorPaths = inject(APP_VECTOR_PATHS)

  Validating = signal(false)

  private EmailValidated = signal(false)

  @Input()
  Credentials!: SignInCredentials

  @ViewChild(InputFieldDecoratorComponent)
  inputFieldComponent!: InputFieldDecoratorComponent

  @ViewChild(MessageComponent)
  messager!: MessageComponent

  @ViewChild("emailFieldModel")
  emailModel!: NgModel

  @ViewChild(LoadersComponent)
  loader!: LoadersComponent

  @Output("toStage")
  private output: EventEmitter<LoginStagesTypes> = new EventEmitter()

  onVisible () {    
    this.inputFieldComponent.TriggerHasValueEffect(true)
  }

  async RunValidation () {
    this.Validating.update(() => true)

    try {
      const {status, errMessage, data} = await this.loader.LoadAsync(this.AuthApiCall.verifyEmail(this.Credentials.email), {
        gradient: {
          load_text: "verifing",
          type: "coloured"
        }
      })
      
      if(status == "failed") {
        this.messager.showMessage(`Error: ${errMessage}`, true)
      }else {
        const {inUse} = data

        if(inUse) {
          this.EmailValidated.update(() => true)

          this.output.emit("login-email-verification")
        
        } else this.messager.showMessage("there is no account that is using this email")
        
      }

    } catch {
      this.messager.showMessage("email verification failed", true)
    } finally {
      this.Validating.update(() => false)
    }
  }

  Back () {
    this.output.emit("login-main")
  }
}