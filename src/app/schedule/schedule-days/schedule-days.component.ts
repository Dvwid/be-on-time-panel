import {Component, inject, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Subject} from "rxjs";
import {DayWithEventsDto} from "../../core/dtos/DayWithEventsDto";
import {EventDto} from "../../core/dtos/EventDto";
import {GlobalService} from "../../core/global.service";

@Component({
  selector: 'app-schedule-days',
  templateUrl: './schedule-days.component.html',
  styleUrls: ['./schedule-days.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ScheduleDaysComponent implements OnChanges {

  @Output() daysChange = new Subject<Date[]>();

  @Input() selectedYear: number;
  @Input() selectedMonth: number;
  @Input() events: EventDto[];

  daysWithEvents: DayWithEventsDto[]
  days: Date[];
  headers = ['Pn', 'Wt', 'Śr', 'Czw', 'Pt', 'Sb', 'Nd'];
  opened = false;
  selectedDay: DayWithEventsDto;

  #globalService = inject(GlobalService);

  get isMobileView(): boolean {
    return this.#globalService.mobileViewActive$.value;
  }

  currentDay = new Date().getUTCDate();
  currentMonth = new Date().getUTCMonth();
  currentYear = new Date().getFullYear();

  ngOnChanges(changes: SimpleChanges) {
    const wasSelectedMonthChanged = changes?.['selectedMonth']?.currentValue || changes?.['selectedMonth']?.currentValue === 0;
    const wasSelectedYearChanged = !!changes?.['selectedYear']?.currentValue;

    if (wasSelectedMonthChanged || wasSelectedYearChanged) {
      this.getDaysInMonthAndNeighboringMonthsUTC(this.selectedMonth, this.selectedYear);
    }

    if (changes?.['events']?.currentValue) {
      this.daysWithEvents = this.mapToDaysWithEvents();
    }
  }

  openDayInfo(dayWithEvent: DayWithEventsDto) {
    if (dayWithEvent?.day?.getUTCMonth() !== this.selectedMonth) {
      return;
    }

    this.opened = true;
    this.selectedDay = dayWithEvent;
  }

  getDaysInMonthAndNeighboringMonthsUTC(month: number, year: number) {
    const startDate = new Date(Date.UTC(year, month, 1));

    const startDayOfWeek = startDate.getUTCDay();
    const daysFromPrevMonth = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;

    const days = [];

    const lastDayPrevMonth = new Date(startDate);
    if (month === 0) {
      lastDayPrevMonth.setUTCFullYear(year - 1, 11, 31);
    } else {
      lastDayPrevMonth.setUTCMonth(month, 0);
    }

    for (let i = daysFromPrevMonth; i > 0; i--) {
      const day = new Date(lastDayPrevMonth);
      day.setUTCDate(lastDayPrevMonth.getUTCDate() - i + 1);
      days.push(day);
    }

    const currentMonth = new Date(startDate);
    while (currentMonth.getUTCMonth() === month) {
      days.push(new Date(currentMonth));
      currentMonth.setUTCDate(currentMonth.getUTCDate() + 1);
    }

    const nextMonth = new Date(Date.UTC(year, month + 1, 1));
    const daysToAdd = 42 - days.length;
    for (let i = 0; i < daysToAdd; i++) {
      const day = new Date(nextMonth);
      day.setUTCDate(i + 1);
      days.push(day);
    }

    this.days = days;
  }

  private mapToDaysWithEvents(): DayWithEventsDto[] {
    return this.days?.map(day => {
      const eventsForDay = this.events?.filter(event =>
        new Date(event.eventDetails.dateFrom).toDateString() === day.toDateString()
      );

      return {day, events: eventsForDay};
    });
  }

  getTimeForEvent(dateTo: number, dateFrom: number) {
    const time = dateTo - dateFrom;

    const seconds = Math.floor(time / 1000) % 60;
    const minutes = Math.floor(time / (1000 * 60)) % 60;
    const hours = Math.floor(time / (1000 * 60 * 60));

    const hoursText = hours > 0 ? `${hours} ${hours === 1 ? 'godzinę' : 'godziny'}` : '';
    const minutesText = minutes > 0 ? `${minutes} ${minutes === 1 ? 'minutę' : 'minuty'}` : '';
    const secondsText = seconds > 0 ? `${seconds} ${seconds === 1 ? 'sekundę' : 'sekundy'}` : '';

    const separator1 = hours > 0 && (minutes > 0 || seconds > 0) ? ' i ' : '';
    const separator2 = minutes > 0 && seconds > 0 ? ' i ' : '';

    return `${hoursText}${separator1}${minutesText}${separator2}${secondsText}`;
  }
}
