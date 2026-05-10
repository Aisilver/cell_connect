import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, DoCheck, EventEmitter, inject, Input, OnInit, Output, QueryList, signal, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputFieldDecoratorComponent } from "../../decorators/input-field-decorator/input-field-decorator.component";
import { MEETING_MODEL } from 'src/app/models/meeting-model/meeting-model';
import { Meeting, MeetingAgenda, MeetingEditLog } from '@shared/entities';
import { IconComponent } from "../icon/icon.component";
import { addMinutes, isToday } from 'date-fns';
import { DropDownUnit } from '../drop-down/types';
import { MeetingCreationFormService } from './service/meeting-creation-form.service';
import { DropDownComponent } from "../drop-down/drop-down.component";
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoadersComponent } from "../loaders/loaders.component";
import { TextDeserailizerPipe } from '../../pipes/text-deserailizer-pipe';
import { MeetingAgendaViewComponent } from "./components/meeting-form-agenda-view/meeting-form-agenda-view.component";
import { MeetingCreationFormVenueuManagerComponent } from "./components/meeting-creation-form-venueu-manager/meeting-creation-form-venueu-manager.component";
import { MeetingCreationRequestData } from '@shared/route-types';
import { GCenteredModalsService } from '../../modals/centered-modals/service/g-centered-modals-service';
import { MeetingCreationFormTimeValidatorComponent } from "./components/meeting-creation-form-time-validator/meeting-creation-form-time-validator.component";
import { CloneOf } from 'src/app/functions/clone-of.func';
import { MeetingCreationFormEditDetectionService } from './service/meeting-creation-form-edit-detection.service';

@Component({
  selector: 'app-meeting-creation-form',
  imports: [
    CommonModule,
    FormsModule,
    InputFieldDecoratorComponent,
    IconComponent,
    DropDownComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    LoadersComponent,
    TextDeserailizerPipe,
    MeetingAgendaViewComponent,
    MeetingCreationFormVenueuManagerComponent,
    MeetingCreationFormTimeValidatorComponent
],
  templateUrl: './meeting-creation-form.component.html',
  styleUrl: './meeting-creation-form.component.scss'
})
export class MeetingCreationFormComponent implements OnInit, DoCheck, AfterViewInit {
  private FlatMeetingData = inject(MEETING_MODEL).getModel()

  private service = inject(MeetingCreationFormService)

  private meetingEditDetectionService = inject(MeetingCreationFormEditDetectionService)

  private GC_Modal = inject(GCenteredModalsService)

  @Input()
  ExternalMeeting?: Meeting

  @Input()
  Mode?: "create" | "edit"

  @Output("Meeting")
  private output: EventEmitter<MeetingCreationRequestData> = new EventEmitter()

  @Output("Meeting_Edited")
  private edit_output: EventEmitter<{meeting: Meeting, editLog?: MeetingEditLog | null}> = new EventEmitter()

  @ViewChild("picker")
  private Datepicker!: MatDatepicker<Date>
  
  @ViewChild("StartimeDropDown")
  private StartTimeDropDownComp!: DropDownComponent

  @ViewChild("MeetingDurationDropDown")
  private TimeGapDropDownComp!: DropDownComponent

  @ViewChild("MeetingTypesDropDown")
  private MeetingTypesDropDownComp!: DropDownComponent

  @ViewChild(LoadersComponent)
  private MeetingTypesLoader!: LoadersComponent

  @ViewChild(MeetingCreationFormVenueuManagerComponent)
  private VenueManger!: MeetingCreationFormVenueuManagerComponent

  @ViewChild(MeetingCreationFormTimeValidatorComponent)
  private MeetingCreationFormDateValidator!: MeetingCreationFormTimeValidatorComponent

  @ViewChildren(InputFieldDecoratorComponent)
  private inputFieldsQueryRef!: QueryList<InputFieldDecoratorComponent>

  IsThereAnEditToTheMeeting = signal(false)

  Meeting = this.FlatMeetingData

  MeetingStartTime = signal<Date>(new Date())

  MeetingEndTime = signal<Date>(new Date())

  MeetingDurations = signal<DropDownUnit<number>[]>([])

  MeetingStartTimes = signal<DropDownUnit<Date>[]>([])

  DefaultMeetingStartTimeKey = signal("")

  IsMeetingStartTimeToday = signal(false)

  MeetingAgendas = signal<MeetingAgenda[]>([])

  private SelectedMeetingDuration = signal(30)

  ngOnInit(): void {
    this.MeetingDurations.update(() => this.service.getMeetingDurationsList())
  }

  ngDoCheck(): void {
    this.IsThereAnEditToTheMeeting.update(() => {
      const log = this.meetingEditDetectionService.getChanges(this.ExternalMeeting, this.Meeting)

      if(log) return true

      else return false
    })
  }

  ngAfterViewInit(): void {
    this.Meeting = CloneOf(this.ExternalMeeting ?? this.FlatMeetingData)

    const {startTime, endTime} = this.Meeting,

    selectedDurationKey = String(this.service.getDurationKeyFromDurationList(startTime, endTime, this.MeetingDurations()))

    this.OnDateChange()

    this.TimeGapDropDownComp.SelectKey(selectedDurationKey)

    this.MeetingAgendas.update(() => this.Meeting.agendas ?? [this.service.getDefaultMeetingAgenda(this.MeetingStartTime())])  
  
    if(this.Mode == 'edit')
      setTimeout(() => this.inputFieldsQueryRef.forEach(ref => ref.TriggerHasValueEffect(true)), 300);
  }

  OpenCalendar() {
    this.Datepicker.open()    
  }

  OnDateChange () {
    const date = isToday(this.Meeting.startTime) ? new Date() : new Date(this.Meeting.startTime),
    
    startTimeUnits = this.service.getMeetingsStartimesList(date),

    startTimes = startTimeUnits.map(unit => unit.data),

    selectkey = this.service.getDateKeyFromDateArrayThatIsCloseToPassedDate(date, startTimes)

    this.StartTimeDropDownComp.LoadDropUnits(startTimeUnits)

    this.IsMeetingStartTimeToday.update(() => isToday(this.MeetingStartTime()))

    setTimeout(() => this.StartTimeDropDownComp.SelectKey(selectkey));
  }

  OnDurationSelect (unit: DropDownUnit<number>) {
    this.SelectedMeetingDuration.update(() => unit.data ?? 30)

    this.StartTimeAndEndTimeCalulator()
  }

  StartTimeAndEndTimeCalulator (unit?: DropDownUnit<Date>) {
    const selectedStartime = unit?.data ?? this.MeetingStartTime()

    this.MeetingStartTime.update(() => selectedStartime)

    this.MeetingEndTime.update(() => addMinutes(this.MeetingStartTime(), this.SelectedMeetingDuration()))
    
    this.IsMeetingStartTimeToday.update(() => isToday(this.MeetingStartTime()))

    this.service.reconfigureDefaultMeetingAgedaOnMeetingTimingChange(this.MeetingStartTime(), this.MeetingAgendas())  
  
    this.MeetingCreationFormDateValidator.ValidateDate(this.MeetingStartTime())
  }

  async OnMeetingTypeLoaderReady () {
    const meetingTypes = await this.MeetingTypesLoader.LoadAsync(this.service.$MeetingTypesObvs),

    dropUnits: DropDownUnit[] = meetingTypes.map(ty => {
      return {
        key: ty.slug
      }
    })

    this.MeetingTypesDropDownComp.LoadDropUnits(dropUnits)

    if(!this.Meeting.type) {
      this.MeetingTypesDropDownComp.SelectKey(dropUnits.at(0)?.key)
    }
  }

  OnMeetingTypeSelected (type: string) {
    this.Meeting.type = type
  }

  async DeleteAgenda (index: number) {
    const moddedAgendas = await this.service.deleteAgenda(index, this.MeetingAgendas())
    
    if(!moddedAgendas) return

    this.MeetingAgendas.update( () => moddedAgendas)
  }

  async EditAgenda (index: number) {
    const editedAgenda = await this.service.editAgenda({
      meeting_agendas: this.MeetingAgendas(),
      meeting_start_time: this.MeetingStartTime(),
      meeting_end_time: this.MeetingEndTime(),
      mode: "edit",
      index_of_agenda_to_edit: index
    })

    if(editedAgenda) {
      this.MeetingAgendas.update(agendas => {
        agendas.splice(index, 1, editedAgenda)

        return agendas
      })
    }
  }

  async AddAgenda () {
    const newAgenda = await this.service.createAgenda({
      meeting_agendas: this.MeetingAgendas(),
      meeting_start_time: this.MeetingStartTime(),
      meeting_end_time: this.MeetingEndTime(),
      mode: "create",
    })

    if(newAgenda) 
      this.MeetingAgendas.update(agendas => [...agendas, newAgenda])
  }

  Submit() {
    try {
      const {cellId, usingNewVenue, venue} = this.VenueManger.GetVenue(),

      meeting: Meeting = {
        ...this.Meeting,
        startTime: this.MeetingStartTime(),
        endTime: this.MeetingEndTime(),
        agendas: this.MeetingAgendas(),
        venue
      }

      if(this.Mode == "create")
        this.output.emit({
          cellId,
          meeting,
          usingNewVenue
        })
      else 
        this.edit_output.emit({
          meeting,
          editLog: this.meetingEditDetectionService.getChanges()
        })
    } catch (error: any) {
      this.GC_Modal.openDialogue({
        type: 'alert',
        message: error.message
      })
    }
  }
}