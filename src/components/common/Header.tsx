import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Menu } from 'lucide-react';
import Notifications from './Notifications';
import GlobalSearch from './GlobalSearch';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { createAuditLog } from '../../utils/hipaaCompliance';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    createAuditLog(user?.id || 'unknown', 'logout', 'user_account');
    logout();
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="mr-4 md:hidden">
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="CareZen Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">CareZen</span>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <GlobalSearch />
          <Notifications />
          <ThemeToggle />
          <div className="relative" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-2"
              onClick={toggleDropdown}
            >
              <User className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              <span className="text-gray-600 dark:text-gray-300">Profile</span>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-10">
                <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">Settings</Link>
                <button 
                  onClick={handleLogout} 
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  <LogOut className="w-4 h-4 inline-block mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;