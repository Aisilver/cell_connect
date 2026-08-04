import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OfflineMember, UserAccount } from '@shared/entities';
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
    @if(GetUserAccountProfileImageMeta) {
      <app-image [inputSrc]="GetUserAccountProfileImageMeta" default="NO-PROFILE-PHOTO" objectFit="cover"></app-image>
    }@else {
      <span appRandomBackgroundColor>
        {{GetAccountFirstNameFirstLetter() | titlecase}} {{GetAccountLastNameFirstLetter() | titlecase}}
      </span>
    }
  `,
  styleUrl: './user-pod.component.scss'
})
export class UserPodComponent {
  @Input()
  Account?: UserAccount

  @Input()
  OfflineMember?: OfflineMember

  private get User () {
    return this.Account?.user
  }

  get GetUserAccountProfileImageMeta () {
    return this.Account?.profile_image 
  }

  GetAccountFirstNameFirstLetter() {
    if(this.User) {
      return this.User?.firstName.split("").shift()
    } else if(this.OfflineMember) {
      return this.OfflineMember?.firstName.split("").shift()
    }

    return '?'
  }

    GetAccountLastNameFirstLetter() {
    if(this.User) {
      return this.User?.lastName.split("").shift()
    } else if(this.OfflineMember) {
      return this.OfflineMember?.lastName.split("").shift()
    }

    return '?'
  }
}