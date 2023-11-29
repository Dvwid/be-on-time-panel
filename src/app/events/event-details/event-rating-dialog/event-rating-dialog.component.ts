import {Component, inject, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EventDto, EventRatingDto} from "../../../core/dtos/EventDto";
import {EventService} from "../../services/event.service";
import {BehaviorSubject, finalize} from "rxjs";
import {NotificationService} from "../../../core/notification/services/notification.service";
import {AuthService} from "../../../core/auth/services/auth.service";

@Component({
  selector: 'app-event-rating-dialog',
  templateUrl: './event-rating-dialog.component.html'
})
export class EventRatingDialogComponent implements OnInit {

  #eventService = inject(EventService);
  #notificationService = inject(NotificationService);
  #authService = inject(AuthService);

  rateForm: FormGroup<RateFormGroup>;
  rating: number;

  isRatingPending$ = new BehaviorSubject(false);

  constructor(@Inject(MAT_DIALOG_DATA) private data: EventRatingDialogData,
              private dialogRef: MatDialogRef<EventRatingDialogComponent>) {
  }

  ngOnInit() {
    this.rating = this.data?.rating;
    this.initializeRateForm();
  }

  close(data?: EventDto) {
    this.dialogRef.close(data);
  }

  private initializeRateForm() {
    this.rateForm = new FormGroup<RateFormGroup>({
      description: new FormControl<string>(''),
    });
  }

  rateEvent() {
    const req = this.prepareRatingEventDto();
    this.isRatingPending$.next(true);

    this.#eventService
      .rate(req)
      .pipe(
        finalize(() => this.isRatingPending$.next(false))
      )
      .subscribe((data) => {
        this.close(data);
        this.#notificationService.success('Sukces!', 'Twoja opinia zostałą przesłana.');
      });
  }

  private prepareRatingEventDto(): EventRatingDto {
    return {
      eventId: this.data.eventId,
      rate: this.rating,
      userName: this.#authService.currentUser$.value?.name,
      userId: this.#authService.currentUser$.value?.id,
      description: this.rateForm.controls.description.value
    }
  }
}

export interface RateFormGroup {
  description: FormControl<string>;
}

export interface EventRatingDialogData {
  rating: number;
  eventId: string;
  userId: string;
}
