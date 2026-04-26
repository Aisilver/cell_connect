import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-time-left',
  imports: [CommonModule],
  template: `
    <main>
      <p *ngIf="Day() > 0">{{Day() | number : '2.0-0'}}</p>
      
      <span *ngIf="Day() > 0">:</span>

      <p *ngIf="Hour() > 0">{{Hour() | number : '2.0-0'}}</p>
      
      <span *ngIf="Hour() > 0" >:</span>

      <p>{{Minute() | number : '2.0-0'}}</p>
      
      <span>:</span>

      <p>{{Second() | number : '2.0-0'}}</p>
    </main>
  `,
  styleUrl: './time-left.component.scss'
})
export class TimeLeftComponent implements OnChanges, OnDestroy {
  @Input()
  InputedTargetTime?: Date | null

  private interval = interval(1000)

  private intervalSubs?: Subscription

  private TargetTime = new Date()

  Day = signal(0)

  Hour = signal(0)
  
  Minute = signal(0)
  
  Second = signal(0)

  @Output("timeReached")
  timeReachedEvent: EventEmitter<void> = new EventEmitter() 

  ngOnChanges(): void {
    if(this.InputedTargetTime)
      this.TargetTime = this.InputedTargetTime

      this.OnTick()

      this.intervalSubs = this.interval.subscribe(() => this.OnTick())
  }

  private OnTick() {
    if(this.TargetTime.getTime() > new Date().getTime()){
      this.Day.update(() => differenceInDays(this.TargetTime, new Date()))

      this.Hour.update(() => differenceInHours(this.TargetTime, new Date()))

      this.Minute.update(() => differenceInMinutes(this.TargetTime, new Date()) % 60)

      this.Second.update(() => differenceInSeconds(this.TargetTime, new Date()) % 60)
    } else {
      this.timeReachedEvent.emit()

      this.intervalSubs?.unsubscribe()
    }
  }  

  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe()
  }
}