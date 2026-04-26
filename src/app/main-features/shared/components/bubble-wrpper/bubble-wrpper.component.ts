import { AfterViewInit, Component, ElementRef, inject, QueryList, Renderer2, signal, ViewChild, ViewChildren } from '@angular/core';
import gsap from 'gsap';
import { AllChildDOMElementFlexer } from 'src/app/functions/all-child-flexer.func';
import { RandomFrom, RandomNumberFrom } from 'src/app/functions/randoms.func';

@Component({
  selector: 'app-bubble-wrapper',
  imports: [],
  template: `
    <div class="bubbles-container" #bubbleContainer>
      @for (item of BubbleCount(); track $index) {
        <div #bubbleContainer class="bubble-container">
          <div #bubble class="bubble"></div>
        </div>
      }
    </div>

    <div class="content" #content>
      <ng-content></ng-content>
    </div>
  `,
  styleUrl: './bubble-wrpper.component.scss'
})
export class BubbleWrpperComponent implements AfterViewInit {
  @ViewChild('content', {static: true}) 
  private contentRef!: ElementRef<HTMLElement>

  @ViewChild('bubbleContainer', {static: true})
  private bubbleContainerRef!: ElementRef<HTMLElement>

  @ViewChildren('bubble', {read: ElementRef})
  private bubblesQueryRef!: QueryList<ElementRef>

  @ViewChildren('bubbleContainer', {read: ElementRef})
  private bubbleContainersQueryRef!: QueryList<ElementRef>

  private render = inject(Renderer2)

  BubbleCount = signal<any []>([])

  ngAfterViewInit(): void {
    AllChildDOMElementFlexer(this.contentRef.nativeElement)

    this.setBubblesCount()

    setTimeout(() => {
      this.styleBubbleContainerAndBubble()
    });
  }

  private setBubblesCount () {
    const {width, height} = this.bubbleContainerRef.nativeElement.getBoundingClientRect(),

    colunms = Math.floor(width / 100),

    rows = Math.floor(height / 100)

    this.BubbleCount.update(() => new Array(colunms + rows).fill(null))
  }

  private styleBubbleContainerAndBubble () {
    for (let i = 0; i < this.bubbleContainersQueryRef.length; i++) {

      const bubbleContainerRef = this.bubbleContainersQueryRef.get(i),

      bubbleRef = this.bubblesQueryRef.get(i)

      if(!bubbleRef || !bubbleContainerRef) continue;

      this.render.setStyle(bubbleContainerRef.nativeElement, RandomFrom(['top', 'bottom']), `${RandomNumberFrom(100)}%`)

      this.render.setStyle(bubbleContainerRef.nativeElement, RandomFrom(['left', 'right']), `${RandomNumberFrom(100)}%`)

      this.render.setStyle(bubbleRef.nativeElement, "transform", `scale(.${RandomNumberFrom(5)})`)

      this.render.setStyle(bubbleContainerRef.nativeElement, "opacity", "1")
    }
  }
}