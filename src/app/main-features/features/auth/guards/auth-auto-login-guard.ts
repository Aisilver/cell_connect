import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/general-services/user-service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';
import { AuthService } from '../services/auth.service';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { firstValueFrom } from 'rxjs';
export const authAutoLoginGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService),

  featureRouter = inject(MainFeaturesRouteService),

  authService = inject(AuthService),

  AuthApiCall = inject(AuthRouteAPICallService)

  switch(authService.getAutoAuthLoginState()) {
    case 'successful': {
      featureRouter.toHub()

      return false
    } 
    case 'neutral': {
      try {
        const {status, data} = await firstValueFrom(AuthApiCall.initUser())

        if(status == "success") {
          authService.runSignInProcess(data)

          featureRouter.toHub()
        }

        return status == "failed"
      } catch (error: any) {
        return true
      }
    }

    default: return true
  }
};
