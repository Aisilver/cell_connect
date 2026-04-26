import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { AuthSlidesService } from '../services/auth-slides.service';

let subs!: Subscription

export const getAuthPageSlidesGuard: CanActivateFn = async (route, state) => {
  const service = inject(AuthSlidesService)
  
  subs = service.$getAuthSlides.subscribe()

  subs.unsubscribe()
  
  return true;
};
