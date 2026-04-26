import { AfterViewInit, Component, forwardRef, inject, Input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from "../icon/icon.component";
import { CommonModule } from '@angular/common';
import { GCenteredModalsService } from '../../modals/centered-modals/service/g-centered-modals-service';

@Component({
  selector: 'app-date-picker',
  imports: [
    CommonModule,
    IconComponent
],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  template: `
    <p *ngIf="text">{{text}}</p>
    <main>
      <section>
        <div>
          <span>{{MainDate() | date : 'dd'}}</span>
          <p>Day</p>
        </div>

        <div>
          <span>{{MainDate() | date : "MMM"}}</span>
          <p>Month</p>
        </div>
        
        <div>
          <span>{{MainDate() | date : "yyyy"}}</span>
          <p>Year</p>
        </div>
      </section>

      <app-icon (click)="GetDate()" name="pen"></app-icon>
    </main>
  `,
  styleUrl: './date-picker.component.scss'
})
export class DatePickerComponent implements ControlValueAccessor, AfterViewInit {
  private GCModalService = inject(GCenteredModalsService)

  private _MainDateSignal = signal(new Date())

  get MainDate () {
    return this._MainDateSignal
  }

  @Input()
  inputedDate?: Date

  @Input()
  text?: string
  
  disabled = false

  ngAfterViewInit(): void {
    this.update(this.inputedDate ? new Date(this.inputedDate) : new Date())
  }

  async GetDate(){
    this.update(await this.GCModalService.openDatePickerModal(this._MainDateSignal()))
  }
  
  private update(date: Date) {
    this._MainDateSignal.update(() => date)

    this.onChange(date)

    this.onTouched()
  }

  private onChange(date: Date){}

  private onTouched(){}

  writeValue(obj: any): void {
    this._MainDateSignal.update(() => obj)
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }
}
 