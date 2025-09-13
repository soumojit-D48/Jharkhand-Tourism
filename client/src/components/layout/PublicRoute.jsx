import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

const PublicRoute = ({ children, redirectTo = "/" }) => {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return <LoadingSpinner />;
  }

  // If user is authenticated, redirect to home or specified route
  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  // User is not authenticated, render the public component (login, signup, etc.)
  return children;
};

export default PublicRoute;