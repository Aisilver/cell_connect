import { AfterViewInit, Component, ContentChildren, ElementRef, inject, Input, NO_ERRORS_SCHEMA, OnDestroy, OutputRefSubscription, QueryList, Renderer2, TemplateRef, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { JQuerySlickOptions } from 'ngx-slick-options'
import { SlickChildInstance } from './slick-child-instance.interface';
import { DOMService } from '../../../../general-services/dom.service';

type BeforChangeParam = {
  currentSlide: number;
  nextSlide: number;
}

type AfterChangeParam = {
  currentSlide: number;
  first: boolean;
  last: boolean;
}

@Component({
  selector: 'app-slick-carousel-wrapper',
  imports: [
    SlickCarouselModule
  ],
  template: `
    <ngx-slick-carousel #carousel_element [config]="options">

      @for (item of slideItemTemplates; track $index) {
        <slick-slide #slickItemWrapper>
          <ng-container #slideContainerRef></ng-container>
        </slick-slide>
      }
  
    </ngx-slick-carousel>
  `,
  styleUrl: './slick-carousel-wrapper.component.scss',
  schemas: [NO_ERRORS_SCHEMA]
})
export class SlickCarouselWrapperComponent implements AfterViewInit, OnDestroy {
  private compElement = inject(ElementRef).nativeElement

  private domService = inject(DOMService)

  private render = inject(Renderer2)

  private slickChildrenIntance: (SlickChildInstance | null) [] = []

  private beforchangeSubs?: OutputRefSubscription

  private afterchangeSubs?: OutputRefSubscription

  @Input()
  options?: JQuerySlickOptions;

  @ViewChild('carousel_element', {read: ElementRef, static: true})
  private carouselElement!: ElementRef<HTMLElement> 

  @ViewChild(SlickCarouselComponent)
  private slick_carousel!: SlickCarouselComponent

  @ViewChildren('slickItemWrapper', {read: ElementRef})
  private vcrWrappersQueryList!: QueryList<ElementRef<HTMLElement>>

  @ViewChildren('slideContainerRef', {read: ViewContainerRef})
  private vcrQueryLists!: QueryList<ViewContainerRef>

  @ContentChildren('slick_item')
  private slickChildrenref!: QueryList<SlickChildInstance | ElementRef>

  @ContentChildren('slick_temp')
  slideItemTemplates!: QueryList<TemplateRef<any>>

  get Slick () {
    return this.slick_carousel
  }

  ngAfterViewInit(): void {
    for (let i = 0; i < this.vcrWrappersQueryList.length; i++) {
      const DOM_wrapper = this.vcrWrappersQueryList.get(i),
      
      viewRef = this.vcrQueryLists.get(i),

      templateRef = this.slideItemTemplates?.get(i)

      if(!DOM_wrapper) throw Error(`no wrapper container at index ${i}`)

      if(!viewRef) throw Error(`no view container reference at index ${i}`)
      
      if(!templateRef) throw Error(`no template reference at index ${i}`)

      const {rootNodes} = viewRef.createEmbeddedView(templateRef)
      
      this.render.setStyle(DOM_wrapper.nativeElement, "display", "flex")

      this.render.setStyle(DOM_wrapper.nativeElement, "padding", `${this.options?.padding ?? 0}px`)

      this.render.setStyle(rootNodes[0], "flex", "1")

      this.domService.matchTargetSize(this.compElement, DOM_wrapper.nativeElement, {matchHeight: true, observeHeight: true})
    }

    this.beforchangeSubs = this.slick_carousel.beforeChange.subscribe(e => this.OnBeforChange(e))

    this.afterchangeSubs = this.slick_carousel.afterChange.subscribe(e => this.OnAfterChange(e))

    this.domService.matchTargetSize(this.compElement, this.carouselElement.nativeElement, {observeWidth: true})

    setTimeout(() => {this.storeSlickChildrenInstances()})

    this.slick_carousel.initSlick()
  }

  Revap (){
    this.slick_carousel.unslick()
    setTimeout(() => this.slick_carousel.initSlick());
  }

  private OnBeforChange(param: BeforChangeParam){
    const {currentSlide, nextSlide} = param,

    currentInstance = this.slickChildrenIntance[currentSlide],

    nextInstance = this.slickChildrenIntance[nextSlide]

    try {
      //@ts-ignore
      currentInstance.onNotVisible()

      //@ts-ignore
      currentInstance.isVisble = false

    } catch {}

    try {
      //@ts-ignore
      nextInstance.beforeVisible()
    } catch {}
  }

  private OnAfterChange(param: AfterChangeParam) {
    const {currentSlide} = param

    try {
      //@ts-expect-error
      this.slickChildrenIntance[currentSlide].onVisible()

      //@ts-expect-error
      this.slickChildrenIntance[currentSlide].isVisble = true
    } catch {}
  }

  private storeSlickChildrenInstances (){ 
    for (let i = 0; i < this.slickChildrenref.length; i++) {
      const instance = this.slickChildrenref.get(i)

      //@ts-ignore
      if(instance.nativeElement) {
        this.slickChildrenIntance.push(null)
        
        continue
      }
      
      if(i == (this.options?.initialSlide ?? 0)){
        try {
          (instance as SlickChildInstance).isVisble = true;
          
          (instance as SlickChildInstance).isFirst = true;
          
          //@ts-ignore
          (instance as SlickChildInstance).onVisible();
        } catch {}
      } else if (i == this.slickChildrenref.length -1) {
        try {
          (instance as SlickChildInstance).isLast = true;
        } catch {}
      }

      //@ts-ignore
      this.slickChildrenIntance.push(instance)
    }
  }

  ngOnDestroy(): void {
    this.beforchangeSubs?.unsubscribe()

    this.afterchangeSubs?.unsubscribe()
  }
}