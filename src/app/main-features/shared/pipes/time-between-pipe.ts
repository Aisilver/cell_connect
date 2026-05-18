import { Pipe, PipeTransform } from '@angular/core';
import { differenceInMinutes } from 'date-fns';

@Pipe({
  name: 'timeBetween'
})
export class TimeBetweenPipe implements PipeTransform {

  transform(value?: Date, ...args: unknown[]): string {
    try {

      if(!value) throw Error()
      
      const earlierDate = new Date(value).getTime(),
      
      diffInMins = Math.max(differenceInMinutes(new Date(), earlierDate), 0)

  
      return ''
    } catch {
      return ''
    }
  }

}
