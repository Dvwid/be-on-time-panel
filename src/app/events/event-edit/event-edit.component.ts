import {Component} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-event-details',
  templateUrl: './event-edit.component.html'
})
export class EventEditComponent {

  eventForm: FormGroup;

}
