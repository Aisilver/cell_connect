import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, mergeMap, Observable, of, retry, switchMap, throwError } from 'rxjs';
import { AuthRouteAPICallService } from '../server/route-services/auth-route/auth-route-api-call.service';
import { MainFeaturesRouteService } from '../main-features/services/main-features-route.service';
import { AuthService } from '../main-features/features/auth/services/auth.service';
import { ApiResponse } from '@shared/common';
import { GCenteredModalsService } from '../main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { ConfirmDialogueOutput } from '../main-features/shared/modals/centered-modals/dialogues/types';
import { AppMainService } from '../general-services/app-main.service';
import { ServerResponseEncryptionService } from '../server/services/server-response-encryption.service';
import { EncryptedResponse } from '../server/types';

export const responseInterceptor: HttpInterceptorFn = (req, next) => {

  const serverEncryptionService = inject(ServerResponseEncryptionService),

  AuthApiCall = inject(AuthRouteAPICallService),

  authService = inject(AuthService),

  featureRouteService = inject(MainFeaturesRouteService),

  GC_Modal = inject(GCenteredModalsService),

  appMainService = inject(AppMainService) 

  return next(req).pipe(
    mergeMap(async event => {
      if(event instanceof HttpResponse && event.headers.get("x-content-encrypted")) {
        
        let decryptedData: string

        try {
          
          decryptedData = await serverEncryptionService.decryptServerResponse(event.body as EncryptedResponse)

        } catch (err) {
          console.log(err)
          
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
    
    catchError((err: HttpErrorResponse) => {      
      const {error, status} = err,

      code = error ? (error as ApiResponse).code : undefined

      if(status === 401 || code == 'TOKEN_EXPIRED') {
        return AuthApiCall.getRefreshAccessToken().pipe(
          switchMap(response => {
            const isOk = AuthApiCall.responseChecker(response),

            newAccessToken = response.data

            if(!isOk) {
              featureRouteService.toAuth("login")
              return of()
            }else {
              const retryReq = req.clone({
                setHeaders: {"Authorization": `Bearer ${newAccessToken}`}
              })

              authService.setAccesToken(newAccessToken)

              return next(retryReq)
            }
          }),

          catchError((err) => throwError(() => err))
        )
      } else {
        return new Observable<ConfirmDialogueOutput>(obvs => {
          GC_Modal.openConfirmDialogueAsync({
            title: "do you want to try to re-establish connection now?",
            message: `an unexpected problem has occured while communicating with the ${appMainService.Title} server.`,
            type: 'alert',
            buttonConfig: {
              noButton: {
                text: "cancel"
              },
              yesButton: {
                text: "retry"
              }
            }
          }).then(result => result.answer ? obvs.next(result) : obvs.error())
        }).pipe(
          switchMap( () => {
            return next(req.clone())
          }),

          catchError(() => throwError(() => err))
        )
      }
    })
  )
};
