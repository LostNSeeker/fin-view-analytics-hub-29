import React from 'react';
import { Bell, Link, Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { isAuth } from '@/hooks/useAuth';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { NavLink } from 'react-router-dom';

interface TopNavProps {
  toggleSidebar: () => void;
}
export const TopNav: React.FC<TopNavProps> = ({ toggleSidebar }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-2"
            aria-label="Toggle Sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="hidden md:block ml-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-[200px] lg:w-[300px] pl-8 rounded-md" 
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="p-4 border-b">
                <h3 className="font-medium">Notifications</h3>
              </div>
              <div className="p-4 text-sm">
                <p className="text-center text-muted-foreground">No new notifications</p>
              </div>
            </PopoverContent>
          </Popover>
          {
            isAuth? 
            <div className="h-8 w-8 rounded-full bg-fin-blue flex items-center justify-center text-white">
            RA
          </div>
          :
          <NavLink to={'/login'} className={({isActive}) => isActive? 'text-[#ffffff] bg-[#ea2b0f] text-lg font-bold px-4 py-2 rounded-full ' : 'text-[#ea2b0f] text-lg font-bold px-4 py-2 rounded-full bg-[#fff1ee] '}>
                            LogIn
          </NavLink>
          }
          
        </div>
      </div>
    </header>
  );
};
