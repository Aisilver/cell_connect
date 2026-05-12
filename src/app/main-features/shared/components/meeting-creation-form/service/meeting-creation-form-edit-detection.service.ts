import { Injectable } from '@angular/core';
import { CellVenueLocation, Meeting, MeetingAgenda, MeetingEditLog } from '@shared/entities';

@Injectable({
  providedIn: 'any'
})
export class MeetingCreationFormEditDetectionService {
  getChanges(oldMeeting?: Meeting, newMeeting?: Meeting): MeetingEditLog | null {
    
    try {
      if(!oldMeeting || !newMeeting) throw Error()

      const log: MeetingEditLog = {
        agenda_changed: this.detectAgendaChange(oldMeeting.agendas, newMeeting.agendas),

        date_time_changed: this.detectDateTimeChange(oldMeeting, newMeeting),

        venue_changed: this.detectVenueChange(oldMeeting.venue, newMeeting.venue),

        description_changed: !this.sameString(oldMeeting.description, newMeeting.description),

        title_changed: !this.sameString(oldMeeting.title, newMeeting.title),

        type_changed: !this.sameString(oldMeeting.type, newMeeting.type)
      }

      for (const key in log) {
        //@ts-ignore
        if(log[key]) return log
      }

      throw Error()

    } catch  {
      return null
    }
  }

  private detectVenueChange (oldVenue?: CellVenueLocation, newVenue?: CellVenueLocation) {
    try {
      if(!oldVenue || !newVenue) throw Error()

      if(!this.sameString(oldVenue.addressInFull, newVenue.addressInFull)) throw Error()

      if(!this.sameString(oldVenue.city, newVenue.city)) throw Error()

      if(!this.sameString(oldVenue.estateName, newVenue.estateName)) throw Error()

      if(!this.sameString(oldVenue.landmark, newVenue.landmark)) throw Error()

      if(!this.sameNumber(oldVenue.id, newVenue.id)) throw Error()

      return false
    } catch {
      return true
    }
  }

  private detectDateTimeChange (oldMeeting: Meeting, newMeeting: Meeting) {
    try {
      const {startTime: oldStartime, endTime: oldEndTime} = oldMeeting,

      {startTime: newStartime, endTime: newEndTime} = newMeeting

      if(!this.sameDate(oldStartime, newStartime)) throw Error()

      if(!this.sameDate(newEndTime, oldEndTime)) throw Error()

      return false
    } catch {
      return true
    }
  }

  private detectAgendaChange (oldAgendas: MeetingAgenda[] = [], newAgendas: MeetingAgenda[] = []) {
    try {
      if(oldAgendas.length !== newAgendas.length) throw Error()

        for (const agenda of oldAgendas) {
          const findOldInNew = newAgendas.find(agen => agen.id == agenda.id)

          if(!findOldInNew) throw Error()

          const {topic: newTopic, description: newDescription, endTime: newEndTime, startTime: newStartime} = findOldInNew

          if(!this.sameString(agenda.topic, newTopic)) throw Error()

          if(!this.sameString(agenda.description, newDescription)) throw Error()

          if(!this.sameDate(agenda.startTime, newStartime)) throw Error()

          if(!this.sameDate(agenda.endTime, newEndTime)) throw Error()
        }

      return false

    } catch  {
      return true
    }
  }

  
  private sameString(oldValue?: string, newValue?: string) {
    const sanitizedOldStr = (oldValue ?? '').toLowerCase().trim(),

    sanitizedNewStr = (newValue ?? '').toLowerCase().trim()

    return sanitizedNewStr === sanitizedOldStr
  }

  private sameDate(oldDate: Date, newDate: Date) {
    return this.sameNumber(new Date(oldDate).getTime(), new Date(newDate).getTime())
  }

  private sameNumber(oldValue?: number, newValue?: number) {
    if(isNaN(parseInt(String(oldValue))) || isNaN(parseInt(String(newValue)))) return false

    return oldValue === newValue
  }
}