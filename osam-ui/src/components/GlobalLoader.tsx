/**
 * Global Loader Component
 * Displays loading state overlay with message
 */

import React from 'react';
import { useLoading } from '@/contexts/LoadingContext';

const GlobalLoader: React.FC = () => {
  const { loading } = useLoading();

  if (!loading.isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40 flex items-center justify-center pointer-events-none">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm pointer-events-auto">
        {/* Spinner */}
        <div className="flex justify-center mb-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Message */}
        <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
          {loading.message || 'Loading...'}
        </h3>

        {/* Loading indicator */}
        <p className="text-sm text-gray-600 text-center">
          Please wait
        </p>

        {/* Request count (if multiple) */}
        {loading.activeRequests > 1 && (
          <p className="text-xs text-gray-500 text-center mt-3">
            Processing {loading.activeRequests} requests...
          </p>
        )}

        {/* Animated dots */}
        <div className="flex justify-center gap-1 mt-4">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
