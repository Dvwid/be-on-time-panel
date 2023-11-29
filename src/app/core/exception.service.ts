import {inject, Injectable} from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "./notification/services/notification.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ExceptionService {

  #notificationService = inject(NotificationService);
  #router = inject(Router);

  constructor() {
  }


  private static is401Response(status: number) {
    return status === 401;
  }

  private static is403Response(status: number) {
    return status === 403;
  }

  static defaultMessage(): string {
    return `Wystąpił nieznany błąd`;
  }

  private static prepareMessage(error: any): any {
    if (error) {
      return `${error}`;
    }
    return ExceptionService.defaultMessage();
  }

  handleError: (err: HttpErrorResponse) => Observable<any> = (err: any) => {
    let message;
    if (ExceptionService.is401Response(err?.status)) {
      this.logout();
      message = null;
    }
    if (ExceptionService.is403Response(err?.status)) {
      this.logout();
    }

    if (err?.error) {
      message = err?.error?.message || 'Nieznany rodzaj błędu.';
      this.showError(ExceptionService.prepareMessage(message));
    }
    return throwError(ExceptionService.prepareMessage(message));
  }

  private showError(msg: string): void {
    this.#notificationService.error('Wystąpił błąd.', msg, 6000);
    console.error(msg);
  }

  private logout() {
    localStorage.removeItem('EXAM-JWT');
    this.#router.navigate(['/auth']);
  }
}
