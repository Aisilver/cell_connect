import { Directive, ElementRef, inject, OnDestroy, Renderer2 } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { APP_REGEXS } from 'src/app/configurations/app-regexs/app-regexs.confguration';
import { Debouncer } from 'src/app/functions/debouncer.func';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { AsyncValidatorBase } from '../../../classes/async-validator-base.class';

@Directive({
  selector: '[appUsernameValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UsernameValidatorDirective,
      multi: true
    }
  ]
})
export class UsernameValidatorDirective extends AsyncValidatorBase implements AsyncValidator {
  private App_Regexs = inject(APP_REGEXS)

  protected override componentElement: HTMLElement = inject(ElementRef).nativeElement;

  constructor(
		private AuthAPiCall: AuthRouteAPICallService
	) {super()}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((res) => {
      const value: string = control.value

      if(!value) return res(null)

      if (value.match(this.App_Regexs.MUST_CONTAIN_A_SYMBOL)) return res({noSymbolAllowed: true})

      else if(!value.match(this.App_Regexs.MUST_CONTAIN_ONLY_LOWERCASE)) return res({noCapLetterAllowed: true})
    
      Debouncer("user-name-validator", async () => {
        try {
          this.blurInput()

          const {data, status} = await ObservableToPromise(this.AuthAPiCall.verifyUserName(value))
          
          if(status != "success") throw Error()

          res(data.inUse ? {usernameInUse: true} : null)
          
        } catch (error: any) {
          res({verificationFailed: true})
        } finally {
          this.unBlurInput()
        }
      })
    })
  }
}