import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { IconConfiguration, IconTypes } from '../../../types/icon-configuration.type';

@Component({
  selector: 'app-icon',
  imports: [
    CommonModule
  ],
  template: `
    <div *ngIf="Class()">
      <i [ngClass]="Class()"></i>
    </div>
  `,
  styles: [`
    :host{
      display: inline-block;

      div {
        display: grid;
        height: 100%;
        place-items: center;
        margin: 0 auto;
      }
    }  
  `]
})
export class IconComponent implements OnChanges {
  @Input()
  name?: string

  @Input()
  type?: IconTypes

  @Input()
  icon?: IconConfiguration

  Class = signal<null | string>(null)

  ngOnChanges(changes: SimpleChanges): void {
    this.Class.update(() => null)
    
    if(this.icon){
      this.Class.update(() => `fa-${this.icon?.type ?? 'solid'} fa-${this.icon?.name}`)
    }else {
      this.Class.update(() => `fa-${this.type ?? 'solid'} fa-${this.name}`)
    }
  }
}
