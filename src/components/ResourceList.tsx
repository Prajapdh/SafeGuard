// src/components/ResourceList.tsx
import React from "react";
import { FaFileAlt, FaMapMarkedAlt, FaVideo, FaListUl, FaExternalLinkAlt } from "react-icons/fa";

interface Resource {
  title: string;
  type: string;
  url: string;
}

interface ResourceListProps {
  textColor?: string;
}

const resources: Resource[] = [
  { title: 'Emergency Preparedness Guide', type: 'Article', url: '#' },
  { title: 'Evacuation Routes', type: 'Map', url: '#' },
  { title: 'First Aid Basics', type: 'Video', url: '#' },
  { title: 'Local Shelter Locations', type: 'List', url: '#' },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'Article':
      return <FaFileAlt className="text-blue-500" />;
    case 'Map':
      return <FaMapMarkedAlt className="text-green-500" />;
    case 'Video':
      return <FaVideo className="text-red-500" />;
    case 'List':
      return <FaListUl className="text-orange-500" />;
    default:
      return <FaFileAlt className="text-gray-500" />;
  }
};

const ResourceList: React.FC<ResourceListProps> = ({ textColor }) => {
  return (
    <div className="w-full lg:w-full p-4 sm:p-6 lg:p-8 rounded-3xl backdrop-blur-md bg-white/30 shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: textColor }}>Resources</h2>
      <ul className="space-y-3 sm:space-y-4">
        {resources.map((resource, index) => (
          <li key={index}>
            <a
              href={resource.url}
              className="block bg-white/20 p-3 sm:p-4 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="text-xl sm:text-2xl mr-3 sm:mr-4">
                  {getIcon(resource.type)}
                </div>
                <div className="flex-grow">
                  <h3 className="text-base sm:text-lg font-semibold" style={{ color: textColor }}>{resource.title}</h3>
                  <p className="text-xs sm:text-sm" style={{ color: textColor }}>{resource.type}</p>
                </div>
                <FaExternalLinkAlt className="text-xs sm:text-sm" style={{ color: textColor }} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;