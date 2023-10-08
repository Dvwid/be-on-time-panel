import {inject, Injectable} from '@angular/core';
import {AjaxService} from "../../core/ajax.service";
import {Observable} from "rxjs";
import {EventPageDto} from "../../core/dtos/EventPageDto";
import {PageInfoDto} from "../../core/dtos/PageInfoDto";
import {EventDto} from "../../core/dtos/EventDto";
import {JoinToEventRequestDto} from "../../core/dtos/JoinToEventRequestDto";
import {EventCategoryDto} from "../../core/dtos/EventCategoryDto";

@Injectable({
  providedIn: 'root'
})
export class EventService {

  #baseUrl = 'event';
  #ajaxService = inject(AjaxService)

  constructor() {
  }

  getEventById(id: string): Observable<EventDto> {
    return this.#ajaxService.doGet(`${this.#baseUrl}/${id}`);
  }

  create(req: EventDto): Observable<EventDto> {
    return this.#ajaxService.doPost(`${this.#baseUrl}`, req);
  }

  getList(pagination: PageInfoDto): Observable<EventPageDto> {
    return this.#ajaxService.doGet(`${this.#baseUrl}`, pagination);
  }

  getCategories(): Observable<EventCategoryDto[]> {
    return this.#ajaxService.doGet(`${this.#baseUrl}/categories`);
  }

  join(req: JoinToEventRequestDto): Observable<EventDto> {
    return this.#ajaxService.doPost(`${this.#baseUrl}/join`, req);
  }

  leave(req: JoinToEventRequestDto): Observable<EventDto> {
    return this.#ajaxService.doPost(`${this.#baseUrl}/leave`, req);
  }
}
