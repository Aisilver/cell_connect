import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, OnChanges, Output, Renderer2, signal, SimpleChanges } from '@angular/core';
import { Pagination } from '@shared/common';
import { IconComponent } from "../icon/icon.component";

@Component({
  selector: 'app-pagination',
  imports: [
    CommonModule,
    IconComponent
],
  template: `
    <main class="content">
      <section>
        <button [ngClass]="{disabled: CurrentPage() == 1}" [disabled]="CurrentPage() == 1" (click)="Prev()"><app-icon name="chevron-left"></app-icon> Prev</button>

        <ul>
          @for (item of Paginations(); track $index) {
            <li (click)="SelectPage(item)" [ngClass]="{disabled: CurrentPage() === item}">{{item}}</li>
          }
        </ul>
        
        <button [ngClass]="{disabled: CurrentNumberOfPagesLeft() === 0}" [disabled]="CurrentNumberOfPagesLeft() === 0" (click)="Next()">Next <app-icon name="chevron-right"></app-icon></button>
      </section>

      <div class="bottom-btn-group">
        <button [ngClass]="{disabled: CurrentPage() == 1}" [disabled]="CurrentPage() == 1" (click)="Prev()"><app-icon name="chevron-left"></app-icon> Prev</button>

        <button [ngClass]="{disabled: CurrentNumberOfPagesLeft() === 0}" [disabled]="CurrentNumberOfPagesLeft() === 0" (click)="Next()">Next <app-icon name="chevron-right"></app-icon></button>
      </div>
    </main>
  `,
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges, AfterViewInit {
  private componentElement: HTMLElement = inject(ElementRef).nativeElement

  private render = inject(Renderer2)

  @Input()
  NumberOfPagesLeft?: number

  @Input()
  limit?: number

  @Input()
  Page?: number

  @Input()
  Loading?: boolean

  CurrentPage = signal(0)

  CurrentNumberOfPagesLeft = signal(0)

  private Delta = 1

  private DefaultLimit = 20

  Paginations = signal<(number | string)[]>([])

  @Output("selectedPagination")
  private output: EventEmitter<Pagination> = new EventEmitter()

  ngOnChanges(changes: SimpleChanges): void {
    this.Paginations.update(() => this.RunPagination(this.Page, this.NumberOfPagesLeft))

    this.render.removeClass(this.componentElement, "open")

    if(this.CurrentPage() != 1 || this.CurrentNumberOfPagesLeft() != 0)
      this.render.addClass(this.componentElement, 'open')
  }

  ngAfterViewInit(): void {
    this.EmitPagination(this.Page, this.limit)

    this.Paginations.update(() => this.RunPagination(this.Page, this.NumberOfPagesLeft))
  }

  Prev () {
    this.SelectPage(this.CurrentPage() - 1)
  }

  Next () {
    this.SelectPage(this.CurrentPage() + 1)
  }

  SelectPage (page: number | string) {
    if(typeof page == 'string' || this.Loading) return

    this.EmitPagination(page, this.limit ?? this.DefaultLimit)
  }

  RunPagination (currentPage?: number, numberOfPagesLeft?: number) {
    currentPage = currentPage ?? 1

    numberOfPagesLeft = numberOfPagesLeft ?? 0

    this.CurrentPage.update(() => currentPage)

    this.CurrentNumberOfPagesLeft.update(() => numberOfPagesLeft)

    const TotalPages = currentPage + numberOfPagesLeft

    const range: (string | number)[] = [],
    
    left = Math.max(2, currentPage - this.Delta),

    right = Math.min(TotalPages - 1, currentPage + this.Delta)

    range.push(1)

    if(left > 2){
      range.push("...")
    }

    for(let i = left; i <= right; i++){
      range.push(i)
    }

    if(right < TotalPages - 1){
      range.push("...")
    }

    if(TotalPages > 1) {
      range.push(TotalPages)
    }

    return range
  }

  private EmitPagination (page?:number, limit?: number) {
    this.output.emit({page: page ?? 1, limit: limit ?? this.DefaultLimit})
  }
}