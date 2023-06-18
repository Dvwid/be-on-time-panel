import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {MaterialModule} from "../core/material/material.module";
import {EventListComponent} from './event-list/event-list.component';
import {EventPreviewComponent} from './event-preview/event-preview.component';
import {GoogleMapWrapperModule} from "../shared/google-map/google-map-wrapper.module";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    EventsRoutingModule,
    GoogleMapWrapperModule
  ],
  declarations: [
    EventsComponent,
    EventListComponent,
    EventPreviewComponent,
  ]
})
export class EventsModule {
}
