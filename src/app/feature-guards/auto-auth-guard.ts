import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../general-services/user-service';
import { MainFeaturesRouteService } from '../main-features/services/main-features-route.service';
import { GCenteredModalsService } from '../main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { AuthRouteAPICallService } from '../server/route-services/auth-route/auth-route-api-call.service';
import { AuthService } from '../main-features/features/auth/services/auth.service';

export const autoAuthGuard: CanActivateFn = async (route, state) => {
  let result = false, sendUserToHomePage = false

  const userService = inject(UserService),

  authService = inject(AuthService),

  AuthApiCall = inject(AuthRouteAPICallService),

  featureRouteService = inject(MainFeaturesRouteService),

  GC_Modal = inject(GCenteredModalsService)

  try {
    if(userService.loggedIn()) return UserIsLoggedInGuard(userService)

    const response = await GC_Modal.openLoader(AuthApiCall.initUser(), {"four-circles": {color_theme: "black"}}),

    isOk = AuthApiCall.responseChecker(response)
        
    if(!isOk) throw Error()

    authService.runSignInProcess(response.data)

    result = true
  } catch (error: any) {

    if(error.message)
      GC_Modal.openDialogue({
        type: "alert",
        message: error.message
      })

    if(sendUserToHomePage)
      featureRouteService.toHome()
    else 
      featureRouteService.toAuth("login")
  
  } finally {
    return result
  } 
};


function UserIsLoggedInGuard (userService: UserService) {
  let result = false

    const {suspension} = userService.MyAccount
  
    if(suspension) {
      const dateString = new Date(suspension.endDate).toLocaleTimeString("default", {
        dateStyle: "long"
      })

      throw Error(`account is currently suspended till [${dateString}]`)
    }

    result = true

  return result
}