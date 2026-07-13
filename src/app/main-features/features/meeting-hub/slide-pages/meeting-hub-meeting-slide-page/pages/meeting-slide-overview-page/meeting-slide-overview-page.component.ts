import { Component } from '@angular/core';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';

@Component({
  selector: 'app-meeting-slide-overview-page',
  imports: [],
  templateUrl: './meeting-slide-overview-page.component.html',
  styleUrl: './meeting-slide-overview-page.component.scss'
})
export class MeetingSlideOverviewPageComponent implements SlickChildInstance {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  onVisible () {
    console.log("seen")
  };
}
