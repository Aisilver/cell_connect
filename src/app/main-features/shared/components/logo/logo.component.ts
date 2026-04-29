import { Component, HostListener, inject, Input } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { APP_IMAGE_PATHS } from 'src/app/configurations/app-image-paths/app-image-paths.confguration';
import { MainFeaturesRouteService } from 'src/app/main-features/service/main-features-route.service';
import { CommonModule } from '@angular/common';
import { AppMainService } from 'src/app/general-services/app-main.service';

@Component({
  selector: 'app-logo',
  imports: [
    CommonModule,
    ImageComponent
  ],
  template: `
    @if(Theme) {
      <app-image [inputSrc]="Theme == 'light' ? AppImagePaths.LOGO_WHITE : AppImagePaths.LOGO" objectFit="contain"></app-image>

      <div [ngClass]="Theme">
        <p>Dominon City</p>
        <i class="float">...raising leaders that transform society</i>
        <i class="static">...raising leaders that transform society</i>
      </div>
    }@else {
      <app-image [inputSrc]="IS_MOBILE_VIEW ? AppImagePaths.LOGO_WHITE : AppImagePaths.LOGO" objectFit="contain"></app-image>

      <div [ngClass]="{dark: !IS_MOBILE_VIEW}">
        <p>Dominon City</p>
        <i class="float">...raising leaders that transform society</i>
        <i class="static">...raising leaders that transform society</i>
      </div>
    }
  `,
  styleUrl: './logo.component.scss'
})
export class LogoComponent {
  private appService = inject(AppMainService)

  private featureRouter = inject(MainFeaturesRouteService)

  @Input()
  Theme?: "dark" | "light"

  AppImagePaths = inject(APP_IMAGE_PATHS)

  get IS_MOBILE_VIEW () {
    return this.appService.isMobileView()
  }

  @HostListener("click")
  toHome () {
    this.featureRouter.toHome()
  }
}
