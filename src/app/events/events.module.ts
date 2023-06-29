import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {MaterialModule} from "../core/material/material.module";
import {EventListComponent} from './event-list/event-list.component';
import {EventPreviewComponent} from './event-preview/event-preview.component';
import {GoogleMapWrapperModule} from "../shared/components/mapbox-wrapper/mapbox-wrapper.module";
import {EventCreateComponent} from './event-create/event-create.component';
import {TextInputComponent} from "../shared/components/form-fields/text-input/text-input.component";
import {TextareaComponent} from "../shared/components/form-fields/textarea/textarea.component";
import {DatepickerComponent} from "../shared/components/form-fields/datepicker/datepicker.component";
import {TimepickerComponent} from "../shared/components/form-fields/timepicker/timepicker.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ImagePickerComponent} from "../shared/components/image-picker/image-picker.component";
import {EventFormComponent} from './event-form/event-form.component';
import {EventEditComponent} from "./event-edit/event-edit.component";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    EventsRoutingModule,
    GoogleMapWrapperModule,
    TextInputComponent,
    TextareaComponent,
    DatepickerComponent,
    TimepickerComponent,
    ReactiveFormsModule,
    ImagePickerComponent
  ],
  declarations: [
    EventsComponent,
    EventListComponent,
    EventPreviewComponent,
    EventCreateComponent,
    EventEditComponent,
    EventFormComponent,
  ],
})
export class EventsModule {
}
