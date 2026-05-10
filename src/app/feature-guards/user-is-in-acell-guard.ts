import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from '../general-services/user-service';
import { GCenteredModalsService } from '../main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { AppMainService } from '../general-services/app-main.service';

export const userIsInACellGuard: CanActivateFn = (route, state) => {
  const GC_Modal = inject(GCenteredModalsService),

  userService = inject(UserService),

  appMainService = inject(AppMainService),

  {MyCell} = userService

  if(!MyCell) {
    GC_Modal.openDialogue({
      message: "you need to part of a cell to access this page."
    }, 
    
    () => appMainService.routeBack("hub"))

    return false
  }

  return true;
};
