import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import tasksReducer from '../features/tasksSlice';

// Configure Redux store with auth and tasks reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;