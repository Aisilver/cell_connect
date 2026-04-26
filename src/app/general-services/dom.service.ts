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

  alignFloatElementToFitInScreenViewOrWindowView (targetElement: HTMLElement, parentElement?: HTMLElement, timeOut = 400) {
    targetElement.style.top = `120%`

    setTimeout(() => {
      const padding = 20,
    
      viewBottomRect = parentElement?.getBoundingClientRect().bottom ?? window.innerHeight,

      dropElementRect = targetElement.getBoundingClientRect(),

      newCoordinate = (dropElementRect.height + padding)

      if((dropElementRect.bottom + padding) > viewBottomRect)
        targetElement.style.top = `-${newCoordinate}px`
    }, timeOut);
  }
}
