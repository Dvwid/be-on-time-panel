import {Component, inject, Input, OnInit} from '@angular/core';
import {EventDto} from "../../core/dtos/EventDto";
import {EventService} from "../services/event.service";
import {initializePagination} from "../../core/utilities";
import {BehaviorSubject, finalize} from "rxjs";
import {EventPageDto} from "../../core/dtos/EventPageDto";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  @Input() events: EventDto[];

  #eventService = inject(EventService);
  pagination = initializePagination();
  areEventsLoading$ = new BehaviorSubject(false);


  ngOnInit() {
    this.getEventsList();
  }

  private getEventsList() {
    this.areEventsLoading$.next(true);

    this.#eventService
      .getList(this.pagination)
      .pipe(
        finalize(() => this.areEventsLoading$.next(false))
      )
      .subscribe(res => this.setData(res));
  }

  private setData(res: EventPageDto) {
    this.events = res?.data;
    this.pagination = res?.pageInfo;
  }
}
