import { Component, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalEntity } from '../../../../../general-services/modals-service/classes/modal-entity.class';
import { ModalGenerator } from '../../../../../general-services/modals-service/classes/modal-generator.class';
import { LoadersComponent } from '../../../components/loaders/loaders.component';
import { LoaderOptions } from '../../../components/loaders/types';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';

@Component({
  selector: 'app-modal-loader',
  imports: [LoadersComponent],
  template: `
    <app-loaders [options]="options" (onReady)="Ready()"></app-loaders>
  `,
  styleUrl: './modal-loader.component.scss'
})
export class ModalLoaderComponent extends ModalEntity {
  @Input('modal-service')
  protected override modalgenerator!: ModalGenerator;

  @Input("obvs")
  LoadObvs?: Observable<any>

  @Input("options")
  options?: LoaderOptions

  @Input('on_success')
  OnSuccess?: (data: any) => void

  @Input('on_fail')
  OnError?: (err: any) => void

  @ViewChild(LoadersComponent)
  loader?: LoadersComponent

  Ready(): void {
   if(!this.LoadObvs) throw Error("observable to be loaded was not passed");

    const showLoadTimeout = setTimeout(() => this.loader?.Load(new Observable()), 500)

    ObservableToPromise(this.LoadObvs)
    
    //@ts-ignore
    .then(response => this.OnSuccess(response))
    
    //@ts-ignore
    .catch(err => this.OnError(err))

    .finally(() => {
      if(this.loader?.Loading()) this.loader?.CancelLoad()

      clearTimeout(showLoadTimeout)

      this.Destroy()
    })
  }
}