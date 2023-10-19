import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Month} from "../schedule.component";

@Component({
  selector: 'app-schedule-months',
  templateUrl: './schedule-months.component.html',
  styleUrls: ['./schedule-months.component.scss']
})
export class ScheduleMonthsComponent implements OnInit {

  @Output() previousMonth = new EventEmitter();
  @Output() nextMonth = new EventEmitter();

  @Input() selectedMonth: number;

  currentMonth: number;

  ngOnInit() {
    this.getCurrentMonth();
  }

  private getCurrentMonth() {
    this.currentMonth = new Date().getUTCMonth();
  }
}


export const MONTHS: Month[] = [
  {
    displayName: 'Styczeń',
    index: 0
  },
  {
    displayName: 'Luty',
    index: 1
  },
  {
    displayName: 'Marzec',
    index: 2
  },
  {
    displayName: 'Kwiecień',
    index: 3
  },
  {
    displayName: 'Maj',
    index: 4
  },
  {
    displayName: 'Czerwiec',
    index: 5
  },
  {
    displayName: 'Lipiec',
    index: 6
  },
  {
    displayName: 'Sierpień',
    index: 7
  },
  {
    displayName: 'Wrzesień',
    index: 8
  },
  {
    displayName: 'Październik',
    index: 9
  },
  {
    displayName: 'Listopad',
    index: 10
  },
  {
    displayName: 'Grudzień',
    index: 11
  },
]
