import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../general-services/user-service';
import { MainFeaturesRouteService } from '../main-features/services/main-features-route.service';
import { GCenteredModalsService } from '../main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { AuthRouteAPICallService } from '../server/route-services/auth-route/auth-route-api-call.service';
import { AuthService } from '../main-features/features/auth/services/auth.service';
import { SessionStorageService } from '../general-services/storage.service';

export const autoLoginGuard: CanActivateFn = async (route, state) => {
  let result!: boolean, isApiError = false

  const userService = inject(UserService),

  authService = inject(AuthService),

  AuthApiCall = inject(AuthRouteAPICallService),

  featureRouteService = inject(MainFeaturesRouteService),

  GC_Modal = inject(GCenteredModalsService),

  storage = inject(SessionStorageService)

  try {
    if(userService.loggedIn()) {
      const {valid, msg} = UserIsLoggedInGuard(userService)

      result = valid

      if(msg) throw Error(msg)
    }else {
      const response = await GC_Modal.openLoader(AuthApiCall.initUser(), {"four-circles": {color_theme: "black"}})

      result = AuthApiCall.responseChecker(response)

      if(!result) {
        isApiError = true

        authService.setAutoAuthLoginState("failed")

        throw Error(response.errMessage)
      }

      authService.runSignInProcess(response.data)
    }

  } catch {
    result = false


  } finally {
    if(result) authService.setAutoAuthLoginState("successful")
    
    else featureRouteService.toAuth("login")

    return result
  } 
};


function UserIsLoggedInGuard (userService: UserService): {valid: boolean, msg?: string}{
  let data = {
    valid: true,
    msg: undefined
  }

  try {
    const {suspension} = userService.MyAccount

    if(!suspension) return data
    else {
      const dateString = new Date(suspension.endDate).toLocaleTimeString("default", {dateStyle: "long"})

      throw Error(`account is currently suspended till [${dateString}]`)
    }

  } catch (error: any) {
    data = {
      valid: false,
      msg: error.message
    }
  } finally {
    return data
  }
}