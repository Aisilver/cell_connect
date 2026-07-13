import { AfterViewInit, Component, inject, OnInit, signal, ViewChild, viewChild } from '@angular/core';
import { SlickCarouselWrapperComponent } from '../../shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component';
import { MeetingHubService } from './services/meeting-hub.service';
import { Subscription } from 'rxjs';
import { Meeting, MeetingStatusTypes } from '@shared/entities';
import { JQuerySlickOptions } from 'ngx-slick-options';

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
              <app-icon name="house"></app-icon>
            </button>
          </div>

          <div [ngClass]="{active: Page() == 'broadcast'}">
            <button (click)="SwitchPage('broadcast')">
              <p>Broadcast</p>
              <app-icon name="tower-broadcast"></app-icon>
            </button>
          </div>
        </nav>

        <app-slick-carousel-wrapper [options]="CarouselOptions()" class="carousel-wrapper">
          <ng-template #slick_temp>
            <app-meeting-hub-lobby-slide-page #slick_item></app-meeting-hub-lobby-slide-page>
          </ng-template>
        
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
export class MeetingHubPageComponent implements OnInit {
  private service = inject(MeetingHubService)

  @ViewChild(SlickCarouselWrapperComponent)
  carousel!: SlickCarouselWrapperComponent

  Meeting!: Meeting

  Page = signal<"meeting" | "broadcast" | "lobby">("meeting")

  CarouselOptions = signal<JQuerySlickOptions | null>(null)

  MeetingStatusChangeSubs?: Subscription

  ngOnInit(): void {
    this.Meeting = this.service.getActiveMeeting()

    const {status} = this.Meeting

    this.MeetingStatusChangeSubs = this.service.$MeetingStatusChangeEvent
      .subscribe(status => {
        switch(status) {
          case 'in-session': this.SwitchPage("meeting")
            break
          case 'concluded':
          case 'canceled': this.SwitchPage("lobby")
            break
        }
      })

      this.CarouselOptions.set({
        initialSlide: status == "booked" ? 0 : 1,
        swipe: false,
        draggable: false
      })
  }

  SwitchPage(page?: "meeting" | "broadcast" | "lobby") {
    switch(page){
      case 'broadcast': this.carousel.Slick.slickGoTo(2)
        break;
      case 'meeting': this.carousel.Slick.slickGoTo(1)
        break;
      default: this.carousel.Slick.slickGoTo(0) 
        break;
    }

    this.Page.set(page ?? 'lobby')
  }
}
