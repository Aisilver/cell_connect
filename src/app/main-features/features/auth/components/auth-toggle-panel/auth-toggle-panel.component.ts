import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, Renderer2, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_IMAGE_PATHS } from 'src/app/configurations/app-image-paths/app-image-paths.confguration';
import { AuthPageSlide } from '@shared/entities';
import { SlickCarouselWrapperComponent } from "src/app/main-features/shared/components/slick-carousel-wrapper/slick-carousel-wrapper.component";
import { AuthTogglePanelSlideComponent } from "../auth-toggle-panel-slide/auth-toggle-panel-slide.component";
import { Subscription } from 'rxjs';
import { JQuerySlickOptions } from 'ngx-slick-options';
import { AuthSlidesService } from '../../services/auth-slides.service';
import { LogoComponent } from "src/app/main-features/shared/components/logo/logo.component";

@Component({
  selector: 'app-auth-toggle-panel',
  imports: [
    CommonModule,
    RouterModule,
    SlickCarouselWrapperComponent,
    AuthTogglePanelSlideComponent,
    LogoComponent
],
  template: `
    <header [ngClass]="Position">
      @if(AuthInProgress()) {
        <app-logo Theme="light"></app-logo>   
      }@else {
        <app-logo></app-logo>   
      }
    </header>

    @if(!AuthInProgress()) {
      <main class="container">
          <h1>{{Position == 'right' ? 'Welcome Back!' : 'Hello, Welcome!'}}</h1>
  
          <p>{{Position == 'right' ? 'Already have an Account?' : 'Dont have an Account?'}}</p>
  
          <button (click)="OnClick()">{{Position == 'right' ? 'Login' : 'Register'}}</button>
      </main>
    }@else {
      <app-slick-carousel-wrapper class="container" [options]="CarouselOptions">
        @for (item of AuthSlides(); track $index) {
          <ng-template #slick_temp>
              <app-auth-toggle-panel-slide #slick_item [slide]="item"></app-auth-toggle-panel-slide>
          </ng-template>
        }
      </app-slick-carousel-wrapper>
    }
  `,
  styleUrl: './auth-toggle-panel.component.scss'
})
export class AuthTogglePanelComponent implements OnInit, AfterViewInit, OnDestroy {
  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private render = inject(Renderer2)

  private slidesService = inject(AuthSlidesService)

  @Input()
  Position!: "left" | "right"

  @Output("buttonClicked")
  private output: EventEmitter<void> = new EventEmitter()
 
  AuthSlides = signal<AuthPageSlide[]>([])

  App_images_paths = inject(APP_IMAGE_PATHS)

  AuthInProgress = signal(false)

  GetAuthSlidesSubscription?: Subscription

  CarouselOptions: JQuerySlickOptions = {
    fade: true,
    autoplay: true,
    autoplaySpeed: 8_000,    
    pauseOnFocus: true,
    pauseOnHover: true
  } 

  ngOnInit(): void {
    this.GetAuthSlidesSubscription = this.slidesService.$getAuthSlides.subscribe(slides => this.AuthSlides.update(() => slides))
  }

  ngAfterViewInit(): void {
    this.render.addClass(this.componentElement, this.Position)
  }

  OnClick = () => this.output.emit()

  Trigger_A_AuthProcess_Has_Started = () => this.AuthInProgress.update(() => true)

  Trigger_A_AuthProcess_Has_Finished = () => this.AuthInProgress.update(() => false)

  ngOnDestroy(): void {
    this.GetAuthSlidesSubscription?.unsubscribe()
  }
}