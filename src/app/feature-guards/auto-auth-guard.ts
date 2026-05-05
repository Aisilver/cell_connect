import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../general-services/user-service';
import { MainFeaturesRouteService } from '../main-features/services/main-features-route.service';
import { GCenteredModalsService } from '../main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { AuthRouteAPICallService } from '../server/route-services/auth-route/auth-route-api-call.service';
import { AuthService } from '../main-features/features/auth/services/auth.service';

export const autoAuthGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService),

  authService = inject(AuthService),

  AuthApiCall = inject(AuthRouteAPICallService),

  featureRouteService = inject(MainFeaturesRouteService),

  GC_Modal = inject(GCenteredModalsService)

  try {
    if(userService.loggedIn()) return true

    const response = await GC_Modal.openLoader(AuthApiCall.initUser(), {"four-circles": {color_theme: "black"}}),

    isOk = AuthApiCall.responseChecker(response)
        
    if(!isOk) throw Error()

    authService.runSignInProcess(response.data)

    return true
  } catch  {
    featureRouteService.toAuth("login")

    return false
  }
};
