import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Sidebar } from './components/Sidebar.tsx';
import { TopNav } from './components/TopNav.tsx';
import { TopRightUtility } from './components/TopRightUtility.tsx';
import { CoachChips } from './components/CoachChips.tsx';
import { VideoCard } from './components/VideoCard.tsx';
import { ChatPanel } from './components/ChatPanel.tsx';

export default function App() {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // IntersectionObserver to sync activeSection
  useEffect(() => {
    const sections = document.querySelectorAll('[data-section]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIdx = Number(
              (entry.target as HTMLElement).dataset.section
            );
            if (!isNaN(sectionIdx)) {
              setActiveSection(sectionIdx);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (index: number) => {
    const target = document.querySelector(`[data-section="${index}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  return (
    <div
      className="w-full h-screen flex overflow-hidden relative selection:bg-black selection:text-white"
      style={{
        background:
          'linear-gradient(135deg, rgba(236,233,252,0.7) 0%, rgba(243,238,229,1) 100%)',
      }}
    >
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Hamburger Toggle Button */}
      <button
        id="mobile-menu-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden w-10 h-10 rounded-[12px] bg-white/80 backdrop-blur-md border border-gray-200/80 shadow-sm flex items-center justify-center text-black cursor-pointer hover:bg-white transition-colors"
        aria-label="Toggle Navigation Menu"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Fixed Left Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={scrollToSection}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content Area with Fixed Top Bar */}
      <main className="flex-1 lg:ml-[100px] flex flex-col h-screen overflow-hidden">
        {/* Fixed Top Bar */}
        <header
          className="fixed top-0 left-0 lg:left-[100px] right-0 h-[80px] flex items-center justify-between px-6 lg:px-8 z-30"
          id="fixed-top-bar"
        >
          {/* Centered Top Nav */}
          <TopNav
            activeSection={activeSection}
            onNavigate={scrollToSection}
          />

          {/* Right Utility (Search, Bell, Profile) */}
          <div className="hidden sm:block flex-shrink-0">
            <TopRightUtility />
          </div>
        </header>

        {/* Section 1: Hero Classroom */}
        <section
          data-section="0"
          id="hero-classroom-section"
          className="flex-1 mt-[80px] p-4 lg:p-6 flex flex-col gap-4 lg:gap-6 overflow-hidden min-h-0"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 flex-shrink-0 animate-fade-in-up">
            <h1
              className="text-[28px] sm:text-[34px] lg:text-[40px] font-semibold text-black leading-tight"
            >
              Let&apos;s Talk from the Start
            </h1>

            <div>
              <CoachChips />
            </div>
          </div>

          {/* Body Row (Video + Chat) */}
          <div className="flex-1 flex flex-col lg:flex-row gap-4 lg:gap-6 min-h-0 overflow-hidden">
            {/* Video Stage */}
            <div
              className="flex-[1.8] flex flex-col min-w-0 min-h-0 animate-fade-in-scale"
            >
              <VideoCard />
            </div>

            {/* Chat Panel */}
            <div
              className="flex-1 flex flex-col min-w-0 lg:max-w-[440px] xl:max-w-[480px] min-h-0 animate-slide-in-right"
            >
              <ChatPanel />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
