import { Injectable } from '@angular/core';
import { ToBytes } from '../functions/bytes_to.func';
import { IsValidImageExtension } from '../functions/valid-image-extension.func';

export type ImageScreeningErrorTypes = "too-big" | "invalid-extension"

@Injectable({
  providedIn: 'any'
})
export class FIleService {
  ImageFileScreeningToFOrmData (file: File, onErr?: (msg: ImageScreeningErrorTypes) => void) {
    try {
      const {type: fileType, size} = file

      if(ToBytes("mb", size) > 5) throw Error("too-big")

      const [type, ext] = fileType.split("/")

      if(!IsValidImageExtension(ext)) throw Error("invalid-extension")

      const formData = new FormData()

      formData.append("file", file)

      return formData

    } catch (error: any) {
      if(onErr) onErr(error.message)
      return
    }
  } 

  UploadFiieWithProgress<T>(url: string, formData: FormData, onProgress?: (percentComplete: number | null) => void){
    return new Promise<T>((res, rej) => {
      const xhr = new XMLHttpRequest()

      xhr.upload.onprogress = e => {
        if(onProgress) onProgress(e.lengthComputable ? (e.loaded / e.total) * 100 : null)
      }

      xhr.onload = () => {
        try {
          const parsed = JSON.parse(xhr.responseText); res(parsed)
        } catch (error) {
          rej(Error(`upload failed [code: ${xhr.status}] error: ${xhr.statusText}`)) 
        }
      }

      xhr.onerror = () => rej(Error(`upload failed [code: ${xhr.status}] error: ${xhr.responseText}`))

      xhr.open("POST", url)

      xhr.send(formData)
    })
  }
}