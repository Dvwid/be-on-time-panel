import {UserJoinDeclarationStatusEnum} from "./UserJoinDeclarationStatusEnum";

export interface LeaveFromEventRequestDto {
  eventId: string;
  userId: string;
  declaration: UserJoinDeclarationStatusEnum;
}
