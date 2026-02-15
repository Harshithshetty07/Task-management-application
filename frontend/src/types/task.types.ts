// Task type definition
export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  updatedAt?: string;
}

// Form data type for creating/editing tasks
export interface TaskFormData {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

// State type for tasks slice
export interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}