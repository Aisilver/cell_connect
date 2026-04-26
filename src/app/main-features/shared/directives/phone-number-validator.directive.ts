import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { APP_REGEXS } from 'src/app/configurations/app-regexs/app-regexs.confguration';
import { Debouncer } from 'src/app/functions/debouncer.func';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { AsyncValidatorBase } from '../../../classes/async-validator-base.class';

@Directive({
  selector: '[appPhoneNumberValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: PhoneNumberValidatorDirective,
      multi: true
    }
  ]
})
export class PhoneNumberValidatorDirective extends AsyncValidatorBase implements AsyncValidator {
  private AppRegexes = inject(APP_REGEXS)

  protected override componentElement: HTMLElement = inject(ElementRef).nativeElement;

  @Input()
  DoNotCheckIfPhoneNumberAlreadyExists?: boolean

  constructor(
		private AuthAPiCall: AuthRouteAPICallService
  ){super()}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise<ValidationErrors | null>((res) => {
      const value: string = control.value

      if(!value) res(null)

      else if(!value.match(this.AppRegexes.MUST_CONTAIN_ONLY_NUMBERS)) return res({inValidNumberFormat: true})

      else if(value.length < 10) return res({tooShort: true})

      if (this.DoNotCheckIfPhoneNumberAlreadyExists) return res(null)

      Debouncer("phone-number-validation", async () => {
        try {
          this.blurInput()

          const {data, status} = await ObservableToPromise(this.AuthAPiCall.verifyPhoneNumber(value))

          if(status != "success") throw Error()

          res(data.inUse ? {phoneNumberInUse: true} : null)
        
        } catch {
          res({validationFailed: true})
        } finally {
          this.unBlurInput()
        }
      })
    })
  }
}
