import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { SlickCarouselWrapperComponent } from "src/app/main-features/shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component";
import { MeetingPageService } from '../../services/meeting-page.service';
import { MeetingPageSlide } from '@shared/entities';
import { Subscription } from 'rxjs';
import { SlideViewComponent } from "src/app/main-features/shared/components/slide-view/slide-view.component";
import { JQuerySlickOptions } from 'ngx-slick-options';

@Component({
  selector: 'app-meeting-page-slides-manager',
  imports: [SlickCarouselWrapperComponent, SlideViewComponent],
  template: `
    <app-slick-carousel-wrapper class="carousel" [options]="Options">
      @for (item of Slides(); track $index) {
        <ng-template #slick_temp>
          <app-slide-view #slick_item [slide]="item"></app-slide-view>
        </ng-template>
      }
    </app-slick-carousel-wrapper>
  `,
  styleUrl: './meeting-page-slides-manager.component.scss'
})
export class MeetingPageSlidesManagerComponent implements OnInit, OnDestroy {
  private service = inject(MeetingPageService)

  private subscription?: Subscription

  Slides = signal<MeetingPageSlide[]>([])

  Options: JQuerySlickOptions = {
    fade: true,
    autoplay: true,
    autoplaySpeed: 8_000,    
    pauseOnFocus: true,
    pauseOnHover: true
  }

  ngOnInit(): void {
    this.subscription = this.service.$getMeetingPageSlides
    
    .subscribe(slides => this.Slides.update(() => slides))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}