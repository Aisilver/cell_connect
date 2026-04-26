import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { HubBasicHeaderClickable } from 'src/app/main-features/types/hub-basic-header-clickable.type';
import { IconComponent } from "../../../../shared/components/icon/icon.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hub-basic-header',
  imports: [
    CommonModule,
    IconComponent
  ],
  template: `
    <h3>{{Title ?? 'unknown' | titlecase}}</h3>

    <div>
      @for (item of Clickables; track $index) {
        @if(item.icon) {
          <app-icon (click)="Select(item.key)" [name]="item.icon.name" [type]="item.icon.type"></app-icon>
        }@else {
          <button (click)="Select(item.key)">{{item.name ?? 'unknown' | titlecase}}</button>
        }
      }
    </div>
  `,
  styleUrl: './hub-basic-header.component.scss'
})
export class HubBasicHeaderComponent implements OnChanges{
  private chr = inject(ChangeDetectorRef)

  @Input()
  Title?: string

  @Input()
  Clickables?: HubBasicHeaderClickable<string>[]

  @Output("onSelect")
  private output: EventEmitter<string> = new EventEmitter()

  ngOnChanges(changes: SimpleChanges): void {
    this.chr.detectChanges() 
  }

  Select (key: string) {
    this.output.emit(key)
  }
}