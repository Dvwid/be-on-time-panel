import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScheduleComponent} from './schedule.component';
import {MaterialModule} from "../core/material/material.module";
import {IconButtonComponent} from "../shared/components/icon-button/icon-button.component";
import {ScheduleMonthsComponent} from './schedule-months/schedule-months.component';
import {ScheduleDaysComponent} from './schedule-days/schedule-days.component';
import {ScheduleYearsComponent} from './schedule-years/schedule-years.component';
import {
  MiniFabSpinnerButtonComponent
} from "../shared/components/mini-fab-spinner-button/mini-fab-spinner-button.component";
import {CurrentMonthPipe} from "./schedule-months/current-month.pipe";
import {RouterLink} from "@angular/router";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    IconButtonComponent,
    MiniFabSpinnerButtonComponent,
    CurrentMonthPipe,
    RouterLink
  ],
  exports: [
    ScheduleComponent
  ],
  declarations: [
    ScheduleComponent,
    ScheduleMonthsComponent,
    ScheduleDaysComponent,
    ScheduleYearsComponent
  ]
})
export class ScheduleModule {
}
