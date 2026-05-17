import { inject, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'any'
})
export class DOMService {
  matchTargetSize (target: HTMLElement, element: HTMLElement,
    opt?: {
      matchSize?: boolean,
      matchwidth?: boolean,
      matchHeight?: boolean,
      observeHeight?: boolean, 
      observeWidth?: boolean
    }) {
    
    const {clientHeight, clientWidth} = target

    if(opt?.matchSize){
      element.style.height = `${clientHeight}px`
      
      element.style.width = `${clientWidth}px`
    }else if(opt?.matchHeight) element.style.height = `${clientHeight}px`

    else if(opt?.matchwidth) element.style.width = `${clientWidth}px`

    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const {width, height} = entry.contentRect

        if(opt?.observeWidth) element.style.width = `${width}px`
        
        if(opt?.observeHeight) element.style.height = `${height}px`
      }
    })

    resizeObserver.observe(target)
  }

  alignFloatElementToFitInScreenViewOrWindowView (targetElement: HTMLElement, opt?: {screenElement?: HTMLElement, timeOut?: number}) {
    setTimeout(() => {
      const padding = 20,
    
      viewBottomRect = opt?.screenElement ? opt.screenElement.getBoundingClientRect().bottom : window.innerHeight,

      dropElementRect = targetElement.getBoundingClientRect(),

      newCoordinate = dropElementRect.top - (dropElementRect.height + padding)

      if((dropElementRect.bottom + padding) > viewBottomRect)
        targetElement.style.top = `${newCoordinate}px`
    }, opt?.timeOut ?? 400);
  }
}
