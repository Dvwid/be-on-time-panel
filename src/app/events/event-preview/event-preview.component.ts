import {Component, OnInit} from '@angular/core';
import {EventDto} from 'src/app/core/dtos/EventDto';
import {EventService} from "../services/event.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-event-preview',
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss']
})
export class EventPreviewComponent implements OnInit {

  eventId = this.activatedRoute.snapshot.paramMap.get('eventId');
  event: EventDto;

  defaultImage = 'https://www.baltimoreseventsolutions.com/wp-content/uploads/2019/10/BES_Corporate_Hero.jpg';

  get imageUrl(): string {
    return this.event?.imageUrl || this.defaultImage;
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
