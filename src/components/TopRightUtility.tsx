import React from 'react';
import { Search, Bell } from 'lucide-react';

export const TopRightUtility: React.FC = () => {
  return (
    <div
      className="flex items-center gap-2 sm:gap-3 h-[60px] px-2 rounded-[22px] bg-white/60 backdrop-blur-xl border border-white/20 shadow-sm flex-shrink-0"
      id="top-right-utility"
    >
      {/* Search button */}
      <button
        id="utility-search-button"
        className="w-11 h-11 flex items-center justify-center text-black hover:bg-black/5 rounded-[14px] transition-colors cursor-pointer"
        title="Search"
        aria-label="Search"
      >
        <Search size={22} className="text-black" />
      </button>

      {/* Notification Bell */}
      <button
        id="utility-bell-button"
        className="relative w-11 h-11 flex items-center justify-center text-black hover:bg-black/5 rounded-[14px] transition-colors cursor-pointer"
        title="Notifications"
        aria-label="Notifications"
      >
        <Bell size={22} className="text-black" />
        {/* Notification dot indicator */}
        <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#f95555]" />
      </button>

      {/* Profile Avatar */}
      <div className="w-11 h-11 rounded-[14px] overflow-hidden border border-white/40 shadow-sm flex-shrink-0">
        <button
          id="utility-profile-avatar"
          className="w-full h-full cursor-pointer hover:scale-105 transition-transform"
          title="User Profile"
        >
          <img
            src="https://framerusercontent.com/images/Yp9r5prd7RdO6pI9LBTeM1N2uxw.png"
            alt="Profile"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </button>
      </div>
    </div>
  );
};

