import {UserDto} from "./UserDto";
import {UserJoinDeclarationStatusEnum} from "./UserJoinDeclarationStatusEnum";

export interface JoinToEventRequestDto {
  eventId: string;
  user: UserDto;
  declaration: UserJoinDeclarationStatusEnum
}
