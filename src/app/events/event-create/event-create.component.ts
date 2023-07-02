import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventForm} from "../../core/dtos/EventForm";
import {setFormGroupTouched} from "../../core/utilities";
import {EventService} from "../services/event.service";
import {
  CreateEventRequestDto,
  EventAdditionalInfoDto,
  EventDetailsDto,
  EventLocationDto
} from "../../core/dtos/CreateEventRequestDto";
import {finalize, Subject} from "rxjs";
import {EventDto} from "../../core/dtos/EventDto";
import {NotificationService} from "../../core/notification/services/notification.service";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent {

  eventForm: FormGroup<EventForm> = this._formBuilder
    .group({
      eventDetails: this._formBuilder
        .group({
          name: new FormControl<string | null>(null, Validators.required),
          description: new FormControl<string | null>(null, Validators.required),
          dateFrom: new FormControl<Date | null>(null),
          hourFrom: new FormControl<string | null>(null),
          minuteFrom: new FormControl<string | null>(null),
          dateTo: new FormControl<Date | null>(null),
          hourTo: new FormControl<string | null>(null),
          minuteTo: new FormControl<string | null>(null)
        }),
      eventLocation: this._formBuilder
        .group({
          place: new FormControl<string | null>(null)
        }),
      additionalInfo: this._formBuilder
        .group({
          additionalInfo: new FormControl<string | null>(null)
        }),
      eventImage: this._formBuilder
        .group({
          imageId: new FormControl<string | null>(null)
        }),
    })

  private isEventCreating$ = new Subject<boolean>();

  constructor(private _eventService: EventService,
              private _formBuilder: FormBuilder,
              private _notificationService: NotificationService) {
  }

  submit() {
    setFormGroupTouched(this.eventForm);

    if (!this.eventForm?.valid) {
      return;
    }

    this.createEvent();
  }

  private prepareCreateEventRequest(): CreateEventRequestDto {
    return {
      eventLocation: this.prepareEventLocationDto(),
      eventDetails: this.prepareEventDetailsDto(),
      additionalInfo: this.prepareEventAdditionalInfoDto()
    }
  }

  private prepareEventLocationDto(): EventLocationDto {
    return {
      place: this.eventForm?.controls?.eventLocation?.controls?.place?.value
    };
  }

  private prepareEventDetailsDto(): EventDetailsDto {
    return {
      name: this.eventForm?.controls?.eventDetails?.controls?.name?.value,
      description: this.eventForm?.controls?.eventDetails?.controls?.name?.value,
      dateFrom: this.eventForm?.controls?.eventDetails?.controls?.dateFrom?.value,
      dateTo: this.eventForm?.controls?.eventDetails?.controls?.dateTo?.value,
      hourFrom: this.eventForm?.controls?.eventDetails?.controls?.hourFrom?.value,
      hourTo: this.eventForm?.controls?.eventDetails?.controls?.hourTo?.value,
      minuteFrom: this.eventForm?.controls?.eventDetails?.controls?.minuteFrom?.value,
      minuteTo: this.eventForm?.controls?.eventDetails?.controls?.minuteTo?.value
    };
  }

  private prepareEventAdditionalInfoDto(): EventAdditionalInfoDto {
    return {
      additionalInfo: this.eventForm?.controls?.additionalInfo?.controls?.additionalInfo?.value
    };
  }

  private createEvent() {
    const req = this.prepareCreateEventRequest();
    this.isEventCreating$.next(true)

    this._eventService
      .create(req)
      .pipe(finalize(() => this.isEventCreating$.next(false)))
      .subscribe((data) => this.doAfterCreateEvent(data));
  }

  private doAfterCreateEvent(event: EventDto) {
    this._notificationService.success('Sukces!', 'Utworzono nowe wydarzenie');
  }
}
