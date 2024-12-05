import React, { useState, useEffect } from 'react';
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

// Array of preloaded weather and disaster conditions
const conditions: Condition[] = [
  { type: 'clear', name: 'Clear Skies', temperature: 25, windSpeed: 5, humidity: 40, icon: '☀️' },
  { type: 'cloudy', name: 'Cloudy', temperature: 22, windSpeed: 10, humidity: 60, icon: '☁️' },
  { type: 'rain', name: 'Heavy Rain', temperature: 18, windSpeed: 15, humidity: 80, icon: '🌧️' },
  { type: 'thunderstorm', name: 'Thunderstorm', temperature: 20, windSpeed: 25, humidity: 75, icon: '⛈️' },
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
        default:
            return ["bg-gradient-to-br from-blue-400 to-purple-500", "#fff"];
    }
};

function App() {
    const [currentConditionIndex, setCurrentConditionIndex] = useState(0);
    const [currentCondition, setCurrentCondition] = useState<Condition>(conditions[0]);
    const [loadingWeather, setLoadingWeather] = useState(true);

    const locations = [
        { name:"Cincinnati", lat :39.1234 , lon : -84.4567 },
        { name:"New York", lat :40.7128 , lon : -74.0060 },
    ];
    const [currentLocationIndex , setCurrentLocationIndex] = useState(0);
    const currentLocation = locations[currentLocationIndex];

    // Fetch real-time weather data
    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
                );
                const data = await response.json();
                const newCondition = {
                    type: data.weather[0].main.toLowerCase(),
                    name: data.weather[0].description,
                    temperature: Math.round(data.main.temp),
                    windSpeed: Math.round(data.wind.speed),
                    humidity: data.main.humidity,
                    icon: '🌤️', // You can map icons based on `data.weather[0].icon`
                };
                setCurrentCondition(newCondition);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            } finally {
                setLoadingWeather(false);
            }
        };
        fetchWeatherData();
    }, [currentLocation]);

    // Set up the background gradient and text color based on current condition
    const [backgroundGradient, textColor] = getBackgroundGradient(currentCondition.type);

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
          {loadingWeather && <p>Loading real-time weather...</p>}
        </main>
      </div>
    );
}

export default App;