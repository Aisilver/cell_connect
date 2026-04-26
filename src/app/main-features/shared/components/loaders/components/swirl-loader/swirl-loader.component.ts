import { Component, Input } from '@angular/core';
import { IconComponent } from "../../../icon/icon.component";
import { LoaderEntity } from '../../config';
import { LoaderConfigMap } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-swirl-loader',
  imports: [
    CommonModule,
    IconComponent
  ],
  template: `
    <app-icon [ngStyle]="{color: options?.color}" name="spinner"></app-icon>
  `,
  styleUrl: './swirl-loader.component.scss'
})
export class SwirlLoaderComponent extends LoaderEntity {
  @Input('options')
  override options?: LoaderConfigMap['swirl']
}
