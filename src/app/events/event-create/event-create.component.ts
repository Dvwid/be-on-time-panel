import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent {

  eventForm = new FormGroup({
    name: new FormControl<string | null>(null, Validators.required),
    dateFrom: new FormControl<Date>(new Date(), Validators.required),
    hourFrom: new FormControl<string | null>(null),
    minuteFrom: new FormControl<string | null>(null),
    dateTo: new FormControl<Date | null>(null),
    hourTo: new FormControl<string | null>(null),
    minuteTo: new FormControl<string | null>(null),
    place: new FormControl<string | null>(null),
    description: new FormControl<string | null>(null, Validators.required),
    price: new FormControl<number | null>(null),
  });

}