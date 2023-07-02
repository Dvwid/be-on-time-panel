import {Component} from '@angular/core';
import {ControlContainer, FormGroupDirective} from "@angular/forms";
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventDetailsFormGroup} from "../../../../core/dtos/EventForm";

@Component({
  selector: 'app-event-details-form',
  templateUrl: './event-details-form.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]

})
export class EventDetailsFormComponent extends EventFormAbstractComponent<EventDetailsFormGroup> {

}
