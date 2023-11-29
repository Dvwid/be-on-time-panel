import {Component, inject, Input, OnInit} from '@angular/core';
import {EventDto} from "../../core/dtos/EventDto";
import {EventService} from "../services/event.service";
import {convertBase64ToImage, initializePagination} from "../../core/utilities";
import {BehaviorSubject, finalize} from "rxjs";
import {EventPageDto} from "../../core/dtos/EventPageDto";
import {ImagesService} from "../services/images.service";
import {FormGroup} from "@angular/forms";
import {AdditionalOptionsForm} from "../../core/dtos/AdditionalOptionsForm";
import {AuthService} from "../../core/auth/services/auth.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() additionalOptionsForm: FormGroup<AdditionalOptionsForm>;

  events: EventDto[];

  #eventService = inject(EventService);
  #imagesService = inject(ImagesService);
  #authService = inject(AuthService);

  pagination = initializePagination();
  areEventsLoading$ = new BehaviorSubject(false);
  imageLoaderVisibleForEventsId: string[] = [];


  ngOnInit() {
    this.getEventsList();
    this.listenOnShowPersonalizedEventChange();
  }

  isImageLoaderVisible(id: string) {
    return this.imageLoaderVisibleForEventsId.some(eventId => eventId === id);
  }

  private listenOnShowPersonalizedEventChange() {
    this.additionalOptionsForm
      .controls
      .showPersonalizedEvents
      .valueChanges
      .subscribe(_ => this.getEventsList());
  }

  private getEventsList() {
    this.areEventsLoading$.next(true);

    const personalized = this.additionalOptionsForm
      .controls
      .showPersonalizedEvents
      .value

    this.#eventService
      .getList({...this.pagination, id: personalized ? this.#authService?.currentUser$?.value?.id : null})
      .pipe(
        finalize(() => this.areEventsLoading$.next(false))
      )
      .subscribe(res => this.setData(res));
  }

  private setData(res: EventPageDto) {
    this.events = res?.data;
    this.pagination = res?.pageInfo;
    res?.data?.forEach((event) => this.getEventImage(event));
  }

  private getEventImage(event: EventDto) {
    this.imageLoaderVisibleForEventsId.push(event?.id);

    this.#imagesService
      .getImage(event?.imageInfo?.imageId)
      .pipe(finalize(() => this.disableImageLoaderForEvent(event?.id)))
      .subscribe((img) => convertBase64ToImage(img, 'event-list-image', `image-wrapper-${event?.id}`));
  }

  private disableImageLoaderForEvent(id: string | undefined) {
    this.imageLoaderVisibleForEventsId = this.imageLoaderVisibleForEventsId.filter(eventId => eventId !== id);
  }
}
