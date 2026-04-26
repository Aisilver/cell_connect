import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { SignUpStagesTypes } from '../../types';
import { AppLocation } from '@shared/entities';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IconComponent } from "src/app/main-features/shared/components/icon/icon.component";
import { DropDownComponent } from "src/app/main-features/shared/components/drop-down/drop-down.component";
import { LoadersComponent } from "src/app/main-features/shared/components/loaders/loaders.component";
import { AppRouteApiCallService } from 'src/app/server/route-services/app-route/app-route-api-call.service';
import { DropDownUnit } from 'src/app/main-features/shared/components/drop-down/types';
import gsap from 'gsap';
import { AuthService } from '../../../../services/auth.service';
import { APP_VECTOR_PATHS } from 'src/app/configurations/vector-paths/app-vector-paths.configuration';

@Component({
  selector: 'app-sign-up-location',
  imports: [
    FormsModule,
    CommonModule,
    IconComponent,
    DropDownComponent,
    LoadersComponent
],
  templateUrl: './sign-up-location.component.html',
  styleUrl: './sign-up-location.component.scss'
})
export class SIgnUpLocationComponent implements SlickChildInstance, AfterViewInit {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  private AppRouteApiCall = inject(AppRouteApiCallService)

  private service = inject(AuthService)

  AppVectors = inject(APP_VECTOR_PATHS)

  SelectedCity = signal("")

  @Input()
  NewLocation!: AppLocation

  @Output("toStage")
  private output: EventEmitter<SignUpStagesTypes> = new EventEmitter()

  @ViewChild('cityLoader', {read: LoadersComponent})
  cityLoader!: LoadersComponent

  @ViewChild('cityDropDown')
  cityDropDownComp!: DropDownComponent

  @ViewChild("imageHold")
  private imageHoldDOMRef!: ElementRef<HTMLElement>

  @ViewChildren('animeTarget', {read: ElementRef})
  private animationTargetssRef!: QueryList<ElementRef<HTMLElement>>

  private timeline = gsap.timeline({paused: true})

  ngAfterViewInit(): void {
    this.timeline
    .fromTo(this.imageHoldDOMRef.nativeElement, {scale: .5, opacity: 0, y: 100}, {scale: 1, opacity: 1, y: 0})
    .fromTo(this.animationTargetssRef.toArray().map(ref => ref.nativeElement), {
      y: 100, 
      opacity: 0
    }, 
    {
      y: 0, 
      opacity: 1, 
      duration: .5,
      stagger: .25
    }, "<")
  }

  onVisible(){
    this.LoadCities()

    this.timeline.play().then(() => this.timeline.revert())
  }

  private async LoadCities() {
    const response = await this.cityLoader.LoadAsync(this.AppRouteApiCall.getCities())

    this.AppRouteApiCall.responseChecker(response, data => {
      const transformedDrops = data.map<DropDownUnit>(city => {return {key: city.slug}})

      this.cityDropDownComp.LoadDropUnits(transformedDrops)
      
      this.cityDropDownComp.Select(transformedDrops[0])
    })
  }

  Next() {
    if(this.service.isEmailVerified())
      this.output.emit("sign-up-bio")
    else
      this.output.emit('sign-up-email-verification')
  }

  Back() {
    this.output.emit('sign-up-main')
  }
}
