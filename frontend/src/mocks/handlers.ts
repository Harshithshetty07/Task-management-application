import { http, HttpResponse } from 'msw';
import { MOCK_USER, MOCK_TOKEN } from './users';
import { mockTasks } from './tasks';
import { Task } from '../types/task.types';

// Store tasks in memory (will reset on page reload)
let tasks = [...mockTasks];

export const handlers = [
  // Login endpoint - POST /api/login
  http.post('/api/login', async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string };

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check credentials
    if (body.username === MOCK_USER.username && body.password === MOCK_USER.password) {
      return HttpResponse.json({
        token: MOCK_TOKEN,
        user: { id: MOCK_USER.id, username: MOCK_USER.username },
      });
    }

    // Return error for invalid credentials
    return HttpResponse.json({ message: 'Invalid username or password' }, { status: 401 });
  }),

  // Get all tasks - GET /api/tasks
  http.get('/api/tasks', async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json(tasks);
  }),

  // Create new task - POST /api/tasks
  http.post('/api/tasks', async ({ request }) => {
    const body = (await request.json()) as Omit<Task, 'id' | 'createdAt'>;

    // Create new task with generated ID
    const newTask: Task = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    };

    // Add to tasks array
    tasks.push(newTask);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json(newTask, { status: 201 });
  }),

  // Update existing task - PUT /api/tasks/:id
  http.put('/api/tasks/:id', async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as Partial<Task>;

    // Find task by ID
    const index = tasks.findIndex((task) => task.id === id);

    // Return 404 if task not found
    if (index === -1) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Update task
    tasks[index] = {
      ...tasks[index],
      ...body,
      updatedAt: new Date().toISOString(),
    };

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json(tasks[index]);
  }),

  // Delete task - DELETE /api/tasks/:id
  http.delete('/api/tasks/:id', async ({ params }) => {
    const { id } = params;

    // Find task by ID
    const index = tasks.findIndex((task) => task.id === id);

    // Return 404 if task not found
    if (index === -1) {
      return HttpResponse.json({ message: 'Task not found' }, { status: 404 });
    }

    // Remove task from array
    tasks.splice(index, 1);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    return HttpResponse.json({ message: 'Task deleted successfully' });
  }),
];