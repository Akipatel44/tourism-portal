/**
 * Retry Hook
 * Handles retry logic with exponential backoff for failed API calls
 */

import { useState, useCallback, useRef } from 'react';
import { ApiError, isRetryableError, getRetryDelay, getRateLimitDelay, isRateLimitError } from '@/utils/errorHandler';
import { useNotification } from '@/components/NotificationContainer';

export interface RetryConfig {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  onRetry?: (attempt: number, error: ApiError) => void;
  onFailed?: (error: ApiError) => void;
}

export interface RetryState {
  isRetrying: boolean;
  attempt: number;
  error: ApiError | null;
  nextRetryIn: number; // milliseconds
}

export const useRetry = (config: RetryConfig = {}) => {
  const {
    maxAttempts = 3,
    onRetry,
    onFailed
  } = config;

  const [state, setState] = useState<RetryState>({
    isRetrying: false,
    attempt: 0,
    error: null,
    nextRetryIn: 0
  });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notify = useNotification();

  const retry = useCallback(
    async <T,>(
      operation: () => Promise<T>,
      operationName: string = 'Operation'
    ): Promise<T | null> => {
      let lastError: ApiError | null = null;
      let attempt = 0;

      while (attempt < maxAttempts) {
        attempt++;

        try {
          const result = await operation();
          setState({
            isRetrying: false,
            attempt: 0,
            error: null,
            nextRetryIn: 0
          });
          return result;
        } catch (error: any) {
          lastError = error;

          // Check if error is retryable
          if (!isRetryableError(error) || attempt >= maxAttempts) {
            setState({
              isRetrying: false,
              attempt,
              error: lastError,
              nextRetryIn: 0
            });

            if (onFailed) {
              onFailed(lastError);
            }

            // Show error notification
            notify.error(
              `${operationName} Failed`,
              lastError.message,
              5000
            );

            return null;
          }

          // Calculate delay
          let delayMs: number;
          if (isRateLimitError(lastError)) {
            delayMs = getRateLimitDelay(error) * 1000;
            notify.warning(
              'Rate Limited',
              `Too many requests. Retrying in ${delayMs / 1000} seconds...`
            );
          } else {
            delayMs = getRetryDelay(attempt);
          }

          setState({
            isRetrying: true,
            attempt,
            error: lastError,
            nextRetryIn: delayMs
          });

          if (onRetry) {
            onRetry(attempt, lastError);
          }

          // Notify user
          notify.info(
            `Retrying ${operationName}`,
            `Attempt ${attempt + 1} of ${maxAttempts}...`,
            delayMs
          );

          // Wait before retrying
          await new Promise((resolve) => {
            timeoutRef.current = setTimeout(resolve, delayMs);
          });
        }
      }

      return null;
    },
    [maxAttempts, onRetry, onFailed, notify]
  );

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setState({
      isRetrying: false,
      attempt: 0,
      error: null,
      nextRetryIn: 0
    });
  }, []);

  return { state, retry, cancel };
};

export default useRetry;
