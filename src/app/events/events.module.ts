import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {MaterialModule} from "../core/material/material.module";
import {EventListComponent} from './event-list/event-list.component';
import {EventPreviewComponent} from './event-preview/event-preview.component';
import {GoogleMapWrapperModule} from "../shared/google-map/mapbox-wrapper.module";
import {EventCreateComponent} from './event-create/event-create.component';
import {TextInputComponent} from "../shared/form-fields/text-input/text-input.component";
import {TextareaComponent} from "../shared/form-fields/textarea/textarea.component";
import {DatepickerComponent} from "../shared/form-fields/datepicker/datepicker.component";
import {TimepickerComponent} from "../shared/form-fields/timepicker/timepicker.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
    EventPreviewComponent,
    EventCreateComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EventsRoutingModule,
    GoogleMapWrapperModule,
    TextInputComponent,
    TextareaComponent,
    DatepickerComponent,
    TimepickerComponent,
    ReactiveFormsModule
  ]
})
export class EventsModule {
}
