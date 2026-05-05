import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MeetingAgenda } from '@shared/entities';
import { IconComponent } from "../../../icon/icon.component";

@Component({
  selector: 'app-meeting-form-agenda-view',
  imports: [
    CommonModule,
    IconComponent
],
  template: `
    <div class="agenda-topic">
      <p>{{Agenda.topic}}</p>
    </div>

    <section>
      <div class="time-view">
        <b>{{Agenda.startTime | date : "hh : mm aa"}}</b>

        <app-icon name="arrow-right"></app-icon>

        <b>{{Agenda.endTime | date : "hh : mm aa"}}</b>

      </div>

      <app-icon name="pen" (click)="Edit()"></app-icon>

      <app-icon (click)="Delete()" *ngIf="isLast" class="red" name="trash"></app-icon>
    </section>
  `,
  styleUrl: './meeting-form-agenda-view.component.scss'
})
export class MeetingAgendaViewComponent {
  @Input()
  Agenda!: MeetingAgenda

  @Input()
  isLast?: boolean

  @Output("edit-agenda")
  private editOutputSignal = new EventEmitter<void>()

  @Output("delete-agenda")
  private deleteOutputSignal = new EventEmitter<void>()

  Edit(){
    this.editOutputSignal.emit()
  }

  Delete(){
    this.deleteOutputSignal.emit()
  }
}
