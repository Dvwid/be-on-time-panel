import {Component, Input, OnInit, Output} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-schedule-years',
  templateUrl: './schedule-years.component.html',
  styleUrls: ['./schedule-years.component.scss']
})
export class ScheduleYearsComponent implements OnInit {

  @Output() selectYear = new Subject<number>();

  @Input() selectedYear: number;

  currentYear: number;
  years: number[] = [];

  ngOnInit() {
    this.setYears();
  }

  private setYears() {
    this.currentYear = new Date().getFullYear();

    for (let i = 0; i < 12; i++) {
      this.years.push(this.currentYear + i);
    }
  }
}
