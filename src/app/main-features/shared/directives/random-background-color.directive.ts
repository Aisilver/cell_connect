import { AfterViewInit, Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { RandomBetween, RandomFrom } from 'src/app/functions/randoms.func';

@Directive({
  selector: '[appRandomBackgroundColor]'
})
export class RandomBackgroundColorDirective implements AfterViewInit {

  private render = inject(Renderer2)

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    const bg = this.HexColorGenrator()
    
    this.render.setStyle(this.elementRef.nativeElement, "background-color", bg)
    
    this.render.setStyle(this.elementRef.nativeElement, "color", this.getAccessibleTextColor(bg))
  }

  private HexColorGenrator () {
    let hex = "#"  

    const hexLetters = ['a', 'b', 'c', 'd', 'e', 'f']

    for (let i = 0; i < 6; i++) {
      hex += RandomFrom([RandomFrom(hexLetters), RandomBetween(0, 9)])
    }

    return hex
  }

  private getAccessibleTextColor(hex: string): "#000000" | "#FFFFFF" {
    const rgb = hex
        .replace("#", "")
        .match(/.{2}/g)!
        .map(v => parseInt(v, 16) / 255)
        .map(c =>
            c <= 0.03928
                ? c / 12.92
                : Math.pow((c + 0.055) / 1.055, 2.4)
        );

    const luminance =
        0.2126 * rgb[0] +
        0.7152 * rgb[1] +
        0.0722 * rgb[2];

    const whiteContrast = 1.05 / (luminance + 0.05);
    const blackContrast = (luminance + 0.05) / 0.05;

    return whiteContrast > blackContrast ? "#FFFFFF" : "#000000";
  } 
}
