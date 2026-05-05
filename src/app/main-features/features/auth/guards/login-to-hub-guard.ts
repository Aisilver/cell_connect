import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from 'src/app/general-services/user-service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';

export const loginToHubGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService),

  featureRouter = inject(MainFeaturesRouteService),

  isSignUpRoute = state.url.split("/")[2]

  if(!isSignUpRoute && userService.loggedIn()) {
    
    featureRouter.toHub()

    return false
  }

  return true;
};
