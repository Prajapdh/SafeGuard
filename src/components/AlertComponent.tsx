// src/components/AlertComponent.tsx
import React, { useState, useEffect } from 'react';

const AlertComponent: React.FC = () => {
  const [alertLevel, setAlertLevel] = useState<string>('Low');

  useEffect(() => {
    // Simulate changing alert levels
    const interval = setInterval(() => {
      const levels = ['Low', 'Medium', 'High'];
      setAlertLevel(levels[Math.floor(Math.random() * levels.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Current Alert Level</h2>
      <div className={`text-2xl font-bold ${
        alertLevel === 'Low' ? 'text-green-500' :
        alertLevel === 'Medium' ? 'text-yellow-500' : 'text-red-500'
      }`}>
        {alertLevel}
      </div>
      <p className="mt-2">Stay informed about local emergency situations.</p>
    </div>
  );
};

export default AlertComponent;