import {Component, Input} from '@angular/core';
import {EventDto} from "../../../core/dtos/EventDto";
import {ParticipationTypeEnum} from "../../../core/dtos/ParticipationTypeEnum";

@Component({
  selector: 'app-event-participation-info',
  templateUrl: './event-participation-info.component.html'
})
export class EventParticipationInfoComponent {

  @Input() event: EventDto;
  @Input() participationType: ParticipationTypeEnum
  @Input() label: string;

}
