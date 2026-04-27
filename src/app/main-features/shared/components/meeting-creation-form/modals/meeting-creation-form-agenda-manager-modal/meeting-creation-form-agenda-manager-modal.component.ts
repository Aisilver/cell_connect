import { Component, Input, OnDestroy } from '@angular/core';
import { MeetingCreationFormAgendaManagerOptions } from '../../types';
import { ModalEntity } from 'src/app/general-services/modals-service/classes/modal-entity.class';
import { ModalGenerator } from 'src/app/general-services/modals-service/classes/modal-generator.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldDecoratorComponent } from "src/app/main-features/shared/decorators/input-field-decorator/input-field-decorator.component";
import { MeetingAgenda } from '@shared/entities';
import { FormErrorMessageComponent } from "../../../form-error-message/form-error-message.component";

@Component({
  selector: 'app-meeting-creation-form-agenda-manager-modal',
  imports: [
    CommonModule,
    FormsModule,
    InputFieldDecoratorComponent,
    FormErrorMessageComponent
],
  templateUrl: './meeting-creation-form-agenda-manager-modal.component.html',
  styleUrl: './meeting-creation-form-agenda-manager-modal.component.scss'
})
export class MeetingCreationFormAgendaManagerModalComponent extends ModalEntity implements OnDestroy {
  @Input("modal-service")
  protected override modalgenerator!: ModalGenerator;

  @Input("options")
  Options!: MeetingCreationFormAgendaManagerOptions;

  MeetingAgenda: MeetingAgenda = {
    topic: "",
    status: "pending",
    startTime: new Date(),
    endTime: new Date()
  }

  ngOnDestroy(): void {
    if(this.Options.void)
      this.Options.void()
  }
}
