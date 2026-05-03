import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormErrorMessageComponent } from "../../../form-error-message/form-error-message.component";
import { differenceInSeconds } from 'date-fns';

@Component({
  selector: 'app-meeting-creation-form-time-validator',
  imports: [
    CommonModule,
    FormErrorMessageComponent
],
  template: `
    <div [ngClass]="{open: !DateIsValid()}">
      <app-form-error-message>{{ValidatorMessage()}}</app-form-error-message>
    </div>
  `,
  styleUrl: './meeting-creation-form-time-validator.component.scss'
})
export class MeetingCreationFormTimeValidatorComponent {
  DateIsValid = signal(true)
  
  ValidatorMessage = signal("")

  ValidateDate(startTime: Date) {
    this.ValidatorMessage.update(() => "")

    this.DateIsValid.update(() => differenceInSeconds(startTime, new Date()) >= 0)

    if(!this.DateIsValid())
      this.ValidatorMessage.update(() => `The start time you selected is in the past. Please choose a future time.`)
  }
}
