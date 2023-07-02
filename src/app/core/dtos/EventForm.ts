import {FormControl, FormGroup} from "@angular/forms";


export type EventLocationFormGroup = {
  place: FormControl<string | null>;
}

export type EventImageFormGroup = {
  imageId: FormControl<string | null>;
}

export type EventAdditionalInfoFormGroup = {
  additionalInfo: FormControl<string | null>;
}

export type EventForm = {
  eventDetails: FormGroup<EventDetailsFormGroup>;
  eventLocation: FormGroup<EventLocationFormGroup>;
  additionalInfo: FormGroup<EventAdditionalInfoFormGroup>;
  eventImage: FormGroup<EventImageFormGroup>
}

export type EventDetailsFormGroup = {
  name: FormControl<string>;
  description: FormControl<string | null>;
  dateFrom: FormControl<Date>;
  hourFrom: FormControl<string | null>;
  minuteFrom: FormControl<string | null>;
  dateTo: FormControl<Date | null>;
  hourTo: FormControl<string | null>;
  minuteTo: FormControl<string | null>;
}


