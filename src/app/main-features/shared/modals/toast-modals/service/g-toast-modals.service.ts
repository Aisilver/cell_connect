import { inject, Injectable } from '@angular/core';
import { ToastMessageComponent } from '../toast-message/toast-message.component';
import { ToastModalService } from '../../../../../general-services/modals-service/toast-modal-service/toast-modal.service';

@Injectable({
  providedIn: 'any'
})
export class GToastModalsService {
  private toast_modal_service = inject(ToastModalService)
  
  toastMessage(message: string){
    this.toast_modal_service.Open(ToastMessageComponent, {message}, {
      positionStyle: "bottom-center", 
      doNotAnimate: true,
      keepAliveTime: 'short'
    })
  }
}