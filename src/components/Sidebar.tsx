import React from 'react';
import {
  Video,
  PieChart,
  ListChecks,
  Folder,
  Mail,
  Settings,
  Sun,
  Moon,
} from 'lucide-react';
import { SidebarBlob } from './SidebarBlob.tsx';

interface SidebarProps {
  activeSection: number;
  onNavigate: (section: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  isOpen,
  onClose,
}) => {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');

  const navTiles = [
    { id: 'video', icon: Video, section: 0, label: 'Live Classroom' },
    { id: 'stats', icon: PieChart, section: -1, label: 'Analytics' },
    { id: 'tasks', icon: ListChecks, section: 1, label: 'Assignments' },
    { id: 'docs', icon: Folder, section: -1, label: 'Resources' },
    { id: 'messages', icon: Mail, section: -1, label: 'Messages' },
    { id: 'settings', icon: Settings, section: -1, label: 'Settings' },
  ];

  return (
    <aside
      id="main-sidebar"
      className={`fixed left-0 top-0 bottom-0 w-[100px] flex flex-col items-center py-[30px] z-40 transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
      aria-label="Main Navigation"
    >
      <div className="animate-slide-in-left h-full flex flex-col items-center">
        {/* App Logo */}
        <button
          id="sidebar-logo-button"
          onClick={() => onNavigate(0)}
          className="w-[60px] h-[60px] bg-black rounded-[18px] flex items-center justify-center overflow-hidden flex-shrink-0 mb-6 lg:mb-8 cursor-pointer shadow-md hover:scale-105 transition-transform"
          title="English Classroom"
        >
          <img
            src="https://framerusercontent.com/images/QP3sofr3Nrny7jzPrzvgthcZ8.png?width=180&height=180"
            alt="Logo"
            className="w-[60px] h-[60px] object-cover"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Main 6-icon blob navigation */}
        <div className="relative my-auto w-[64px] h-[360px] flex-shrink-0 sidebar-blob">
          <SidebarBlob height={360} lobes={6} />
          <div className="absolute inset-0 flex flex-col items-center justify-between z-10 p-1">
            {navTiles.map((tile) => {
              const Icon = tile.icon;
              const isActive = tile.section >= 0 && activeSection === tile.section;
              return (
                <button
                  key={tile.id}
                  id={`sidebar-nav-${tile.id}`}
                  onClick={() => {
                    if (tile.section >= 0) {
                      onNavigate(tile.section);
                      onClose();
                    }
                  }}
                  className={`group relative w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    isActive ? 'bg-black text-white inset-glow' : 'hover:bg-black/5 text-black'
                  }`}
                  style={
                    isActive
                      ? {
                          boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                        }
                      : undefined
                  }
                  title={tile.label}
                  aria-label={tile.label}
                >
                  <Icon
                    size={24}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'text-black group-hover:text-black/80'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom 2-lobe Theme Toggle blob */}
        <div className="relative mt-auto w-[64px] h-[120px] flex-shrink-0 sidebar-blob">
          <SidebarBlob height={120} lobes={2} />
          <div className="absolute inset-0 flex flex-col items-center justify-between z-10 p-1">
            {/* Sun Icon (Light) */}
            <button
              id="theme-toggle-light"
              onClick={() => setTheme('light')}
              className={`group w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-200 cursor-pointer ${
                theme === 'light' ? 'bg-black inset-glow' : 'hover:bg-black/5'
              }`}
              style={
                theme === 'light'
                  ? {
                      boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                    }
                  : undefined
              }
              title="Light Mode"
              aria-label="Light Mode"
            >
              <Sun
                size={24}
                className={`transition-colors duration-200 ${
                  theme === 'light' ? 'text-white' : 'text-black group-hover:text-black/80'
                }`}
              />
            </button>

            {/* Moon Icon (Dark) */}
            <button
              id="theme-toggle-dark"
              onClick={() => setTheme('dark')}
              className={`group w-14 h-14 rounded-[16px] flex items-center justify-center transition-all duration-200 cursor-pointer ${
                theme === 'dark' ? 'bg-black inset-glow' : 'hover:bg-black/5'
              }`}
              style={
                theme === 'dark'
                  ? {
                      boxShadow: 'inset 0 0 12px 2px rgba(255,255,255,0.5)',
                    }
                  : undefined
              }
              title="Dark Mode"
              aria-label="Dark Mode"
            >
              <Moon
                size={24}
                className={`transition-colors duration-200 ${
                  theme === 'dark' ? 'text-white' : 'text-black group-hover:text-black/80'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
