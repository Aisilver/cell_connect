import { AfterViewInit, Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { LoaderEntity } from '../../config';
import { LoaderConfigMap } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gradient-loader',
  imports: [CommonModule],
  template: `
    <p *ngIf="options?.load_text">{{options?.load_text}}...</p>
  `,
  styleUrl: './gradient-loader.component.scss'
})
export class GradientLoaderComponent extends LoaderEntity implements AfterViewInit {
  @Input('options')
  override options?: LoaderConfigMap['gradient']

  constructor(
    private compElement: ElementRef,
    private render: Renderer2
  ){super()}

  ngAfterViewInit(): void {
    this.render.addClass(this.compElement.nativeElement, this.options?.type ?? "gray")
  }
}