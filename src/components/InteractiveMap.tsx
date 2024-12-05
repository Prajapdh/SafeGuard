// src/components/InteractiveMap.tsx
import React from 'react';

interface InteractiveMapProps {
  latitude: number;
  longitude: number;
  textColor?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ latitude, longitude, textColor }) => {
  const windyEmbedUrl = `https://embed.windy.com/embed2.html?lat=${latitude}&lon=${longitude}&zoom=7&level=surface&overlay=wind&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=${latitude}&detailLon=${longitude}&metricWind=default&metricTemp=default&radarRange=-1`;  
  return (
    <div className="bg-white/30 rounded-3xl backdrop-blur-md shadow-lg p-4">
      <h2 className="text-3xl font-bold mb-4" style={{ color: textColor }}>Interactive Weather Map</h2>
      <iframe
        src={windyEmbedUrl}
        width="100%"
        height="450"
        frameBorder="0"
        title="Windy Map"
        className="rounded-lg max-h-96"
      />
    </div>
  );
};

export default InteractiveMap;