import type { TripDetails, GeneratedItinerary, Activity } from '../types';

const generateActivitiesForCity = (city: string, interests: string[]): Activity[] => {
  // This is a simplified example. In a real application, this would call an API
  // or use a database to get real activities based on the city and interests
  const activities: Activity[] = [
    {
      type: 'breakfast',
      title: 'Local Breakfast Spot',
      description: 'Start your day with local flavors',
      time: '8:30 AM',
      location: 'Downtown Food Market',
      duration: '1 hour'
    },
    {
      type: 'activity',
      title: 'City Exploration',
      description: 'Guided walking tour of historic sites',
      time: '10:00 AM',
      location: 'City Center',
      duration: '2.5 hours'
    },
    {
      type: 'lunch',
      title: 'Authentic Local Restaurant',
      description: 'Traditional local cuisine',
      time: '1:00 PM',
      location: 'Cultural District',
      duration: '1.5 hours'
    },
    {
      type: 'activity',
      title: 'Museum Visit',
      description: 'Explore local art and history',
      time: '3:00 PM',
      location: 'City Museum',
      duration: '2 hours'
    },
    {
      type: 'dinner',
      title: 'Fine Dining Experience',
      description: 'Modern interpretation of local cuisine',
      time: '7:00 PM',
      location: 'Riverside Restaurant District',
      duration: '2 hours'
    }
  ];

  // Filter activities based on interests
  return activities.filter(activity => {
    // In a real application, you would match activities with interests more sophisticatedly
    return true;
  });
};

export const generateItinerary = (tripDetails: TripDetails): GeneratedItinerary => {
  const { destination, dates, interests = [] } = tripDetails;
  
  if (!destination || !dates) {
    throw new Error('Missing required trip details');
  }

  const totalDays = Math.ceil((dates.end.getTime() - dates.start.getTime()) / (1000 * 60 * 60 * 24));
  const days = Array.from({ length: totalDays }, (_, index) => {
    return {
      activities: generateActivitiesForCity(destination.city, interests)
    };
  });

  return { days };
};