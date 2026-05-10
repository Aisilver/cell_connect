import { Injectable } from '@angular/core';
import { Meeting, MeetingEditLog } from '@shared/entities';

@Injectable({
  providedIn: 'any'
})
export class MeetingCreationFormEditDetectionService {
  getChanges(oldMeeting?: Meeting, newMeeting?: Meeting): MeetingEditLog | null {
    
    try {
      if(!oldMeeting || !newMeeting) throw Error()

        
      return {
      
      }
      
    } catch  {
      return null
    }
  } 
}