export interface EventDto {
  id: string,
  name: string,
  dateFrom: Date,
  timeFrom: string,
  dateTo?: Date,
  place: string,
  description: string,
  price: number,
  interested: string[],
  rate: number;
  imageUrl?: string;
}
