import {Component, inject, OnInit} from '@angular/core';
import {EventDto} from 'src/app/core/dtos/EventDto';
import {EventService} from "../services/event.service";
import {ActivatedRoute} from "@angular/router";
import {ImagesService} from "../services/images.service";
import {convertBase64ToImage} from "../../core/utilities";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  #imagesService = inject(ImagesService);

  eventId = this.activatedRoute.snapshot.paramMap.get('eventId');
  event: EventDto;

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getEventDetails();
  }

  private getEventDetails() {
    this.eventService
      .getEventById(this.eventId)
      .subscribe((data) => {
        console.log(data);
        this.event = data;
        if (data?.imageInfo?.imageId) {
          this.getImage(data?.imageInfo?.imageId);
        }
      });
  }

  private getImage(imageId: string | undefined) {
    this.#imagesService
      .getImage(imageId)
      .subscribe(data => convertBase64ToImage(data, 'preview-event-image'));
  }


}
