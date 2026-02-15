import React from 'react';
import { LogOut, Moon, Sun } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { logout } from '../../features/authSlice';
import { useDarkMode } from '../../hooks/useDarkMode';
import { Button } from '../common/Button';

// Header component with logout and dark mode toggle - using Tailwind CSS
export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Task Manager
            </h1>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            {/* Welcome message */}
            <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
              Welcome, <span className="font-medium">{user?.username}</span>
            </span>

            {/* Dark mode toggle button */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Logout button */}
            <Button onClick={handleLogout} variant="secondary" className="flex items-center">
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};