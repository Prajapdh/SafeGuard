// src/components/Navbar.tsx
import React, { useState } from 'react';
import { FaMapMarkedAlt, FaPhoneAlt, FaBook, FaMapMarkerAlt, FaBars, FaTimes } from 'react-icons/fa';

const locations = [
  'Cincinnati',
  'New York',
  'Toronto',
  'San Francisco',
  'Austin'
];

interface NavbarProps {
   textColor?: string;
   setCurrentLocationIndex?: (index: number) => void; // Callback function to change location index
}

const Navbar: React.FC<NavbarProps> = ({ textColor, setCurrentLocationIndex }) => {
   const [currentLocation, setCurrentLocation] = useState(locations[0]);
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

   return (
      <nav className="fixed top-0 left-0 right-0 z-50">
         <div className="backdrop-blur-md bg-white/30 shadow-lg">
            <div className="container mx-auto pb-3 px-4 sm:px-6 lg:px-8">
               <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                     <div className="text-xl sm:text-3xl font-bold" style={{ color: textColor }}>SafeGuard</div>
                  </div>
                  <div className="hidden md:block">
                     <div className="ml-10 flex items-baseline space-x-4">
                        <div className="flex items-center">
                           <FaMapMarkerAlt className="mr-2 text-lg" style={{ color: textColor }} />
                           <select 
                              value={currentLocation}
                              onChange={(e) => {
                                 setCurrentLocation(e.target.value);
                                 if (setCurrentLocationIndex) {
                                    setCurrentLocationIndex(locations.indexOf(e.target.value));
                                 }
                              }}
                              className="bg-transparent py-1 px-2 rounded min-w-10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 text-lg"
                              style={{ color: textColor }}
                           >
                              {locations.map((location) => (
                                 <option key={location} value={location} style={{ color: textColor }}>{location}</option>
                              ))}
                           </select>
                        </div>
                        {/* <NavLink href="#maps" icon={<FaMapMarkedAlt />} text="Maps" textColor={textColor} />
                        <NavLink href="#emergency" icon={<FaPhoneAlt />} text="Emergency Contacts" textColor={textColor} />
                        <NavLink href="#resources" icon={<FaBook />} text="Resource Library" textColor={textColor} /> */}
                     </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                     <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                        {isMenuOpen ? (
                           <FaTimes className="h-6 w-6" style={{ color: textColor }} />
                        ) : (
                           <FaBars className="h-6 w-6" style={{ color: textColor }} />
                        )}
                     </button>
                  </div>
               </div>
            </div>

            {isMenuOpen && (
               <div className="md:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                     <div className="flex items-center px-3 py-2">
                        <FaMapMarkerAlt className="mr-2" style={{ color: textColor }} />
                        <select 
                           value={currentLocation}
                           onChange={(e) => {
                              setCurrentLocation(e.target.value);
                              if (setCurrentLocationIndex) {
                                 setCurrentLocationIndex(locations.indexOf(e.target.value));
                              }
                           }}
                           className="bg-transparent py-1 px-2 rounded min-w-10 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                           style={{ color: textColor }}
                        >
                           {locations.map((location) => (
                              <option key={location} value={location} className="text-gray-800">{location}</option>
                           ))}
                        </select>
                     </div>
                     {/* <NavLink href="#maps" icon={<FaMapMarkedAlt />} text="Maps" textColor={textColor} mobile />
                     <NavLink href="#emergency" icon={<FaPhoneAlt />} text="Emergency Contacts" textColor={textColor} mobile />
                     <NavLink href="#resources" icon={<FaBook />} text="Resource Library" textColor={textColor} mobile /> */}
                  </div>
               </div>
            )}
         </div>
      </nav>
   );
};

interface NavLinkProps {
   href: string;
   icon: React.ReactNode; // Use React.ReactNode for react-icons
   text: string;
   textColor?: string;
   mobile?: boolean; // Optional prop for mobile styling
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, text, textColor, mobile }) => (
   <a 
      href={href}
      className={`flex items-center hover:bg-opacity-[0.80] transition-opacity duration-[300ms] ${
         mobile ? "px-[12px] py-[8px] text-base" : "text-sm"
      }`}
      style={{ color: textColor }}
   >
      {icon}
      <span className={`${mobile ? "ml-[8px]" : "ml-[8px] hidden md:inline"}`}>{text}</span>
   </a>
);

export default Navbar;