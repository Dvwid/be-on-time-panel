import {Component, inject, OnInit} from '@angular/core';
import {BehaviorSubject, finalize} from "rxjs";
import {EventService} from "../events/services/event.service";
import {initializePagination} from "../core/utilities";
import {EventPageDto} from "../core/dtos/EventPageDto";
import {EventDto} from "../core/dtos/EventDto";
import {GetEventsListRequest} from "../core/dtos/GetEventsListRequest";

export interface Month {
  displayName: string;
  index: number;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  events: EventDto[] = [];

  selectedYear: number;
  selectedMonth: number;

  currentYear: number;
  currentMonth: number;

  #eventService = inject(EventService);
  areEventsLoading$ = new BehaviorSubject(false);
  pagination = initializePagination();

  ngOnInit() {
    this.setInitialCalendarData();
    this.getEvents();
  }

  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.getEvents();
      return;
    }

    this.selectedMonth += 1;
    this.getEvents();
  }

  previousMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.getEvents();
      return;
    }

    this.selectedMonth -= 1;
    this.getEvents();
  }

  private getEvents() {
    this.events = [];
    this.areEventsLoading$.next(true);
    const req = this.prepareGetEventsListRequest();

    this.#eventService
      .getList(req)
      .pipe(
        finalize(() => this.areEventsLoading$.next(false))
      )
      .subscribe(res => this.setData(res));
  }

  private setData(res: EventPageDto) {
    this.events = res?.data;
    this.pagination = res?.pageInfo;
  }

  private setInitialCalendarData() {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getUTCMonth();
    this.selectedYear = this.currentYear;
    this.selectedMonth = this.currentMonth;
  }

  private prepareGetEventsListRequest(): GetEventsListRequest {
    return {
      ...this.pagination,
      year: this.selectedYear,
      month: this.selectedMonth
    }
  }
}
