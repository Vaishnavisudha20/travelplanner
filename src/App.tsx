import React, { useState } from 'react';
import SearchDestination from './components/SearchDestination';
import DatePicker from './components/DatePicker';
import TripType from './components/TripType';
import Interests from './components/Interests';
import Itinerary from './components/Itinerary';
import type { TripDetails } from './types';

function App() {
  const [step, setStep] = useState(1);
  const [tripDetails, setTripDetails] = useState<TripDetails>({});
  const [showItinerary, setShowItinerary] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

  const handleDestinationSelect = (destination: any) => {
    setTripDetails(prev => ({ ...prev, destination }));
    setCanProceed(true);
  };

  const handleDateSelect = (startDate: Date, endDate: Date) => {
    setTripDetails(prev => ({ ...prev, dates: { start: startDate, end: endDate } }));
    setCanProceed(true);
  };

  const handleTripTypeSelect = (type: string, withPets: boolean) => {
    setTripDetails(prev => ({ ...prev, type, withPets }));
    setCanProceed(true);
  };

  const handleInterestsSelect = (interests: string[]) => {
    setTripDetails(prev => ({ ...prev, interests }));
    setCanProceed(true);
  };

  const handleNext = () => {
    if (step === 4) {
      setShowItinerary(true);
    } else {
      setStep(step + 1);
      setCanProceed(false);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setCanProceed(true);
  };

  const renderStep = () => {
    if (showItinerary) {
      return <Itinerary tripDetails={tripDetails} />;
    }

    switch (step) {
      case 1:
        return <SearchDestination onDestinationSelect={handleDestinationSelect} />;
      case 2:
        return <DatePicker onDateSelect={handleDateSelect} />;
      case 3:
        return <TripType onTripTypeSelect={handleTripTypeSelect} />;
      case 4:
        return <Interests onInterestsSelect={handleInterestsSelect} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {!showItinerary && (
        <header className="py-4 px-6 border-b">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="text-xl font-bold">Travel Planner</div>
            <div className="text-sm text-gray-600">{step} of 4</div>
          </div>
        </header>
      )}

      <main className="py-12">
        {renderStep()}
      </main>

      {!showItinerary && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900"
              >
                Back
              </button>
            )}
            <div className="flex-1" />
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-6 py-2 rounded-full ${
                canProceed
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {step === 4 ? 'Generate Itinerary' : 'Next'}
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;