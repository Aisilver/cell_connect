import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChildren, ElementRef, inject, Input, QueryList, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-elements-overlapper',
  imports: [
    CommonModule
  ],
  template: `
    <ng-content></ng-content>

    <span #span [ngClass]="{hide: !UnitsLeft || UnitsLeft < 1}">+{{UnitsLeft}}</span>
  `,
  styleUrl: './elements-overlapper.component.scss'
})
export class ElementsOverlapperComponent implements AfterViewInit {
  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  @Input()
  UnitsLeft?: number

  @ViewChild('span')
  private spanElementRef!: ElementRef<HTMLElement>

  @ContentChildren("lap_target", {read: ElementRef})
  private lapTargetsQuery!: QueryList<ElementRef<HTMLElement>>

  private OverlapSize = 15

  ngAfterViewInit(): void {
    const {clientWidth} = this.componentElement

    this.StyleExtraElement(this.lapTargetsQuery.first.nativeElement)

    this.lapTargetsQuery.forEach((ref, index) => {
      const {nativeElement} = ref,

      position_x = index * this.OverlapSize,

      ZindexPosition = this.lapTargetsQuery.length - index

      if(index != 0) {
        nativeElement.addEventListener("mouseover", () => {
          gsap.to(nativeElement, 
            {
              left: `-${position_x - this.OverlapSize}px`,
              zIndex: this.lapTargetsQuery.length, 
            }
          )
        })

        nativeElement.addEventListener("mouseout", () => {
          gsap.to(nativeElement, 
            {
              left: `-${position_x}px`,
              zIndex: ZindexPosition, 
            }
          )
        })
      }

      gsap.set(nativeElement, {
        position: "relative",
        left: `-${position_x}px`,
        flexShrink: "0",
        zIndex: `${ZindexPosition}`,
        cursor: "pointer"
      })
    })

    gsap.set(this.componentElement, {
      width: `${clientWidth - ((this.lapTargetsQuery.length - 1) * this.OverlapSize)}`
    })
  }

  private StyleExtraElement (exampleElement: HTMLElement) {
    const {width, height} = exampleElement.getBoundingClientRect()

    gsap.set(this.spanElementRef.nativeElement, 
      {
        width: `${width}px`,
        height: `${height}px`,
        position: "relative",
        left: `-${width + (this.OverlapSize - 5)}`
      }
    )
  }
}
