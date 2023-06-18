import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from './events.component';
import {EventPreviewComponent} from "./event-preview/event-preview.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: ':eventId',
    component: EventPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
