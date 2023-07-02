import {Component, Input} from "@angular/core";
import {FormGroup, FormGroupDirective} from "@angular/forms";
import {
  EventAdditionalInfoFormGroup,
  EventDetailsFormGroup, EventImageFormGroup,
  EventLocationFormGroup,
} from "../../core/dtos/EventForm";


type EventFormTypes = EventDetailsFormGroup
  | EventAdditionalInfoFormGroup
  | EventLocationFormGroup
  | EventImageFormGroup

@Component({
  selector: '',
  template: ''
})
export class EventFormAbstractComponent<T extends EventFormTypes> {

  // @ts-ignore
  @Input() formGroup: FormGroup<T>;
  @Input() form: FormGroupDirective;

}
