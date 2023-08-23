import {Component, Input} from '@angular/core';
import {InitiatorInfoDto} from "../../../core/dtos/EventDto";

@Component({
  selector: 'app-event-initiator',
  templateUrl: './event-initiator.component.html',
  styleUrls: ['./event-initiator.component.scss']
})
export class EventInitiatorComponent {

  @Input() initiatorInfo: InitiatorInfoDto;

}
