import {ValidationErrors} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {PageInfoDto} from "./dtos/PageInfoDto";

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

export function convertObjectToParams(obj: any): HttpParams {
  if (!obj) {
    return new HttpParams();
  }
  let params = new HttpParams();
  Object.keys(obj).forEach((key) => {
    if (obj[key] !== undefined && obj[key] !== null) {
      params = params.append(key, String(obj[key]));
    }
  });
  return params;
}

export function initializePagination(): PageInfoDto {
  return {
    page: 1,
    pageSize: 10,
    total: 0
  }
}
