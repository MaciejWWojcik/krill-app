import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Priority } from '../../../models/priority';
import { Occurrence } from '../../../models/occurrence';
import { CreatePlan } from '../../../models/create-plan';
import { EventType } from '../../../models/event-type';
import { EventTimeType } from '../../../models/event-time-type';
import { dateRangeValidator } from '../../../shared/functions/date-range-validator';
import { StateMatcher } from '../../../shared/functions/state-matcher';
import { MatDialogRef } from '@angular/material/dialog';

interface PlanForm {
  icon: FormControl<string>;
  name: FormControl<string>;
  singleOccurrence: FormControl<boolean>;
  occurrence: FormControl<Occurrence>;
  startDate: FormControl<Date>;
  rangeDate: FormControl<boolean>;
  endDate: FormControl<Date>;
  description: FormControl<string>;
  priority: FormControl<Priority>;
  // categories: UntypedFormArray;
}

@Component({
  selector: 'app-plan-create',
  templateUrl: './plan-create.component.html',
  styleUrls: ['./plan-create.component.scss']
})
export class PlanCreateComponent implements OnInit {

  form!: FormGroup<PlanForm>;

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

    this.form = new FormGroup<PlanForm>({
      icon: new FormControl<string>('', { nonNullable: true }),
      name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
      singleOccurrence: new FormControl<boolean>(true, { nonNullable: true }),
      occurrence: new FormControl<Occurrence>(Occurrence.EveryYear, { nonNullable: true }),
      startDate: new FormControl<Date>(today, { nonNullable: true, validators: [Validators.required] }),
      rangeDate: new FormControl<boolean>(false, { nonNullable: true }),
      endDate: new FormControl<Date>(tomorrow, { nonNullable: true }),
      description: new FormControl<string>('', { nonNullable: true }),
      priority: new FormControl<Priority>(Priority.Medium, { nonNullable: true }),
    }, [
      dateRangeValidator(),
    ]);
  }

  async create() {
    const plan: CreatePlan = {
      title: this.form.value.name ?? '',
      icon: this.form.value.icon ?? '',
      type: this.form.value.occurrence ? EventType.OneTime : EventType.Recurring,
      timeType: this.form.value.rangeDate ? EventTimeType.Range : EventTimeType.Point,
      priority: this.form.value.priority ?? Priority.Medium,
      date: this.form.value.startDate!.toISOString(),
      description: this.form.value.description ?? '',
      categories: [],
    };

    if (plan.timeType === EventTimeType.Range) {
      plan.endDate = (<Date>this.form.controls['endDate'].value).toISOString()
    }
    if (plan.type === EventType.Recurring) {
      plan.occurrence = this.form.controls['occurrence'].value;
    }

    this.dialogRef.close(plan);
  }
}
