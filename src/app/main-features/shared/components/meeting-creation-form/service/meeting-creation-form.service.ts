import { inject, Injectable } from '@angular/core';
import { AppMainService } from 'src/app/general-services/app-main.service';
import { DropDownUnit } from '../../drop-down/types';
import { addMinutes, differenceInMinutes, differenceInSeconds, subMinutes } from 'date-fns'
import { Observable, shareReplay } from 'rxjs';
import { AppRouteApiCallService } from 'src/app/server/route-services/app-route/app-route-api-call.service';
import { ObservableToPromise } from 'src/app/functions/observeable-to-promise.func';
import { List, Meeting, MeetingAgenda } from '@shared/entities';
import { GCenteredModalsService } from '../../../modals/centered-modals/service/g-centered-modals-service';
import { LocalStorageService } from 'src/app/general-services/storage.service';
import { CenteredModalService } from 'src/app/general-services/modals-service/centered-modal-service/centered-modal-service';
import { MeetingCreationFormAgendaManagerModalComponent } from '../modals/meeting-creation-form-agenda-manager-modal/meeting-creation-form-agenda-manager-modal.component';
import { MeetingCreationFormAgendaManagerOptions } from '../types';

@Injectable({
  providedIn: 'any'
})
export class MeetingCreationFormService {
  private appMainService = inject(AppMainService)

  private AppApiCall = inject(AppRouteApiCallService)

  private C_Modal = inject(CenteredModalService)

  private GC_Modal = inject(GCenteredModalsService)

  private storage = inject(LocalStorageService)

  private get Meeting_Settings () {
    return this.appMainService.APP_SETTINGS.meeting_settings
  }

  $MeetingTypesObvs = new Observable<List[]>(obvs => {
    ObservableToPromise(this.AppApiCall.getMeetingTypes())

    .then(res => {
      this.AppApiCall.responseChecker(res, data => obvs.next(data), () => obvs.error(Error(res.errMessage)))
    })

    .catch(err => obvs.error(err))
    
  }).pipe(shareReplay())

  getMeetingDurationsList ():DropDownUnit<number>[] {
    const units: DropDownUnit<number>[] = [],

    {max_meeting_duration, min_meeting_duration} = this.Meeting_Settings,

    minimumMinutes = this.getMinimumMeetingDuration(),

    maximumHoursToMinutes = Number(max_meeting_duration.replace("h", "").trim())

    units.push({
      key: min_meeting_duration,
      data: minimumMinutes
    })

    // This will push if 1 hour then 1h as key and and 60 as data for date objects
    for (let i = 1; i <= maximumHoursToMinutes; i++) {
      units.push({
        key: `${i}h`,
        data: i * 60
      })
    }
    
    return units
  }

  getMeetingsStartimesList (date: Date): DropDownUnit<Date>[] {
    const result: DropDownUnit<Date>[] = [],

    {max_meeting_start_time, min_meeting_start_time} = this.Meeting_Settings,

    start = new Date(date),

    end = new Date(date)

    start.setHours(min_meeting_start_time.hour, min_meeting_start_time.minute, 0, 0)
    
    end.setHours(max_meeting_start_time.hour, max_meeting_start_time.minute, 0, 0)

    let current = new Date(start)

    while (differenceInSeconds(end, current) >= 0) {
      const startTime = new Date(current)

      result.push({
        key: this.transformDateToKeyPattern(current),
        data: startTime,
        blurred: new Date().getTime() > startTime.getTime(),
        icon: {
          name: "clock"
        }
      })

      current = addMinutes(current, this.getMinimumMeetingDuration())
    }
    return result
  } 

  getDateKeyFromDateArrayThatIsCloseToPassedDate (passedDate: Date, dates: (Date | undefined) []) {
    let result = ""  

    for (const date of dates) {
      if(!date) continue;

      if(differenceInSeconds(date, passedDate) >= 0){
        result = this.transformDateToKeyPattern(date)
        break
      }
    }

    const lastDate = dates.at(dates.length - 1 ) ?? new Date()

    if(!result) 
      result = this.transformDateToKeyPattern(lastDate)

    return result
  }

  getDurationKeyFromDurationList (startTime: Date, endTime: Date, durationUnitsList: DropDownUnit<number>[]) {
    const minuteDiff = differenceInMinutes(endTime, startTime),

    foundUnit = durationUnitsList.find(dur => dur.data == minuteDiff) 

    return foundUnit?.data
  }

  getDefaultMeetingAgenda (startTime: Date): MeetingAgenda {
    return {
      startTime,
      endTime: addMinutes(startTime, 5),
      topic: "Opening prayers",
      status: "pending",
      default: true
    }
  }

  reconfigureDefaultMeetingAgedaOnMeetingTimingChange (startime: Date, agendas: MeetingAgenda[]) {
    for (const agenda of agendas) {
      if(!agenda.default) continue 
      
      const diffInPreviousTime = differenceInMinutes(agenda.endTime, agenda.startTime)

      agenda.startTime = new Date(startime)

      agenda.endTime = addMinutes(startime, diffInPreviousTime)
    }
  }
  
  createAgenda (opt: MeetingCreationFormAgendaManagerOptions) {
    return new Promise<MeetingAgenda | null>((res) => {
      this.C_Modal.Open<{options: MeetingCreationFormAgendaManagerOptions}>(MeetingCreationFormAgendaManagerModalComponent, {
        options : {
        ...opt,
        
        agenda_creation_cb(agenda) {
          res(agenda)
        },

        void() {
          res(null)
        }}
      },
      
      {closeableByBackgroundClick: true} 
      )
    })
  }

  editAgenda (opt: MeetingCreationFormAgendaManagerOptions) {
    return new Promise<MeetingAgenda | null>((res) => {
      this.C_Modal.Open<{options: MeetingCreationFormAgendaManagerOptions}>(MeetingCreationFormAgendaManagerModalComponent, {
          options : {
          ...opt,
          
          edit_cb(agendas) {
            res(agendas)
          },

          void() {
            res(null)
          }}
        },
        {closeableByBackgroundClick: true})
    })
  }

  async deleteAgenda (indexOfTarget: number, agendas: MeetingAgenda[]): Promise<MeetingAgenda[] | null> {
    try {
      const target = agendas.at(indexOfTarget),

      doNotAskAgainKey = "do-not-ask-again-meeting-agenda-delete"
      
      if(!target) throw Error() 

      const {topic} = target

      if(!this.storage.get(doNotAskAgainKey)) {
        const {answer, doNotAskAgain} = await this.GC_Modal.openConfirmDialogueAsync({
          message: `are you sure you want to delete "${topic}" agenda.`,
          includeDonNotAskAgain: true
        })

        if(doNotAskAgain) this.storage.set(doNotAskAgainKey, doNotAskAgain)

        if(!answer) throw Error()
      }

      agendas.splice(indexOfTarget, 1)

      return [...agendas]
    } catch {
      return null
    }
  }

  private getMinimumMeetingDuration () {
    return  Number(this.Meeting_Settings.min_meeting_duration.replace("m", "").trim())
  }

  private transformDateToKeyPattern (date: Date) {
    return date.toLocaleTimeString("en-Us", 
      {
        hour12: true,
        hour: "numeric",
        minute: "2-digit"
      }
    )
  }
}