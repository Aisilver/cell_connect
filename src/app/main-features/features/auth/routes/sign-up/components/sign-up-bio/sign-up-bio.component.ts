import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { User, UserAccount } from '@shared/entities';
import { SignUpStagesTypes } from '../../types';
import { ProfileImageViewAndUploadComponent } from "src/app/main-features/shared/components/profile-image-view-and-upload/profile-image-view-and-upload.component";
import { InputFieldDecoratorComponent } from "src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component";
import { FormsModule } from '@angular/forms';
import { UUIDGenerator } from 'src/app/functions/UUID-generator.func';
import { UsernameValidatorDirective } from "src/app/main-features/shared/directives/username-validator.directive";
import { FormErrorMessageComponent } from "src/app/main-features/shared/components/form-error-message/form-error-message.component";
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import { SlickChildInstance } from 'src/app/main-features/shared/components/slick-carousel-wrapper/slick-child-instance.interface';

@Component({
  selector: 'app-sign-up-bio',
  imports: [
    CommonModule,
    FormsModule,
    ProfileImageViewAndUploadComponent,
    InputFieldDecoratorComponent,
    UsernameValidatorDirective,
    FormErrorMessageComponent
],
  templateUrl: './sign-up-bio.component.html',
  styleUrl: './sign-up-bio.component.scss'
})
export class SignUpBioComponent implements AfterViewInit, SlickChildInstance {
  declare isLast: boolean;

  declare isFirst: boolean;

  declare isVisble: boolean;

  @Input()
  NewAccount!: UserAccount

  @Input()
  NewUser!: User

  @ViewChild('userNameInputDecorator', {read: InputFieldDecoratorComponent})
  private userNameInputField?: InputFieldDecoratorComponent

  @ViewChild('profileImage', {read: ElementRef})
  private profileImageDomRef!: ElementRef<HTMLElement> 

  @ViewChildren('animetarget')
  private animmationGroupQuery!: QueryList<ElementRef<HTMLElement>>

  @Output('toStage')
  private output: EventEmitter<SignUpStagesTypes> = new EventEmitter()

  @Output('profileImageRef')
  private profileImageRefOutput: EventEmitter<string> = new EventEmitter()

  private timeline = gsap.timeline({paused: true})

  ngAfterViewInit(): void {
    this.timeline
    .fromTo(this.profileImageDomRef.nativeElement, {opacity: 0, scale: .3}, {opacity: 1, scale: 1, duration: .5})
    .fromTo(this.animmationGroupQuery.map(ref => ref.nativeElement), 
      {
        y: 100, 
        opacity: 0
      }, 
      {
        y: 0, 
        stagger: .3,  
        opacity: 1, 
        duration: .5
      }, "<")
  }

  onVisible() {
    this.timeline.play()
  }

  GenerateUserName() {
    const {firstName, lastName} = this.NewUser,

    anomally = UUIDGenerator(4, "only-numbers")

    let newUsername = String(`${firstName}${lastName}${anomally}`).toLowerCase()

    if(newUsername.length > 15) newUsername = `user${UUIDGenerator(7, "only-numbers")}`

    this.NewAccount.username = newUsername

    this.userNameInputField?.TriggerHasValueEffect(false)
  }

  OnProfileImageRef(ref: string){
    this.profileImageRefOutput.emit(ref)
  }

  Next() {
    this.output.emit("sign-up-password-set")
  }

  Back() {
    this.output.emit("sign-up-location")
  }
}