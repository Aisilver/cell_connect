import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthPageSlide } from '@shared/entities';
import { ImageComponent } from "src/app/main-features/shared/components/image/image.component";
import { CommonModule } from '@angular/common';
import { GlitterComponent } from "src/app/main-features/shared/components/glitter/glitter.component";
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import gsap from 'gsap';

@Component({
  selector: 'app-auth-toggle-panel-slide',
  imports: [
    CommonModule,
    ImageComponent,
    GlitterComponent
],
  template: `
    @if(slide.media_id) {
      <app-image [mediaId]="slide.media_id"></app-image>
    }@else {
      <div class="gradient-bg"></div>
    }

    <section #background>
      <app-glitter #glitter class="glitter"></app-glitter>

      <h2 #header>"{{slide.title}}"</h2>

      <b #text>{{slide.message}}</b>
    </section>
  `,
  styleUrl: './auth-toggle-panel-slide.component.scss'
})
export class AuthTogglePanelSlideComponent implements OnInit, SlickChildInstance {
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  @ViewChild('background', {static: true})
  backgroundElementRef!: ElementRef<HTMLElement>

  @ViewChild('header', {static: true})
  headerElementRef!: ElementRef<HTMLElement>

  @ViewChild('text', {static: true})
  textElementRef!: ElementRef<HTMLElement>

  @ViewChild(GlitterComponent)
  glitterComponent!: GlitterComponent

  @Input()
  slide!: AuthPageSlide

  timeline = gsap.timeline({paused: true})

  ngOnInit(): void {
    this.SetTimeline()
  }

  onVisible () {
    this.timeline.play()
    
    this.glitterComponent.Init()
  }

  onNotVisible () {
    this.glitterComponent.Clear()

    this.timeline.reverse()
  }

  private SetTimeline () {
    this.timeline
      .fromTo(this.headerElementRef.nativeElement, {y: 100, opacity: 0}, {y: 0, opacity: 1})
      .fromTo(this.textElementRef.nativeElement, {opacity: 0}, {opacity: 1})
  }
}