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
  placeName: string;
  postCode: string;
  address: string;
  country: string;
  city: string;
  lng: number;
  lat: number;
}

export interface EventAdditionalInfoDto {
  additionalInfo: string;
}

export interface EventImageInfoDto {
  imageId: string;
}

export interface CreateEventRequestDto {
  eventDetails: EventDetailsDto;
  eventLocation: EventLocationDto;
  additionalInfo: EventAdditionalInfoDto;
  imageInfo: EventImageInfoDto;
}
