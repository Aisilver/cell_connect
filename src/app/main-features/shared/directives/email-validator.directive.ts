import { Directive, ElementRef, inject, Input, Renderer2 } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { APP_REGEXS } from 'src/app/configurations/app-regexs/app-regexs.confguration';
import { Debouncer } from 'src/app/functions/debouncer.func';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { AuthRouteAPICallService } from 'src/app/server/route-services/auth-route/auth-route-api-call.service';
import { AsyncValidatorBase } from '../../../classes/async-validator-base.class';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective extends AsyncValidatorBase implements AsyncValidator {
  private app_regexs = inject(APP_REGEXS)

  protected override componentElement: HTMLElement = inject(ElementRef).nativeElement;

  @Input()
  DoNotRunEmailExistsCheck?: boolean

  constructor(
		private AuthAPiCall: AuthRouteAPICallService,
	) {super()}

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const value: string = control.value

    return new Promise<ValidationErrors | null>((res) => {
      if(!value) return res(null)
        
      else if(!value.match(this.app_regexs.VALID_EMAIL)) return res({invalidEmailFormat: true})

      if(this.DoNotRunEmailExistsCheck) return res(null)

      Debouncer("email-validator", async () => {
				try {
					this.blurInput()

					const response = await ObservableToPromise(this.AuthAPiCall.verifyEmail(value)),

          {data, status} = response

          if(status != "success") throw Error()

          res(data.inUse ? {emailInUse: true} : null)
				} catch {
					res({verificationFailed: true})
				} finally {
					this.unBlurInput()
        }
      })
    })
  }
}
