import React from 'react';
import { FaThermometerHalf, FaWind, FaTint, FaCompass, FaExclamationTriangle, FaSun } from 'react-icons/fa';

interface Condition {
  type: string;
  name: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  feelsLike?: number;
  pressure?: number;
}

interface WeatherDisasterInfoProps {
  condition: Condition;
  textColor?: string;
}

const WeatherDisasterInfo: React.FC<WeatherDisasterInfoProps> = ({ condition, textColor }) => {
  const isDisaster = ['hurricane', 'flood', 'heatwave', 'thunderstorm'].includes(condition.type);

  const getAlertMessage = (type: string) => {
    switch (type) {
      case 'hurricane':
        return 'Seek shelter immediately. Follow evacuation orders if given.';
      case 'flood':
        return 'Move to higher ground. Avoid walking or driving through flood waters.';
      case 'heatwave':
        return 'Stay hydrated and in cool areas. Check on vulnerable individuals.';
      case 'thunderstorm':
        return 'Seek indoor shelter. Stay away from windows and electrical equipment.';
      default:
        return 'Stay informed and follow local guidelines.';
    }
  };

  return (
    <div className={`flex-1 p-4 sm:p-6 lg:p-10 rounded-3xl backdrop-blur-md bg-white/30 shadow-lg transition-colors duration-500`}>
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: textColor }}>
          {condition.name}
        </h2>
        <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/30 rounded-full flex items-center justify-center">
          <span className="text-3xl sm:text-4xl lg:text-5xl">{condition.icon}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="flex items-center">
          <FaThermometerHalf className="text-xl sm:text-2xl mr-2 sm:mr-3" style={{ color: textColor }} />
          <div>
            <p className="text-base sm:text-xl font-semibold" style={{ color: textColor }}>
              {condition.temperature}°C
            </p>
            <p className="text-xs sm:text-sm" style={{ color: textColor }}>Temperature</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaWind className="text-xl sm:text-2xl mr-2 sm:mr-3" style={{ color: textColor }} />
          <div>
            <p className="text-base sm:text-xl font-semibold" style={{ color: textColor }}>
              {condition.windSpeed} km/h
            </p>
            <p className="text-xs sm:text-sm" style={{ color: textColor }}>Wind Speed</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaTint className="text-xl sm:text-2xl mr-2 sm:mr-3" style={{ color: textColor }} />
          <div>
            <p className="text-base sm:text-xl font-semibold" style={{ color: textColor }}>
              {condition.humidity}%
            </p>
            <p className="text-xs sm:text-sm" style={{ color: textColor }}>Humidity</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCompass className="text-xl sm:text-2xl mr-2 sm:mr-3" style={{ color: textColor }} />
          <div>
            <p className="text-base sm:text-xl font-semibold" style={{ color: textColor }}>
              {condition.pressure || 1013} hPa
            </p>
            <p className="text-xs sm:text-sm" style={{ color: textColor }}>Pressure</p>
          </div>
        </div>
      </div>
      
      {isDisaster ? (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-600/50 rounded-lg flex items-center">
          <FaExclamationTriangle className="text-xl sm:text-2xl mr-2 sm:mr-3 " />
          <div>
            <p className="text-sm sm:text-base  font-bold mb-1">
              ALERT: {condition.name} in progress
            </p>
            <p className="text-xs sm:text-sm ">
              {getAlertMessage(condition.type)}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-600/50 rounded-lg flex items-center">
          <FaSun className="text-xl sm:text-2xl mr-2 sm:mr-3 " />
          <div>
            <p className="text-sm sm:text-base  font-bold mb-1">
              No weather alerts at this time
            </p>
            <p className="text-xs sm:text-sm ">
              Have a great day and stay safe!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisasterInfo;