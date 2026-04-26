import { Component, Input, signal } from '@angular/core';
import { ModalEntity } from 'src/app/general-services/modals-service/classes/modal-entity.class';
import { ModalGenerator } from 'src/app/general-services/modals-service/classes/modal-generator.class';
import { IconComponent } from "../../../components/icon/icon.component";
import { CommonModule } from '@angular/common';
import { addDays, addMonths, addYears, subDays, subMonths, subYears } from 'date-fns';

type ActionTypes = "inc-date" | "dec-date" | "inc-month" | "dec-month" | "inc-year" | "dec-year"

@Component({
  selector: 'app-date-picker-modal',
  imports: [
    IconComponent,
    CommonModule
],
  template: `
    <section>
      <div class="wrap">
          <p>Day</p>
          <div class="top" (click)="SetDate('inc-date')">
            <app-icon name="chevron-up"></app-icon>
          </div>
          
          <div class="mid">{{MainDate() | date : 'dd'}}</div>

          <div class="bottom" (click)="SetDate('dec-date')">
            <app-icon name="chevron-down"></app-icon>
          </div>
      </div>  

      <div class="wrap">
        <p>Month</p>
        <div class="top" (click)="SetDate('inc-month')">
          <app-icon name="chevron-up"></app-icon>
        </div>
        
        <div class="mid">{{MainDate() | date : 'MMMM'}}</div>

        <div class="bottom" (click)="SetDate('dec-month')">
          <app-icon name="chevron-down"></app-icon>
        </div>
      </div>  

      <div class="wrap">
        <p>Year</p>
        <div class="top" (click)="SetDate('inc-year')">
          <app-icon name="chevron-up"></app-icon>
        </div>
        
        <div class="mid">{{MainDate() | date : 'yyyy'}}</div>

        <div class="bottom" (click)="SetDate('dec-year')">
          <app-icon name="chevron-down"></app-icon>
        </div>
      </div>  
    </section>

    <button (click)="Done()">Done</button>
  `,
  styleUrl: './date-picker-modal.component.scss'
})
export class DatePickerModalComponent extends ModalEntity {
  MainDate = signal(new Date())

  @Input('modal-service')
  protected override modalgenerator!: ModalGenerator;

  @Input("view-date")
  ViewDate?: Date

  @Input("cb")
  callback!: (date: Date) => void
  
  override OnModalInit(): void | Promise<void> {
    this.MainDate.update(() => new Date(this.ViewDate ?? new Date()))
  }

  SetDate(action: ActionTypes) {
    switch(action){
      case 'inc-date': this.MainDate.update(cur => addDays(cur, 1))
        break
      case 'dec-date': this.MainDate.update(cur => subDays(cur, 1))
        break
      case 'inc-month': this.MainDate.update(cur => addMonths(cur, 1))
        break
      case 'dec-month': this.MainDate.update(cur => subMonths(cur, 1))
        break
      case 'inc-year': this.MainDate.update(cur => addYears(cur, 1))
        break
      case 'dec-year': this.MainDate.update(cur => subYears(cur, 1))
        break
    }
  }

  Done(){
    this.Destroy(() => this.callback(this.MainDate()))
  }
}