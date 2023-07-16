import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {MaterialModule} from "../core/material/material.module";
import {EventListComponent} from './event-list/event-list.component';
import {EventDetailsComponent} from './event-preview/event-details.component';
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
import {EventDetailsFormComponent} from './event-form/forms/details/event-details-form.component';
import {EventFormAbstractComponent} from "./event-form/event-form-abstract.component";
import {EventImageFormComponent} from './event-form/forms/image/event-image-form.component';
import {
  EventAdditionalInformationFormComponent
} from './event-form/forms/additional-information/event-additional-information-form.component';
import {EventPlaceFormComponent} from './event-form/forms/place/event-place-form.component';
import {
  StepperNextButtonComponent
} from "../shared/components/form-fields/stepper-next-button/stepper-next-button.component";
import {
  StepperPreviousButtonComponent
} from "../shared/components/form-fields/stepper-previous-button/stepper-previous-button.component";
import {SkeletonLoaderComponent} from "../shared/components/skeleton-loader/skeleton-loader.component";
import {
  MiniFabSpinnerButtonComponent
} from "../shared/components/mini-fab-spinner-button/mini-fab-spinner-button.component";
import { ListHeaderComponent } from './event-list/list-header/list-header.component';
import { ListCellComponent } from './event-list/list-cell/list-cell.component';
import {IconButtonComponent} from "../shared/components/icon-button/icon-button.component";


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
        ImagePickerComponent,
        StepperNextButtonComponent,
        StepperPreviousButtonComponent,
        SkeletonLoaderComponent,
        MiniFabSpinnerButtonComponent,
        IconButtonComponent
    ],
  declarations: [
    EventsComponent,
    EventListComponent,
    EventDetailsComponent,
    EventCreateComponent,
    EventEditComponent,
    EventFormAbstractComponent,
    EventFormComponent,
    EventDetailsFormComponent,
    EventImageFormComponent,
    EventAdditionalInformationFormComponent,
    EventPlaceFormComponent,
    ListHeaderComponent,
    ListCellComponent,
  ],
})
export class EventsModule {
}
