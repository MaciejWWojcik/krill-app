import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateRangeValidator(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    const startDate = (<FormGroup>form).controls['startDate']?.value;
    const endDate = (<FormGroup>form).controls['endDate']?.value;
    const rangeDate = (<FormGroup>form).controls['rangeDate']?.value;

    if (!rangeDate) {
      (<FormGroup>form).controls['endDate']?.setErrors(null);
      return null;
    }

    if (rangeDate && !endDate) {
      (<FormGroup>form).controls['endDate']?.setErrors({ requiredEndDate: true });
    }

    if (new Date(startDate).getTime() >= new Date(endDate).getTime()) {
      (<FormGroup>form).controls['endDate']?.setErrors({ dateOrder: true });
      return { dateOrder: true };
    }
    return null;
  }
}
