export type HttpCallOptions = {
  dontIncludeAuthenticationHeader?: boolean,
  dontTriggerOnErrorMechanisim?: boolean,
  dontIncludeClientId?: boolean
}

export type EncryptionKeysObj = {
  publicB64Key: string, 
  privateB64Key: string
}

export type EncryptedResponse = {
  key: string;
  iv: string;
  data: string;
}