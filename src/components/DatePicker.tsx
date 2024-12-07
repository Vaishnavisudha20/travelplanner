import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  onDateSelect: (startDate: Date, endDate: Date) => void;
}

export default function DatePicker({ onDateSelect }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(null);

  const WEEKDAYS = [
    { key: 'sun', label: 'S' },
    { key: 'mon', label: 'M' },
    { key: 'tue', label: 'T' },
    { key: 'wed', label: 'W' },
    { key: 'thu', label: 'T' },
    { key: 'fri', label: 'F' },
    { key: 'sat', label: 'S' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else {
      if (date < selectedStartDate) {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      } else {
        setSelectedEndDate(date);
        onDateSelect(selectedStartDate, date);
      }
    }
  };

  const isDateInRange = (date: Date) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    return date >= selectedStartDate && date <= selectedEndDate;
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <div className="max-w-3xl mx-auto px-4">
      <h1 className="text-4xl font-bold text-center mb-4">When are you going?</h1>
      <p className="text-center text-gray-600 mb-8">Choose a date range, up to 7 days.</p>

      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <div className="text-lg font-semibold">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {WEEKDAYS.map(({ key, label }) => (
          <div key={key} className="text-center text-sm font-medium text-gray-600">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {getDaysInMonth(currentMonth).map((date, index) => (
          <div key={`day-${index}`} className="aspect-square">
            {date && (
              <button
                className={`w-full h-full rounded-full flex items-center justify-center text-sm
                  ${date.toDateString() === selectedStartDate?.toDateString() ? 'bg-blue-500 text-white' : ''}
                  ${date.toDateString() === selectedEndDate?.toDateString() ? 'bg-blue-500 text-white' : ''}
                  ${isDateInRange(date) ? 'bg-blue-100' : ''}
                  hover:bg-gray-100`}
                onClick={() => handleDateClick(date)}
              >
                {date.getDate()}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="text-blue-500 hover:underline">
          I don't know my dates yet
        </button>
      </div>
    </div>
  );
}