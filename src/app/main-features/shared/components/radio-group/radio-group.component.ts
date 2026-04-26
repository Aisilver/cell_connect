import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-group',
  imports: [
    FormsModule,
    CommonModule
  ],
  template: `
    <p *ngIf="text">{{text}}</p>

    <form #form="ngForm">
      @for (item of values; track $index) {
        <div>
          <label [ngClass]="{selected: item == Value()}" (click)="Update(item)"></label>
          <p>{{item}}</p>
        </div>
      }
    </form>
  `,
  styleUrl: './radio-group.component.scss'
})
export class RadioGroupComponent implements AfterViewInit {
  Value = signal('')

  @Input()
  text?: string

  @Input()
  values?: string[]

  @Output()
  selected: EventEmitter<string> = new EventEmitter()

  ngAfterViewInit(): void {
    this.Update(this.values?.[0] ?? '')
  }

  Update (value: string) {
    this.Value.update(() => value)

    this.selected.emit(this.Value())
  }
}
