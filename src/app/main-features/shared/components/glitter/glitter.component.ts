import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, QueryList, Renderer2, signal, ViewChildren } from '@angular/core';
import gsap from 'gsap';
import { RandomBetween, RandomFrom, RandomNumberFrom } from 'src/app/functions/randoms.func';

@Component({
  selector: 'app-glitter',
  imports: [CommonModule],
  template: `
    @for (item of Cells(); track $index) {
      <div
        #cell
        [ngStyle]="{
          width: CellSize + 'px',
          height: CellSize + 'px'
        }"
        class="cell">
        <span></span>
      </div>
    }
  `,
  styleUrl: './glitter.component.scss'
})
export class GlitterComponent {
  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private render = inject(Renderer2)

  private declare initialized: boolean

  @ViewChildren('cell', {read: ElementRef})
  private cellElementQuery!: QueryList<ElementRef>

  CellSize = 40

  Cells = signal<any[]>([])

  Init() {
    if(this.initialized) return
    
    this.initialized = true

    const {clientWidth, clientHeight} = this.componentElement,

    rows = Math.floor(clientHeight / this.CellSize),

    colunms = Math.floor(clientWidth / this.CellSize)

    this.Cells.update(() => new Array(rows * colunms).fill(null))

    setTimeout(() => this.SetAninmationDelayAndDuration())
  }

  Clear () {
    this.Cells.update(() => [])

    this.initialized = false
  }

  private SetAninmationDelayAndDuration() {
    this.cellElementQuery.forEach(ref => {
      const {nativeElement} = ref

      this.render.setStyle(nativeElement, RandomFrom(['left', 'right']), `${RandomNumberFrom(100)}%`)

      this.render.setStyle(nativeElement, RandomFrom(['top', 'bottom']), `${RandomNumberFrom(100)}%`)

      this.render.setStyle(nativeElement, 'animation-delay', `${RandomNumberFrom(50)}s`)

      this.render.setStyle(nativeElement, 'animation-duration', `${RandomBetween(10, 20)}s`)
    })
  }
}