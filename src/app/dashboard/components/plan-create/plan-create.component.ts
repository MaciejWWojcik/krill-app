import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Priority } from '../../../models/priority';
import { Occurrence } from '../../../models/occurrence';
import { CreatePlan } from '../../../models/create-plan';
import { EventType } from '../../../models/event-type';
import { EventTimeType } from '../../../models/event-time-type';
import { dateRangeValidator } from '../../../shared/functions/date-range-validator';
import { StateMatcher } from '../../../shared/functions/state-matcher';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.scss']
})
export class PlanCreateComponent implements OnInit {

  form!: UntypedFormGroup;

  readonly StateMatcher = new StateMatcher();
  readonly Priority = Priority;
  readonly Occurrence = Occurrence;

  constructor(
    private dialogRef: MatDialogRef<PlanCreateComponent>,
  ) {
  }

  ngOnInit(): void {
    const today = new Date();
    const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

    this.form = new UntypedFormGroup({
      icon: new UntypedFormControl(),
      name: new UntypedFormControl('', [Validators.required]),
      singleOccurrence: new UntypedFormControl(true),
      occurrence: new UntypedFormControl(Occurrence.EveryYear),
      startDate: new UntypedFormControl(today, [Validators.required]),
      rangeDate: new UntypedFormControl(false),
      endDate: new UntypedFormControl(tomorrow),
      description: new UntypedFormControl(),
      priority: new UntypedFormControl(Priority.Medium),
      categories: new UntypedFormArray([]),
    }, [
      dateRangeValidator(),
    ]);
  }

  async create() {
    const plan: CreatePlan = {
      title: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      type: this.form.controls['singleOccurrence'].value ? EventType.OneTime : EventType.MultiTime,
      timeType: this.form.controls['rangeDate'].value ? EventTimeType.Range : EventTimeType.Point,
      priority: this.form.controls['priority'].value,
      date: (<Date>this.form.controls['startDate'].value).toISOString(),
      description: this.form.controls['description'].value,
      categories: [],
    };

    if (plan.timeType === EventTimeType.Range) {
      plan.endDate = (<Date>this.form.controls['endDate'].value).toISOString()
    }
    if (plan.type === EventType.MultiTime) {
      plan.occurrence = this.form.controls['occurrence'].value;
    }

    this.dialogRef.close(plan);
  }
}
