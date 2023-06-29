import {Component, Input} from '@angular/core';
import {FormGroup, FormGroupDirective} from "@angular/forms";

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html'
})
export class EventFormComponent {

  @Input() formGroup: FormGroup;
  @Input() form: FormGroupDirective;

}
