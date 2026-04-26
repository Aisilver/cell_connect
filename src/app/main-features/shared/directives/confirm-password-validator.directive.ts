import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appConfirmPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ConfirmPasswordValidatorDirective,
      multi: true
    }
  ]
})
export class ConfirmPasswordValidatorDirective implements Validator {

  @Input('password')
  Password?: string

  constructor() { }
  
  validate(control: AbstractControl): ValidationErrors | null {
    const value = String(control.value ?? '')

    if(value !== this.Password)
      return {doesNotMatch: true}
    else 
      return null
  }
}
