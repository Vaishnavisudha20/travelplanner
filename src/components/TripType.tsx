import React from 'react';
import { User, Users, Heart, Users2 } from 'lucide-react';

interface TripTypeProps {
  onTripTypeSelect: (type: string, withPets: boolean) => void;
}

export default function TripType({ onTripTypeSelect }: TripTypeProps) {
  const [selectedType, setSelectedType] = React.useState<string | null>(null);
  const [withPets, setWithPets] = React.useState<boolean>(false);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onTripTypeSelect(type, withPets);
  };

  const tripTypes = [
    { id: 'solo', label: 'Solo Trip', icon: User },
    { id: 'partner', label: 'Partner trip', icon: Heart },
    { id: 'friends', label: 'Friends Trip', icon: Users },
    { id: 'family', label: 'Family trip', icon: Users2 },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-4">What kind of trip are you planning?</h1>
      <p className="text-center text-gray-600 mb-8">Select one.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {tripTypes.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`p-6 rounded-lg border-2 transition-all
              ${selectedType === id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'}`}
            onClick={() => handleTypeSelect(id)}
          >
            <Icon className={`mx-auto mb-2 ${selectedType === id ? 'text-blue-500' : 'text-gray-600'}`} size={24} />
            <div className={`text-sm font-medium ${selectedType === id ? 'text-blue-500' : 'text-gray-900'}`}>
              {label}
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <p className="text-gray-600 text-center">Are you traveling with pets?</p>
        <div className="flex justify-center gap-4">
          <button
            className={`px-6 py-2 rounded-full border-2 transition-all
              ${!withPets ? 'border-blue-500 bg-blue-50 text-blue-500' : 'border-gray-200'}`}
            onClick={() => setWithPets(false)}
          >
            No
          </button>
          <button
            className={`px-6 py-2 rounded-full border-2 transition-all
              ${withPets ? 'border-blue-500 bg-blue-50 text-blue-500' : 'border-gray-200'}`}
            onClick={() => setWithPets(true)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}