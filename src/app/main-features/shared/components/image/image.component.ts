import { AfterViewInit, Component, ElementRef, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { LoadersComponent } from "../loaders/loaders.component";
import { Observable } from 'rxjs';
import { APP_IMAGE_PATHS } from '../../../../configurations/app-image-paths/app-image-paths.confguration';
import { LoaderOptions } from '../loaders/types';
import { Media } from '@shared/entities';
import { enviroment } from '../../../../../enviroments/enviroment';
import { CommonModule } from '@angular/common';

type ImageDefaultTypes = 
  "NO-IMAGE" |
  "NO-PROFILE-PHOTO"

@Component({
  selector: 'app-image',
  imports: [
    LoadersComponent,
    CommonModule
],
  template: `
    <app-loaders [options]="loaderOptions">
      <img #image #loadTarget alt="" [ngStyle]="{objectFit: objectFit ?? 'cover'}">
    </app-loaders>
  `,
  styleUrl: './image.component.scss'
})
export class ImageComponent implements OnInit, AfterViewInit, OnChanges {
  private images_paths = inject(APP_IMAGE_PATHS) 

  @ViewChild('image', {static: true})
  imageElementRef!: ElementRef<HTMLImageElement>

  @ViewChild(LoadersComponent)
  loader?: LoadersComponent

  @Input()
  inputSrc?: string | Media

  @Input()
  mediaId?: number
  
  @Input()
  default?: ImageDefaultTypes

  @Input()
  objectFit?: "fit" | "contain" | "cover"

  declare private src: string

  declare private obvs: Observable<void>

  loaderOptions: LoaderOptions = {
    gradient: {
      type: 'gray'
    }
  }

  ngOnInit(): void {
    this.obvs = new Observable<void>(o => {  
      this.imageElementRef.nativeElement.onload = () => o.next()

      this.imageElementRef.nativeElement.onerror = () => o.error()
        
      this.imageElementRef.nativeElement.src = this.src ?? this.getDefaultImageSource(this.default)
    })

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.inputSrc){
      this.src = typeof this.inputSrc == 'string' ? this.inputSrc : this.mediaToString(this.inputSrc)
    }else if(this.mediaId && this.mediaId > 0){
      this.src = `${enviroment.apiBaseUrl}/media/byid/${this.mediaId}`
    }
  }

  ngAfterViewInit(): void {
    this.loader?.Load(this.obvs)
  }

  LoadImage(src: string) {
    this.src = src

    this.loader?.Load(this.obvs)
  }

  private getDefaultImageSource (type: ImageDefaultTypes = 'NO-IMAGE') {
    switch(type){
      case 'NO-IMAGE': return this.images_paths['NO_IMAGE_MINI']
      case 'NO-PROFILE-PHOTO': return this.images_paths['DEFAULT_uSER_PHOTO']
    }
  }

  private mediaToString(media: Media) {
    const {type, name, ext} = media

    return `${enviroment.apiBaseUrl}/media/${type}/${name}.${ext}`
  }
}
