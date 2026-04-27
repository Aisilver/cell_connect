import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { UserCreationRequest } from '@shared/route-types';
import { ApiResponse } from '@shared/common';
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-finish-sign-up',
  imports: [LoadersComponent, ImageComponent],
  templateUrl: './finish-sign-up.component.html',
  styleUrl: './finish-sign-up.component.scss'
})
export class FinishSignUpComponent implements SlickChildInstance {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  private authService = inject(AuthService)

  private AuthApiCall = inject(AuthRouteAPICallService)

  AppVectorImages = inject(APP_VECTOR_PATHS)

  UserCreatonState = signal<"fail" | "unkown" | "success">("unkown")

  ErrorMessage = signal<string | null>(null) 

  @Input()
  UserCreationData!: UserCreationRequest

  @ViewChild(LoadersComponent)
  loader!: LoadersComponent

  onVisible = () => setTimeout(() => this.createAccount(), 300);

  async createAccount() {
    const observable = this.AuthApiCall.createAccount(this.UserCreationData)

    try {
      const response = await this.loader.LoadAsync(observable)
      
      this.onResponse(response)
    } catch {
      this.onFail()
    }
  }

  Done() {
    this.authService.triggerAuthRouteChangeAnimation()
  }

  private onResponse (res: ApiResponse) {    
    this.AuthApiCall.responseChecker(res, () => {
      this.UserCreatonState.update(() => "success")
    }, () => {
      this.onFail()
      this.ErrorMessage.update(() => res.errMessage ?? null)
    })
  }

  private onFail () {
    this.UserCreatonState.update(() => "fail")
  }
}