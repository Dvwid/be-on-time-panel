import {ValidationErrors} from "@angular/forms";

export function getErrorMessage(errors: ValidationErrors): string {
  if (errors?.['required']) {
    return 'Pole jest wymagane.'
  }

  if (errors?.['maxlength']) {
    return 'Nazwa jest zbyt długa.'
  }

  if (errors?.['minlength']) {
    return 'Hasło jest zbyt krótkie.'
  }

  if (errors?.['email']) {
    return 'Wprowadź poprawny adres e-mail.'
  }

  return '';
}
