import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const startDate = (<UntypedFormGroup>form).controls['startDate']?.value;
    const endDate = (<UntypedFormGroup>form).controls['endDate']?.value;
    const rangeDate = (<UntypedFormGroup>form).controls['rangeDate']?.value;

    if (!rangeDate) {
      (<UntypedFormGroup>form).controls['endDate']?.setErrors(null);
      return null;
    }

    if (rangeDate && !endDate) {
      (<UntypedFormGroup>form).controls['endDate']?.setErrors({ requiredEndDate: true });
      return null;
    }

    if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
      (<UntypedFormGroup>form).controls['endDate']?.setErrors({ dateOrder: true });
      return { dateOrder: true };
    }
    return null;
  }
}
