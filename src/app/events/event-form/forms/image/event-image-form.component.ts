import {Component} from '@angular/core';
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventImageFormGroup} from "../../../../core/dtos/EventForm";

@Component({
  selector: 'app-event-image-form',
  templateUrl: './event-image-form.component.html',
  styleUrls: ['./event-image-form.component.scss']
})
export class EventImageFormComponent extends EventFormAbstractComponent<EventImageFormGroup> {

}
