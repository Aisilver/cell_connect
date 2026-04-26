import { Directive, inject } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { APP_REGEXS } from 'src/app/configurations/app-regexs/app-regexs.confguration';

@Directive({
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PassordValidatorDirective,
      multi: true
    }
  ],
  selector: '[appPassordValidator]'
})
export class PassordValidatorDirective implements Validator {

  constructor() { }

  private app_regex = inject(APP_REGEXS)
  
  validate(control: AbstractControl): ValidationErrors | null {
    const value = String(control.value ?? "")

    if(value) {
      if(!value.match(this.app_regex.MUST_CONTAIN_A_NUMBER))
        return {passwordMustContainANumber: true}
      else if (!value.match(this.app_regex.MUST_CONTAIN_A_SYMBOL))
        return {passwordMustContainASymbol: true}
      else if (!value.match(this.app_regex.MUST_CONTAIN_A_CAP_LETTER))
        return {passwordMustContainACapLetter: true}
      else if (value.length < 8)
        return {passwordIsTooShort: true}
      else return null
    } else 
      return null
  }
}
