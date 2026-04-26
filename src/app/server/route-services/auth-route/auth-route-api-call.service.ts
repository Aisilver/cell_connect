import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { ApiResponse } from '@shared/common/api-response';
import { 
  EmailOTPVerificationResponse, 
  UserCreationRequest, 
  InUseResponse, 
  SignInCredentials, 
  UserSignInResponse
} from '@shared/route-types';

@Injectable({
  providedIn: 'root'
})
export class AuthRouteAPICallService extends BaseRouteService {
  protected override route_base: string = 'auth'

  sendOtp = (email: string) => this.httpService.httpCall<ApiResponse<string>>([this.route_base, 'send-otp', email], undefined, {dontIncludeAuthenticationHeader: true}).get()

  verifyEmail = (email: string) => this.httpService.httpCall<ApiResponse<InUseResponse>>([this.route_base, "verify-email"], undefined, {dontIncludeAuthenticationHeader: true}).post({email})
  
  verifyUserName = (username: string) => this.httpService.httpCall<ApiResponse<InUseResponse>>([this.route_base, "verify-username"], undefined, {dontIncludeAuthenticationHeader: true}).post({username})

  verifyPhoneNumber = (phoneNumber: string) => this.httpService.httpCall<ApiResponse<InUseResponse>>([this.route_base, "verify-phone-number"], undefined, {dontIncludeAuthenticationHeader: true}).post({phoneNumber}) 

  verifyOtp = (ref: string, otp: string) => this.httpService.httpCall<ApiResponse<EmailOTPVerificationResponse>>([this.route_base, "verify-otp", ref, otp], undefined, {dontIncludeAuthenticationHeader: true}).get()

  createAccount = (data: UserCreationRequest) => this.httpService.httpCall<ApiResponse>([this.route_base, 'create-user-account'], undefined, {dontIncludeAuthenticationHeader: true}).post(data)

  getRefreshAccessToken = () => this.httpService.httpCall<ApiResponse<string>>([this.route_base, 'refresh'], undefined, {dontIncludeAuthenticationHeader: true}).get()

  signInUser = (cred: SignInCredentials) => this.httpService.httpCall<ApiResponse<UserSignInResponse>>([this.route_base, 'sign-in-user'], undefined, {dontIncludeAuthenticationHeader: true}).post(cred)  

  changeUserPassword = (cred: SignInCredentials) => this.httpService.httpCall<ApiResponse>([this.route_base, "update-password"], undefined, {dontIncludeAuthenticationHeader: true}).post(cred)

  initUser = () => this.httpService.httpCall<ApiResponse<UserSignInResponse>>([this.route_base, "init-user"], undefined, {dontIncludeAuthenticationHeader: true}).get()
}