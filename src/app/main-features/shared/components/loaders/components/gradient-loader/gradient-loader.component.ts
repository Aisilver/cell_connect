import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
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
export class GradientLoaderComponent extends LoaderEntity implements OnChanges {
  @Input('options')
  override options?: LoaderConfigMap['gradient']

  constructor(
    private compElement: ElementRef,
    private render: Renderer2
  ){super()}

  ngOnChanges(changes: SimpleChanges): void {
    this.render.addClass(this.compElement.nativeElement, this.options?.type ?? "coloured")
  }
}