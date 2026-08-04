import { inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SystemNotification } from '@shared/notifications';
import { enviroment } from 'src/enviroments/enviroment';
import { GCenteredModalsService } from 'src/app/main-features/shared/modals/centered-modals/service/g-centered-modals-service';
import { MainFeaturesRouteService } from 'src/app/main-features/services/main-features-route.service';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { ServerResponseEncryptionService } from '../services/server-response-encryption.service';

@Injectable({
  providedIn: 'root'
})
export class MainSSEService {
  private declare eventSource: EventSource

  private event_API_Route_Name = "notifications"

  private GC_Modal = inject(GCenteredModalsService)

  private mainFeatureRouter = inject(MainFeaturesRouteService)

  private appMainService = inject(AppMainService)

  private serverEncryptionService = inject(ServerResponseEncryptionService)

  $ServerSideEvents = new Subject<SystemNotification<any>>()

  Init () {
    const {apiBaseUrl} = enviroment,
    
    url = `${apiBaseUrl}/${this.event_API_Route_Name}?clid=${this.appMainService.ClientID}`

    this.eventSource = new EventSource(url, {withCredentials: true})

    this.eventSource.onmessage = ev => {
      const parsedData = JSON.parse(ev.data)

      this.OnMessage(parsedData)
    }

    this.eventSource.onerror = err => this.OnFail()

  }

  private async OnMessage (data: any) {
    const decryptedData = JSON.parse(await this.serverEncryptionService.decryptServerResponse(data))

    this.$ServerSideEvents.next(decryptedData)
  }

  private OnFail () {
    this.GC_Modal.openDialogue({
      title: "failed to connect to notification service",

      message: "We couldn't establish a secure connection for notifications. You'll be redirected to the home page."
    }, () => this.BackToLogin())
  }

  private BackToLogin () {
    this.mainFeatureRouter.toHome()
  }
}