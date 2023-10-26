import {UserDto} from "./UserDto";
import {ParticipationTypeEnum} from "./ParticipationTypeEnum";

export interface JoinToEventRequestDto {
  eventId: string;
  user: UserDto;
  declaration: ParticipationTypeEnum
}
