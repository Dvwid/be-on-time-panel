import {UserDto} from "./UserDto";

export interface JoinToEventRequestDto {
  eventId: string;
  user: UserDto;
}
