/**
 * API Loading Helper
 * Utility functions for managing loading state during API calls
 */

import { useLoading } from '@/contexts/LoadingContext';
import { useCallback } from 'react';
import { parseApiError } from '@/utils/errorHandler';

/**
 * Hook for making API calls with automatic loading state management
 */
export const useApiCall = () => {
  const { startLoading, stopLoading, setLoadingMessage } = useLoading();

  const executeCall = useCallback(
    async <T,>(
      operation: () => Promise<T>,
      options?: {
        message?: string;
        skipLoading?: boolean;
        onError?: (error: any) => void;
      }
    ): Promise<T | null> => {
      if (!options?.skipLoading) {
        startLoading(options?.message || 'Processing...');
      }

      try {
        const result = await operation();
        stopLoading();
        return result;
      } catch (error: any) {
        stopLoading();

        const parsedError = parseApiError(error);
        if (options?.onError) {
          options.onError(parsedError);
        }

        throw parsedError;
      }
    },
    [startLoading, stopLoading]
  );

  const updateMessage = useCallback(
    (message: string) => {
      setLoadingMessage(message);
    },
    [setLoadingMessage]
  );

  return {
    executeCall,
    startLoading,
    stopLoading,
    updateMessage
  };
};

/**
 * Higher-order function to wrap async operations with loading state
 */
export const withLoading = (
  operation: () => Promise<any>,
  loadingContext: any,
  message: string = 'Loading...'
) => {
  return async () => {
    loadingContext.startLoading?.(message);
    try {
      const result = await operation();
      loadingContext.stopLoading?.();
      return result;
    } catch (error) {
      loadingContext.stopLoading?.();
      throw error;
    }
  };
};

/**
 * Batch loading state for multiple concurrent API calls
 */
export const useBatchApiCalls = () => {
  const { startLoading, stopLoading } = useLoading();

  const executeBatch = useCallback(
    async <T,>(
      operations: Array<() => Promise<T>>,
      message: string = 'Processing requests...'
    ): Promise<T[]> => {
      startLoading(message);

      try {
        const results = await Promise.all(operations.map((op) => op()));
        stopLoading();
        return results;
      } catch (error) {
        stopLoading();
        throw error;
      }
    },
    [startLoading, stopLoading]
  );

  return { executeBatch };
};

export default {
  useApiCall,
  withLoading,
  useBatchApiCalls
};
