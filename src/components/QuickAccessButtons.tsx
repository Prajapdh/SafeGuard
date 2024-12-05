// src/components/QuickAccessButtons.tsx
import React from 'react';

const QuickAccessButtons: React.FC = () => {
  const buttons = [
    { label: 'Maps', icon: '🗺️' },
    { label: 'Emergency Contacts', icon: '📞' },
    { label: 'Resource Library', icon: '📚' },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">Quick Access</h2>
      <div className="grid grid-cols-3 gap-2">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <span className="text-2xl mb-1">{button.icon}</span>
            <span className="text-sm text-center">{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessButtons;