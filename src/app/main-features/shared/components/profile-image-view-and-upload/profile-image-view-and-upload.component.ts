import { AfterViewInit, Component, EventEmitter, inject, Input, Output, signal, ViewChild } from '@angular/core';
import { ImageComponent } from "../image/image.component";
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';
import { UUIDGenerator } from 'src/app/functions/UUID-generator.func';
import { GCenteredModalsService } from '../../modals/centered-modals/service/g-centered-modals-service';
import { enviroment } from 'src/enviroments/enviroment';
import { ApiResponse } from '@shared/common';
import { FIleService, ImageScreeningErrorTypes } from 'src/app/general-services/file.service';
import { Media } from '@shared/entities';

@Component({
  selector: 'app-profile-image-view-and-upload',
  imports: [
    CommonModule,
    ImageComponent,
    IconComponent
],
  template: `
    <app-image default="NO-PROFILE-PHOTO"></app-image>

    <label [htmlFor]="UUID" class="clickable" [ngClass]="{loading: Loading()}">
      <div class="load-screen"></div>

      <app-icon *ngIf="!Loading() && !HasImage()" name="plus"></app-icon>

      <app-icon *ngIf="!Loading() && HasImage()" name="pen"></app-icon>
      
      <app-icon *ngIf="Loading()" class="spinner" name="spinner"></app-icon>

      <input (change)="OnFileChange($event)" type="file" accept="image/*" hidden [id]="UUID">
    </label>
  `,
  styleUrl: './profile-image-view-and-upload.component.scss'
})
export class ProfileImageViewAndUploadComponent implements AfterViewInit {
  private gc_modal = inject(GCenteredModalsService)

  private fileService = inject(FIleService)

  @ViewChild(ImageComponent)
  imageComp!: ImageComponent

  @Input()
  imageMedia?: Media

  @Output("profileImageRef")
  private output: EventEmitter<string> = new EventEmitter()

  UUID = UUIDGenerator()

  Loading = signal(false)

  PercentLoaded = signal(0)

  HasImage = signal(false)

  ngAfterViewInit(): void {
    if(this.imageMedia) this.HasImage.update(() => true)
  }

  onProgress (percentCompleted: number | null){
    if(percentCompleted == null) {
      this.Loading.update(() => false)
      this.PercentLoaded.update(() => 0)
    }else if(percentCompleted == 100) {
      this.Loading.update(() => false)

      setTimeout(() => this.PercentLoaded.update(() => 0), 500)
    }else 
      this.PercentLoaded.update(() => percentCompleted)
  }

  onImageScreeningError(errMsg: ImageScreeningErrorTypes) {
    switch(errMsg) {
      case "too-big": {
        this.gc_modal.openDialogue({
          title: "file to big",
          type: "alert",
          message: `the image you picked exceeds the 5MB size limit`
        })
      } break;

      case "invalid-extension": {
        this.gc_modal.openDialogue({
          title: "invalid image extension",
          type: "alert",
          message: `only images of type "jpeg, jpg, webp, png" are allowed`
        })
      }break
    }
  }

  async OnFileChange(event: Event) {
    const files = (event.target as HTMLInputElement).files,

    fileUploadUrl = `${enviroment.apiBaseUrl}/media/cache-upload`

    if(!files) return

    const payload = this.fileService.ImageFileScreeningToFOrmData(files[0], errMsg => this.onImageScreeningError(errMsg))

    if(!payload) return

    try {
      this.Loading.update(() => true)

      const response = await this.fileService.UploadFiieWithProgress<ApiResponse<string>>(fileUploadUrl, payload, e => this.onProgress(e))

      if(response.status != 'success') throw Error(response.message)

      this.output.emit(response.data)

      this.imageComp.LoadImage(URL.createObjectURL(files[0]))

      this.HasImage.update(() => true)

    } catch (error: any) {
      this.gc_modal.openDialogue({
        type: "alert",
        message: error.message,
        title: "upload failed"
      })  
    }
  }
}