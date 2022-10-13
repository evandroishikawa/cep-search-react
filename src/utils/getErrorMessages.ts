import { ValidationError } from 'yup';

export function getErrorMessages(error: ValidationError) {
  const errors: string[] = [];

  error.inner.forEach((error) => {
    errors.push(error.message);
  });

  return errors;
}
