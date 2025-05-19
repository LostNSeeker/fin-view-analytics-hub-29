
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
  Bell
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
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, isActive, isCollapsed }) => {
  return (
    <Link
      to={to}
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
    <aside
      className={cn(
        "bg-sidebar fixed inset-y-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        isCollapsed ? "w-16" : isHidden ? "w-0" : "w-64"
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
          </>
        ) : (
          <div className="h-8 w-8 rounded-full bg-fin-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">GI</span>
          </div>
        )}
      </div>
      
      {!isHidden && (
        <div className="flex-1  py-4 px-3">
          <div className="space-y-1">
            {mainNavItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                to={item.path}
                isActive={location.pathname === item.path}
                isCollapsed={isCollapsed}
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
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
