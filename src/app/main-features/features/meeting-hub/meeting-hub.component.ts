import { AfterViewInit, Component, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { SlickCarouselWrapperComponent } from '../../shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component';
import { MeetingHubService } from './services/meeting-hub.service';

@Component({
  selector: 'app-meeting-hub',
  standalone: false,
  template: `
    <app-bubble-wrapper class="wrapper">
      <main>
        <nav [ngClass]="{switched: Page() !== 'meeting'}">
          <div [ngClass]="{active: Page() == 'meeting'}">
            <button (click)="SwitchPage('meeting')">
              <p>Meeting</p>
              <app-icon name="users"></app-icon>
            </button>
          </div>

          <div [ngClass]="{active: Page() == 'broadcast'}">
            <button (click)="SwitchPage('broadcast')">
              <p>Broadcast</p>
              <app-icon name="tower-broadcast"></app-icon>
            </button>
          </div>
        </nav>

        <app-slick-carousel-wrapper class="carousel-wrapper">
          <ng-template #slick_temp>
            <app-meeting-hub-meeting-slide-page #slick_item></app-meeting-hub-meeting-slide-page>
          </ng-template>

          <ng-template #slick_temp>
            <app-meeting-hub-broadcast-slide-page #slick_item></app-meeting-hub-broadcast-slide-page>
          </ng-template>
        </app-slick-carousel-wrapper> 
      </main>
    </app-bubble-wrapper>
  `,
  styleUrl: './meeting-hub.component.scss'
})
export class MeetingHubPageComponent implements AfterViewInit {
  private service = inject(MeetingHubService)

  @ViewChild(SlickCarouselWrapperComponent)
  carousel!: SlickCarouselWrapperComponent

  Page = signal<"meeting" | "broadcast">("meeting")

  ngAfterViewInit(): void {
    
  }

  SwitchPage(page: "meeting" | "broadcast") {

    switch(page){
      case 'broadcast': this.carousel.Slick.slickGoTo(1)
        break;
      default: this.carousel.Slick.slickGoTo(0) 
        break;
    }

    this.Page.set(page)
  }
}
