// src/components/CommunicationToolsCard.tsx
import React, { useState } from 'react';
import { FaExclamationTriangle, FaPhone, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';

interface CommunicationToolsCardProps {
  textColor?: string;
}

const CommunicationToolsCard: React.FC<CommunicationToolsCardProps> = ({ textColor }) => {
  const [isSOS, setIsSOS] = useState(false);
  const [callStatus, setCallStatus] = useState<string | null>(null);
  const [locationShared, setLocationShared] = useState(false);

  const handleSOS = () => {
    setIsSOS(true);
    setTimeout(() => setIsSOS(false), 5000);
  };

  const handleVoiceCall = () => {
    setCallStatus('Initiating call...');
    setTimeout(() => setCallStatus('Connected'), 2000);
    setTimeout(() => setCallStatus(null), 5000);
  };

  const handleLocationSharing = () => {
    setLocationShared(true);
    setTimeout(() => setLocationShared(false), 5000);
  };

  return (
    <div className="bg-white/30 rounded-3xl backdrop-blur-md shadow-lg p-4">
      <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>Communication Tools</h2>
      <div className="space-y-6">
        <div>
          <button
            onClick={handleSOS}
            className={`w-full py-3 px-4 rounded-md ${
              isSOS ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
            }`}
          >
            <FaExclamationTriangle className="inline-block mr-2" />
            {isSOS ? 'SOS Sent' : 'Send SOS'}
          </button>
          {isSOS && (
            <p className="mt-2 text-sm text-red-600">
              <FaInfoCircle className="inline-block mr-1" />
              Emergency services have been notified. Help is on the way.
            </p>
          )}
        </div>

        <div>
          <button onClick={handleVoiceCall} className="w-full py-3 px-4 rounded-md bg-blue-500 text-white">
            <FaPhone className="inline-block mr-2" />
            Voice Call Emergency Contact
          </button>
          {callStatus && (
            <p className="mt-2 text-sm text-blue-600">
              <FaInfoCircle className="inline-block mr-1" />
              Call status: {callStatus}
            </p>
          )}
        </div>

        <div>
          <button onClick={handleLocationSharing} className="w-full py-3 px-4 rounded-md bg-indigo-500 text-white">
            <FaMapMarkerAlt className="inline-block mr-2" />
            Share Location with Family
          </button>
          {locationShared && (
            <p className="mt-2 text-sm text-indigo-600">
              <FaInfoCircle className="inline-block mr-1" />
              Your location has been shared with your family members.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationToolsCard;