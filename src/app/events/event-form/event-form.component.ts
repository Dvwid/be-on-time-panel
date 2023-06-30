import {Component, Input} from '@angular/core';
import {ControlContainer, FormGroup, FormGroupDirective} from "@angular/forms";
import {GeocoderResult} from "../../shared/components/mapbox-wrapper/mapbox-wrapper.component";
import {EventForm} from "../../core/dtos/EventForm";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupDirective}]
})
export class EventFormComponent {

  @Input() formGroup: FormGroup<EventForm>;
  @Input() form: FormGroupDirective;

  setSelectedResult(result: GeocoderResult) {
    this.formGroup.controls.place.setValue(result.place_name);
  }
}
