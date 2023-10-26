import {Component, OnDestroy, OnInit} from '@angular/core';
import {Notification, NotificationService, NotificationType} from "./services/notification.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {

  notifications: Notification[] = [];

  private destroy$ = new Subject<boolean>();

  constructor(private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.listenOnNotifications();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  close(notification: Notification) {
    this.notifications = this.notifications?.filter(notify => notify?.id !== notification?.id);
  }


  setClassName(notification: Notification): string {
    let style: string;

    switch (notification.type) {
      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }

  private listenOnNotifications() {
    this.notificationService
      .notification
      .subscribe((notification: Notification) => this.addNotification(notification));
  }

  private addNotification(notification: Notification) {
    this.notifications.push(notification);

    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
  }
}
