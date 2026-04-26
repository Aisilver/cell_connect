import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textDeserailizer'
})
export class TextDeserailizerPipe implements PipeTransform {

  transform(value?: string, ...args: string[]): string {
    try {
      if(!value) throw Error()

      if(!value.includes("_") || value.includes(" ")) throw Error()

      return value.replaceAll("_", " ")
    } catch {
      return String(value)
    }
  }

}
