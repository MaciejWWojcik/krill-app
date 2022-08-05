import { ErrorStateMatcher } from '@angular/material/core';
import { UntypedFormControl, FormGroupDirective } from '@angular/forms';

export class StateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl, form: FormGroupDirective): boolean {
    return control && control.touched && control.invalid;
  }
}
