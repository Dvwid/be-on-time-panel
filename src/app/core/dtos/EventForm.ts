import {FormControl} from "@angular/forms";

export interface EventForm {
  name: FormControl<string>;
  dateFrom: FormControl<Date>;
  hourFrom: FormControl<string | null>;
  minuteFrom: FormControl<string | null>;
  dateTo: FormControl<Date | null>;
  hourTo: FormControl<string | null>;
  minuteTo: FormControl<string | null>;
  place: FormControl<string | null>;
  description: FormControl<string | null>;
  additionalInfo: FormControl<string | null>;
}
