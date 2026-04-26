import { Component, inject } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeService } from './services/home.service';
import { HomeSlidesViewComponent } from '../../shared/components/home-slides-view/home-slides-view.component';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HomeSlidesViewComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private service = inject(HomeService)

  get Slides () {
    return this.service.slides
  }
}