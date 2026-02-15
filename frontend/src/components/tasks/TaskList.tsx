import React from 'react';
import { Task } from '../../types/task.types';
import { TaskCard } from './TaskCard';
import { FileX } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  filter: string;
}

// Task list component to display all tasks - using Tailwind CSS
export const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete, filter }) => {
  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  // Show empty state if no tasks
  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <FileX size={64} className="mx-auto text-gray-400 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
          No tasks found
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          {filter === 'all'
            ? 'Create your first task to get started'
            : `No ${filter.replace('-', ' ')} tasks yet`}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};