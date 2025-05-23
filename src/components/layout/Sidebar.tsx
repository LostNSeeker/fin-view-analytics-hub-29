import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart,
  ClipboardList,
  HelpCircle,
  Home,
  LineChart,
  Settings,
  User,
  Users,
  Bell,
  X,
  Menu
} from 'lucide-react';

interface SidebarProps {
  sidebarState: 'expanded' | 'collapsed' | 'closed';
  toggleSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, isActive, isCollapsed, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent whitespace-nowrap",
        isActive && "bg-sidebar-accent font-medium",
        isCollapsed && "justify-center px-3"
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span className="transition-opacity duration-200">{label}</span>}
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ sidebarState, toggleSidebar }) => {
  const location = useLocation();
  const isCollapsed = sidebarState === 'collapsed';
  const isHidden = sidebarState === 'closed';
  
  // Function to handle navigation item clicks
  const handleNavItemClick = () => {
    // Close sidebar on mobile after navigation
    if (window.innerWidth < 1024) { // lg breakpoint
      toggleSidebar();
    }
  };
  
  const mainNavItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: ClipboardList, label: 'Claims', path: '/claims' },
    { icon: LineChart, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];
  
  const secondaryNavItems = [
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: HelpCircle, label: 'Help Center', path: '/help' },
    { icon: Users, label: 'Employees', path: '/employees' },
    { icon: Users, label: 'Customers', path: '/customers' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
  ];

  return (
    <>
      {/* Overlay for mobile when sidebar is open */}
      {!isHidden && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      <aside
        className={cn(
          "bg-sidebar fixed inset-y-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
          isCollapsed ? "w-16" : isHidden ? "w-0 -translate-x-full lg:translate-x-0" : "w-64"
        )}
      >
        <div className={cn("flex h-16 items-center", 
          isCollapsed ? "justify-center px-4" : "justify-between px-4",
          isHidden && "hidden"
        )}>
          {!isCollapsed ? (
            <>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-fin-blue flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GI</span>
                </div>
                <span className="text-lg font-semibold text-sidebar-foreground">Gondalia Insurance</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
                title="Toggle sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-fin-blue flex items-center justify-center">
                <span className="text-white font-bold text-sm">GI</span>
              </div>
              <button
                onClick={toggleSidebar}
                className="absolute -right-2 -top-2 p-1 hover:bg-sidebar-accent rounded-lg transition-colors bg-sidebar border border-sidebar-border"
                title="Expand sidebar"
              >
                <Menu className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>
        
        {!isHidden && (
          <div className="flex-1 py-4 px-3 overflow-y-auto">
            <div className="space-y-1">
              {mainNavItems.map((item) => (
                <SidebarItem
                  key={item.path}
                  icon={item.icon}
                  label={item.label}
                  to={item.path}
                  isActive={location.pathname === item.path}
                  isCollapsed={isCollapsed}
                  onClick={handleNavItemClick}
                />
              ))}
            </div>
            
            <div className={cn("mt-6 pt-6 border-t border-sidebar-border", isCollapsed && "text-center")}>
              {!isCollapsed && (
                <p className="px-3 text-xs font-medium text-sidebar-foreground/60 mb-2">
                  Management
                </p>
              )}
              <div className="space-y-1">
                {secondaryNavItems.map((item) => (
                  <SidebarItem
                    key={item.path}
                    icon={item.icon}
                    label={item.label}
                    to={item.path}
                    isActive={location.pathname === item.path}
                    isCollapsed={isCollapsed}
                    onClick={handleNavItemClick}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};