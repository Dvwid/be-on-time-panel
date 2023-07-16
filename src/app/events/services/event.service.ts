import {Injectable} from '@angular/core';
import {AjaxService} from "../../core/ajax.service";
import {Observable, of} from "rxjs";
import {EventPageDto} from "../../core/dtos/EventPageDto";
import {PageInfoDto} from "../../core/dtos/PageInfoDto";
import {EventDto} from "../../core/dtos/EventDto";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  #baseUrl = 'events';

  constructor(private _ajaxService: AjaxService) {
  }

  getEventById(id: string): Observable<EventDto> {
    return of({} as EventDto);
  }

  create(req: EventDto): Observable<EventDto> {
    return this._ajaxService.doPost(`${this.#baseUrl}`, req);
  }

  getList(pagination: PageInfoDto): Observable<EventPageDto> {
    return this._ajaxService.doGet(`${this.#baseUrl}`, pagination);
  }

}
