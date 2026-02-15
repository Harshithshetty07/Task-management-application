import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Task, TaskFormData } from '../../types/task.types';
import { Button } from '../common/Button';
import { TASK_STATUSES } from '../../utils/constants';

interface TaskFormProps {
  initialTask?: Task | null;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
}

// Validation schema using Yup
const taskValidationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters')
    .required('Title is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .max(500, 'Description must be less than 500 characters')
    .required('Description is required'),
  status: Yup.string()
    .oneOf(['pending', 'in-progress', 'completed'], 'Invalid status')
    .required('Status is required'),
});

// Task form component using Formik and Tailwind CSS
export const TaskForm: React.FC<TaskFormProps> = ({ initialTask, onSubmit, onCancel }) => {
  // Initial form values
  const initialValues: TaskFormData = {
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    status: initialTask?.status || 'pending',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={taskValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="space-y-4">
          {/* Title field */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Title <span className="text-red-500">*</span>
            </label>
            <Field
              type="text"
              id="title"
              name="title"
              placeholder="Enter task title"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                errors.title && touched.title
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            <ErrorMessage name="title" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Description field */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Description <span className="text-red-500">*</span>
            </label>
            <Field
              as="textarea"
              id="description"
              name="description"
              rows={4}
              placeholder="Enter task description"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 resize-none ${
                errors.description && touched.description
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            />
            <ErrorMessage
              name="description"
              component="div"
              className="mt-1 text-sm text-red-500"
            />
          </div>

          {/* Status field */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">
              Status <span className="text-red-500">*</span>
            </label>
            <Field
              as="select"
              id="status"
              name="status"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 ${
                errors.status && touched.status
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
            >
              {TASK_STATUSES.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </Field>
            <ErrorMessage name="status" component="div" className="mt-1 text-sm text-red-500" />
          </div>

          {/* Form actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {initialTask ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};