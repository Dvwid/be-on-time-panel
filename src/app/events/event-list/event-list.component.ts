import {Component, Input} from '@angular/core';
import {EventDto} from "../../core/dtos/EventDto";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {

  @Input() events: EventDto[];

}
