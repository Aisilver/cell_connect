import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, inject, Input, NO_ERRORS_SCHEMA, OnDestroy, Output, Renderer2, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { LoaderConfigMap, LoaderOptions } from './types';
import { Observable, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FourCirclesLoaderComponent } from './components/four-circles-loader/four-circles-loader.component';
import { SwirlLoaderComponent } from './components/swirl-loader/swirl-loader.component';
import { GradientLoaderComponent } from './components/gradient-loader/gradient-loader.component';
import gsap from 'gsap';

@Component({
  selector: 'app-loaders',
  imports: [
    CommonModule
  ],
  template: `
    <ng-content></ng-content>

    <load-holder [ngClass]="{active: Loading()}">
      <ng-template #load_template></ng-template>
      
      <ng-content select="[external-loader]"></ng-content>
    </load-holder>
  `,
  styleUrl: "./loaders.component.scss",
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoadersComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @Input("options")
  options?: LoaderOptions

  @Input('initial_hide')
  InitialHide?: boolean

  @Output("onReady")
  private output: EventEmitter<void> = new EventEmitter()

  @ViewChild("load_template", {read: ViewContainerRef})
  private LoaderTemplate?: ViewContainerRef

  @ContentChild('loadTarget', {read: ElementRef})
  LoadTarget?: ElementRef<HTMLElement>

  @ContentChild('externalLoader', {read: ElementRef})
  ExternalLoader?: ElementRef<HTMLElement>

  private render = inject(Renderer2)

  private compElement = inject(ElementRef).nativeElement

  private TargetPreviousStyling?: Object

  private subscription?: Subscription

  Loading = signal(false)

  ngAfterContentInit(): void {   
    // Make target element to fit component
    if(this.LoadTarget) this.render.setStyle(this.LoadTarget.nativeElement, "flex", 1)

    if(this.InitialHide) this.HideTargetElement()

    if(this.ExternalLoader) this.handleExternalLoader()
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.output.emit(), 100);
  }

  Load<T>(LoadObvs: Observable<T>, OnSuccess?: (param: T) => void, config?: LoaderOptions, OnError?: (err: any) => void){
    if(this.Loading()) return

    this.render.addClass(this.compElement, 'loading')

    this.Loading.update(() => true)

    this.HideTargetElement()

    if(!this.ExternalLoader) this.ShowSelectedLoader(config ?? this.options ?? "four-circles")

    this.subscription = LoadObvs.pipe(tap({
      next: data => {
        setTimeout(() => this.CancelLoad(), 1000);

        if(OnSuccess) OnSuccess(data)
      },
      error: err => {
        setTimeout(() => this.CancelLoad(), 1000);

        if(OnError) OnError(err)
      }
    })).subscribe()
  }

  LoadAsync<T>(LoadObvs: Observable<T>, config?: LoaderOptions) {
    return new Promise<T>((res, rej) => {
      this.Load(LoadObvs, response => res(response), config, err => rej(err))
    })
  }

  CancelLoad() {
    this.Loading.update(() => false)

    this.clearSelectedLoader()

    this.render.removeClass(this.compElement, 'loading')

    this.subscription?.unsubscribe()
    
    this.ShowTargetElement()
  }

  HideTargetElement () {
    const target = this.LoadTarget?.nativeElement

    if(!target || this.TargetPreviousStyling) return

    this.TargetPreviousStyling = {
      position: target.style['position'],
      opacity: target.style['opacity'],
      top: target.style['top']
    }

    this.render.setStyle(target, 'position', 'absolute')
    this.render.setStyle(target, 'opacity', '0')
    this.render.setStyle(target, 'top', '-10000px')
  }

  private ShowSelectedLoader(config: LoaderOptions){
    let type = typeof config == 'string' ? config : Object.entries(config)[0][0],

    comp: any

    switch(type as keyof LoaderConfigMap){
      case 'four-circles': comp = FourCirclesLoaderComponent
        break
      case 'swirl': comp = SwirlLoaderComponent
        break
      case 'gradient': comp = GradientLoaderComponent
    }

    const newComp = this.LoaderTemplate?.createComponent(comp)

    gsap.set(newComp?.location.nativeElement, {flex: "1"})

    if (typeof config != 'string') newComp?.setInput("options", Object.entries(config)[0][1])
  }

  private clearSelectedLoader () {
    this.LoaderTemplate?.clear()
  }

  private ShowTargetElement (){
    const element: HTMLElement | undefined = this.LoadTarget?.nativeElement

    if(!element) return

    Object.assign(element.style, this.TargetPreviousStyling)

    this.TargetPreviousStyling = undefined
  }

  private handleExternalLoader () {
    if(!this.ExternalLoader) return

    const {nativeElement} = this.ExternalLoader

    this.render.setStyle(nativeElement, "flex", 1)

    // Make All child Nodes have blinking loader effect
    for (let i = 0; i < nativeElement.children.length; i++) {
      const childElement = nativeElement.children.item(i)

      if(!childElement) continue;

      gsap.fromTo(childElement, 
        {
          opacity: .5,
          backgroundColor: "grey",
        },

        {
          opacity: 0,
          repeat: -1,
          duration: 2
        }
      )
    }
  }

  ngOnDestroy(): void {
    this.CancelLoad()
  }
}