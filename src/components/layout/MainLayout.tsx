
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarState, setSidebarState] = useState<'expanded' | 'collapsed' | 'closed'>('expanded');
  const isMobile = useIsMobile();

  // Initialize sidebar as closed on mobile and expanded on desktop
  React.useEffect(() => {
    if (isMobile) {
      setSidebarState('closed');
    } else {
      setSidebarState('expanded');
    }
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarState((prevState) => {
      if (isMobile) {
        // On mobile, toggle between closed and expanded only
        return prevState === 'closed' ? 'expanded' : 'closed';
      } else {
        // On desktop, cycle between expanded and collapsed
        return prevState === 'expanded' ? 'collapsed' : 'expanded';
      }
    });
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar sidebarState={sidebarState} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarState === 'expanded' && !isMobile ? 'md:ml-64' : 
        sidebarState === 'collapsed' && !isMobile ? 'md:ml-16' : ''
      }`}>
        <TopNav toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
