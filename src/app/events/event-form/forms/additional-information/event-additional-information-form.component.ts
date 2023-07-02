import {Component} from '@angular/core';
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventAdditionalInfoFormGroup} from "../../../../core/dtos/EventForm";

@Component({
  selector: 'app-event-additional-information-form',
  templateUrl: './event-additional-information-form.component.html',
  styleUrls: ['./event-additional-information-form.component.scss']
})
export class EventAdditionalInformationFormComponent extends EventFormAbstractComponent<EventAdditionalInfoFormGroup> {

}
