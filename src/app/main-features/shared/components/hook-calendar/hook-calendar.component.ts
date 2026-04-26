import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ContentChild, ElementRef, HostListener, inject, Input, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { Subscription } from 'rxjs';
import { UUIDGenerator } from 'src/app/functions/UUID-generator.func';
import { DOMService } from 'src/app/general-services/dom.service';
import { DropDownService } from 'src/app/general-services/drop-down.service';

@Component({
  selector: 'app-hook-calendar',
  imports: [
    CommonModule,
    MatDatepickerModule
  ],
  template: `
    <ng-content></ng-content>

    <mat-datepicker #picker></mat-datepicker>

  `,
  styleUrl: './hook-calendar.component.scss'
})
export class HookCalendarComponent implements OnInit, AfterViewInit, OnDestroy {
  private domService = inject(DOMService)

  private dropDownService = inject(DropDownService)

  private UniqueDropKey = UUIDGenerator()

  CalendarOpen = signal(false)

  subscription?: Subscription

  @Input()
  Groupname?: string

  @ViewChild("CalendarHoldElement")
  CalendarHoldEleRef!: ElementRef<HTMLElement>

  @ViewChild("picker")
  DatePicker!: MatDatepicker<Date>

  @ContentChild("clickable")
  clickableEleRef?: ElementRef<HTMLElement>

  @HostListener("click", ['$event'])
  OnClick (ev: Event) {
    if(this.clickableEleRef?.nativeElement) return

    this.OpenCalendar(ev)
  }

  ngOnInit(): void {
    document.addEventListener("click", (ev) => this.CloseCalendar())
    
    this.subscription = this.dropDownService.DropGroupCloseEvent.subscribe(data => {
      if(data.dropkey != this.UniqueDropKey && data.groupName == this.Groupname) {
        this.CloseCalendar()
      }
    })
  }

  ngAfterViewInit(): void {
    // this.clickableEleRef?.nativeElement.addEventListener("click", (e) => this.OpenCalendar(e))

    // this.CalendarHoldEleRef.nativeElement.addEventListener("click", e => e.stopPropagation())
  }

  private OpenCalendar(event: Event) {
    event.stopPropagation()
    
    this.DatePicker.open()

    return

    if(!this.CalendarOpen()){
      
      this.SignalGroupOfOpening()

      this.domService.alignFloatElementToFitInScreenViewOrWindowView(this.CalendarHoldEleRef.nativeElement)

      this.CalendarOpen.update(() => true)
    } else {
      this.CloseCalendar()
    }
  }
  
  SignalGroupOfOpening () {
    this.dropDownService.DropGroupCloseEvent.next({
      dropkey: this.UniqueDropKey,
      groupName: this.Groupname
    })
  }

  CloseCalendar () {
    this.CalendarOpen.update(() => false)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }
}
