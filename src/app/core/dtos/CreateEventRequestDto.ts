export interface EventDetailsDto {
  name: string;
  description: string;
  dateFrom: Date;
  hourFrom: string;
  minuteFrom: string;
  dateTo: Date;
  hourTo: string;
  minuteTo: string;
}

export interface EventLocationDto {
  place: string;
}

export interface EventAdditionalInfoDto {
  additionalInfo: string;
}

export interface CreateEventRequestDto {
  eventDetails: EventDetailsDto;
  eventLocation: EventLocationDto;
  additionalInfo: EventAdditionalInfoDto;
}
