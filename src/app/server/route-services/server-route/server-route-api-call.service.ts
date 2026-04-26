import { Injectable } from '@angular/core';
import { BaseRouteService } from '../../services/base-route.service';
import { ApiResponse } from '@shared/common/api-response';
import { EncryptionRegistery } from '@shared/route-types';
import { AppSettings } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class ServerRouteAPICallService extends BaseRouteService {
  protected override route_base: string = "server"

  pingServer = () => this.httpService.httpCall<ApiResponse<string>>('ping', undefined, {dontIncludeAuthenticationHeader: true, dontTriggerOnErrorMechanisim: true, dontIncludeClientId: true}).get()

  register_encryption = (data: EncryptionRegistery) => this.httpService.httpCall<ApiResponse>("pub_enc_reg", undefined, {dontIncludeAuthenticationHeader: true, dontTriggerOnErrorMechanisim: true, dontIncludeClientId: true}).post(data)

  getAppSettings = () => this.httpService.httpCall<ApiResponse<AppSettings>>("get-app-settings", undefined, {dontIncludeAuthenticationHeader: true, dontTriggerOnErrorMechanisim: true}).get()
}