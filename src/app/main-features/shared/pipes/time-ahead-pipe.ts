import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Pipe({
  name: 'timeAhead'
})
export class TimeAheadPipe implements PipeTransform {

  transform(value?: Date | null): string {
    try {

      if(!value) throw Error()
      
      const earlierDate = new Date(value).getTime(),

      hourToMins = 60,
      
      diffInMins = Math.max(differenceInMinutes(new Date(), earlierDate), 0),

      hours = Math.floor(diffInMins / hourToMins),

      minsLeft = hours ? diffInMins % hourToMins : diffInMins

      if(hours){
        return String(`${hours}h ${minsLeft ? minsLeft + 'm' : ''}`).trim()
      }else if(minsLeft){
        return `${minsLeft}m`
      } else throw Error()
    } catch {
      return 'Just now'
    }
  }
}
