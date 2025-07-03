import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Compass, 
  Film, 
  MessageCircle, 
  Heart, 
  PlusSquare, 
  User, 
  Settings,
  Moon,
  Sun,
  Menu
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

interface SidebarProps {
  onCreatePost: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreatePost }) => {
  const { currentUser, darkMode, toggleTheme } = useApp();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Compass, label: 'Explore', path: '/explore' },
    { icon: Film, label: 'Reels', path: '/reels' },
    { icon: MessageCircle, label: 'Messages', path: '/messages' },
    { icon: Heart, label: 'Notifications', path: '/notifications' },
    { icon: PlusSquare, label: 'Create', action: onCreatePost },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 p-4 z-40 hidden lg:block">
      {/* Logo */}
      <div className="mb-8 pt-4">
        <Link to="/" className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
            Instagram
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = item.path ? isActive(item.path) : false;
          
          if (item.action) {
            return (
              <Button
                key={item.label}
                variant="ghost"
                className={`w-full justify-start h-12 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  active ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                onClick={item.action}
              >
                <Icon className={`h-6 w-6 mr-4 ${active ? 'fill-current' : ''}`} />
                <span className="text-base dark:text-white">{item.label}</span>
              </Button>
            );
          }

          return (
            <Link key={item.label} to={item.path!}>
              <Button
                variant="ghost"
                className={`w-full justify-start h-12 px-3 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  active ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
              >
                <Icon className={`h-6 w-6 mr-4 ${active ? 'fill-current' : ''}`} />
                <span className="text-base dark:text-white">{item.label}</span>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 px-3 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={toggleTheme}
        >
          {darkMode ? (
            <Sun className="h-6 w-6 mr-4" />
          ) : (
            <Moon className="h-6 w-6 mr-4" />
          )}
          <span className="text-base dark:text-white">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        </Button>

        <Button variant="ghost" className="w-full justify-start h-12 px-3 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu className="h-6 w-6 mr-4" />
          <span className="text-base dark:text-white">More</span>
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;