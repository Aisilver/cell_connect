import { Component, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { SignInCredentials } from '@shared/route-types';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { LoginStagesTypes } from '../../types';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { ApiResponse } from '@shared/common';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';

@Component({
  selector: 'app-login-update-password',
  imports: [
    LoadersComponent, 
    ImageComponent
  ],
  template: `
    <app-loaders class="loader" [initial_hide]="true" [options]="{'four-circles': {size: 100, load_text: 'updating password'}}">
      <section #loadTarget>
        <h3>Password Updated Succesfully.</h3>

        <app-image [inputSrc]="AppVectorImages.SUCCESS_SIGN_UP"></app-image>

        <p>
            Your password has been updated successfully! You caqn now sign in 
            and continue using all available features. 
            Welcome-back we’re glad to have you!
        </p>

        <button class="form-button" (click)="Done()">Sign In</button>
      </section>
    </app-loaders>
  `,
  styleUrl: './login-update-password.component.scss'
})
export class LoginUpdatePasswordComponent implements SlickChildInstance {
  
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  private AuthApiCall = inject(AuthRouteAPICallService)

  AppVectorImages = inject(APP_VECTOR_PATHS)

  PassWordUpdateSuccess = signal(false)

  @ViewChild(LoadersComponent)
  loader!: LoadersComponent

  @Input()
  Credentials!: SignInCredentials

  @Output("toStage")
  private output: EventEmitter<LoginStagesTypes> = new EventEmitter()

  onVisible () {
    this.loader.Load(
      this.AuthApiCall.changeUserPassword(this.Credentials), 
      response => this.OnResponse(response), 
      undefined,
      () => this.OnFail()
    )
  }

  onNotVisible() {
    this.loader.HideTargetElement()
  }

  private OnResponse (response: ApiResponse) {    
    this.AuthApiCall.responseChecker(response, undefined, () => {
      this.OnFail()

      this.AuthApiCall.showError(String(response.errMessage), "password update failed")
    })
  }

  private OnFail () {
    this.output.emit("login-reset-poassword")
  }

  Done() {
    this.output.emit("login-main")
  }
}