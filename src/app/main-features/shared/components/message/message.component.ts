import { NgClass } from '@angular/common';
import { AfterViewInit, Component, Input, signal } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-message',
  imports: [NgClass],
  template: `
    <main [ngClass]="{open: Show()}">
      <div>
        <p [ngClass]="{red: IsError()}">{{Message()}}</p>
      </div>
    </main>
  `,
  styleUrl: './message.component.scss'
})
export class MessageComponent implements AfterViewInit {
  @Input()
  Duration?: number

  Message = signal("")

  IsError = signal(false)

  Show = signal(false)

  private savedMessages: {msg:string, isError?: boolean}[] = []

  private showingMessage = false

  private defaultDuration = 2000

  ngAfterViewInit(): void {
  }

  showMessage (msg: string, isError = false) {
    if(this.showingMessage) this.savedMessages.push({msg, isError})

    else {
      this.showingMessage = true

      this.Message.set(msg)

      this.IsError.set(isError)

      this.Show.set(true)

      setTimeout(() => this.closeMessage(), this.Duration ?? this.defaultDuration);
    }
  }

  private closeMessage () {
    this.Show.set(false)

    const nextMessage = this.savedMessages.shift()

    setTimeout(() => {
      this.showingMessage = false

      if(nextMessage) this.showMessage(nextMessage.msg, nextMessage.isError)
    }, 500)
  }
} 