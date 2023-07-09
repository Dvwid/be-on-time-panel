import {Component, Input} from "@angular/core";
import {ControlContainer, FormGroup, FormGroupDirective} from "@angular/forms";
import {
  EventAdditionalInfoFormGroup,
  EventDetailsFormGroup,
  EventImageFormGroup,
  EventLocationFormGroup,
} from "../../core/dtos/EventForm";


type EventFormTypes = EventDetailsFormGroup
  | EventAdditionalInfoFormGroup
  | EventLocationFormGroup
  | EventImageFormGroup

@Component({
  selector: '',
  template: '',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class EventFormAbstractComponent<T extends EventFormTypes> {

  // @ts-ignore
  @Input() formGroup: FormGroup<T>;
  @Input() form: FormGroupDirective;

}
