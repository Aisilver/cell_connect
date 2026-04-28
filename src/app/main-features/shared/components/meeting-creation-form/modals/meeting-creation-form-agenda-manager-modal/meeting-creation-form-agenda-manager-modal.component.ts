import { AfterViewInit, Component, inject, Input, OnDestroy, QueryList, signal, ViewChildren } from '@angular/core';
import { MeetingCreationFormAgendaManagerOptions } from '../../types';
import { ModalEntity } from 'src/app/general-services/modals-service/classes/modal-entity.class';
import { ModalGenerator } from 'src/app/general-services/modals-service/classes/modal-generator.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldDecoratorComponent } from "src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component";
import { MeetingAgenda } from '@shared/entities';
import { FormErrorMessageComponent } from "../../../form-error-message/form-error-message.component";
import { DropDownComponent } from "../../../drop-down/drop-down.component";
import { IconComponent } from "../../../icon/icon.component";
import { DropDownUnit } from '../../../drop-down/types';
import { MeetingCreationFormAgendaManagerModalService } from './service/meeting-creation-form-agenda-manager-modal.service';
import { addHours, addMinutes, differenceInMinutes, subHours, subMinutes } from 'date-fns';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-meeting-creation-form-agenda-manager-modal',
  imports: [
    CommonModule,
    FormsModule,
    InputFieldDecoratorComponent,
    FormErrorMessageComponent,
    DropDownComponent,
    IconComponent
],
  templateUrl: './meeting-creation-form-agenda-manager-modal.component.html',
  styleUrl: './meeting-creation-form-agenda-manager-modal.component.scss'
})
export class MeetingCreationFormAgendaManagerModalComponent extends ModalEntity implements AfterViewInit, OnDestroy {
  @Input("modal-service")
  protected override modalgenerator!: ModalGenerator;

  @Input("options")
  Options!: MeetingCreationFormAgendaManagerOptions;

  @ViewChildren(InputFieldDecoratorComponent)
  private inputDecorsQueryRef!: QueryList<InputFieldDecoratorComponent>

  private service = inject(MeetingCreationFormAgendaManagerModalService)

  private TimeChangeSubs?: Subscription

  private timeChangeEvent = new Subject<void>()

  declare MeetingAgenda: MeetingAgenda

  HoursDropList = signal<DropDownUnit<number>[]>([])

  AgendaMinutesDuration = signal(0)

  TimingChanged = signal(false)

  AgendaStartTime = signal(new Date())
  
  AgendaEndTime = signal(new Date())

  MeetingTotalTime = signal("")

  TimeLeftForAgendas = signal("")

  MinutesLeftInMeetingDuration = signal(0)

  HoursBetweenAgendaStartAndEndTime = signal(0)

  private ActionTaken = false

  constructor(){
    super()

    this.MeetingAgenda = this.service.FlatAgendaData
  }

  ngAfterViewInit(): void {
  }

  override OnModalInit(): void | Promise<void> {
    const {mode, index_of_agenda_to_edit, meeting_agendas} = this.Options

    this.service.Options = this.Options

    if(mode == "edit" && index_of_agenda_to_edit != undefined) {
      this.MeetingAgenda = meeting_agendas[index_of_agenda_to_edit]

      this.AgendaStartTime.update(() => new Date(this.MeetingAgenda.startTime))

      this.AgendaEndTime.update(() => new Date(this.MeetingAgenda.endTime))
    } else {
      this.AgendaStartTime.update(() => this.service.getNewAgendaStartime())

      this.AgendaEndTime.update(() => this.service.getNewAgendaStartime())
    }

    this.HoursDropList.update(() => this.service.getHoursDropUnitList())

    this.MeetingTotalTime.update(() => this.service.getMeetingTotalTImeStr())

    this.TimeLeftForAgendas.update(() => this.service.getTimeLeftForAgendasStr())

    this.TimeChangeSubs = this.timeChangeEvent.subscribe(() => this.OnTimeChange())

    this.AgendaMinutesDuration.update(() => this.service.getAgendaMinutes(this.AgendaStartTime(), this.AgendaEndTime()))
  
    this.HoursBetweenAgendaStartAndEndTime.update(() => this.getHoursInBetweenAgendaTiming())

    this.CalculateAndSetMintutesLeftInMeeting()

    setTimeout(() => this.inputDecorsQueryRef.forEach(ref => ref.TriggerHasValueEffect(true)));
  }

  ChangeMinutes(action: "add" | "minus"){    
    this.AgendaEndTime.update(date => {
      if(action == "add")
        return addMinutes(date, 5)
      else 
        return subMinutes(date, 5)
    })

    this.timeChangeEvent.next()
  }

  OnHourSelect (unit: DropDownUnit<number>) {
    const {data} = unit

    this.AgendaEndTime.update(date => subHours(date, this.getHoursInBetweenAgendaTiming()))

    if(data) {
      this.AgendaEndTime.update(date => addHours(date, data))
    }

    this.timeChangeEvent.next()
  }

  SetAgendaTimingToRemainingMeetingTime () {
    const {meeting_end_time} = this.Options,

    diffInMins = differenceInMinutes(meeting_end_time, this.AgendaStartTime())

    this.AgendaEndTime.update(() => addMinutes(this.AgendaStartTime(), diffInMins))

    this.timeChangeEvent.next()
  }

  Submit(){
    this.ActionTaken = true

    const {mode, meeting_agendas, index_of_agenda_to_edit} = this.Options

    if(mode == 'create')
      this.Destroy(() => {
        const agenda:MeetingAgenda = {
          ...this.MeetingAgenda,
          startTime: this.AgendaStartTime(),
          endTime: this.AgendaEndTime()
        }

        if(this.Options.agenda_creation_cb) this.Options.agenda_creation_cb(agenda)
      })
    else {
      this.Destroy(() => {
        if(this.Options.edit_cb) this.Options.edit_cb(this.MeetingAgenda)
      })
    }
  }

  isAgendaTimeValid () {
    return differenceInMinutes(this.AgendaEndTime(), this.AgendaStartTime()) > 0
  }

  private OnTimeChange () {
    this.AgendaMinutesDuration.update(() => this.service.getAgendaMinutes(this.AgendaStartTime(), this.AgendaEndTime()))

    this.CalculateAndSetTimeLeftForAgendasStr()

    this.CalculateAndSetMintutesLeftInMeeting()

    this.HoursBetweenAgendaStartAndEndTime.update(() => this.getHoursInBetweenAgendaTiming())

    this.TimingChanged.update(() => true)
  } 

  private getHoursInBetweenAgendaTiming () {
    const diffInMins = differenceInMinutes(this.AgendaEndTime(), this.AgendaStartTime())

    return Math.floor(diffInMins / 60)
  }

  private CalculateAndSetTimeLeftForAgendasStr () {
    const currentAgenda: MeetingAgenda = {
      ...this.MeetingAgenda,

      startTime: this.AgendaStartTime(),

      endTime: this.AgendaEndTime()
    }

    if(this.Options.mode == "create") 
      this.TimeLeftForAgendas.update(() => this.service.getTimeLeftForAgendasStr([...this.Options.meeting_agendas, currentAgenda]))
    else 
      this.TimeLeftForAgendas.update(() => this.service.getTimeLeftForAgendasStr())
  }

  private CalculateAndSetMintutesLeftInMeeting (){
    let startime: Date 

    const {mode, meeting_agendas, meeting_start_time, meeting_end_time} = this.Options

    if(mode == "edit")
      startime = meeting_agendas.at(-1)?.endTime ?? meeting_start_time

    this.MinutesLeftInMeetingDuration.update(() => differenceInMinutes(meeting_end_time, startime ?? this.AgendaEndTime()))
  }

  ngOnDestroy(): void {
    if(this.Options.void && !this.ActionTaken) this.Options.void()

    this.TimeChangeSubs?.unsubscribe()
  }
}