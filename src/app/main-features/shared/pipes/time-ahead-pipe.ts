import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Pipe({
  name: 'timeAhead'
})
export class TimeAheadPipe implements PipeTransform {

  transform(value?: Date | null): string {
    try {
      let resultStr = ""

      if(!value) throw Error()
      
      const earlierDate = new Date(value)

      if(isNaN(earlierDate.getTime())) throw Error()

      const hourToMins = 60,
      
      diffInMins = Math.max(differenceInMinutes(new Date(), earlierDate), 0),

      hours = Math.floor(diffInMins / hourToMins),

      minsLeft = hours ? diffInMins % hourToMins : diffInMins

      if(hours){
        resultStr = String(`${hours}h ${minsLeft ? minsLeft + 'm' : ''}`).trim()
      }else if(minsLeft){
        resultStr = `${minsLeft}m`
      } else throw Error()

      return `${resultStr} ago`
    } catch {
      return 'Just now'
    }
  }
}
