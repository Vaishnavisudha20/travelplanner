import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface Destination {
  city: string;
  region: string;
  country: string;
}

interface SearchDestinationProps {
  onDestinationSelect: (destination: Destination) => void;
}

export default function SearchDestination({ onDestinationSelect }: SearchDestinationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Destination[]>([]);

  const popularDestinations = [
    {
      city: 'Puerto Vallarta',
      region: '',
      country: 'Mexico',
      image: 'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      city: 'Los Angeles',
      region: 'California',
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&q=80&w=300&h=200'
    },
    {
      city: 'Las Vegas',
      region: 'Nevada',
      country: 'United States',
      image: 'https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&q=80&w=300&h=200'
    }
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Simulate API call for suggestions
    const filteredSuggestions = [
      { city: 'Detroit', region: 'Michigan', country: 'United States' },
      { city: 'The Hague', region: 'South Holland Province', country: 'The Netherlands' },
      { city: 'Des Moines', region: 'Iowa', country: 'United States' }
    ].filter(dest => 
      dest.city.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(query ? filteredSuggestions : []);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-4">First, where do you want to go?</h1>
      <p className="text-center text-gray-600 mb-8">You'll get custom recs you can save and turn into an itinerary.</p>
      
      <div className="relative mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Choose a city or town"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        {suggestions.length > 0 && (
          <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
            {suggestions.map((dest, index) => (
              <div
                key={index}
                className="p-3 hover:bg-gray-50 cursor-pointer flex items-center"
                onClick={() => onDestinationSelect(dest)}
              >
                <div>
                  <div className="font-medium">{dest.city}</div>
                  <div className="text-sm text-gray-600">{dest.region}, {dest.country}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Or get started with a popular destination</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {popularDestinations.map((dest, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => onDestinationSelect(dest)}
            >
              <img
                src={dest.image}
                alt={dest.city}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 transition-all">
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="font-semibold text-lg">{dest.city}</div>
                  <div className="text-sm">{dest.country}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}