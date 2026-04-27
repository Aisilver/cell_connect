import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-error-message',
  imports: [
    CommonModule
  ],
  template: `
    <p [ngClass]="{no_bg: NoBackground}" animate.enter="fade-in"><ng-content></ng-content></p>
  `,
  styleUrl: './form-error-message.component.scss'
})
export class FormErrorMessageComponent {
  @Input()
  NoBackground?: boolean
}
