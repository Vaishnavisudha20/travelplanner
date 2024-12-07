import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface InterestsProps {
  onInterestsSelect: (interests: string[]) => void;
}

export default function Interests({ onInterestsSelect }: InterestsProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    'Must-see Attractions',
    'Great Food',
    'Hidden Gems',
    'Art Museums and Galleries',
    'Automotive History',
    'Soul Food and Coney Dogs',
    'Live Music and Jazz',
    'Sports Venues',
    'Breweries and Distilleries',
    'Urban Exploration and Street Art',
    'Adventure and Sports',
    'Arts & Theatre'
  ];

  const toggleInterest = (interest: string) => {
    const newInterests = selectedInterests.includes(interest)
      ? selectedInterests.filter(i => i !== interest)
      : [...selectedInterests, interest];
    
    setSelectedInterests(newInterests);
    onInterestsSelect(newInterests);
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-4">Tell us what you're interested in</h1>
      <p className="text-center text-gray-600 mb-8">Select all that apply.</p>

      <div className="flex flex-wrap gap-3 justify-center">
        {interests.map(interest => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2 rounded-full border-2 transition-all
              ${selectedInterests.includes(interest)
                ? 'border-blue-500 bg-blue-50 text-blue-500'
                : 'border-gray-200 hover:border-gray-300'}`}
          >
            {interest}
          </button>
        ))}
        <button
          className="px-4 py-2 rounded-full border-2 border-gray-200 hover:border-gray-300 flex items-center gap-2"
        >
          <Plus size={18} />
          Add interest
        </button>
      </div>
    </div>
  );
}