import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Home } from 'lucide-react';

// 404 Not Found page - fully styled with Tailwind CSS
export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Button onClick={() => navigate('/')} className="flex items-center mx-auto">
          <Home size={20} className="mr-2" />
          Back to Home
        </Button>
      </div>
    </div>
  );
};