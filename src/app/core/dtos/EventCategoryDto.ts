export enum EventCategoryEnum {
  MUSIC_CONCERT = "MusicConcert",
  ART_EXHIBITION = "ArtExhibition",
  BUSINESS_CONFERENCE = "BusinessConference",
  NETWORKING_EVENT = "NetworkingEvent",
  SPORTS_EVENT = "SportsEvent",
  CULTURAL_FESTIVAL = "CulturalFestival",
  THEATER_PERFORMANCE = "TheaterPerformance",
  WORKSHOPS_TRAINING = "WorkshopsAndTraining",
  CHARITY_EVENT = "CharityEvent",
  COMPETITIONS = "Competitions",
  TRADE_SHOWS = "TradeShows",
  FAMILY_EVENT = "FamilyEvent",
  OUTDOOR_SPORTS_EVENT = "OutdoorSportsEvent",
  FOOD_TASTING = "FoodAndTasting",
  LECTURES_PRESENTATIONS = "LecturesAndPresentations",
  INTEREST_CLUBS = "InterestClubs",
  EDUCATIONAL_EVENTS = "EducationalEvents",
  HOLIDAY_SEASONAL = "HolidayAndSeasonal",
  OUTDOOR_ADVENTURES = "OutdoorAdventures"
}

export interface EventCategoryDto {
  displayName: string;
  category: EventCategoryEnum;
  icon: string;
}
