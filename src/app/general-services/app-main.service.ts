import { inject, Injectable } from '@angular/core';
import { UUIDGenerator } from '../functions/UUID-generator.func';
import { LocalStorageService } from './storage.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { AppSettings } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class AppMainService {
  Title = "CellConnect"

  private storage = inject(LocalStorageService)

  private location = inject(Location)

  private router = inject(Router)

  private clientIdStoreKey = "client_id"

  readonly APP_SETTINGS: AppSettings = Object()

  get ClientID () {
    const storedId = this.storage.get<string>(this.clientIdStoreKey)

    if(storedId) return storedId

    const newId = UUIDGenerator(12)

    this.storage.set(this.clientIdStoreKey, newId)

    return newId
  }

  isMobileView = () => window.innerWidth < 500

  isTabView = () => !this.isMobileView() && window.innerWidth < 1000
  
  isDestopView = () => !this.isTabView() && !this.isMobileView()

  routeBack (backKeys: "home" | "hub" = "hub") {
    if(window.history.length > 0)
      this.location.back()
    else{
      this.router.navigate([backKeys])
    }
  }

  setAppSettings (settings: AppSettings) {
    Object.assign(this.APP_SETTINGS, settings)
  }
}