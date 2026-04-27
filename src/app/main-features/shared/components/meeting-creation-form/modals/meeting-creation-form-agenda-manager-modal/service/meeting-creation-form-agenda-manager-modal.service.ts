import { Injectable } from '@angular/core';
import { MeetingCreationFormAgendaManagerOptions } from '../../../types';
import { differenceInMinutes } from 'date-fns';
import { DropDownUnit } from '../../../../drop-down/types';

@Injectable({
  providedIn: 'root'
})
export class MeetingCreationFormAgendaManagerModalService {
  private declare Option: MeetingCreationFormAgendaManagerOptions

  set Options (opt: MeetingCreationFormAgendaManagerOptions) {
    this.Option = opt
  }

  getAgendaStartime() {
    const {meeting_start_time, meeting_agendas} = this.Option

    return meeting_agendas.at(-1)?.endTime ?? meeting_start_time
  }

  getHoursDropUnitList () {
    let result: DropDownUnit<number>[] = []

    const {meeting_end_time} = this.Option,

    diffInMins = differenceInMinutes(meeting_end_time, this.getAgendaStartime()),

    itration = Math.floor(diffInMins / 60)

    for (let i = 1; i <= itration; i++) {
      result.push({
        key: `${i} hour${i > 1 ? 's' : ''}`,
        data: i
      })
    }

    return result
  }
}