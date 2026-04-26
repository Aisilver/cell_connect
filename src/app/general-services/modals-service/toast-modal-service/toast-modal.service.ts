import { inject, Injectable } from '@angular/core';
import { ModalGenerator } from '../classes/modal-generator.class';
import { CurrentModalSnapShot, QueuedModalConfigs } from '../types';
import { ToastModalCreationOptions } from './types';
import { ToastModalEntity } from './classes/toast-entity';
import { TOAST_MODAL_ENTRANCE_ANIMATION_CONFIGS } from './toast-modal-configs';

@Injectable({
  providedIn: 'root'
})
export class ToastModalService extends ModalGenerator {
  protected override wrapperBaseStyleState: gsap.TweenVars = {
    position: "fixed",
    display: "block",
    width: "auto",
    height: "auto",
    zIndex: 9,
  }

  protected override currentModalSnapshot!: CurrentModalSnapShot<ToastModalEntity, ToastModalCreationOptions>;

  protected override queuedModalSnapshots: QueuedModalConfigs<ToastModalCreationOptions>[] = [];

  private toastEntryPositionStyleConfigs = inject(TOAST_MODAL_ENTRANCE_ANIMATION_CONFIGS)

  protected override async entranceAnimation() {
    const {options} = this.currentModalSnapshot,

    {from, to} = this.toastEntryPositionStyleConfigs[options?.positionStyle ?? 'bottom-right'],

    duration = options?.doNotAnimate ? 0 : this.AnimationDuration
  
    this.timeline.fromTo(this.modalWrapper, from, {...to, duration})

    this.timeline.play()
  };
  
  override async Open(comp: any, inputs: any, options?: ToastModalCreationOptions) {
    if(this.InUse) this.queuedModalSnapshots.push({comp, inputs, options})
    else {
      const newToast = this.create_modal<ToastModalEntity>(comp, inputs),

      ToastModalEntity = newToast.instance

      this.currentModalSnapshot = {newCompRef: newToast, options}

      await this.entranceAnimation()

      ToastModalEntity.Init(newToast.location.nativeElement, options?.keepAliveTime ?? 'self-time')

      ToastModalEntity.StartDelayedDestroy()

      if(ToastModalEntity.OnModalInit) await ToastModalEntity.OnModalInit() 
    }
  }
}