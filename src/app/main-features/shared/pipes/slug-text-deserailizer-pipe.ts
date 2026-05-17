import { Pipe, PipeTransform } from '@angular/core';
import { SlugTextDesralizer } from 'src/app/functions/slug-text-deseralizer.func';

@Pipe({
  name: 'slugTextDeserailizer'
})
export class SlugTextDeserailizerPipe implements PipeTransform {

  transform(value?: string, ...args: string[]): string {
    return SlugTextDesralizer(value)
  }
}
