import { Component } from '@angular/core';

@Component({
  selector: 'app-book-meeting',
  standalone: false,
  template: `
    <main>
      <section>
        <router-outlet></router-outlet>      
      </section>
      <app-meeting-page-slides-manager class="slide-manager"></app-meeting-page-slides-manager>
    </main>
  `,
  styleUrl: './meeting.component.scss'
})
export class MeetingComponent {

}