import {Component, Input} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, FormGroupDirective} from "@angular/forms";
import {EventForm} from "../../core/dtos/EventForm";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class EventFormComponent {

  @Input() formGroup: FormGroup<EventForm>;
  @Input() form: FormGroupDirective;

  constructor(private _formBuilder: FormBuilder) {
  }

}
