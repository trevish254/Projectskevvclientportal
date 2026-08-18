import React from 'react';

interface TopNavProps {
  activeSection: number;
  onNavigate: (section: number) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ activeSection, onNavigate }) => {
  const navItems = [
    { label: 'Dashboard', section: 2 },
    { label: 'Speaking', section: 0 },
    { label: 'Progress', section: -1 },
    { label: 'Courses', section: -1 },
  ];

  return (
    <nav
      className="hidden md:flex items-center h-[60px] px-2 gap-1 rounded-[22px] bg-white/60 backdrop-blur-xl border border-white/20 shadow-sm mx-auto"
      aria-label="Main Navigation"
      id="top-nav-container"
    >
      {navItems.map((item) => {
        const isActive = item.section >= 0 && activeSection === item.section;
        return (
          <button
            key={item.label}
            id={`top-nav-item-${item.label.toLowerCase()}`}
            onClick={() => {
              if (item.section >= 0) {
                onNavigate(item.section);
              }
            }}
            className={`px-6 h-11 rounded-[16px] text-[15px] font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center ${
              isActive
                ? 'bg-black text-white inset-glow shadow-sm'
                : 'text-black font-medium hover:bg-black/5'
            }`}
            style={
              isActive
                ? {
                    boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                  }
                : undefined
            }
          >
            {item.label}
          </button>
        );
      })}
    </nav>
  );
};

