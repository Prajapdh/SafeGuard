// src/components/EmergencyPlanCard.tsx
import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileImage, FaFileAlt } from 'react-icons/fa';
import EmergencyPlanUpload from './EmergencyPlanUpload';

interface EmergencyPlanCardProps {
    textColor?: string;
}

interface UploadedPlan {
  name: string;
  type: string;
  coordinates?: { lat?: number; lon?: number };
  mapType: string;
  fileData: string;
}

const EmergencyPlanCard: React.FC<EmergencyPlanCardProps> = ({textColor}) => {
  const [uploadedPlans, setUploadedPlans] = useState<UploadedPlan[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const storedPlans = localStorage.getItem('emergencyPlans');
    if (storedPlans) {
      setUploadedPlans(JSON.parse(storedPlans));
    }
  }, []);

  const handleUpload = (newPlan: UploadedPlan) => {
    const updatedPlans = [...uploadedPlans, newPlan];
    setUploadedPlans(updatedPlans);
    setShowUploadModal(false);
    localStorage.setItem('emergencyPlans', JSON.stringify(updatedPlans));
  };

  const handleDownload = (plan: UploadedPlan) => {
    const link = document.createElement('a');
    link.href = plan.fileData;
    link.download = plan.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="bg-white/30 rounded-3xl backdrop-blur-md shadow-lg p-4" style={{ color: textColor }}>
        <h2 className="text-3xl font-bold mb-4">Emergency Plans</h2>
        <button 
          onClick={() => setShowUploadModal(true)} 
          className="bg-blue-500 text-white rounded-md px-4 py-2 mb-4"
        >
          Upload New Plan
        </button>
        
        <div className="mt-4 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {uploadedPlans.length > 0 ? (
            <ul className="space-y-2">
              {uploadedPlans.map((plan, index) => (
                <li key={index} className="flex items-center p-2 bg-white/20 rounded-lg">
                  {plan.type === 'pdf' && <FaFilePdf className="mr-3" />}
                  {plan.type === 'image' && <FaFileImage className="mr-3" />}
                  {plan.type === 'text' && <FaFileAlt className="mr-3" />}
                  <div className="flex-grow">
                    <p className="font-semibold">{plan.name}</p>
                    {plan.coordinates && (
                      <p>Coordinates: {plan.coordinates.lat}, {plan.coordinates.lon}</p>
                    )}
                    <p>Map Type: {plan.mapType}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(plan)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Download
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No emergency plans uploaded yet.</p>
          )}
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="rounded-lg p-6 w-full max-w-md">
            <EmergencyPlanUpload onUpload={handleUpload} onClose={() => setShowUploadModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default EmergencyPlanCard;