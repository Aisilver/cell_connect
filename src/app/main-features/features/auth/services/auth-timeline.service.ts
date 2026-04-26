import { Injectable } from '@angular/core';
import gsap from 'gsap';

type DestopGSAPTimlineElementConfig = {
  formBoxElement: HTMLElement,
  backroundElement: HTMLElement,
  toggleLeftElement: HTMLElement,
  toggleRightElement: HTMLElement,
}

@Injectable({
  providedIn: 'any'
})
export class AuthTimelineService {
  private declare elements: DestopGSAPTimlineElementConfig

  setElements(elements: DestopGSAPTimlineElementConfig) {
    this.elements = elements
  }

  getDesktopLoginFirstGSAPTimeLine (cb: () => void) {
    const timeline =  gsap.timeline({paused: true}),
    
    {backroundElement, formBoxElement, toggleLeftElement, toggleRightElement} = this.elements

    setTimeout(() => {
      gsap.set(formBoxElement, {visibility: "visible"})
    }, 100);

    timeline
      .fromTo(backroundElement, {left: "-250%"}, {left: "50%", duration: 1.8, ease: "power1.out"})
      .fromTo(toggleLeftElement, {left: "0%"}, {left: "-50%", duration: .6}, "<")
      .add("mid-point", .3)
      .call(() => cb(), undefined, "mid-point")
      .fromTo(formBoxElement, {right: "0%"}, {right: "50%", duration: .6, ease: "power1.out"}, "-=.6")
      .fromTo(toggleRightElement, {right: "-50%"}, {right: "0%", duration: .6}, "-=.6")

    return timeline
  }

  getDesktopSignUpFirstGSAPTimeLine (cb: () => void) {
    const timeline =  gsap.timeline({paused: true}),
    
    {backroundElement, formBoxElement, toggleLeftElement, toggleRightElement} = this.elements

    setTimeout(() => {
      gsap.set(formBoxElement, {visibility: "visible"})
    }, 100);

    timeline
      .fromTo(backroundElement, {left: "50%"}, {left: "-250%", duration: 1.8, ease: "power1.out"})
      .fromTo(toggleRightElement, {right: "0%"}, {right:"-50%", duration: .6}, "<")
      .add("mid-point", .3)
      .call(() => cb(), undefined, "mid-point")
      .fromTo(formBoxElement, {right: "50%"}, {right: "0%", duration: .6, ease: "power1.out"}, "-=.6")
      .fromTo(toggleLeftElement, {left: "-50%"}, {left: "0%", duration: .6}, "-=.6")

    return timeline
  }

  getMobileGSAPTimeLine (cb: () => void) {
    const {formBoxElement} = this.elements,

    timeline = gsap.timeline({paused: true})

    timeline
      .fromTo(formBoxElement, {opacity: 1}, {opacity: 0})
      .add("mid-point", .3)
      .call(() => cb(), undefined, "mid-point")
      .to(formBoxElement, {opacity: 1})

    return timeline
  }
}