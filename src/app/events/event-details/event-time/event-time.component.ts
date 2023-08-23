import {Component, Input} from '@angular/core';
import {EventDto} from "../../../core/dtos/EventDto";

@Component({
  selector: 'app-event-time',
  templateUrl: './event-time.component.html',
  styleUrls: ['./event-time.component.scss']
})
export class EventTimeComponent {

  @Input() event: EventDto;

}
