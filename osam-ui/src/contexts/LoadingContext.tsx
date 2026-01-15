/**
 * Loading Context
 * Global loading state management for API calls and async operations
 */

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface LoadingState {
  isLoading: boolean;
  activeRequests: number;
  message?: string;
}

interface LoadingContextType {
  loading: LoadingState;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
  setLoadingMessage: (message: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [activeRequests, setActiveRequests] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>();

  const startLoading = useCallback((message?: string) => {
    setActiveRequests((prev) => prev + 1);
    if (message) {
      setLoadingMessage(message);
    }
  }, []);

  const stopLoading = useCallback(() => {
    setActiveRequests((prev) => Math.max(0, prev - 1));
  }, []);

  const setMessage = useCallback((message: string) => {
    setLoadingMessage(message);
  }, []);

  const loading: LoadingState = {
    isLoading: activeRequests > 0,
    activeRequests,
    message: loadingMessage
  };

  const value: LoadingContextType = {
    loading,
    startLoading,
    stopLoading,
    setLoadingMessage: setMessage
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
};

export default LoadingContext;
