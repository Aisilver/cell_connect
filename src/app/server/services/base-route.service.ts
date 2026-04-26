import { inject, Injectable } from '@angular/core';
import { HttpCallService } from './http-call';
import { ApiResponse } from '@shared/common';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseRouteService {
  protected abstract route_base: string

  protected httpService = inject(HttpCallService)

  private GCModal = inject(GCenteredModalsService)

  responseChecker<T>(res: ApiResponse<T>, onsuccess?: (data: T) => void, onfail?: (res: ApiResponse) => void) {
    const {status, data} = res

    if(status == 'success'){
      if(onsuccess) onsuccess(data)
        
    } else if(onfail) onfail(res)

    return status == 'success'
  }

  showError(message: string, title?: string, cb?: () => void) {
    this.GCModal.openDialogue({
      message,
      title,
      type: "alert"
    }, cb)
  }
}