import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from './events.component';
import {EventPreviewComponent} from "./event-preview/event-preview.component";
import {EventCreateComponent} from './event-create/event-create.component';
import {EventEditComponent} from "./event-edit/event-edit.component";

const routes: Routes = [
  {
    path: '',
    component: EventsComponent
  },
  {
    path: 'create',
    component: EventCreateComponent
  },
  {
    path: 'preview/:eventId',
    component: EventPreviewComponent
  },
  {
    path: 'edit/:eventId',
    component: EventEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventsRoutingModule {
}
