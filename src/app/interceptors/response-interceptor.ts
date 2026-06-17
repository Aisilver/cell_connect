import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, mergeMap, retry, throwError } from 'rxjs';
import { ApiResponse } from '@shared/common';
import { ServerResponseEncryptionService } from '../server/services/server-response-encryption.service';
import { EncryptedResponse } from '../server/types';
import { ResponseInterceptorService } from './services/response-interceptor.service';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {

  const serverEncryptionService = inject(ServerResponseEncryptionService),

  service = inject(ResponseInterceptorService)

  return next(req).pipe(
    mergeMap(async event => {
      if(event instanceof HttpResponse && event.headers.get("x-content-encrypted")) {
        
        let decryptedData: string

        try {
          
          decryptedData = await serverEncryptionService.decryptServerResponse(event.body as EncryptedResponse)

        } catch (err) {

          decryptedData = JSON.stringify({
            status: "failed",
            code: "API_RESPONSE_DECRYPTION_FAILED",
            data: null
          })
        }

        return event.clone({body: JSON.parse(decryptedData)})
      }

      return event
    }),

    retry({
      count: 3,

      delay(err) {
        const {error, status} = err as HttpErrorResponse,

        code = (error as ApiResponse).code,

        Is_A_Retry_Error = status == 401 || code == "TOKEN_EXPIRED",

        $action = Is_A_Retry_Error ? from(service.refreshAppAccessToken()) : from(service.askForRetry())

        return $action.pipe(
          catchError(() => {
            service.logout()
            return throwError(() => error)
          })
        )
      },
    })
  )
};