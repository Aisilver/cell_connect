import { inject, Injectable } from '@angular/core';
import { ModalGenerator } from '../classes/modal-generator.class';
import { ModalEntity } from '../classes/modal-entity.class';
import { CurrentModalSnapShot, QueuedModalConfigs } from '../types';
import { CENTERED_MODAL_ENTRY_CONFIGURATIION } from './centered-modal-configs';
import { CenteredModalCreationOptions, CenteredModalEntryTypes } from './types';
import { AppMainService } from '../../app-main.service';

@Injectable({
  providedIn: 'root'
})
export class CenteredModalService extends ModalGenerator {
  protected override currentModalSnapshot!: CurrentModalSnapShot<ModalEntity, CenteredModalCreationOptions>;

  protected override queuedModalSnapshots: QueuedModalConfigs<CenteredModalCreationOptions>[] = []

  protected override wrapperBaseStyleState: gsap.TweenVars = {
    position: 'fixed',
    display: 'none',
    width: '100dvw',
    height: '100dvh',
    pointerEvents: 'none',
    backgroundColor: 'rgb(0, 0, 0, 0)',
    backdropFilter: 'blur(0px)',
    zIndex: 10
  }

  private endWrapperStyleState: gsap.TweenVars = {
    pointerEvents: 'all',
    display: 'block',
    backgroundColor: 'rgb(0, 0, 0, .1)',
    backdropFilter: 'blur(2px)'
  }

  private appMainService = inject(AppMainService)

  private ModalEntryConfiguration = inject(CENTERED_MODAL_ENTRY_CONFIGURATIION)

  override async Open<Option = unknown>(comp: any, inputs: Option, options?: CenteredModalCreationOptions) {
    if(this.InUse) this.queuedModalSnapshots.push({comp, inputs, options})
    else {
      const newModal = this.create_modal<ModalEntity>(comp, inputs),

      modalEntity = newModal.instance

      this.currentModalSnapshot = {newCompRef: newModal, options}

      await this.entranceAnimation()

      if(modalEntity.OnModalInit) await modalEntity.OnModalInit()
    }
  }

  protected override async entranceAnimation () {
    if(!this.currentModalSnapshot) throw Error()

    const {options: opt, newCompRef} = this.currentModalSnapshot,
    
    {nativeElement: newCompElement} = newCompRef.location,

    entryType: CenteredModalEntryTypes = opt?.useBottomEntryOnMobileView ? (this.appMainService.isMobileView() ? 'bottom' :  opt?.entryType ?? 'center') : opt?.entryType ?? 'center',

    {from, to} = this.ModalEntryConfiguration[entryType],
 
    wrapperDuration = (opt?.doNotBlurBackground || opt?.doNotAnimate) ? undefined : this.AnimationDuration,

    modalDuration = opt?.doNotAnimate ? undefined : this.AnimationDuration,

    endWrapperState: gsap.TweenVars = opt?.doNotBlurBackground ? {pointerEvents: "all"} : this.endWrapperStyleState

    if(entryType == 'bottom') (newCompElement as HTMLElement).classList.add('modal-from-bottom')

    if(opt?.closeableByBackgroundClick) this.modalWrapper.addEventListener("click", (e => {
      if(e.target == e.currentTarget) newCompRef.instance.Destroy()
    }))

    this.timeline
    .fromTo(this.modalWrapper, this.wrapperBaseStyleState, {...endWrapperState, duration: wrapperDuration})
    .fromTo(newCompElement, from, {...to, duration: modalDuration}, "-=.1")
  
    await this.timeline.play()
  }
}