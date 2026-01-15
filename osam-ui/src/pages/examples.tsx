/**
 * Example: Best Practices for Loading & Error Handling
 * 
 * This file demonstrates the recommended patterns for using the
 * global loading and error handling system.
 */

import React, { useState, useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';
import { useNotification } from '@/components/NotificationContainer';
import { useRetry } from '@/hooks/useRetry';
import { useBatchApiCalls } from '@/utils/apiLoading';
import { parseApiError, isRetryableError } from '@/utils/errorHandler';

/**
 * Example 1: Basic Data Fetching
 */
const ExampleBasicFetch: React.FC = () => {
  const { startLoading, stopLoading } = useLoading();
  const notify = useNotification();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      startLoading('Loading data...');
      try {
        // Simulated API call
        const result = await new Promise((resolve) =>
          setTimeout(() => resolve({ id: 1, name: 'Sample' }), 1000)
        );
        setData(result);
        notify.success('Data loaded successfully');
        stopLoading();
      } catch (error) {
        stopLoading();
        const apiError = parseApiError(error);
        notify.error('Failed to load data', apiError.message);
      }
    };

    fetchData();
  }, []);

  return <div>{data ? JSON.stringify(data) : 'No data'}</div>;
};

/**
 * Example 2: With Retry Logic
 */
const ExampleWithRetry: React.FC = () => {
  const { retry, state: retryState } = useRetry({
    maxAttempts: 3,
    onRetry: (attempt) => {
      console.log(`Retrying attempt ${attempt}`);
    }
  });
  const notify = useNotification();

  const handleFetch = async () => {
    const result = await retry(
      async () => {
        // API call that might fail
        return new Promise((resolve, reject) => {
          if (Math.random() > 0.5) {
            resolve({ success: true });
          } else {
            reject(new Error('Random failure'));
          }
        });
      },
      'Fetching data'
    );

    if (result) {
      notify.success('Success!', 'Operation completed');
    }
  };

  return (
    <div>
      <button onClick={handleFetch} disabled={retryState.isRetrying}>
        {retryState.isRetrying
          ? `Retrying (Attempt ${retryState.attempt})`
          : 'Fetch Data'}
      </button>
      {retryState.error && <p className="text-red-600">{retryState.error.message}</p>}
    </div>
  );
};

/**
 * Example 3: Batch Operations
 */
const ExampleBatchOperations: React.FC = () => {
  const { executeBatch } = useBatchApiCalls();
  const notify = useNotification();
  const [results, setResults] = useState<any[]>([]);

  const handleFetchMultiple = async () => {
    try {
      const [places, events, galleries] = await executeBatch(
        [
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 500));
            return { type: 'places', count: 10 };
          },
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 700));
            return { type: 'events', count: 5 };
          },
          async () => {
            await new Promise((resolve) => setTimeout(resolve, 600));
            return { type: 'galleries', count: 15 };
          }
        ],
        'Loading all data...'
      );

      setResults([places, events, galleries]);
      notify.success('All data loaded');
    } catch (error) {
      const apiError = parseApiError(error);
      notify.error('Failed to load data', apiError.message);
    }
  };

  return (
    <div>
      <button onClick={handleFetchMultiple}>Load Multiple Resources</button>
      <div className="mt-4">
        {results.map((result, idx) => (
          <p key={idx}>{result?.type}: {result?.count} items</p>
        ))}
      </div>
    </div>
  );
};

/**
 * Example 4: Form Submission with Validation & Retry
 */
const ExampleFormWithRetry: React.FC = () => {
  const { startLoading, stopLoading } = useLoading();
  const notify = useNotification();
  const { retry } = useRetry({ maxAttempts: 2 });
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client validation
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      notify.error('Validation Failed', 'Please check your input');
      return;
    }

    startLoading('Submitting form...');

    try {
      // Make API call with retry
      const result = await retry(
        async () => {
          // Simulated API call
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              if (Math.random() > 0.3) {
                resolve({ id: 1, ...formData });
              } else {
                reject(new Error('Server error'));
              }
            }, 1000);
          });
        },
        'Submitting form'
      );

      if (result) {
        notify.success('Form submitted', 'Your data has been saved');
        setFormData({ name: '', email: '' });
        setErrors({});
      }
      stopLoading();
    } catch (error) {
      stopLoading();
      const apiError = parseApiError(error);
      notify.error('Submission failed', apiError.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full p-2 border rounded ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
        Submit
      </button>
    </form>
  );
};

/**
 * Example 5: Error Handling with Different Status Codes
 */
const ExampleErrorHandling: React.FC = () => {
  const notify = useNotification();
  const { startLoading, stopLoading } = useLoading();

  const testError = async (errorCode: number) => {
    startLoading(`Testing ${errorCode} error...`);

    try {
      // Simulate different error codes
      await new Promise((_, reject) => {
        setTimeout(() => {
          const error: any = new Error(`Error ${errorCode}`);
          error.response = {
            status: errorCode,
            data: {
              detail: `This is a ${errorCode} error message`
            }
          };
          reject(error);
        }, 500);
      });
    } catch (error) {
      stopLoading();
      const apiError = parseApiError(error);

      // Handle different error types
      if (apiError.status === 401) {
        notify.error('Authentication Error', 'Please log in again');
      } else if (apiError.status === 422) {
        notify.error('Validation Error', 'Please check your input');
      } else if (apiError.status >= 500) {
        notify.error('Server Error', 'Please try again later');
      } else {
        notify.error('Error', apiError.message);
      }
    }
  };

  return (
    <div className="space-y-2">
      <button onClick={() => testError(401)}>Test 401 Error</button>
      <button onClick={() => testError(422)}>Test 422 Error</button>
      <button onClick={() => testError(500)}>Test 500 Error</button>
      <button onClick={() => testError(503)}>Test 503 Error</button>
    </div>
  );
};

export {
  ExampleBasicFetch,
  ExampleWithRetry,
  ExampleBatchOperations,
  ExampleFormWithRetry,
  ExampleErrorHandling
};

/**
 * Export these examples in a demo page:
 * 
 * import { ExampleBasicFetch, ExampleWithRetry, ... } from '@/pages/examples';
 * 
 * <ExampleBasicFetch />
 * <ExampleWithRetry />
 * <ExampleBatchOperations />
 * <ExampleFormWithRetry />
 * <ExampleErrorHandling />
 */
