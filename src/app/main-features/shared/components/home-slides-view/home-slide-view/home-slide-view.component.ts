import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { HomePageSlide } from '@shared/entities';
import { ImageComponent } from "../../image/image.component";
import { APP_IMAGE_PATHS } from '../../../../../configurations/app-image-paths/app-image-paths.confguration';
import { SlickChildInstance } from '../../slick-carousel-wrapper/slick-child-instance.interface';
import gsap from 'gsap';
import { AppMainService } from '../../../../../general-services/app-main.service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';

@Component({
  selector: 'app-home-slide-view',
  imports: [
    CommonModule,
    ImageComponent
],
  templateUrl: './home-slide-view.component.html',
  styleUrl: './home-slide-view.component.scss'
})
export class HomeSlideViewComponent implements SlickChildInstance, OnInit {
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  private appMainService = inject(AppMainService)

  private features_route_service = inject(MainFeaturesRouteService)

  @ViewChild("title", {static: true})
  titleDOMRef!: ElementRef<HTMLElement>

  @ViewChild("subtitle", {static: true})
  subTitleDOMRef!: ElementRef<HTMLElement>

  @ViewChild("button", {static: true})
  buttonDOMRef!: ElementRef<HTMLElement>

  @ViewChild("image_hold", {static: true})
  imageHoldDOMRef!: ElementRef<HTMLElement>

  @Input()
  slide?: HomePageSlide

  appImages = inject(APP_IMAGE_PATHS)

  timeline = gsap.timeline({paused: true})

  ngOnInit(): void {
    if(this.appMainService.isMobileView()) this.MobileAnimation()
    else this.DestopAnimation()
  }

  SignUp() {
    this.features_route_service.toAuth('sign-up')
  }

  private DestopAnimation () {
    this.timeline
    .fromTo(this.titleDOMRef.nativeElement, {y: 100, opacity: 0}, {y: 0, opacity: 1})
    .fromTo(this.subTitleDOMRef.nativeElement, {y: 100, opacity: 0}, {y: 0, opacity: 1})
    .fromTo(this.imageHoldDOMRef.nativeElement, {x: 100, opacity: 0, scale: .3}, {x: 0, opacity: 1, scale: 1}, "-=.5")
    .fromTo(this.buttonDOMRef.nativeElement, {y: 100, opacity: 0}, {y: 0, opacity: 1, duration: .1})
  }

  private MobileAnimation () {
    this.timeline
    .fromTo(this.titleDOMRef.nativeElement, {y: 100, opacity: 0}, {y: 0, opacity: 1})
    .fromTo(this.subTitleDOMRef.nativeElement, {y: 100, opacity: 0}, {y: 0, opacity: 1})
    .fromTo(this.buttonDOMRef.nativeElement, {y: 100, opacity: 0}, {y: 0, opacity: 1, duration: .1})
  }

  onVisible () {
    this.timeline.play()
  }

  onNotVisible () {
    this.timeline.reverse()
  }
}