import { Task } from '../../types/task.types';

// Initial mock tasks data
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Setup React Application',
    description: 'Initialize React app with TypeScript and configure development environment',
    status: 'completed',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: '2',
    title: 'Implement Authentication',
    description: 'Create login page and setup MSW for mocked authentication',
    status: 'in-progress',
    createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
  },
  {
    id: '3',
    title: 'Build Task Dashboard',
    description: 'Create a responsive dashboard to display and manage tasks',
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
];