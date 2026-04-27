import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, inject, Input, OnDestroy, Renderer2, signal} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-input-field-decorator',
  imports: [CommonModule],
  template: `
    <main [ngClass]="{
        noShadow: NoShadow,
        hasValue: HasValue(), 
        hasError: HasError(), 
        isTextArea: isTextArea(), 
        active: Placeholder && HidePlaceHolder()
      }" [class]="FieldStyle ?? ''">
      
      <div 
        [ngStyle]="!Placeholder ? {display: 'none'} : null" 
        [ngClass]="{hide: HidePlaceHolder()}"
        class="placeholder">
          {{Placeholder}} <span *ngIf="optionalField">(Optional)</span>
      </div>
      <ng-content></ng-content>      
    </main>
    
    <p class="input-length" [class]="FieldStyle ?? ''" *ngIf="maxLength">{{inputCount()}} / {{maxLength}}</p>
  `,
  styleUrl: './input-field-decorator.component.scss'
})
export class InputFieldDecoratorComponent implements AfterViewInit, OnDestroy {
  private render = inject(Renderer2)

  private chr = inject(ChangeDetectorRef)

  @Input()
  model?: NgModel
  
  @Input()
  optionalField?: boolean

  @Input()
  inputField!: HTMLInputElement

  @Input()
  maxLength?: number

  @Input()
  FieldStyle?: "auth" | "hub"

  @Input()
  NoShadow?: boolean
  
  @ContentChild('textField')
  private inputFieldRef!: ElementRef<HTMLInputElement>

  Placeholder!: string

  HasValue = signal(false)

  HidePlaceHolder = signal(false)

  HasError = signal(false)

  isTextArea = signal(false)

  inputCount = signal(0)

  declare interval: number

  ngAfterViewInit(): void {
    if(!this.inputFieldRef && !this.inputField) throw Error("input target 'textField' is missing")

    const inputElement = this.inputFieldRef ? this.inputFieldRef.nativeElement : this.inputField,

    {placeholder} = inputElement

    this.Placeholder = placeholder

    inputElement.placeholder = ""

    this.styleInputField(inputElement)

    this.render.listen(inputElement, "focus", () => this.HidePlaceHolder.update(() => true))

    this.render.listen(inputElement, "input", () => this.inputFieldValueCheck(inputElement))

    this.render.listen(inputElement, "blur", () => {if(!inputElement.value) this.HidePlaceHolder.update(() => false)})

    if(inputElement.nodeName.toLowerCase() != 'textarea') this.inputFieldValueCheck(inputElement) 

    if(inputElement.nodeName.toLowerCase() == 'textarea') {
      this.isTextArea.update(() => true)

      this.textareaInitValueCheck(inputElement) 
    }
    
    this.interval = setInterval(() => this.runErrorCheck());

    this.chr.detectChanges()
  }

  TriggerHasValueEffect(checkForValue = true) {
    if(checkForValue && !this.inputFieldRef.nativeElement.value) return

    this.HidePlaceHolder.update(() => true)
      
    this.HasValue.update(() => true)
  }

  private textareaInitValueCheck (inputElement: Element) {
    if((inputElement as HTMLTextAreaElement).value.trim().length < 1) return

    this.HidePlaceHolder.update(() => true)
      
    this.HasValue.update(() => true)
  }

  private inputFieldValueCheck(inputElement: HTMLInputElement) {
    if(inputElement.value) this.HasValue.update(() => true)
    
    else  this.HasValue.update(() => false)

    this.inputCount.update(() => inputElement.value.length)
  }

  private styleInputField (inputElement: HTMLInputElement){
    this.render.setStyle(inputElement, "flex", "1")
    this.render.setStyle(inputElement, "border", "none")
    this.render.setStyle(inputElement, "outline", "none")
    this.render.setStyle(inputElement, "background", "transparent")
    this.render.setStyle(inputElement, "color", this.FieldStyle == "hub" ? "black" : "white")
    
    if(this.maxLength)
      this.render.setAttribute(inputElement, "maxlength", String(this.maxLength))
  }

  private runErrorCheck () {
    let hasError = false

    const arr = Object.entries(this.model?.errors ?? {})

    for (let i = 0; i < arr.length; i++) {
      const element = arr[i],
      
      [key] = element;
      
      if(key == "required" && this.model?.pristine) continue;

      hasError = true
    }

    this.HasError.update(() => hasError)
  }

  ngOnDestroy(): void {
    clearInterval(this.interval)
  }
}