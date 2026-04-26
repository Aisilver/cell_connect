import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../../enviroments/enviroment';
import { tap } from 'rxjs';
import { HttpCallOptions } from '../types';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { AuthService } from 'src/app/main-features/features/auth/services/auth.service';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { MainFeaturesRouteService } from 'src/app/main-features/service/main-features-route.service';

@Injectable({
  providedIn: 'root'
})
export class HttpCallService {
  private http = inject(HttpClient)

  private authService = inject(AuthService)

  private appService = inject(AppMainService)

  private GC_Modal = inject(GCenteredModalsService)

  private featureRouteService = inject(MainFeaturesRouteService)

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
      get: () => this.http.get<T>(uri, {params, headers, withCredentials: true}).pipe(tap({error: (err) => opt?.dontTriggerOnErrorMechanisim ?? this.OnError(err)})),

      post: (body: any) => this.http.post<T>(uri, body, {params, headers, withCredentials: true}).pipe(tap({error: (err) => opt?.dontTriggerOnErrorMechanisim ?? this.OnError(err)})),

      update: (body: any) => this.http.put<T>(uri, body, {params, headers, withCredentials: true}).pipe(tap({error: (err) => opt?.dontTriggerOnErrorMechanisim ?? this.OnError(err)})),

      delete: () => this.http.delete<T>(uri, {params, headers, withCredentials: true}).pipe(tap({error: (err) => opt?.dontTriggerOnErrorMechanisim ?? this.OnError(err)}))
    } 
  }

  private urlBulder(pathsArray: (string | number)[]){
    const {development, proxyPrefix, apiBaseUrl} = enviroment

    if(development) return `/${proxyPrefix}/${pathsArray.join("/")}`
    
    else return `${apiBaseUrl}/${pathsArray.join("/")}`
  }

  private OnError(err: HttpErrorResponse){
    this.GC_Modal.openDialogue({
      title: 'something went wrong',
      type: 'alert',
      message: "an unexpected error occurred"
    }, () => this.featureRouteService.toAuth("login"))
  }
} 