import {EventDto} from "./EventDto";
import {PageInfoDto} from "./PageInfoDto";

export interface EventPageDto {
  data: EventDto[];
  pageInfo: PageInfoDto;
}
