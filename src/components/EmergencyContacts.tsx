// src/components/EmergencyContacts.tsx
import React from 'react';
import { FaPhoneAlt, FaAmbulance, FaFireExtinguisher, FaMapSigns } from 'react-icons/fa';

interface EmergencyContact {
  name: string;
  phone: string;
  icon: React.ReactNode;
}

interface EmergencyContactsProps {
  location: string;
  disasterType: string;
  textColor?: string;
}

const getEmergencyContacts = (location: string, disasterType: string): EmergencyContact[] => {
  const contacts: { [key: string]: { [key: string]: EmergencyContact[] } } = {
    'Cincinnati': {
        'Flood Alert': [
          { name: 'Local Fire Department', phone: '911', icon: <FaFireExtinguisher /> },
          { name: 'Emergency Medical Services', phone: '911', icon: <FaAmbulance /> },
          { name: 'Red Cross', phone: '1-800-733-2767', icon: <FaPhoneAlt /> },
          { name: 'Red Cross', phone: '1-800-733-2767', icon: <FaPhoneAlt /> },
          { name: 'Red Cross', phone: '1-800-733-2767', icon: <FaPhoneAlt /> },
          { name: 'Red Cross', phone: '1-800-733-2767', icon: <FaPhoneAlt /> },
        ],
        'Hurricane Warning': [
          { name: 'National Hurricane Center', phone: '305-553-1262', icon: <FaMapSigns /> },
          { name: 'Local Police Department', phone: '911', icon: <FaPhoneAlt /> },
        ],
        'Heavy Rain': [
          { name: 'Cincinnati Water Works', phone: '(513) 591-6000', icon: <FaMapSigns /> },
          { name: 'Flood Damage Restoration Services', phone: '(513) 555-1234', icon: <FaAmbulance /> }, // Placeholder number
        ],
        'Thunderstorm': [
          { name: 'Cincinnati Emergency Management', phone: '(513) 263-8200', icon: <FaMapSigns /> },
          { name: 'Local Police Department', phone: '911', icon: <FaPhoneAlt /> },
        ],
        'Snowfall': [
          { name: 'Cincinnati Snow Removal Services', phone: '(513) 555-5678', icon: <FaMapSigns /> }, // Placeholder number
          { name: 'Emergency Medical Services', phone: '911', icon: <FaAmbulance /> },
        ],
        'Clear Skies': [
          { name: 'Local Fire Department', phone: '911', icon: <FaFireExtinguisher /> },
          { name: 'Emergency Medical Services', phone: '911', icon: <FaAmbulance /> },
          { name: 'Local Parks and Recreation Department', phone: '(513) 352-4000', icon: <FaMapSigns /> }, // Placeholder number
        ],
        'Cloudy': [
          { name: 'Local Fire Department', phone: '911', icon: <FaFireExtinguisher /> },
          { name: 'Emergency Medical Services', phone: '911', icon: <FaAmbulance /> },
          { name: 'Local Parks and Recreation Department', phone: '(513) 352-4000', icon: <FaMapSigns /> }, // Placeholder number
        ],
        'Extreme Heat Warning': [
          { name: 'Heat Emergency Hotline', phone: '(513) 555-8765', icon: <FaPhoneAlt /> }, // Placeholder number
          { name: 'Local Cooling Centers', phone: '(513) 591-6000', icon: <FaMapSigns /> },
        ],
    },
    'New York': {
      'Earthquake': [
        { name: 'NYC Emergency Management', phone: '311', icon: <FaMapSigns /> },
        { name: 'Fire Department NYC', phone: '911', icon: <FaFireExtinguisher /> },
        { name: 'Red Cross NYC', phone: '1-800-733-2767', icon: <FaPhoneAlt /> },
      ],
      'Flood Alert': [
        { name: 'NYC Water Board', phone: '(718) 595-7000', icon: <FaMapSigns /> },
      ],
    },
    'Toronto': {
      'Snowstorm': [
        { name: 'Toronto Police Service', phone: '911', icon: <FaPhoneAlt /> },
        { name: 'Toronto Fire Services', phone: '(416) 338-9050', icon: <FaFireExtinguisher /> },
      ],
      'Severe Thunderstorm': [
        { name: 'Environment Canada - Weather Alerts', phone: '', icon: <FaMapSigns /> },
      ],
    },
    'San Francisco': {
      'Earthquake': [
        { name: 'San Francisco Fire Department', phone: '911', icon: <FaFireExtinguisher /> },
        { name: 'Emergency Medical Services', phone: '911', icon: <FaAmbulance /> },
        { name: 'Red Cross Bay Area', phone: '(415) 427-8000', icon: <FaPhoneAlt /> },
      ],
    },
    'Austin': {
      'Flood Alert': [
        { name: 'Austin Fire Department', phone: '(512) 974-0130', icon: <FaFireExtinguisher /> },
        { name: 'Emergency Medical Services (EMS)', phone: '(512) 972-7200', icon: <FaAmbulance /> },
      ],
      // Add more disaster types as needed
    },
  };

  return contacts[location]?.[disasterType] || [];
};

const EmergencyContacts: React.FC<EmergencyContactsProps> = ({ location, disasterType, textColor }) => {
  const contacts = getEmergencyContacts(location, disasterType);

  return (
    <div className="bg-white/30 rounded-3xl backdrop-blur-md shadow-lg p-4 pb-0 relative" style={{ color: textColor }}>
      <h2 className="text-3xl font-bold mb-4">Emergency Contacts</h2>
      <div className="max-h-96 overflow-y-auto pr-2 mb-4 custom-scrollbar">
        <div className="space-y-4 pb-4">
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <a href={`tel:${contact.phone}`} key={index} className="flex items-center p-2 bg-white/20 rounded-lg">
                <div className="text-xl mr-3">{contact.icon}</div>
                <div>
                  <p className="font-semibold">{contact.name}</p>
                  <div className="hover:text-blue-700">
                    {contact.phone}
                  </div>
                </div>
              </a>
            ))
          ) : (
            <p>No emergency contacts available for this location/disaster.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmergencyContacts;