import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, signal, SimpleChanges } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-time-left',
  imports: [CommonModule],
  template: `
    <main>
      <b *ngIf="Day() > 0">{{Day() | number : '2.0-0'}}</b>
      
      <span *ngIf="Day() > 0">:</span>

      <b *ngIf="Hour() > 0">{{Hour() | number : '2.0-0'}}</b>
      
      <span *ngIf="Hour() > 0" >:</span>

      <b>{{Minute() | number : '2.0-0'}}</b>
      
      <span>:</span>

      <b>{{Second() | number : '2.0-0'}}</b>
    </main>
  `,
  styleUrl: './time-left.component.scss'
})
export class TimeLeftComponent implements OnChanges, OnDestroy {
  @Input()
  InputedTargetTime?: Date | null

  private interval = interval(1000)

  private intervalSubs?: Subscription

  Day = signal(0)

  Hour = signal(0)
  
  Minute = signal(0)
  
  Second = signal(0)

  @Output("timeReached")
  timeReachedEvent: EventEmitter<void> = new EventEmitter() 

  ngOnChanges(changes: SimpleChanges): void {
    const inputedTimeChange = changes['InputedTargetTime']

    const {currentValue} = inputedTimeChange
  
    if(!currentValue) return

    if(this.intervalSubs) this.intervalSubs.unsubscribe()

    this.intervalSubs = this.interval.subscribe(() => this.OnInterval(new Date(currentValue)))
  }

  private OnInterval(targetTime: Date) {
    if(targetTime.getTime() > new Date().getTime()){
      this.Day.set(differenceInDays(targetTime, new Date()))

      this.Hour.set(differenceInHours(targetTime, new Date()))

      this.Minute.set(differenceInMinutes(targetTime, new Date()) % 60)

      this.Second.set(differenceInSeconds(targetTime, new Date()) % 60)
    } else {
      this.timeReachedEvent.emit()

      this.intervalSubs?.unsubscribe()
    }
  }  

  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe()
  }
}