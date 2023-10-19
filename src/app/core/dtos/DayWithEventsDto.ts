import {EventDto} from "./EventDto";

export interface DayWithEventsDto {
  day: Date;
  events: EventDto[];
}
