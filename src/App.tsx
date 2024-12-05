// src/App.tsx
import { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ConditionSelector from './components/ConditionSelector'; // Import the new component
import './App.css';

// Define an interface for our weather/disaster conditions
interface Condition {
  type: string;
  name: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  icon: string;
}

// Array of weather and disaster conditions
const conditions: Condition[] = [
  { type: 'clear', name: 'Clear Skies', temperature: 25, windSpeed: 5, humidity: 40, icon: '☀️' },
  { type: 'cloudy', name: 'Cloudy', temperature: 22, windSpeed: 10, humidity: 60, icon: '☁️' },
  { type: 'rain', name: 'Heavy Rain', temperature: 18, windSpeed: 15, humidity: 80, icon: '🌧️' },
  { type: 'thunderstorm', name: 'Thunderstorm', temperature: 20, windSpeed: 25, humidity: 75, icon: '⛈️' },
  { type: 'snow', name: 'Snowfall', temperature: -2, windSpeed: 8, humidity: 85, icon: '❄️' },
  { type: 'hurricane', name: 'Hurricane Warning', temperature: 28, windSpeed: 120, humidity: 90, icon: '🌀' },
  { type: 'flood', name: 'Flood Alert', temperature: 22, windSpeed: 30, humidity: 95, icon: '🌊' },
  { type: 'heatwave', name: 'Extreme Heat Warning', temperature: 40, windSpeed: 5, humidity: 30, icon: '🔥' },
];

// Function to get background gradient based on condition type
const getBackgroundGradient = (conditionType:string) => {
    switch (conditionType) {
        case "clear":
            return ["bg-gradient-to-br from-sky-400 to-blue-500", "#374151"];
        case "cloudy":
            return ["bg-gradient-to-br from-gray-300 to-gray-500", "#374151"];
        case "rain":
            return ["bg-gradient-to-br from-blue-600 to-blue-800", "#F5F5F5"];
        case "thunderstorm":
            return ["bg-gradient-to-br from-gray-700 to-gray-900", "#fff"];
        case "snow":
            return ["bg-gradient-to-br from-blue-100 to-blue-300", "#000"];
        case "hurricane":
            return ["bg-gradient-to-br from-purple-600 to-purple-900", "#fff"];
        case "flood":
            return ["bg-gradient-to-br from-blue-500 to-blue-800", "#374151"];
        case "heatwave":
            return ["bg-gradient-to-br from-orange-300 to-orange-500", "#374151"];
        default:
            return ["bg-gradient-to-br from-blue-400 to-purple-500", "#fff"];
    }
};

function App() {
    const [currentConditionIndex, setCurrentConditionIndex] = useState(0);
  
    const currentCondition = conditions[currentConditionIndex];
  
    // Set up the background gradient and text color based on current condition
    const [backgroundGradient, textColor] = getBackgroundGradient(currentCondition.type);

    // Location data for the map widget
    const locations = [
        { name:"Cincinnati", lat :39.1234 , lon : -84.4567 },
        { name:"New York", lat :40.7128 , lon : -74.0060 },
        { name:"Toronto", lat :43.65107 , lon : -79.347015 },
        { name:"San Francisco", lat :37.7749 , lon : -122.4194 },
        { name:"Austin", lat :30.2672 , lon : -97.7431 }
    ];

    const [currentLocationIndex , setCurrentLocationIndex] = useState(0);

    // Get current location's latitude and longitude
    const currentLocation = locations[currentLocationIndex];

    return (
      <div className={`min-h-screen ${backgroundGradient} transition-colors duration-500`}>
        <Navbar textColor={textColor} setCurrentLocationIndex={setCurrentLocationIndex} />
        <main className="pt-20 p-4">
          <Dashboard 
            condition={currentCondition} 
            textColor={textColor} 
            location={currentLocation.name}
            latitude={currentLocation.lat} 
            longitude={currentLocation.lon} 
          />
          {/* Add the Condition Selector */}
          <ConditionSelector setCurrentConditionIndex={setCurrentConditionIndex} />
        </main>
      </div>
    );
}

export default App;