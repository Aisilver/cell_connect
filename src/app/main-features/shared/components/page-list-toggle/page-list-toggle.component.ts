import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, NO_ERRORS_SCHEMA, OnChanges, Output, QueryList, Renderer2, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { PageListUnit } from 'src/app/main-features/types/page-list-unit.type';
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-list-toggle',
  imports: [
    CommonModule,
    IconComponent
  ],
  template: `
    <ul>
      <slider #slider></slider>

      @for (item of Lists; track $index) {
        <li #clickables (click)="Select($index)">
          <app-icon *ngIf="item.icon" [icon]="item.icon" ></app-icon>

          <p *ngIf="item.name">{{item.name}}</p>
        </li>
      }
    </ul>
  `,
  styleUrl: './page-list-toggle.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class PageListToggleComponent implements AfterViewInit {
  private render = inject(Renderer2)

  @Input()
  Lists!: PageListUnit[]

  @Output("selected")
  private output: EventEmitter<string> =  new EventEmitter ()

  @ViewChildren("clickables")
  private listsDOMRefQuery!: QueryList<ElementRef<HTMLElement>>

  @ViewChild("slider", {static: true, read: ElementRef})
  private sliderDOMRef!: ElementRef<HTMLElement>

  ngAfterViewInit(): void {
    if(this.Lists) setTimeout(() => this.Select(0));
  }

  Select(index: number) {
    try {
      const element = this.listsDOMRefQuery.get(index)?.nativeElement,

      padding = 25,

      {nativeElement: slider} = this.sliderDOMRef

      if(!element) return

      const {clientLeft, clientWidth} = element

      this.render.setStyle(slider, "left", `${index * (clientWidth + (padding / 2))}px`)
      
      this.render.setStyle(slider, "width", `${clientWidth}px`)
    } finally {
      this.output.emit(String(this.Lists[index].key))
    }
  }
}
