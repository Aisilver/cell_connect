import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { UserAccount } from '@shared/entities';
import { ImageComponent } from '../image/image.component';
import { RandomBackgroundColorDirective } from '../../directives/random-background-color.directive';

@Component({
  selector: 'app-user-pod',
  imports: [
    CommonModule,
    ImageComponent,
    RandomBackgroundColorDirective
  ],
  template: `
    @if(Account?.profile_image) {
      <app-image [inputSrc]="Account?.profile_image" default="NO-PROFILE-PHOTO" objectFit="cover"></app-image>
    }@else {
      <span appRandomBackgroundColor>
        {{GetAccountFirstNameFirstLetter() ?? '$' | titlecase}}
      </span>
    }
  `,
  styleUrl: './user-pod.component.scss'
})
export class UserPodComponent {
  @Input()
  Account?: UserAccount

  private get User () {
    return this.Account?.user
  }

  GetAccountFirstNameFirstLetter() {
    return this.User?.firstName.split("").shift()
  }
}