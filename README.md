# Travel Planner

A modern travel planning application built with React, TypeScript, and Tailwind CSS that helps users create personalized travel itineraries.

## Features

- **Destination Search**: Search and select from a wide range of cities and popular destinations
- **Date Selection**: Interactive calendar for selecting trip dates
- **Trip Type Configuration**: Choose between solo, partner, friends, or family trips
- **Pet-Friendly Options**: Specify if you're traveling with pets
- **Interest Selection**: Customize your itinerary based on your interests
- **Itinerary Generation**: Get personalized daily itineraries with activities and recommendations
- **PDF Export**: Export your itinerary as a PDF document
- **Responsive Design**: Works seamlessly across desktop and mobile devices

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Lucide React (for icons)
- jsPDF (for PDF generation)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/           # React components
│   ├── DatePicker.tsx
│   ├── Interests.tsx
│   ├── Itinerary.tsx
│   ├── SearchDestination.tsx
│   └── TripType.tsx
├── types/               # TypeScript type definitions
│   └── index.ts
├── utils/               # Utility functions
│   ├── dateUtils.ts
│   ├── itineraryGenerator.ts
│   └── pdfGenerator.ts
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
