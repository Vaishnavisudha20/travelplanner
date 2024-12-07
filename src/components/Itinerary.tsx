import React from 'react';
import { Clock, MapPin, Coffee, Utensils, Ticket, Moon } from 'lucide-react';
import type { TripDetails } from '../types';
import { generateItinerary } from '../utils/itineraryGenerator';
import { formatDate } from '../utils/dateUtils';
import { generatePDF } from '../utils/pdfGenerator';

interface ItineraryProps {
  tripDetails: TripDetails;
}

export default function Itinerary({ tripDetails }: ItineraryProps) {
  const itinerary = generateItinerary(tripDetails);
  const totalDays = Math.ceil((tripDetails.dates?.end.getTime()! - tripDetails.dates?.start.getTime()!) / (1000 * 60 * 60 * 24));

  const handleExportPDF = () => {
    const pdf = generatePDF(tripDetails, itinerary);
    pdf.save(`${tripDetails.destination?.city}-itinerary.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Your {tripDetails.destination?.city} Itinerary</h1>
        <p className="text-gray-600">
          {formatDate(tripDetails.dates?.start!)} - {formatDate(tripDetails.dates?.end!)} · {totalDays} days
        </p>
        <div className="flex gap-2 mt-2">
          {tripDetails.interests?.map((interest, index) => (
            <span key={index} className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {interest}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {itinerary.days.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Day {dayIndex + 1}</h2>
              <p className="text-gray-600">{formatDate(new Date(tripDetails.dates?.start!.getTime()! + dayIndex * 24 * 60 * 60 * 1000))}</p>
            </div>
            
            <div className="divide-y">
              {day.activities.map((activity, actIndex) => (
                <div key={actIndex} className="px-6 py-4 flex items-start gap-4">
                  <div className="mt-1">
                    {activity.type === 'breakfast' && <Coffee className="text-orange-500" size={20} />}
                    {activity.type === 'lunch' && <Utensils className="text-green-500" size={20} />}
                    {activity.type === 'dinner' && <Moon className="text-blue-500" size={20} />}
                    {activity.type === 'activity' && <Ticket className="text-purple-500" size={20} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{activity.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{activity.description}</p>
                      </div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                    {activity.location && (
                      <div className="flex items-center gap-1 mt-2 text-sm text-gray-600">
                        <MapPin size={16} />
                        <span>{activity.location}</span>
                      </div>
                    )}
                    {activity.duration && (
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                        <Clock size={16} />
                        <span>{activity.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600">
          Save Itinerary
        </button>
        <button 
          onClick={handleExportPDF}
          className="px-6 py-2 border-2 border-gray-200 rounded-full hover:border-gray-300"
        >
          Export as PDF
        </button>
      </div>
    </div>
  );
}