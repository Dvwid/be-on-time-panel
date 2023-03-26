import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent {
  createGradeForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
  })
  todayEvents = [{
    id: '1',
    name: 'Poker Texas Holdem',
    dateFrom: new Date(),
    timeFrom: '15:30',
    dateTo: (new Date()).setDate(new Date().getDate() + 1),
    place: 'Mała salka CBR',
    description: 'Luźne spotkanie przy kartach i wysokoprocentowych napojach. Zapraszamy każdego kto ma ochotę na dobrą zabawę i góre pieniędzy do wygrania',
    price: 20,
    interested: ['Guest1245'],
    rate: 0,
  },
    {
      id: '2',
      name: 'Kręgle',
      dateFrom: new Date(),
      timeFrom: '17:00',
      dateTo: (new Date()).setDate(new Date().getDate() + 1),
      place: 'Retro Bowling Club',
      description: '',
      price: 0,
      interested: ['Guest1245'],
      rate: 0,
    }]

  createGrade() {

  }
}
