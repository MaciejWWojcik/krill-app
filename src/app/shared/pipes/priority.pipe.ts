import { Pipe, PipeTransform } from '@angular/core';
import { Priority } from '../../models/priority';

@Pipe({
  name: 'priority'
})
export class PriorityPipe implements PipeTransform {

  private readonly priorities: Map<Priority, string> = new Map([
    [Priority.Low, 'Low'],
    [Priority.Medium, 'Medium'],
    [Priority.High, 'High'],
  ]);

  transform(value: Priority): string {
    return this.priorities.get(value) || 'unknown';
  }

}
