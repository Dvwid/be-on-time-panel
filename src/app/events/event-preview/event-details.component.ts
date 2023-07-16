import {Component, OnInit} from '@angular/core';
import {EventDto} from 'src/app/core/dtos/EventDto';
import {EventService} from "../services/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventId = this.activatedRoute.snapshot.paramMap.get('eventId');
  event: EventDto;

  defaultImage = 'https://www.baltimoreseventsolutions.com/wp-content/uploads/2019/10/BES_Corporate_Hero.jpg';

  get imageUrl(): string {
    return this.event?.imageInfo.imageId || this.defaultImage;
  }

  constructor(private eventService: EventService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.getEventDetails();
  }

  private getEventDetails() {
    this.eventService
      .getEventById(this.eventId)
      .subscribe((data) => this.event = data);
  }

}
