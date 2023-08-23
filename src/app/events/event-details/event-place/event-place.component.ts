import {Component, Input} from '@angular/core';
import {EventLocationDto} from "../../../core/dtos/EventDto";

@Component({
  selector: 'app-event-place',
  templateUrl: './event-place.component.html',
  styleUrls: ['./event-place.component.scss']
})
export class EventPlaceComponent {

  @Input() eventLocation: EventLocationDto;

}
