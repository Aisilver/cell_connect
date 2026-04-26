import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-message',
  imports: [NgClass],
  template: `
    <div [ngClass]="{show: Show()}">
      <div>
        <p [ngClass]="{red: IsError()}">{{Message()}}</p>
      </div>
    </div>
  `,
  styleUrl: './message.component.scss'
})
export class MessageComponent {
  Message = signal("")

  IsError = signal(false)

  Show = signal(false)

  showMessage (msg: string, isError = false) {
    this.Message.update(() => msg)

    this.Show.update(() => true)
  
    this.IsError.update(() => isError)

    setTimeout(() => this.Show.update(() => false) , 3000);
  }
}