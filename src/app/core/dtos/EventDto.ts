export interface EventDto {
  id?: string,
  name: string,
  dateFrom: Date,
  timeFrom: string,
  dateTo?: Date,
  timeTo?: string;
  place: string,
  description: string,
  interested: string[],
  rate: number;
  imageUrl?: string;
  additionalInfo?: string;
  lat?: number;
  lng?: number;
}
