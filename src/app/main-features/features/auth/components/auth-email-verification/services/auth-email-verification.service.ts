import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class AuthEmailVerificationService {
  declare private OTPReference: string

  setOtpReference (ref: string) {
    this.OTPReference = ref
  }

  getOtpReference () {
    return this.OTPReference
  }
}
