// src/components/ConditionSelector.tsx
import React, { useState } from 'react';
import { FaCloudSun, FaCloud, FaCloudRain, FaBolt, FaSnowflake, FaExclamationTriangle } from 'react-icons/fa';

interface Condition {
  type: string;
  name: string;
}

const conditions: Condition[] = [
  { type: 'clear', name: 'Clear Skies' },
  { type: 'cloudy', name: 'Cloudy' },
  { type: 'rain', name: 'Heavy Rain' },
  { type: 'thunderstorm', name: 'Thunderstorm' },
  { type: 'snow', name: 'Snowfall' },
  { type: 'hurricane', name: 'Hurricane Warning' },
  { type: 'flood', name: 'Flood Alert' },
  { type: 'heatwave', name: 'Extreme Heat Warning' },
];

interface ConditionSelectorProps {
  setCurrentConditionIndex:(index:number) => void; // Callback function to set current condition index
}

const ConditionSelector : React.FC<ConditionSelectorProps> = ({ setCurrentConditionIndex }) => {
   const [isOpen , setIsOpen] = useState(false);

   const toggleMenu = () => {
      setIsOpen(!isOpen);
   };

   const handleSelectCondition = (index:number) => {
      setCurrentConditionIndex(index);
      setIsOpen(false); // Close the menu after selection
   };

   return (
    <div className="fixed bottom-4 right-4">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white rounded-full p-3 shadow-lg focus:outline-none border-2"

      >
        Conditions
      </button>
      {isOpen && (
        <div
          className="absolute right-0 w-48 rounded-lg shadow-lg z-10"
          style={{ transform: 'translateY(-100%)' }} // Optional for fine-tuning
        >
          <ul className="py-2">
            {conditions.map((condition, index) => (
              <li
                key={index}
                className="flex items-center bg-white/30 backdrop-blur-md p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleSelectCondition(index)}
              >
                {/* Icons for each condition */}
                {condition.type === "clear" && <FaCloudSun className="mr-2" />}
                {condition.type === "cloudy" && <FaCloud className="mr-2" />}
                {condition.type === "rain" && <FaCloudRain className="mr-2" />}
                {condition.type === "thunderstorm" && <FaBolt className="mr-2" />}
                {condition.type === "snow" && <FaSnowflake className="mr-2" />}
                {condition.type === "hurricane" && <FaExclamationTriangle className="mr-2 text-red-500" />}
                {condition.type === "flood" && <FaCloudRain className="mr-2" />}
                {condition.type === "heatwave" && <FaCloudSun className="mr-2 text-red-500" />}
                <span>{condition.name}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
  
};

export default ConditionSelector;