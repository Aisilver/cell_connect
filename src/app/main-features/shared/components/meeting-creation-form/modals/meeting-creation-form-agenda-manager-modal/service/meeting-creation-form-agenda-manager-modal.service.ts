import { Injectable } from '@angular/core';
import { MeetingCreationFormAgendaManagerOptions } from '../../../types';
import { differenceInMinutes } from 'date-fns';
import { DropDownUnit } from '../../../../drop-down/types';
import { MeetingAgenda } from '@shared/entities';

@Injectable({
  providedIn: 'root'
})
export class MeetingCreationFormAgendaManagerModalService {
  private declare Option: MeetingCreationFormAgendaManagerOptions

  set Options (opt: MeetingCreationFormAgendaManagerOptions) {
    this.Option = opt
  }

  get FlatAgendaData (): MeetingAgenda {
    return {
      topic: "",
      status: "pending",
      startTime: new Date(),
      endTime: new Date()
    }
  }

  getMeetingTotalTImeStr () {
    const {meeting_start_time, meeting_end_time} = this.Option

    return this.getTimeDurationString(meeting_start_time, meeting_end_time)
  }

  getTimeLeftForAgendasStr (agendas = this.Option.meeting_agendas) {
    const lastAgenda = agendas.at(-1),

    {meeting_end_time} = this.Option

    if(lastAgenda) {
      return this.getTimeDurationString(lastAgenda.endTime, meeting_end_time)
    }else {
      return this.getMeetingTotalTImeStr()
    }
  }

  getNewAgendaStartime() {
    const {meeting_start_time, meeting_agendas} = this.Option

    return meeting_agendas.at(-1)?.endTime ?? meeting_start_time
  }

  getHoursDropUnitList () {
    let result: DropDownUnit<number>[] = []

    const {meeting_end_time} = this.Option,
 
    diffInMins = differenceInMinutes(meeting_end_time, this.getNewAgendaStartime()),

    itration = Math.floor(diffInMins / 60)

    for (let i = 1; i <= itration; i++) {
      result.push({
        key: `${i} hour${i > 1 ? 's' : ''}`,
        data: i
      })
    }

    if(result.length > 0) {
      result.unshift({
        key: "none"
      })
    }

    return result
  }

  getAgendaMinutes (agendaStartTime: Date, agendaEndTime: Date) {
    const diffInMins = differenceInMinutes(agendaEndTime, agendaStartTime)

    if(diffInMins >= 60)
      return diffInMins % 60
    else 
      return diffInMins
  }

  private getTimeDurationString (startTime: Date, endTime: Date) {
    const diffInMinutes = differenceInMinutes(endTime, startTime),
    
    hours = Math.floor(diffInMinutes / 60),

    minutes = diffInMinutes % 60

    return `${hours > 0 ? hours +'h' : ''}${minutes > 0 ? minutes +'m' : ''}`
  }
}