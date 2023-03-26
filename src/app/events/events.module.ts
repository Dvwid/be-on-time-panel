import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {MaterialModule} from "../core/material/material.module";
import {EventListComponent} from './event-list/event-list.component';


@NgModule({
  declarations: [
    EventsComponent,
    EventListComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EventsRoutingModule,
  ]
})
export class EventsModule {
}
