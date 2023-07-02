import {Component} from '@angular/core';
import {EventFormAbstractComponent} from "../../event-form-abstract.component";
import {EventLocationFormGroup} from "../../../../core/dtos/EventForm";
import {GeocoderResult, LngLat} from "../../../../shared/components/mapbox-wrapper/mapbox-wrapper.component";

@Component({
  selector: 'app-event-place-form',
  templateUrl: './event-place-form.component.html',
  styleUrls: ['./event-place-form.component.scss']
})
export class EventPlaceFormComponent extends EventFormAbstractComponent<EventLocationFormGroup> {


  setPointer(lngLat: LngLat) {
    this.formGroup.controls.lat.setValue(lngLat?.lat);
    this.formGroup.controls.lng.setValue(lngLat?.lng);
  }

  removePointer() {
    this.formGroup.controls.lat.setValue(null);
    this.formGroup.controls.lng.setValue(null);
  }

  setSelectedResult(result: GeocoderResult) {
    const address = `${result?.properties?.address || ((result?.text || '') + ' ' + (result?.address || ''))}`;
    const city = this.findValueFromContextById('place', result)?.text || '';
    const postCode = this.findValueFromContextById('postcode', result)?.text || '';
    const country = this.findValueFromContextById('country', result)?.text || '';
    const placeName = result?.place_name || '';
    const lng = result?.center?.[0] || null;
    const lat = result?.center?.[1] || null;

    this.formGroup.controls.city.setValue(city);
    this.formGroup.controls.postCode.setValue(postCode);
    this.formGroup.controls.address.setValue(address);
    this.formGroup.controls.country.setValue(country);
    this.formGroup.controls.placeName.setValue(placeName);
    this.formGroup.controls.lat.setValue(lat);
    this.formGroup.controls.lng.setValue(lng);
  }

  private findValueFromContextById(key: string, result: GeocoderResult) {
    return result?.context?.find((context) => context?.id?.includes(key));
  }
}
