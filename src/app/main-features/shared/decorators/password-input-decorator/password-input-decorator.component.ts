import { Component, ContentChild, ElementRef, signal } from '@angular/core';
import { IconComponent } from "../../components/icon/icon.component";

@Component({
  selector: 'app-password-input-decorator',
  imports: [
    IconComponent
  ],
  template: `
    <div>
      <ng-content></ng-content>
    </div>

    <div (click)="TogglePassordVisibiity()">
      @if (ShowPassword()) {
        <app-icon name="eye-slash"></app-icon>
      }@else {
        <app-icon name="eye"></app-icon>
      }
    </div>
  `,
  styleUrl: './password-input-decorator.component.scss'
})
export class PasswordInputDecoratorComponent {
  @ContentChild("passwordField", {read: ElementRef<HTMLInputElement>})
  private inputField!: ElementRef<HTMLInputElement>

  ShowPassword = signal(false)

  TogglePassordVisibiity() {
    const {nativeElement} = this.inputField,

    {type} = nativeElement

    nativeElement.type = type == 'password' ? 'text' : 'password' 

    this.ShowPassword.update(() => nativeElement.type == 'text')
  }
}