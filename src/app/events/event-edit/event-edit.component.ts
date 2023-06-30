import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {EventForm} from "../../core/dtos/EventForm";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-edit.component.html'
})
export class EventEditComponent {

  eventForm: FormGroup<EventForm>;

}
