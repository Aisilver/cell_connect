import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { HomePageSlide } from '@shared/entities';
import { SlickCarouselWrapperComponent } from "../slick-carousel-wrapper/slick-carousel-wrapper.component";
import { HomeSlideViewComponent } from "./home-slide-view/home-slide-view.component";
import { JQuerySlickOptions } from 'ngx-slick-options';

@Component({
  selector: 'app-home-slides-view',
  imports: [SlickCarouselWrapperComponent, HomeSlideViewComponent],
  template: `
    <app-slick-carousel-wrapper class="carousel" [options]="options">
      @for (item of slides; track $index) {
        
        <ng-template #slick_temp>
          <app-home-slide-view [slide]="item" #slick_item></app-home-slide-view>
        </ng-template>  
      
      }
    </app-slick-carousel-wrapper>
  `,
  styleUrl: './home-slides-view.component.scss'
})
export class HomeSlidesViewComponent implements AfterViewInit {
  @Input()
  slides!: HomePageSlide[]

  @ViewChild(SlickCarouselWrapperComponent)
  slick_carousel?: SlickCarouselWrapperComponent

  options: JQuerySlickOptions = {
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    speed: 1000
  }

  ngAfterViewInit(): void {
    this.slick_carousel?.Slick.slickPlay()
  }
}