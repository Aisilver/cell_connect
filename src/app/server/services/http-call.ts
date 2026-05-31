import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { HttpCallOptions } from '../types';
import { AuthService } from 'src/app/main-features/features/auth/services/auth.service';
import { AppMainService } from 'src/app/general-services/app-main.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  private http = inject(HttpClient)

  private authService = inject(AuthService)

  private appService = inject(AppMainService)

  httpCall<T>(pathUrlCommand: (string | number)[] | string, queries = {}, opt?: HttpCallOptions){
    const uri = this.urlBulder(typeof pathUrlCommand == 'string' ? [pathUrlCommand] : pathUrlCommand)

    let headers = new HttpHeaders(),

    params = new HttpParams()
 
    if(Object.entries(queries).length > 0)
      for (const key in queries) {
        //@ts-ignore
        params = params.set(key, queries[key])
      }

    if(!opt?.dontIncludeAuthenticationHeader) 
      headers = headers.set("Authorization", `Bearer ${this.authService.getAccessToken()}`)

    if(!opt?.dontIncludeClientId) 
      headers = headers.set("x-client-id", this.appService.ClientID)

    return {
      get: () => this.http.get<T>(uri, {params, headers, withCredentials: true}),

      post: (body: any) => this.http.post<T>(uri, body, {params, headers, withCredentials: true}),

      update: (body: any) => this.http.put<T>(uri, body, {params, headers, withCredentials: true}),

      delete: () => this.http.delete<T>(uri, {params, headers, withCredentials: true})
    } 
  }

  private urlBulder(pathsArray: (string | number)[]){
    const {development, proxyPrefix, apiBaseUrl} = enviroment

    if(development) return `/${proxyPrefix}/${pathsArray.join("/")}`
    
    else return `${apiBaseUrl}/${pathsArray.join("/")}`
  }
} 