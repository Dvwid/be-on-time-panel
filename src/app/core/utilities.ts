import {ValidationErrors} from "@angular/forms";
import {HttpParams} from "@angular/common/http";
import {PageInfoDto} from "./dtos/PageInfoDto";
import {ImageDto} from "./dtos/ImageDto";

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

export function convertBase64ToImage(image: ImageDto, imageClass: string, wrapperId: string): void {
  if (!image?.base64) {
    return;
  }
  const img = new Image();
  img.src = 'data:image/png;base64,' + image?.base64;
  img.alt = image?.name;
  img.title = image?.id;
  img.className = imageClass;
  const wrapper = document.getElementById(wrapperId);
  wrapper.prepend(img);
}


