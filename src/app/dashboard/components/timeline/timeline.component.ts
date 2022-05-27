import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { daysDiff, getNextMonth } from '../../../shared/functions/date-utils';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() daySize!: number;
  @Input() startTime!: Date;
  @Input() endTime!: Date;

  months: { position: number, name: string }[] = [];

  @HostBinding('style.height.px') height = 0;

  ngOnInit(): void {
    const lastMonth = getNextMonth(this.endTime);
    let month = getNextMonth(this.startTime);
    while (month.getTime() < lastMonth.getTime()) {
      const position = daysDiff(this.startTime, month) * this.daySize;
      const name = month.toLocaleDateString('en-US', { month: 'long' });

      this.months.push({ position, name });
      month = getNextMonth(month);
    }

    const totalDiff = daysDiff(this.startTime, this.endTime);
    this.height = (totalDiff + 1) * this.daySize;
  }

}
