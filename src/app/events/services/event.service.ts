import {Injectable} from '@angular/core';
import {AjaxService} from "../../core/ajax.service";
import {Observable, of} from "rxjs";
import {EventDto} from "../../core/dtos/EventDto";
import {CreateEventRequestDto} from "../../core/dtos/CreateEventRequestDto";

export const mockedEvents: EventDto[] = [
  {
    id: '1',
    name: 'Poker Texas Holdem',
    dateFrom: new Date(),
    timeFrom: '15:30',
    dateTo: new Date((new Date()).setDate(new Date().getDate() + 1)),
    place: 'Mała salka CBR',
    description: 'Luźne spotkanie przy kartach i wysokoprocentowych napojach. Zapraszamy każdego kto ma ochotę na dobrą zabawę i góre pieniędzy do wygrania',
    interested: ['Guest1245'],
    rate: 0,
    imageUrl: 'https://api.time.com/wp-content/uploads/2019/07/facebook-texas-holdem.jpg'
  },
  {
    id: '2',
    name: 'Kręgle',
    dateFrom: new Date(),
    timeFrom: '17:00',
    dateTo: new Date((new Date()).setDate(new Date().getDate() + 1)),
    place: 'Retro Bowling Club',
    description: '',
    interested: ['Guest1245'],
    rate: 0,
  }
]

@Injectable({
  providedIn: 'root'
})
export class EventService {

  #baseUrl = 'events';

  constructor(private ajaxService: AjaxService) {
  }

  getEventById(id: string): Observable<EventDto> {
    return of(mockedEvents?.find(event => event?.id === id));
  }

  create(req: CreateEventRequestDto): Observable<EventDto> {
    return this.ajaxService.doPost(`${this.#baseUrl}`, req);
  }
}
