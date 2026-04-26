import { Injectable } from '@angular/core';
import crypto from "crypto-js"


abstract class StorageService {
  protected abstract store: Storage

  private readonly SECRET_KEY = "my-secret-key"

  set(key: string, data: any) {
    const serialized = typeof data == 'string' ? data : JSON.stringify(data),
    
    encrypted = crypto.AES.encrypt(serialized, this.SECRET_KEY).toString()

    this.store.setItem(key, encrypted)
  }

  get<T>(key: string): T | null {
    const stored = this.store.getItem(key)

    if(!stored) return null

    const bytes = crypto.AES.decrypt(stored, this.SECRET_KEY),

    decrypted = bytes.toString(crypto.enc.Utf8)
    
    try {
      return JSON.parse(decrypted)
    } catch {
      return decrypted as T
    }
  }

  delete (key: string) {
    this.store.removeItem(key)
  }
}

@Injectable({
  providedIn: 'any'
})
export class SessionStorageService extends StorageService {
  protected override store: Storage = sessionStorage;
}


@Injectable({
  providedIn: 'any'
})
export class LocalStorageService extends StorageService {
  protected override store: Storage = localStorage;
}
