import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/general-services/storage.service';

@Injectable({
  providedIn: 'any'
})
export class LoginMainService {
  private readonly SignInEmailStoreKey = "remember-me"

  private store = inject(LocalStorageService)

  remeberMe(email: string) {
    this.store.set(this.SignInEmailStoreKey, email)
  }

  getStoredEmail = () => this.store.get<string>(this.SignInEmailStoreKey)
}
