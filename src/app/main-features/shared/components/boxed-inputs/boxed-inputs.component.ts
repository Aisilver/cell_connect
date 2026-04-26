import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, Output, QueryList, signal, SimpleChanges, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-boxed-inputs',
  imports: [
    CommonModule
  ],
  template: `
    @for (item of InputArrays(); track $index) {
      <div>

        <input 
          [ngStyle]="{
            width: Size() + 'px',
            height: Size() + 'px',
            fontSize: (Size() - 5) + 'px',
            paddingLeft: ((Size() / 100) * 30) + 'px'
          }" 
          [type]="inputType ?? 'number'" 
          (input)="onInput($event, $index)"
          (keydown)="onKeyDown($event, $index)"
          #input
        >
      </div>
    }
  `,
  styleUrl: './boxed-inputs.component.scss'
})
export class BoxedInputsComponent implements OnChanges, AfterViewInit {
  @Input()
  inputCount?: number

  @Input()
  inputType?: "text" | "number"

  @Input('size')
  InputedSize?: number | null

  @ViewChildren('input')
  inputElementRefs!: QueryList<ElementRef<HTMLInputElement>>

  @Output("result")
  private boxedResultEmmitter: EventEmitter<string> = new EventEmitter()

  @HostListener("click")
  click(){
    this.initialze()
  }

  InputArrays = signal<any[]>([])

  Size = signal(0)

  private value = ""

  private valueEmitted = false

  private get inputElementArray () {
    return this.inputElementRefs.map(ref => ref.nativeElement)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Size.update(() => Number(this.InputedSize))
  }

  ngAfterViewInit(): void {
    this.InputArrays.update(() => new Array(this.inputCount ?? 4).fill(null))

    this.Size.update(() => this.InputedSize ? this.InputedSize : 40)

    this.initialze()
  }

  initialze(){
    if(this.valueEmitted) return

    try {
      for (let i = 0; i < this.inputElementRefs.length; i++) {
        const ref = this.inputElementRefs.get(i);

        if(!ref) continue
      
        const {value} = ref.nativeElement
      
        if(!value) {
          this.setFocus(ref.nativeElement)
          return
        }
      }
    
      this.setFocus(this.inputElementRefs.last.nativeElement)
    } catch {}
  }

  onInput(ev: Event, index: number){
    try {
      const nextElementindex = index + 1,

      {value} = ev.target as HTMLInputElement

      if(value == "" || !value) return

      this.value += value

      this.setFocus(this.inputElementArray[nextElementindex])

    } catch {
      this.blurAll()

      this.boxedResultEmmitter.emit(this.value)

      this.valueEmitted = true
    }
  }

  onKeyDown (ev: Event, index: number){
    const {key} = ev as KeyboardEvent

    if(key.toLowerCase() == "backspace") {

      try {
        this.setFocus(this.inputElementArray[index -1])
        
        this.value = this.value.slice(0, index - 1)
      } catch {

        this.value = ""
      } 
    }
  }

  reset(){
    this.inputElementRefs.forEach(ref => {
      ref.nativeElement.value = ""

      this.setFocus(this.inputElementRefs.first.nativeElement)
    })
    this.value = ""

    this.valueEmitted = false
  }

  private blurAll(){
    this.inputElementRefs.forEach(ref => ref.nativeElement.blur())
  }

  private setFocus(inputField: HTMLInputElement) {
    inputField.focus()
  }
}