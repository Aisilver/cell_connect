import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { HomeService } from './services/home.service';
import { HomeSlidesViewComponent } from '../../shared/components/home-slides-view/home-slides-view.component';
import { Subscription } from 'rxjs';
import { HomePageSlide } from '@shared/entities';

@Component({
  selector: 'app-home',
  imports: [
    NavbarComponent,
    HomeSlidesViewComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  private service = inject(HomeService)

  private subscription?: Subscription

  Slides = signal<HomePageSlide[]>([])

  ngOnInit(): void {
    this.subscription = this.service.$getHomePageSlides.
    
    subscribe(slides => this.Slides.update(() => slides))
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}