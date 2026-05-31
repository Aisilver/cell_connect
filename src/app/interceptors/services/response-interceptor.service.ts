import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { AuthService } from 'src/app/main-features/features/auth/services/auth.service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';

@Injectable({
  providedIn: 'any'
})
export class ResponseInterceptorService {
  private AuthApiCall = inject(AuthRouteAPICallService)

  private authService = inject(AuthService)

  private featureRouteService = inject(MainFeaturesRouteService)

  private GC_Modal = inject(GCenteredModalsService)

  private appMainService = inject(AppMainService) 

  async refreshAppAccessToken () {
    const response = await firstValueFrom(this.AuthApiCall.getRefreshAccessToken())

    if(!this.AuthApiCall.responseChecker(response)) throw Error()

    const {data} = response

    this.authService.setAccesToken(data)
  }

  async askForRetry() {
    const {answer} = await this.GC_Modal.openConfirmDialogueAsync({
      title: "do you want to try to re-establish connection now?",
      message: `an unexpected problem has occured while communicating with the ${this.appMainService.Title} server.`,
      type: 'alert',
      buttonConfig: {
        noButton: {
          text: "cancel"
        },
        yesButton: {
          text: "retry"
        }
      }
    })

    if(!answer) throw Error()
  }

  logout () {
    this.featureRouteService.toHome()
  }
}
