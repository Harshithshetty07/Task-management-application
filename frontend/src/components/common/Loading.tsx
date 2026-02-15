import React from 'react';

// Simple loading spinner component with Tailwind CSS
export const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};