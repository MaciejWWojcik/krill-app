import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Priority } from '../../../models/priority';
import { EventsApiService } from '../../services/events-api.service';
import { Occurrence } from '../../../models/occurrence';
import { CreateEvent } from '../../../models/create-event';
import { EventType } from '../../../models/event-type';
import { EventTimeType } from '../../../models/event-time-type';
import { dateRangeValidator } from '../../../shared/functions/date-range-validator';
import { StateMatcher } from '../../../shared/functions/state-matcher';


@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.scss']
})
export class PlanCreateComponent implements OnInit {

  form!: FormGroup;

  readonly StateMatcher = new StateMatcher();
  readonly Priority = Priority;
  readonly Occurrence = Occurrence;

  constructor(
    private api: EventsApiService,
  ) {
  }

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

    this.form = new FormGroup({
      icon: new FormControl(),
      name: new FormControl('', [Validators.required]),
      singleOccurrence: new FormControl(true),
      occurrence: new FormControl(Occurrence.EveryYear),
      startDate: new FormControl(today, [Validators.required]),
      rangeDate: new FormControl(false),
      endDate: new FormControl(tomorrow),
      description: new FormControl(),
      priority: new FormControl(Priority.Medium),
      categories: new FormArray([]),
    }, [
      dateRangeValidator(),
    ]);
  }

  async create() {
    const event: CreateEvent = {
      title: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      type: this.form.controls['singleOccurrence'].value ? EventType.OneTime : EventType.MultiTime,
      timeType: this.form.controls['rangeDate'].value ? EventTimeType.Range : EventTimeType.Point,
      priority: this.form.controls['priority'].value,
      date: (<Date>this.form.controls['startDate'].value).toISOString(),
      description: this.form.controls['description'].value,
      categories: [],
    };

    if (event.timeType === EventTimeType.Range) {
      event.endDate = (<Date>this.form.controls['endDate'].value).toISOString()
    }
    if (event.type === EventType.MultiTime) {
      event.occurrence = this.form.controls['occurrence'].value;
    }

    await this.api.createEvent(event);

  }
}
