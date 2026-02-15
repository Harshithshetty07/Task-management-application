import React from 'react';
import { Edit2, Trash2, Clock } from 'lucide-react';
import { Task } from '../../types/task.types';
import { format } from 'date-fns';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

// Task card component to display individual task - using Tailwind CSS
export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
  // Get status color based on task status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  // Format status text for display
  const formatStatus = (status: string) => {
    return status
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      {/* Header with title and status badge */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex-1 pr-2">
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(task.status)}`}>
          {formatStatus(task.status)}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {task.description}
      </p>

      {/* Footer with date and actions */}
      <div className="flex items-center justify-between">
        {/* Created date */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Clock size={16} className="mr-1" />
          {format(new Date(task.createdAt), 'MMM dd, yyyy')}
        </div>

        {/* Action buttons */}
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};