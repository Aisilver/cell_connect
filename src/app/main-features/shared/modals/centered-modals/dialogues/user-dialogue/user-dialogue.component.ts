import { AfterViewInit, Component, ElementRef, inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { UserDialogueOptions } from '../types';
import { CommonModule } from '@angular/common';
import { ModalEntity } from '../../../../../../general-services/modals-service/classes/modal-entity.class';
import { ModalGenerator } from '../../../../../../general-services/modals-service/classes/modal-generator.class';

@Component({
  selector: 'app-user-dialogue',
  imports: [
    CommonModule
],
  template: `
    <h3>{{Options?.title ?? Options?.type | titlecase}}</h3>

    <section>
      <p>{{Options?.message}}</p>
    </section>

    <button (click)="Action()">{{Options?.buttonConfig?.text ?? 'Ok' | titlecase}}</button>
  `,
  styleUrl: "../dialogues-shared-styles.scss"
})
export class UserDialogueComponent extends ModalEntity implements AfterViewInit, OnDestroy {
  @Input('modal-service')
  protected override modalgenerator!: ModalGenerator;

  @Input('option')
  Options?: UserDialogueOptions

  @Input('cb')
  callback?: () => void

  private render = inject(Renderer2)

  private HasClickedOnButton = false

  constructor (private compElement: ElementRef){super()}

  ngAfterViewInit(): void {
    this.render.addClass(this.compElement.nativeElement, `${this.Options?.type ?? 'message'}`)
  }

  Action () {
    this.HasClickedOnButton = true

    if(this.callback) this.Destroy(this.callback)

    else this.Destroy()
  }

  ngOnDestroy(): void {
    if(!this.HasClickedOnButton && this.callback) this.callback()
  }
}