import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';

interface MobileHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  title, 
  showBackButton = false 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode, toggleTheme } = useApp();

  const handleBack = () => {
    navigate(-1);
  };

  const getTitle = () => {
    if (title) return title;
    
    switch (location.pathname) {
      case '/':
        return 'Instagram';
      case '/search':
        return 'Search';
      case '/notifications':
        return 'Notifications';
      case '/profile':
        return 'Profile';
      default:
        return 'Instagram';
    }
  };

  return (
    <header className="lg:hidden sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {showBackButton ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="mr-2"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          ) : null}
          
          <h1 className="text-xl font-bold">
            {location.pathname === '/' ? (
              <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                {getTitle()}
              </span>
            ) : (
              getTitle()
            )}
          </h1>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {location.pathname === '/' && (
            <>
              <Link to="/notifications">
                <Button variant="ghost" size="icon">
                  <Heart className="h-6 w-6" />
                </Button>
              </Link>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-6 w-6" />
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;