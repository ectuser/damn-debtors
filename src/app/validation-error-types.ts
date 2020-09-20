export const ValidationErrorTypes = {
    FIELD_REQUIRED: 'You must enter a value',
    INVALID_EMAIL: 'Not a valid email',
    PASSWORDS_DO_NOT_MATCH: 'Passwords should match',
    MIN_LENGTH(value: number){
        return `Min length should be ${value}`;
    }
    
}