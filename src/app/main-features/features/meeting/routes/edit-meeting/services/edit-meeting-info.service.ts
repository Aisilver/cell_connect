import { inject, Injectable } from '@angular/core';
import { CenteredModalService } from 'src/app/general-services/modals-service/centered-modal-service/centered-modal-service';
import { LocalStorageService } from 'src/app/general-services/storage.service';
import { EditMeetingInfoModalComponent } from '../modals/edit-meeting-info-modal/edit-meeting-info-modal.component';

@Injectable({
  providedIn: 'any'
})
export class EditMeetingInfoService {
  private storage = inject(LocalStorageService)

  private C_Modal = inject(CenteredModalService)

  private UserHasOpenedInfoStoreKey = "has-opened-edit-info"

  get UserHasViewdInfo () {
    return this.storage.get<boolean>(this.UserHasOpenedInfoStoreKey)
  }

  viewEditMeeetingInfo () {
    this.C_Modal.Open(EditMeetingInfoModalComponent, undefined, {
      closeableByBackgroundClick: true
    })
  
    this.storage.set(this.UserHasOpenedInfoStoreKey, true)
  }
}
