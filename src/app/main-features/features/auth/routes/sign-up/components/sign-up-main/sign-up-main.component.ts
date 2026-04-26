import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldDecoratorComponent } from "src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component";
import { FormErrorMessageComponent } from "src/app/main-features/shared/components/form-error-message/form-error-message.component";
import { PhoneNumberFieldDecoratorComponent } from "src/app/main-features/shared/decorators/phone-number-field-decorator/phone-number-field-decorator.component";
import { PhoneNumberValidatorDirective } from "src/app/main-features/shared/directives/phone-number-validator.directive";
import { EmailValidatorDirective } from "src/app/main-features/shared/directives/email-validator.directive";
import { DatePickerComponent } from "src/app/main-features/shared/components/date-picker/date-picker.component";
import { RadioGroupComponent } from "src/app/main-features/shared/components/radio-group/radio-group.component";
import { User } from '@shared/entities';
import { SignUpStagesTypes } from '../../types';
import { AuthService } from '../../../../services/auth.service';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';
import gsap from 'gsap';

@Component({
  selector: 'app-sign-up-main',
  imports: [
    FormsModule,
    InputFieldDecoratorComponent,
    CommonModule,
    FormErrorMessageComponent,
    PhoneNumberFieldDecoratorComponent,
    PhoneNumberValidatorDirective,
    EmailValidatorDirective,
    DatePickerComponent,
    RadioGroupComponent
],
  templateUrl: './sign-up-main.component.html',
  styleUrl: './sign-up-main.component.scss'
})
export class SignUpMainComponent implements SlickChildInstance, AfterViewInit {
  declare isLast: boolean;
  
  declare isFirst: boolean;
  
  declare isVisble: boolean;

  @Input()
  NewUser!: User

  @ViewChildren('animation_target', {read: ElementRef})
  private labelsRefs!: QueryList<ElementRef>

  @ViewChild('button')
  private submitButton!: ElementRef<HTMLElement>

  @Output('toStage')
  private output: EventEmitter<SignUpStagesTypes> = new EventEmitter()

  private authService = inject(AuthService)

  private timeline = gsap.timeline({paused: true})

  ngAfterViewInit(): void {
    this.timeline
    .set(this.submitButton.nativeElement, {y: 100, scale: .1})
    .fromTo(this.labelsRefs.toArray().map(ref => ref.nativeElement), {
      y:100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: .5,
      stagger: .25
    })
    .to(this.submitButton.nativeElement, {y: 0, scale: 1, duration: .25})
  }

  onVisible () {
    this.timeline.play()
  }

  toLogin() {
    this.authService.triggerAuthRouteChangeAnimation()
  }

  Submit() {
    this.output.emit("sign-up-location")
  }
}