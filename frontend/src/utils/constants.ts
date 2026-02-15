// API base URL
export const API_BASE_URL = '/api';

// API endpoints
export const ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login`,
  TASKS: `${API_BASE_URL}/tasks`,
  TASK_BY_ID: (id: string) => `${API_BASE_URL}/tasks/${id}`,
} as const;

// Task status options for dropdown/select
export const TASK_STATUSES = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
] as const;

// App routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
} as const;