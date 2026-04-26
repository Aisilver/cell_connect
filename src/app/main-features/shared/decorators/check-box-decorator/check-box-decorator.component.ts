import { AfterContentInit, Component, ContentChild, ElementRef, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { UUIDGenerator } from '../../../../functions/UUID-generator.func';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-box-decorator',
  imports: [
    CommonModule
  ],
  template: `
    <label [htmlFor]="UUID" [class]="type" [ngClass]="{active: Checked()}">
      <ng-content></ng-content>
    </label>
  `,
  styleUrl: './check-box-decorator.component.scss'
})
export class CheckBoxDecoratorComponent implements AfterContentInit, OnChanges {
  @Input()
  CheckFIeld?: boolean

  @Input()
  type!: "white"

  @ContentChild('checkField', {read: ElementRef})
  CheckFieldInput?: ElementRef<HTMLInputElement>

  UUID = UUIDGenerator()

  Checked = signal(false)

  ngOnChanges(changes: SimpleChanges): void {
    this.Checked.update(() => this.CheckFIeld ?? false)
  }

  ngAfterContentInit(): void {
    if(!this.CheckFieldInput) throw Error(`A 'checkField' tagged element cannot be found`)

    const {nativeElement} = this.CheckFieldInput

    nativeElement.id = this.UUID

    nativeElement.hidden = true
  }
}