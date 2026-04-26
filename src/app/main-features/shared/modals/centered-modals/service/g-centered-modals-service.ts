import { inject, Injectable } from '@angular/core';
import { UserDialogueComponent } from '../dialogues/user-dialogue/user-dialogue.component';
import { ConfirmDialogueOptions, ConfirmDialogueOutput, UserDialogueOptions } from '../dialogues/types';
import { Observable } from 'rxjs';
import { ModalLoaderComponent } from '../modal-loader/modal-loader.component';
import { ConfirmDialogueComponent } from '../dialogues/confirm-dialogue/confirm-dialogue.component';
import { CenteredModalService } from '../../../../../general-services/modals-service/centered-modal-service/centered-modal-service';
import { LoaderOptions } from '../../../components/loaders/types';
import { DatePickerModalComponent } from '../date-picker-modal/date-picker-modal.component';

@Injectable({
  providedIn: 'any'
})
export class GCenteredModalsService {
  private modalService = inject(CenteredModalService)

  openDialogue(option: UserDialogueOptions, cb?: () => void){
    this.modalService.Open(UserDialogueComponent, {option, cb}, {
      useBottomEntryOnMobileView: true, 
      closeableByBackgroundClick: true
    })
  }

  openConfirmDialogue(option: ConfirmDialogueOptions, cb?: (result: ConfirmDialogueOutput) => void) {
    this.modalService.Open(ConfirmDialogueComponent, {option, cb}, {
      useBottomEntryOnMobileView: true, 
      closeableByBackgroundClick: true
    })
  }
  
  openConfirmDialogueAsync(option: ConfirmDialogueOptions) {
    return new Promise<ConfirmDialogueOutput>((res) => {
      this.openConfirmDialogue(option, result => res(result))
    })
  }

  openLoader<T>(obvs: Observable<T>, options?: LoaderOptions){
    return new Promise<T>((res, rej) => {
      this.modalService.Open(ModalLoaderComponent, {
        obvs,
        options,
        "on_success": (data: T) => res(data),
        "on_fail": (err: any) => rej(err)
      }, {doNotAnimate: true, doNotBlurBackground: true})
    })
  }

  openDatePickerModal (viewDate: Date) {
    return new Promise<Date>((res, rej) => {
      this.modalService.Open(DatePickerModalComponent, {
        "view-date": viewDate,
        "cb": (date: Date) => res(date)
      }, {
        useBottomEntryOnMobileView: true, 
        closeableByBackgroundClick: true
      })
    })
  }
}