import {Component} from '@angular/core';
import {EventDto} from '../core/dtos/EventDto';
import {mockedEvents} from "./services/event.service";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {

  todayEvents: EventDto[] = mockedEvents;

  constructor() {
  }

}
