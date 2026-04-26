import { Component } from '@angular/core';

@Component({
  selector: 'app-form-error-message',
  imports: [],
  template: `
    <p animate.enter="fade-in"><ng-content></ng-content></p>
  `,
  styleUrl: './form-error-message.component.scss'
})
export class FormErrorMessageComponent {

}
