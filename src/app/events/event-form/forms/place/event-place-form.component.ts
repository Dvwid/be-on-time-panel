import {Component} from '@angular/core';
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventLocationFormGroup} from "../../../../core/dtos/EventForm";
import {GeocoderResult} from "../../../../shared/components/mapbox-wrapper/mapbox-wrapper.component";

@Component({
  selector: 'app-event-place-form',
  templateUrl: './event-place-form.component.html',
  styleUrls: ['./event-place-form.component.scss']
})
export class EventPlaceFormComponent extends EventFormAbstractComponent<EventLocationFormGroup> {

  setSelectedResult(result: GeocoderResult) {
    console.log(result);
    this.formGroup.controls.place.setValue(result.place_name);
  }
}
