
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
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, to, isActive }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent whitespace-nowrap",
        isActive && "bg-sidebar-accent font-medium"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="transition-opacity duration-200">{label}</span>
    </Link>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const mainNavItems = [
    { icon: Home, label: 'डैशबोर्ड', path: '/' },
    { icon: ClipboardList, label: 'क्लेम्स', path: '/claims' },
    { icon: LineChart, label: 'एनालिटिक्स', path: '/analytics' },
    { icon: Settings, label: 'सेटिंग्स', path: '/settings' },
  ];
  
  const secondaryNavItems = [
    { icon: User, label: 'प्रोफाइल', path: '/profile' },
    { icon: HelpCircle, label: 'सहायता केंद्र', path: '/help' },
    { icon: Users, label: 'कर्मचारी सूची', path: '/employees' },
    { icon: Users, label: 'ग्राहक सूची', path: '/customers' },
    { icon: Bell, label: 'नोटिफिकेशन', path: '/notifications' },
  ];

  return (
    <aside
      className={cn(
        "bg-sidebar fixed inset-y-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className={cn("flex items-center gap-2", !isOpen && "justify-center w-full")}>
          <div className="h-8 w-8 rounded-full bg-fin-blue flex items-center justify-center">
            <span className="text-white font-bold text-sm">FC</span>
          </div>
          {isOpen && <span className="text-lg font-semibold text-sidebar-foreground">वित्तदृष्टि</span>}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="space-y-1">
          {mainNavItems.map((item) => (
            <SidebarItem
              key={item.path}
              icon={item.icon}
              label={item.label}
              to={item.path}
              isActive={location.pathname === item.path}
            />
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-sidebar-border">
          <p className={cn("px-3 text-xs font-medium text-sidebar-foreground/60 mb-2", !isOpen && 'hidden')}>
            प्रबंधन
          </p>
          <div className="space-y-1">
            {secondaryNavItems.map((item) => (
              <SidebarItem
                key={item.path}
                icon={item.icon}
                label={item.label}
                to={item.path}
                isActive={location.pathname === item.path}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
