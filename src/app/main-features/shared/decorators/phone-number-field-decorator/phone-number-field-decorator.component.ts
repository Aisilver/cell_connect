import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, inject, Input, Renderer2, ViewChild } from '@angular/core';
import { InputFieldDecoratorComponent } from "../input-field-decorator/input-field-decorator.component";
import { CommonModule } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-phone-number-field-decorator',
  imports: [
    InputFieldDecoratorComponent, 
    CommonModule
  ],
  template: `
    <main>
      @if(inputComponent){
        <span [ngClass]="{hasError: inputComponent.HasError()}">+234</span>
      }

      <app-input-field-decorator *ngIf="inputFieldRef" class="field" [model]="model" [optionalField]="optionalField" [inputField]="inputFieldRef.nativeElement">
        <ng-content></ng-content>
      </app-input-field-decorator>
    </main>
  `,
  styleUrl: './phone-number-field-decorator.component.scss'
})
export class PhoneNumberFieldDecoratorComponent implements AfterViewInit {
  private chr = inject(ChangeDetectorRef)

  @Input()
  model?: NgModel

  @Input() 
  optionalField?: boolean

  @ViewChild(InputFieldDecoratorComponent)
  inputComponent!: InputFieldDecoratorComponent

  @ContentChild('textField')
  inputFieldRef!: ElementRef<HTMLInputElement>

  ngAfterViewInit(): void {
    this.chr.detectChanges()
  }
}
