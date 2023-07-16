import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventForm} from "../../core/dtos/EventForm";
import {EventService} from "../services/event.service";
import {
  EventAdditionalInfoDto,
  EventDetailsDto,
  EventDto,
  EventImageInfoDto,
  EventLocationDto
} from "../../core/dtos/EventDto";
import {BehaviorSubject, finalize} from "rxjs";
import {NotificationService} from "../../core/notification/services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent {

  #eventService = inject(EventService);
  #formBuilder = inject(FormBuilder);
  #notificationService = inject(NotificationService);
  #router = inject(Router);

  eventForm: FormGroup<EventForm> = this.#formBuilder
    .group({
      eventDetails: this.#formBuilder
        .group({
          name: new FormControl<string | null>('', Validators.required),
          description: new FormControl<string | null>('', Validators.required),
          dateFrom: new FormControl<Date | null>(null, Validators.required),
          hourFrom: new FormControl<string | null>(null),
          minuteFrom: new FormControl<string | null>(null),
          dateTo: new FormControl<Date | null>(null),
          hourTo: new FormControl<string | null>(null),
          minuteTo: new FormControl<string | null>(null)
        }),
      eventLocation: this.#formBuilder
        .group({
          placeName: new FormControl<string | null>(null, Validators.required),
          postCode: new FormControl<string | null>(null),
          city: new FormControl<string | null>(null),
          address: new FormControl<string | null>(null),
          country: new FormControl<string | null>(null),
          lng: new FormControl<number | null>(null),
          lat: new FormControl<number | null>(null),
        }),
      additionalInfo: this.#formBuilder
        .group({
          additionalInfo: new FormControl<string | null>(null)
        }),
      eventImage: this.#formBuilder
        .group({
          imageId: new FormControl<string | null>(null)
        }),
    })

  isEventCreating$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  submit() {
    this.eventForm.markAllAsTouched();

    if (!this.eventForm?.valid) {
      this.#notificationService.warning('Ostrzeżenie', 'Uzupełnij wszystkie wymagane pola formularza.');
      return;
    }

    this.createEvent();
  }

  private prepareCreateEventRequest(): EventDto {
    return {
      eventLocation: this.prepareEventLocationDto(),
      eventDetails: this.prepareEventDetailsDto(),
      additionalInfo: this.prepareEventAdditionalInfoDto(),
      imageInfo: this.prepareEventImageInfoDto()
    }
  }

  private prepareEventLocationDto(): EventLocationDto {
    return {
      placeName: this.eventForm?.controls?.eventLocation?.controls?.placeName?.value,
      city: this.eventForm?.controls?.eventLocation?.controls?.city?.value,
      country: this.eventForm?.controls?.eventLocation?.controls?.country?.value,
      address: this.eventForm?.controls?.eventLocation?.controls?.address?.value,
      postCode: this.eventForm?.controls?.eventLocation?.controls?.postCode?.value,
      lng: this.eventForm?.controls?.eventLocation?.controls?.lng?.value,
      lat: this.eventForm?.controls?.eventLocation?.controls?.lat?.value,
    };
  }

  private prepareEventDetailsDto(): EventDetailsDto {
    return {
      name: this.eventForm?.controls?.eventDetails?.controls?.name?.value,
      description: this.eventForm?.controls?.eventDetails?.controls?.description?.value,
      dateFrom: this.eventForm?.controls?.eventDetails?.controls?.dateFrom?.value?.getTime(),
      dateTo: this.eventForm?.controls?.eventDetails?.controls?.dateTo?.value?.getTime(),
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

    this.#eventService
      .create(req)
      .pipe(finalize(() => this.isEventCreating$.next(false)))
      .subscribe((data) => this.doAfterCreateEvent(data));
  }

  private doAfterCreateEvent(event: EventDto) {
    this.#notificationService.success('Sukces!', 'Utworzono nowe wydarzenie');
    this.#router.navigate([`/details/${event?.id}`]);
  }

  private prepareEventImageInfoDto(): EventImageInfoDto {
    return {
      imageId: this.eventForm?.controls?.eventImage?.controls?.imageId?.value
    };
  }
}
