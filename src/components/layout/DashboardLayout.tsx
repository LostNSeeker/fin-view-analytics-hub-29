
import { ReactNode, useState } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <DashboardSidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
