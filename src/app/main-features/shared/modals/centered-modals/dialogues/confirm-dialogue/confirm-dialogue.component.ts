import { Component, ElementRef, inject, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { ConfirmDialogueOptions, ConfirmDialogueOutput } from '../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalEntity } from '../../../../../../general-services/modals-service/classes/modal-entity.class';
import { ModalGenerator } from '../../../../../../general-services/modals-service/classes/modal-generator.class';
import { CheckBoxDecoratorComponent } from '../../../../decorators/check-box-decorator/check-box-decorator.component';

@Component({
  selector: 'app-confirm-dialogue',
  imports: [
    CommonModule,
    FormsModule,
    CheckBoxDecoratorComponent
],
  template: `
    <h3>{{Options?.title ?? Options?.type | titlecase}}</h3>

    <section>
      <p>{{Options?.message }}</p>
    </section>

    <div class="btn_group">
      <button (click)="NoAction()">{{Options?.buttonConfig?.noButton?.text ?? 'no' | titlecase}}</button>

      <button (click)="YesAction()">{{Options?.buttonConfig?.yesButton?.text ?? 'yes' | titlecase}}</button>
    </div>

    <div class="do_not_ask" *ngIf="Options?.includeDonNotAskAgain">
      <app-check-box-decorator class="check" [CheckFIeld]="DoNotAskAgain">
        <input type="checkbox" #checkField name="che" [(ngModel)]="DoNotAskAgain">
      </app-check-box-decorator>
      
      <p>Do not ask again</p>
    </div>
  `,
  styleUrls: [
    "../dialogues-shared-styles.scss",
    './confirm-dialogue.component.scss'
  ]
})
export class ConfirmDialogueComponent extends ModalEntity implements OnDestroy {
  @Input('modal-service')
  protected override modalgenerator!: ModalGenerator;

  @Input('option')
  Options?: ConfirmDialogueOptions

  @Input('cb')
  callBack?: (result: ConfirmDialogueOutput) => void

  private render = inject(Renderer2)

  DoNotAskAgain = false

  HasPickedAnAnswer = false

  constructor(private compEle: ElementRef){super()}

  override OnModalInit(): void | Promise<void> {
    this.render.addClass(this.compEle.nativeElement, this.Options?.type ?? 'message') 
  }

  YesAction(){
    this.HasPickedAnAnswer = true

    this.Destroy(() => {
      //@ts-expect-error
      this.callBack({answer: true, doNotAskAgain: this.DoNotAskAgain})
    })
  }

  NoAction(){
    this.HasPickedAnAnswer = true

    this.Destroy(() => {
      //@ts-expect-error
      this.callBack({answer: false, doNotAskAgain: this.DoNotAskAgain})
    })
  }

  ngOnDestroy(): void {
    if(this.HasPickedAnAnswer) return

    if(this.callBack) this.callBack({answer: false})
  }
}