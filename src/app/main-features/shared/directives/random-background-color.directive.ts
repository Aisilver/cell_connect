import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { RandomBetween, RandomFrom } from 'src/app/functions/randoms.func';

@Directive({
  selector: '[appRandomBackgroundColor]'
})
export class RandomBackgroundColorDirective implements AfterViewInit {

  private render = inject(Renderer2)

  constructor(private elementRef: ElementRef) { }


  private HexColorGenrator () {
    let hex = "#" 

    const hexLetters = ['a', 'b', 'c', 'd', 'e', 'f']

    for (let i = 0; i < 6; i++) {
      hex += RandomFrom([RandomFrom(hexLetters), RandomBetween(0, 9)])
    }

    return hex
  }

  ngAfterViewInit(): void {
    this.render.setStyle(this.elementRef.nativeElement, "background-color", this.HexColorGenrator())
  }
}
