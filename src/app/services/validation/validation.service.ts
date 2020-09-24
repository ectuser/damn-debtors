import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ValidationErrorTypes } from 'src/app/validation-error-types';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getFieldErrorMessage(
    form: FormGroup,
    control: string = null,
    minFieldLength = null
  ) {
    const field = control ? form.get(control) : form;
    const errors = field.errors ? Object.keys(field.errors) : [];
    const errorObject = Object.values(ValidationErrorTypes).find((el) => {
      const errorFound = errors.find((error) => el.errorName === error);
      return errorFound;
    });
    return errorObject && typeof errorObject.errorMessage === 'string'
      ? errorObject.errorMessage
      : errorObject &&
        typeof errorObject.errorMessage === 'function' &&
        minFieldLength
      ? errorObject.errorMessage(minFieldLength)
      : '';
  }
}
