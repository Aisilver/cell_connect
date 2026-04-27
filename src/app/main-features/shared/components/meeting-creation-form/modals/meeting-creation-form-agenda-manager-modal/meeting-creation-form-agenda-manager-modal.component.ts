import { Component, inject, Input, OnDestroy, signal } from '@angular/core';
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
import { addMinutes, subMinutes } from 'date-fns';

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
export class MeetingCreationFormAgendaManagerModalComponent extends ModalEntity implements OnDestroy {
  @Input("modal-service")
  protected override modalgenerator!: ModalGenerator;

  @Input("options")
  Options!: MeetingCreationFormAgendaManagerOptions;

  private service = inject(MeetingCreationFormAgendaManagerModalService)

  MeetingAgenda: MeetingAgenda = {
    topic: "",
    status: "pending",
    startTime: new Date(),
    endTime: new Date()
  }

  Hours = signal(0)

  HoursDropList = signal<DropDownUnit<number>[]>([])

  AgendaMinutesDuration = signal(0)

  TimingChanged = false

  AgendaStartTime = signal(new Date())
  
  AgendaEndTime = signal(new Date())

  override OnModalInit(): void | Promise<void> {
    this.service.Options = this.Options

    this.HoursDropList.update(() => this.service.getHoursDropUnitList())

    this.AgendaStartTime.update(() => this.service.getAgendaStartime())

    this.AgendaEndTime.update(() => this.service.getAgendaStartime())
  }

  ChangeMinutes(action: "add" | "minus"){
    this.TimingChanged = true

    this.AgendaEndTime.update(date => {
      if(action == "add")
        return addMinutes(date, 5)
      else 
        return subMinutes(date, 5)
    })
  }

  onHourSelect () {
    this.TimingChanged = true
  }

  ngOnDestroy(): void {
    if(this.Options.void)
      this.Options.void()
  }
}