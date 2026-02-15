import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchTasks, createTask, updateTask, deleteTask } from '../features/tasksSlice';
import { Layout } from '../components/layout/Layout';
import { TaskList } from '../components/tasks/TaskList';
import { TaskForm } from '../components/tasks/TaskForm';
import { Modal } from '../components/common/Modal';
import { Button } from '../components/common/Button';
import { Loading } from '../components/common/Loading';
import { Task, TaskFormData } from '../types/task.types';
import { Plus, Filter } from 'lucide-react';

// Dashboard page component - fully styled with Tailwind CSS
export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector((state) => state.tasks);

  // Local state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Open modal for creating new task
  const handleCreateClick = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  // Open modal for editing task
  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
  };

  // Handle form submission
  const handleSubmit = async (data: TaskFormData) => {
    if (editingTask) {
      // Update existing task
      await dispatch(updateTask({ id: editingTask.id, data }));
    } else {
      // Create new task
      await dispatch(createTask(data));
    }
    handleCloseModal();
  };

  // Handle delete task
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await dispatch(deleteTask(id));
    }
  };

  // Get task counts for filter buttons
  const taskCounts = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === 'pending').length,
    'in-progress': tasks.filter((t) => t.status === 'in-progress').length,
    completed: tasks.filter((t) => t.status === 'completed').length,
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Tasks</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Manage your tasks efficiently
            </p>
          </div>
          <Button onClick={handleCreateClick} className="flex items-center">
            <Plus size={20} className="mr-2" />
            New Task
          </Button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Filter buttons */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center mb-3">
            <Filter size={18} className="mr-2 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Filter by status:
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'pending', label: 'Pending' },
              { value: 'in-progress', label: 'In Progress' },
              { value: 'completed', label: 'Completed' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStatusFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.label} ({taskCounts[filter.value as keyof typeof taskCounts]})
              </button>
            ))}
          </div>
        </div>

        {/* Task list */}
        {loading ? (
          <Loading />
        ) : (
          <TaskList
            tasks={tasks}
            onEdit={handleEditClick}
            onDelete={handleDelete}
            filter={statusFilter}
          />
        )}

        {/* Create/Edit task modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingTask ? 'Edit Task' : 'Create New Task'}
        >
          <TaskForm
            initialTask={editingTask}
            onSubmit={handleSubmit}
            onCancel={handleCloseModal}
          />
        </Modal>
      </div>
    </Layout>
  );
};