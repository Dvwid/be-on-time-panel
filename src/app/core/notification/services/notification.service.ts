import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

export class Notification {
  constructor(
    public id: number,
    public type: NotificationType,
    public title: string,
    public message: string,
    public timeout: number,
  ) {
  }

}

export enum NotificationType {
  success = 0,
  warning = 1,
  error = 2,
  info = 3
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notification = new Subject<Notification>();

  private _idx = 0;

  constructor() {
  }

  info(title: string, message: string, timeout = 3000) {
    this.notification.next(new Notification(this._idx++, NotificationType.info, title, message, timeout));
  }

  success(title: string, message: string, timeout = 3000) {
    this.notification.next(new Notification(this._idx++, NotificationType.success, title, message, timeout));
  }

  warning(title: string, message: string, timeout = 3000) {
    this.notification.next(new Notification(this._idx++, NotificationType.warning, title, message, timeout));
  }

  error(title: string, message: string, timeout = 0) {
    this.notification.next(new Notification(this._idx++, NotificationType.error, title, message, timeout));
  }
}
