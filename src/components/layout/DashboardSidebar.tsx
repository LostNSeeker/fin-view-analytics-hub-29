
import { Home, FileText, User, Users, Settings, LogOut, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  isOpen: boolean;
}

const DashboardSidebar = ({ isOpen }: DashboardSidebarProps) => {
  return (
    <div
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 overflow-hidden",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4">
        <div className={cn("flex items-center", !isOpen && "justify-center w-full")}>
          {isOpen ? (
            <h1 className="text-xl font-bold text-primary-700">AgileInsure</h1>
          ) : (
            <span className="text-xl font-bold text-primary-700">AI</span>
          )}
        </div>
      </div>

      <nav className="px-2 py-4">
        <ul className="space-y-1">
          <SidebarItem to="/" icon={Home} label="Dashboard" isOpen={isOpen} />
          <SidebarItem to="/claims" icon={FileText} label="Claims" isOpen={isOpen} />
          <SidebarItem to="/customers" icon={Users} label="Customers" isOpen={isOpen} />
          <SidebarItem to="/employees" icon={User} label="Employees" isOpen={isOpen} />
          <SidebarItem to="/settings" icon={Settings} label="Settings" isOpen={isOpen} />
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-sidebar-border p-4">
        <button className={cn(
          "flex items-center w-full px-4 py-2 text-base font-medium rounded-md text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          !isOpen && "justify-center"
        )}>
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isOpen: boolean;
}

const SidebarItem = ({ to, icon: Icon, label, isOpen }: SidebarItemProps) => {
  const isActive = window.location.pathname === to ||
    (to !== "/" && window.location.pathname.startsWith(to));

  return (
    <li>
      <Link
        to={to}
        className={cn(
          "flex items-center px-4 py-3 text-base font-medium rounded-md transition-colors",
          isActive 
            ? "bg-sidebar-accent text-sidebar-primary" 
            : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          !isOpen && "justify-center"
        )}
      >
        <Icon className="h-5 w-5" />
        {isOpen && <span className="ml-3">{label}</span>}
      </Link>
    </li>
  );
};

export default DashboardSidebar;
