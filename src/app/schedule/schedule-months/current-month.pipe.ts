import {Pipe, PipeTransform} from '@angular/core';
import {MONTHS} from "./schedule-months.component";
import {Month} from "../schedule.component";

@Pipe({
  name: 'currentMonth',
  standalone: true
})
export class CurrentMonthPipe implements PipeTransform {

  months: Month[] = MONTHS;

  transform(month: number): string {
    return this.months?.find(m => m?.index === month)?.displayName;
  }


}
