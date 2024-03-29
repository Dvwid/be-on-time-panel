import {EventCategoryDto} from "./EventCategoryDto";

export interface EventDetailsDto {
  name: string;
  description: string;
  dateFrom: number;
  dateTo: number;
  category: EventCategoryDto;
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

export interface InitiatorInfoDto {
  initiatorId: string;
  initiatorName: string;
}

export interface ParticipantInfoDto {
  participantName: string;
  participantId: string;
  participantImageId: string;
}

export interface ParticipantsInfoDto {
  confirmedParticipants: ParticipantInfoDto[];
  tentativeParticipants: ParticipantInfoDto[];
  declinedParticipants: ParticipantInfoDto[];
}

export interface EventRatingDto {
  rate: number;
  userName: string;
  description?: string;
  eventId: string;
  userId: string;
}

export interface EventDto {
  id?: string;
  started?: boolean;
  ended?: boolean;
  rating?: number;
  ratings?: EventRatingDto[];
  eventDetails: EventDetailsDto;
  eventLocation: EventLocationDto;
  imageInfo: EventImageInfoDto;
  initiatorInfo: InitiatorInfoDto;
  participantsInfo?: ParticipantsInfoDto;
}
