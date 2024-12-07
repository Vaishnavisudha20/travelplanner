export interface TripDetails {
  destination?: {
    city: string;
    region: string;
    country: string;
  };
  dates?: {
    start: Date;
    end: Date;
  };
  type?: string;
  withPets?: boolean;
  interests?: string[];
}

export interface Activity {
  type: 'breakfast' | 'lunch' | 'dinner' | 'activity';
  title: string;
  description: string;
  time: string;
  location?: string;
  duration?: string;
}

export interface DayItinerary {
  activities: Activity[];
}

export interface GeneratedItinerary {
  days: DayItinerary[];
}