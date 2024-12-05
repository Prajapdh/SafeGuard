// src/components/EmergencyPlanUpload.tsx
import React, { useState } from 'react';

interface EmergencyPlanUploadProps {
  onUpload: (plan: { name: string; type: string; coordinates?: { lat?: number; lon?: number }; mapType: string; fileData: string }) => void;
  onClose: () => void;
}

const EmergencyPlanUpload: React.FC<EmergencyPlanUploadProps> = ({ onUpload, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [buildingName, setBuildingName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [mapType, setMapType] = useState('Street');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!file || !buildingName) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    // Read file as data URL
    const reader = new FileReader();
    reader.onloadend = () => {
      const fileData = reader.result as string;
      
      // Determine file type
      const fileType = file.type.includes('pdf') ? 'pdf' : file.type.includes('image') ? 'image' : 'text';

      // Call the onUpload function with the new plan details
      onUpload({
        name: buildingName,
        type: fileType,
        coordinates: latitude ? { lat: parseFloat(latitude), lon: parseFloat(longitude) } : undefined,
        mapType,
        fileData,
      });

      // Reset form
      setFile(null);
      setBuildingName('');
      setLatitude('');
      setLongitude('');
      setMapType('Street');
    };
    reader.readAsDataURL(file);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 rounded-3xl backdrop-blur-md shadow-lg p-6">
      <h2 className="text-3xl font-bold mb-4">Upload Emergency Plan</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Building Name</label>
        <input
          type="text"
          value={buildingName}
          onChange={(e) => setBuildingName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white/50"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Coordinates (Optional)</label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 bg-white/50"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="block w-full border border-gray-300 rounded-md p-2 bg-white/50"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Map Type</label>
        <select 
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-white/50"
        >
          <option value="Street">Street</option>
          <option value="Satellite">Satellite</option>
          <option value="Hybrid">Hybrid</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Upload File</label>
        <input
          type="file"
          accept=".pdf,image/*,.txt"
          onChange={handleFileChange}
          className="mt-1 block w-full bg-white/50 p-2 rounded-md"
          required
        />
      </div>
      <div className="flex justify-end mt-4">
        <button type="button" onClick={onClose} className="bg-gray-300 text-black rounded-md px-4 py-2 mr-2 hover:bg-gray-400 transition-colors">
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 transition-colors">
          Upload
        </button>
      </div>
    </form>
  );
};

export default EmergencyPlanUpload;