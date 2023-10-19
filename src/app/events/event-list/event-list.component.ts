import {Component, inject, Input, OnInit} from '@angular/core';
import {EventDto} from "../../core/dtos/EventDto";
import {EventService} from "../services/event.service";
import {convertBase64ToImage, initializePagination} from "../../core/utilities";
import {BehaviorSubject, finalize} from "rxjs";
import {EventPageDto} from "../../core/dtos/EventPageDto";
import {ImagesService} from "../services/images.service";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  events: EventDto[];

  #eventService = inject(EventService);
  #imagesService = inject(ImagesService);

  pagination = initializePagination();
  areEventsLoading$ = new BehaviorSubject(false);
  imageLoaderVisibleForEventsId: string[] = [];


  ngOnInit() {
    this.getEventsList();
  }


  isImageLoaderVisible(id: string) {
    return this.imageLoaderVisibleForEventsId.some(eventId => eventId === id);
  }

  private getEventsList() {
    this.areEventsLoading$.next(true);

    this.#eventService
      .getList(this.pagination)
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
