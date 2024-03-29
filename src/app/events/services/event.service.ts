import {inject, Injectable} from '@angular/core';
import {AjaxService} from "../../core/ajax.service";
import {Observable} from "rxjs";
import {EventPageDto} from "../../core/dtos/EventPageDto";
import {EventDto, EventRatingDto} from "../../core/dtos/EventDto";
import {JoinToEventRequestDto} from "../../core/dtos/JoinToEventRequestDto";
import {EventCategoryDto} from "../../core/dtos/EventCategoryDto";
import {GetEventsListRequest} from "../../core/dtos/GetEventsListRequest";
import {CreateEventResponse} from "../../core/dtos/CreateEventResponse";
import {LeaveFromEventRequestDto} from "../../core/dtos/LeaveFromEventRequestDto";
import {Empty} from "../../core/dtos/Empty";

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

  create(req: EventDto): Observable<CreateEventResponse> {
    return this.#ajaxService.doPost(`${this.#baseUrl}`, req);
  }

  getList(req: GetEventsListRequest): Observable<EventPageDto> {
    return this.#ajaxService.doGet(`${this.#baseUrl}`, req);
  }

  getCategories(): Observable<EventCategoryDto[]> {
    return this.#ajaxService.doGet(`${this.#baseUrl}/categories`);
  }

  join(req: JoinToEventRequestDto): Observable<EventDto> {
    return this.#ajaxService.doPost(`${this.#baseUrl}/join`, req);
  }

  leave(req: LeaveFromEventRequestDto): Observable<EventDto> {
    return this.#ajaxService.doPost(`${this.#baseUrl}/leave`, req);
  }

  rate(req: EventRatingDto): Observable<EventDto> {
    return this.#ajaxService.doPost(`${this.#baseUrl}/rate`, req);
  }

  delete(id: string): Observable<Empty> {
    return this.#ajaxService.doDelete(`${this.#baseUrl}/${id}`);
  }
}
