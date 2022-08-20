import { fakeAsync } from '@angular/core/testing';
import { FormGroupDirective, UntypedFormControl } from '@angular/forms';
import { StateMatcher } from './state-matcher';

describe('StateMatcher', () => {

  it('returns error when control is touched and invalid', fakeAsync(async () => {
    const control = { touched: true, invalid: true } as UntypedFormControl;
    const form = { touched: true } as FormGroupDirective;
    const matcher = new StateMatcher();
    const result = matcher.isErrorState(control, form);

    expect(result).toBe(true);
  }));

  it('returns false when control is not touched', fakeAsync(async () => {
    const control = { touched: false, invalid: true } as UntypedFormControl;
    const form = { touched: true } as FormGroupDirective;
    const matcher = new StateMatcher();
    const result = matcher.isErrorState(control, form);

    expect(result).toBe(false);
  }));

  it('returns false when control is not invalid', fakeAsync(async () => {
    const control = { touched: true, invalid: false } as UntypedFormControl;
    const form = { touched: true } as FormGroupDirective;
    const matcher = new StateMatcher();
    const result = matcher.isErrorState(control, form);

    expect(result).toBe(false);
  }));
});
