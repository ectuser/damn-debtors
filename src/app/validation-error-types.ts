export const ValidationErrorTypes = {
  FIELD_REQUIRED: {
    errorName: 'required',
    errorMessage: 'You must enter a value',
  },
  INVALID_EMAIL: { errorName: 'email', errorMessage: 'Not a valid email' },
  PASSWORDS_DO_NOT_MATCH: {
    errorName: 'valuesNotMatching',
    errorMessage: 'Passwords should match',
  },
  MIN_LENGTH: {
    errorName: 'minlength',
    errorMessage: (value: number) => `Min length should be ${value}`,
  },
};
