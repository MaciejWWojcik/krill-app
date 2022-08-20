import { fakeAsync } from '@angular/core/testing';
import { FormGroup, UntypedFormControl } from '@angular/forms';
import { dateRangeValidator } from './date-range-validator';

describe('dateRangeValidator', () => {

  it('returns valid when range is not chosen', fakeAsync(async () => {
    const group = new FormGroup({
      startDate: new UntypedFormControl(new Date(2020, 0, 1)),
      endDate: new UntypedFormControl(new Date(2020, 0, 10)),
      rangeDate: new UntypedFormControl(null),
    }, [dateRangeValidator()]);

    group.controls.endDate.setErrors({ requiredEndDate: true });
    group.updateValueAndValidity();

    expect(group.valid).toBe(true);
    expect(group.controls.endDate.errors).toBe(null);
  }));

  it('returns invalid when end date is not chosen', fakeAsync(async () => {
    const group = new FormGroup({
      startDate: new UntypedFormControl(new Date(2020, 0, 1)),
      endDate: new UntypedFormControl(null),
      rangeDate: new UntypedFormControl(true),
    }, [dateRangeValidator()]);

    expect(group.valid).toBe(false);
    expect(group.controls.endDate.errors).toEqual({ requiredEndDate: true });
  }));

  it('returns valid when end date is after start date', fakeAsync(async () => {
    const group = new FormGroup({
      startDate: new UntypedFormControl(new Date(2020, 0, 1)),
      endDate: new UntypedFormControl(new Date(2020, 0, 10)),
      rangeDate: new UntypedFormControl(true),
    }, [dateRangeValidator()]);

    expect(group.valid).toBe(true);
  }));

  it('returns invalid when end date is before start date', fakeAsync(async () => {
    const group = new FormGroup({
      startDate: new UntypedFormControl(new Date(2020, 0, 10)),
      endDate: new UntypedFormControl(new Date(2020, 0, 1)),
      rangeDate: new UntypedFormControl(true),
    }, [dateRangeValidator()]);

    expect(group.valid).toBe(false);
    expect(group.controls.endDate.errors).toEqual({ dateOrder: true });
  }));

});
