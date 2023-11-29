import {PageInfoDto} from "./PageInfoDto";

export interface GetEventsListRequest extends PageInfoDto {
  year?: number;
  month?: number;
  id?: string;
}
