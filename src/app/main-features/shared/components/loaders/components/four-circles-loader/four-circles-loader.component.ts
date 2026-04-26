import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { LoaderEntity } from '../../config';
import { LoaderConfigMap } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-four-circles-loader',
  imports: [
    CommonModule
  ],
  template: `
    <div class="loader" [ngStyle]="MainLoaderStyle">
      @for (item of Circles; track $index) {
        <div class="circle" [ngStyle]="MiniCirclesStyle"></div>
      }
    </div>

    <p *ngIf="options?.load_text" >{{options?.load_text}}...</p>
  `,
  styleUrl: './four-circles-loader.component.scss'
})
export class FourCirclesLoaderComponent extends LoaderEntity implements AfterViewInit {
  private render = inject(Renderer2)

  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private BaseSize = 50

  Circles = new Array(4)

  private get SizeInUse () {
    return this.options?.size ?? this.BaseSize
  }

  get MainLoaderStyle () {
    return {
      width: `${this.SizeInUse}px`,
      height: `${this.SizeInUse}px`
    }
  }

  get MiniCirclesStyle () {
    const circleSize = Math.floor( (33 / 100) * this.SizeInUse)

    return {
      width: `${circleSize}px`,
      height: `${circleSize}px`
    }
  }

  @Input('options')
  override options?: LoaderConfigMap['four-circles'] | undefined;

  ngAfterViewInit(): void {
    this.render.addClass(this.componentElement, String(this.options?.color_theme))
  }
}