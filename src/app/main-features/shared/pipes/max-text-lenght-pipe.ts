import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maxTextLenght'
})
export class MaxTextLenghtPipe implements PipeTransform {

  transform(value?: string, length = 30, ...args: unknown[]): unknown {
    if(value && value.length > length) {
      const strinArr = value.split("")

      return `${strinArr.slice(0, length).join("")}...`
    }
    return value;
  }

}
