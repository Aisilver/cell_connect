import { Injectable } from '@angular/core';
import { EncryptedResponse } from '../types';

@Injectable({
  providedIn: 'any'
})
export class ServerResponseEncryptionService {
  declare PRIVATE_B64_KEY: string
  
  declare PUBLIC_B64_KEY: string
  
  private toB64 = (arrBuffer: ArrayBuffer) => btoa(String.fromCharCode(...new Uint8Array(arrBuffer)));

  private fromB64 = (s: string) => Uint8Array.from(atob(s), c => c.charCodeAt(0));

  async decryptServerResponse (respose: EncryptedResponse) {
    const {data, iv, key} = respose,

    newData = this.fromB64(data),

    newIv = this.fromB64(iv),

    newKey = this.fromB64(key),

    privateKey = await crypto.subtle.importKey(
      "pkcs8",
      this.fromB64(this.PRIVATE_B64_KEY),
      { name: "RSA-OAEP", hash: "SHA-256" },
      false,
      ['decrypt']
    ),

    aesKey = await crypto.subtle.decrypt({name: "RSA-OAEP"}, privateKey, newKey),

    aesCryptoKey = await crypto.subtle.importKey(
      "raw",
      aesKey,
      {name: "AES-CBC"},
      false,
      ['decrypt']
    ),

    decryptedBuffer = await crypto.subtle.decrypt(
      {name: "AES-CBC", iv: newIv},
      aesCryptoKey,
      newData
    )

    return new TextDecoder().decode(decryptedBuffer)
  }

  async generateEncryptionKeys () {
    const {privateKey, publicKey} = await crypto.subtle.generateKey({
      name: "RSA-OAEP",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1,0,1]),
      hash: "SHA-256"
    }, true, ['encrypt', 'decrypt']),

    privateKeyData = await crypto.subtle.exportKey("pkcs8", privateKey),

    publicKeyData = await crypto.subtle.exportKey("spki", publicKey)

    this.PRIVATE_B64_KEY = this.toB64(privateKeyData)

    this.PUBLIC_B64_KEY = this.toB64(publicKeyData)
  }
}