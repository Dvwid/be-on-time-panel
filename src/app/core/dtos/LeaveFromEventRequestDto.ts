import {ParticipationTypeEnum} from "./ParticipationTypeEnum";

export interface LeaveFromEventRequestDto {
  eventId: string;
  userId: string;
  declaration: ParticipationTypeEnum;
}
