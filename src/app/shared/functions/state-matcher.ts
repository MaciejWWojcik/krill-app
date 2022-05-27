import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective } from '@angular/forms';

export class StateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective): boolean {
    return control && control.touched && control.invalid;
  }
}
