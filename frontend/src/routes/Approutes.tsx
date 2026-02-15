import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { NotFound } from '../pages/Notfound';
import { ProtectedRoute } from './ProtectedRoute';

// App routes configuration
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public route - Login page */}
      <Route path="/login" element={<Login />} />

      {/* Protected route - Dashboard (requires authentication) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Redirect root path to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 page - catch all unmatched routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};