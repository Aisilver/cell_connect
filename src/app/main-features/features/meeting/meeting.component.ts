import { Component } from '@angular/core';

@Component({
  selector: 'app-meeting-page',
  standalone: false,
  template: `
    <app-bubble-wrapper>
      <main>
        <section>
          <router-outlet></router-outlet>      
        </section>
        <app-meeting-page-slides-manager class="slide-manager"></app-meeting-page-slides-manager>
      </main>
    </app-bubble-wrapper>
  `,
  styleUrl: './meeting.component.scss'
})
export class MeetingComponent {
  
}