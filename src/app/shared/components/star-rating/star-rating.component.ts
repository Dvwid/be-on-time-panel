import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../core/material/material.module";
import {NotificationService} from "../../../core/notification/services/notification.service";

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule
  ],
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent {

  @Input() rating: number;
  @Input() starCount: number;
  @Input() color: string = 'accent';
  @Input() disabled: boolean;
  @Input() showUserRate: boolean;
  @Input() disabledMsg: string;
  @Input() userRate: number;

  @Output() ratingUpdated = new EventEmitter();

  private snackBarDuration: number = 2000;
  ratingArr: number[] = [];

  #notificationService = inject(NotificationService);

  constructor() {
  }

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating: number) {
    if (this.disabled) {
      return;
    }

    this.ratingUpdated.emit(rating);
  }

  showIcon(index: number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
