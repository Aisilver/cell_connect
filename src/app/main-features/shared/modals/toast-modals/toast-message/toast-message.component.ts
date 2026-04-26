import { Component, Input } from '@angular/core';
import { ModalGenerator } from '../../../../../general-services/modals-service/classes/modal-generator.class';
import { ToastModalEntity } from '../../../../../general-services/modals-service/toast-modal-service/classes/toast-entity';

@Component({
  selector: 'app-test-toast',
  imports: [],
  template: `
    <p>{{Message ?? 'Unknown message'}}</p>
  `,
  styleUrl: './toast-message.component.scss'
})
export class ToastMessageComponent extends ToastModalEntity {
  @Input("modal-service")
  protected override modalgenerator!: ModalGenerator;

  @Input('message')
  Message?: string
}
