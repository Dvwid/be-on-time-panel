import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EventForm} from "../../core/dtos/EventForm";
import {EventService} from "../services/event.service";
import {
  EventDetailsDto,
  EventDto,
  EventImageInfoDto,
  EventLocationDto,
  InitiatorInfoDto
} from "../../core/dtos/EventDto";
import {BehaviorSubject, finalize} from "rxjs";
import {NotificationService} from "../../core/notification/services/notification.service";
import {Router} from "@angular/router";
import {AuthService} from "../../core/auth/services/auth.service";
import {EventCategoryDto} from "../../core/dtos/EventCategoryDto";
import {CreateEventResponse} from "../../core/dtos/CreateEventResponse";

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html'
})
export class EventCreateComponent {

  #eventService = inject(EventService);
  #formBuilder = inject(FormBuilder);
  #notificationService = inject(NotificationService);
  #router = inject(Router);
  #authService = inject(AuthService);


  eventForm: FormGroup<EventForm> = this.#formBuilder
    .group({
      eventDetails: this.#formBuilder
        .group({
          name: new FormControl<string | null>('', Validators.required),
          description: new FormControl<string | null>(''),
          dateFrom: new FormControl<Date | null>(null, Validators.required),
          dateTo: new FormControl<Date | null>(null),
          category: new FormControl<EventCategoryDto | null>(null)
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
      imageInfo: this.prepareEventImageInfoDto(),
      initiatorInfo: this.prepareInitiatorInfo()
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
      category: this.eventForm?.controls?.eventDetails?.controls?.category?.value
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

  private doAfterCreateEvent(res: CreateEventResponse) {
    this.#notificationService.success('Sukces!', 'Utworzono nowe wydarzenie');
    this.#router.navigate([`/events/details/${res?.id}`]);
  }

  private prepareEventImageInfoDto(): EventImageInfoDto {
    return {
      imageId: this.eventForm?.controls?.eventImage?.controls?.imageId?.value
    };
  }

  private prepareInitiatorInfo(): InitiatorInfoDto {
    return {
      initiatorId: this.#authService.currentUser$.value.id,
      initiatorName: this.#authService.currentUser$.value.name,
    };
  }
}
