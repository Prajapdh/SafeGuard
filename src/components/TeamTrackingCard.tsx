import React from 'react';
import { FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle, FaMicrophone, FaUserPlus, FaClock } from 'react-icons/fa';

interface TeamMember {
  id: number;
  name: string;
  status: 'safe' | 'help' | 'unknown';
  location: string;
  isCurrentUser: boolean;
  lastSeen: string;
}

interface TeamTrackingCardProps {
  teamMembers: TeamMember[];
  onAddMember: () => void;
  onStatusChange: (id: number, newStatus: 'safe' | 'help' | 'unknown') => void;
  textColor?: string;
}

const TeamTrackingCard: React.FC<TeamTrackingCardProps> = ({ teamMembers, onAddMember, onStatusChange, textColor }) => {
  const [activePTT, setActivePTT] = React.useState<number | null>(null);

  const handlePTT = (id: number) => {
    if (activePTT === id) {
      setActivePTT(null);
    } else {
      setActivePTT(id);
      setTimeout(() => setActivePTT(null), 5000);
    }
  };

  return (
    <div className="bg-white/30 rounded-3xl backdrop-blur-md shadow-lg p-4 pb-0 relative" style={{ color: textColor }}>

      <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mb-4">
        <h2 className="text-3xl font-bold mb-4 sm:mb-0">Family Tracking</h2>
        <button
          onClick={onAddMember}
          className="bg-white/40 rounded-full p-3 flex justify-center items-center mt-2 sm:mt-0"
        >
          <span className="mr-1">Add Member</span>
          <FaUserPlus />
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto pr-2 mb-4 custom-scrollbar">
        <ul className="space-y-2">
          {teamMembers.map(member => (
            <li key={member.id} className="flex items-center justify-between p-2 bg-white/20 rounded-lg">
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm">{member.location}</p>
                <p className="text-xs flex items-center mt-1">
                  <FaClock className="mr-1" /> Last seen: {member.lastSeen}
                </p>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                {member.isCurrentUser ? (
                  <select
                    value={member.status}
                    onChange={(e) => onStatusChange(member.id, e.target.value as 'safe' | 'help' | 'unknown')}
                    className="bg-transparent border border-gray-300 rounded-md p-1 mr-2"
                  >
                    <option value="safe">Safe</option>
                    <option value="help">Need Help</option>
                    <option value="unknown">Unknown</option>
                  </select>
                ) : (
                  <span className="mr-2">
                    {member.status === 'safe' && 'Safe'}
                    {member.status === 'help' && 'Needs Help'}
                    {member.status === 'unknown' && 'Unknown'}
                  </span>
                )}
                {member.status === 'safe' && <FaCheckCircle className="mr-2 text-green-500" />}
                {member.status === 'help' && <FaExclamationTriangle className="mr-2 text-red-500" />}
                <button
                  onClick={() => handlePTT(member.id)}
                  className={`p-2 rounded-full ${
                    activePTT === member.id ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  <FaMicrophone />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamTrackingCard;