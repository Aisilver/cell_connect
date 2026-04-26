import { inject, Injectable } from '@angular/core';
import { HomePageSlide } from '@shared/entities';
import { DEFAULT_HOME_PAGE_SLIDE } from '../../../../injectables/default-home-page-slide-data';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private defaultSlide: HomePageSlide = inject(DEFAULT_HOME_PAGE_SLIDE)

  slides: HomePageSlide[] = []

  setSlides(slides: HomePageSlide[]) {
    if(slides.length < 1)
      this.slides = [this.defaultSlide]
    else
      this.slides = slides
  }
}
