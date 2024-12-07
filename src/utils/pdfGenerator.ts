import jsPDF from 'jspdf';
import type { TripDetails, GeneratedItinerary } from '../types';
import { formatDate } from './dateUtils';

export const generatePDF = (tripDetails: TripDetails, itinerary: GeneratedItinerary) => {
  const pdf = new jsPDF();
  let yPos = 20;
  const leftMargin = 20;
  const lineHeight = 10;

  // Set title
  pdf.setFontSize(24);
  pdf.text(`${tripDetails.destination?.city} Itinerary`, leftMargin, yPos);
  yPos += lineHeight * 2;

  // Set trip details
  pdf.setFontSize(12);
  pdf.text(`${formatDate(tripDetails.dates?.start!)} - ${formatDate(tripDetails.dates?.end!)}`, leftMargin, yPos);
  yPos += lineHeight;

  // Add interests
  if (tripDetails.interests?.length) {
    pdf.text('Interests:', leftMargin, yPos);
    yPos += lineHeight;
    tripDetails.interests.forEach(interest => {
      pdf.text(`• ${interest}`, leftMargin + 5, yPos);
      yPos += lineHeight;
    });
  }
  yPos += lineHeight;

  // Add daily itineraries
  itinerary.days.forEach((day, dayIndex) => {
    // Check if we need a new page
    if (yPos > 250) {
      pdf.addPage();
      yPos = 20;
    }

    pdf.setFontSize(16);
    pdf.text(`Day ${dayIndex + 1}`, leftMargin, yPos);
    yPos += lineHeight;

    pdf.setFontSize(12);
    day.activities.forEach(activity => {
      // Check if we need a new page
      if (yPos > 250) {
        pdf.addPage();
        yPos = 20;
      }

      pdf.text(`${activity.time} - ${activity.title}`, leftMargin, yPos);
      yPos += lineHeight;
      pdf.setFontSize(10);
      pdf.text(activity.description, leftMargin + 5, yPos);
      yPos += lineHeight;
      if (activity.location) {
        pdf.text(`Location: ${activity.location}`, leftMargin + 5, yPos);
        yPos += lineHeight;
      }
      if (activity.duration) {
        pdf.text(`Duration: ${activity.duration}`, leftMargin + 5, yPos);
        yPos += lineHeight;
      }
      pdf.setFontSize(12);
      yPos += lineHeight / 2;
    });
    yPos += lineHeight;
  });

  return pdf;
};