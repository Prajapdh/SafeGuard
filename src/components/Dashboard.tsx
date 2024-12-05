// src/components/Dashboard.tsx
import React, { useState } from 'react';
import WeatherDisasterInfo from './WeatherDisasterInfo';
import ResourceList from './ResourceList';
import InteractiveMap from './InteractiveMap';
import EmergencyContacts from './EmergencyContacts';
import EmergencyPlanCard from './EmergencyPlanCard';
import TeamTrackingCard from './TeamTrackingCard';
import CommunicationToolsCard from './CommunicationToolsCard';

interface Condition {
  type: string;
  name: string;
  temperature: number;
  windSpeed: number;
  humidity: number;
  icon: string;
}

interface TeamMember {
  id: number;
  name: string;
  status: 'safe' | 'help' | 'unknown';
  location: string;
  isCurrentUser: boolean;
  lastSeen: string;
}

interface DashboardProps {
  condition: Condition;
  textColor?: string;
  location?: string;
  latitude?: number;
  longitude?: number;
}

const Dashboard: React.FC<DashboardProps> = ({ condition, textColor, latitude = 39.1234, longitude = -84.4567, location = "Cincinnati" }) => {
  const [showModal, setShowModal] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: 'You', status: 'safe', location: 'Home', isCurrentUser: true, lastSeen: 'Just now' },
    { id: 2, name: 'Jane Smith', status: 'unknown', location: 'Work', isCurrentUser: false, lastSeen: '5 mins ago' },
    { id: 3, name: 'Mike Johnson', status: 'help', location: 'Downtown', isCurrentUser: false, lastSeen: '30 mins ago' },
    { id: 3, name: 'Mike Johnson', status: 'help', location: 'Downtown', isCurrentUser: false, lastSeen: '30 mins ago' },
    { id: 3, name: 'Mike Johnson', status: 'help', location: 'Downtown', isCurrentUser: false, lastSeen: '30 mins ago' },
    { id: 3, name: 'Mike Johnson', status: 'help', location: 'Downtown', isCurrentUser: false, lastSeen: '30 mins ago' },
  ]);

  const handleAddMember = () => {
    setShowModal(true);
    setInviteSent(false);
    setNewMemberName('');
    setNewMemberEmail('');
  };

  const getRandomLocation = () => {
    const locations = ['Home', 'Work', 'School', 'Grocery Store', 'Park', 'Gym', 'Library', 'Coffee Shop'];
    return locations[Math.floor(Math.random() * locations.length)];
  };

  const getRandomStatus = () => {
    const statuses: ('safe' | 'help' | 'unknown')[] = ['safe', 'help', 'unknown'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomLastSeen = () => {
    const times = ['Just now', '5 mins ago', '10 mins ago', '30 mins ago', '1 hour ago', '2 hours ago'];
    return times[Math.floor(Math.random() * times.length)];
  };

  const handleSubmitNewMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: TeamMember = {
      id: teamMembers.length + 1,
      name: newMemberName,
      status: getRandomStatus(),
      location: getRandomLocation(),
      isCurrentUser: false,
      lastSeen: getRandomLastSeen(),
    };
    setTeamMembers([...teamMembers, newMember]);
    setInviteSent(true);
    setTimeout(() => {
      setShowModal(false);
      setInviteSent(false);
    }, 2000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setInviteSent(false);
  };

  const handleStatusChange = (id: number, newStatus: 'safe' | 'help' | 'unknown') => {
    setTeamMembers(members =>
      members.map(member =>
        member.id === id ? { ...member, status: newStatus } : member
      )
    );
  };

  return (
    <div className="flex items-center justify-center m-0">
      <div className="w-full lg:w-[75%] p-4 grid grid-cols-1 gap-8 overflow-y-auto">
        {/* First Row - Weather and Resource Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <WeatherDisasterInfo condition={condition} textColor={textColor} />
          <ResourceList textColor={textColor} />
        </div>

        {/* Second Row - Emergency Contacts and Interactive Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:items-stretch">
          <TeamTrackingCard 
            teamMembers={teamMembers} 
            onAddMember={handleAddMember} 
            onStatusChange={handleStatusChange}
            textColor={textColor}
          />
          <div className="col-span-1 lg:col-span-2 h-[300px] lg:h-auto">
            <InteractiveMap latitude={latitude} longitude={longitude} textColor={textColor}/>
          </div>
        </div>

        {/* Third Row - Team Tracking,Emergency Plan Card and Communication Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:h-[400px] sm:items-stretch">
            <EmergencyContacts location={location} disasterType={condition.name} textColor={textColor}/>
            <CommunicationToolsCard textColor={textColor}/>
            <EmergencyPlanCard textColor={textColor}/>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4">Add New Family Member</h3>
            {!inviteSent ? (
              <form onSubmit={handleSubmitNewMember}>
                <input
                  type="text"
                  placeholder="Name"
                  value={newMemberName}
                  onChange={(e) => setNewMemberName(e.target.value)}
                  className="w-full p-2 mb-2 border rounded"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full p-2 mb-4 border rounded"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Send Invite
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-green-500 font-bold mb-4">Invite Sent!</p>
                <button
                  onClick={handleCloseModal}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;