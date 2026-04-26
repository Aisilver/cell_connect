import { Pipe, PipeTransform } from '@angular/core';
import { isToday } from 'date-fns';

@Pipe({
  name: 'isToday'
})
export class IsTodayPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string | Date {
    const date = new Date(value),

    text = String(args[0] ?? 'today')

    try {
      if(!date.getTime()) throw Error()

      return isToday(date) ? text : date
      
    } catch {
      return date
    }

  }

}
