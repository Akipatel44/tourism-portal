/**
 * Global Loading & Error Handling System - Implementation Guide
 * 
 * This system provides centralized handling of loading states, errors, and retries
 * across all API calls in the application.
 * 
 * ========== COMPONENTS & HOOKS ==========
 */

/**
 * 1. LOADING CONTEXT (LoadingContext.tsx)
 * 
 * Provides global loading state management
 * 
 * Usage:
 * ```typescript
 * import { useLoading } from '@/contexts/LoadingContext';
 * 
 * const MyComponent = () => {
 *   const { loading, startLoading, stopLoading, setLoadingMessage } = useLoading();
 *   
 *   const handleFetch = async () => {
 *     startLoading('Fetching data...');
 *     try {
 *       const data = await fetchData();
 *       stopLoading();
 *     } catch (error) {
 *       stopLoading();
 *     }
 *   };
 *   
 *   return (
 *     <>
 *       {loading.isLoading && <p>Loading: {loading.message}</p>}
 *       <button onClick={handleFetch}>Fetch</button>
 *     </>
 *   );
 * };
 * ```
 */

/**
 * 2. GLOBAL LOADER (GlobalLoader.tsx)
 * 
 * Displays a centered modal with loading indicator
 * Automatically shows/hides based on loading state
 * 
 * Features:
 * - Animated spinner
 * - Loading message display
 * - Request counter for batch operations
 * - Auto-dismissing with pointer-events handling
 */

/**
 * 3. ERROR HANDLER (utils/errorHandler.ts)
 * 
 * Centralized error parsing and formatting
 * 
 * Functions:
 * - parseApiError(error) - Convert axios error to ApiError
 * - isRetryableError(error) - Check if error should be retried
 * - getRetryDelay(attempt) - Calculate exponential backoff delay
 * - isAuthError(error) - Check if auth-related error
 * - isRateLimitError(error) - Check if rate-limited
 * - formatValidationErrors(errors) - Format field errors
 * 
 * Usage:
 * ```typescript
 * import { parseApiError, isRetryableError } from '@/utils/errorHandler';
 * 
 * try {
 *   await api.call();
 * } catch (error) {
 *   const apiError = parseApiError(error);
 *   notify.error(apiError.message);
 *   
 *   if (isRetryableError(apiError)) {
 *     // Retry the operation
 *   }
 * }
 * ```
 */

/**
 * 4. RETRY HOOK (hooks/useRetry.ts)
 * 
 * Automatic retry with exponential backoff
 * 
 * Features:
 * - Configurable max attempts
 * - Automatic exponential backoff
 * - Rate limit detection with Retry-After header
 * - User notifications on retry
 * - Cancellation support
 * 
 * Usage:
 * ```typescript
 * import { useRetry } from '@/hooks/useRetry';
 * 
 * const MyComponent = () => {
 *   const { retry, state } = useRetry({
 *     maxAttempts: 3,
 *     onRetry: (attempt, error) => {
 *       console.log(`Retrying attempt ${attempt}`);
 *     }
 *   });
 *   
 *   const handleFetch = async () => {
 *     const result = await retry(
 *       () => api.fetchData(),
 *       'Fetching data'
 *     );
 *     
 *     if (state.isRetrying) {
 *       return <p>Retrying...</p>;
 *     }
 *   };
 * };
 * ```
 */

/**
 * 5. ERROR BOUNDARY (components/ErrorBoundary.tsx)
 * 
 * Catches unhandled React component errors
 * Shows error UI with recovery options
 * 
 * Wraps entire app for safety:
 * ```typescript
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 * ```
 */

/**
 * 6. API LOADING HELPERS (utils/apiLoading.ts)
 * 
 * High-level utilities for API calls
 * 
 * useApiCall Hook:
 * ```typescript
 * const { executeCall, startLoading, stopLoading } = useApiCall();
 * 
 * const fetchData = async () => {
 *   const result = await executeCall(
 *     () => api.getData(),
 *     { message: 'Loading data...' }
 *   );
 * };
 * ```
 * 
 * useBatchApiCalls Hook:
 * ```typescript
 * const { executeBatch } = useBatchApiCalls();
 * 
 * const fetchMultiple = async () => {
 *   const [places, events, galleries] = await executeBatch([
 *     () => api.getPlaces(),
 *     () => api.getEvents(),
 *     () => api.getGalleries()
 *   ], 'Loading all data...');
 * };
 * ```
 */

/**
 * 7. NOTIFICATION SYSTEM (components/NotificationContainer.tsx)
 * 
 * Toast notifications for user feedback
 * 
 * Types: success, error, warning, info
 * 
 * Usage:
 * ```typescript
 * import { useNotification } from '@/components/NotificationContainer';
 * 
 * const notify = useNotification();
 * 
 * notify.success('Success!', 'Operation completed');
 * notify.error('Error!', 'Something went wrong');
 * notify.warning('Warning!', 'Please be careful');
 * notify.info('Info!', 'Just so you know');
 * ```
 */

/**
 * ========== ERROR HANDLING PATTERNS ==========
 */

/**
 * PATTERN 1: Basic Try-Catch with Notifications
 * 
 * Use when: Simple API calls with error handling
 * 
 * ```typescript
 * const { startLoading, stopLoading } = useLoading();
 * const notify = useNotification();
 * 
 * const handleAction = async () => {
 *   startLoading('Processing...');
 *   try {
 *     const result = await api.doSomething();
 *     notify.success('Success!');
 *     stopLoading();
 *   } catch (error) {
 *     stopLoading();
 *     const parsed = parseApiError(error);
 *     notify.error('Failed', parsed.message);
 *   }
 * };
 * ```
 */

/**
 * PATTERN 2: With Retry Logic
 * 
 * Use when: Network-heavy operations that might fail temporarily
 * 
 * ```typescript
 * const { retry } = useRetry({ maxAttempts: 3 });
 * 
 * const handleAction = async () => {
 *   const result = await retry(
 *     () => api.fetchData(),
 *     'Fetching data'
 *   );
 * };
 * ```
 */

/**
 * PATTERN 3: Batch Operations
 * 
 * Use when: Loading multiple resources simultaneously
 * 
 * ```typescript
 * const { executeBatch } = useBatchApiCalls();
 * 
 * useEffect(() => {
 *   const load = async () => {
 *     try {
 *       const [places, events] = await executeBatch([
 *         () => api.getPlaces(),
 *         () => api.getEvents()
 *       ]);
 *     } catch (error) {
 *       notify.error('Failed to load data');
 *     }
 *   };
 *   load();
 * }, []);
 * ```
 */

/**
 * PATTERN 4: Form Submission with Validation
 * 
 * Use when: Form submissions with client & server validation
 * 
 * ```typescript
 * const handleSubmit = async (e: FormEvent) => {
 *   e.preventDefault();
 *   
 *   // Client validation
 *   const validation = validateForm(formData);
 *   if (!validation.isValid) {
 *     setErrors(validation.errors);
 *     notify.error('Validation failed');
 *     return;
 *   }
 *   
 *   // Server call
 *   startLoading('Saving...');
 *   try {
 *     await api.createItem(formData);
 *     notify.success('Saved successfully');
 *     stopLoading();
 *   } catch (error) {
 *     stopLoading();
 *     const parsed = parseApiError(error);
 *     
 *     // Server validation errors
 *     if (parsed.status === 422) {
 *       // Handle field-specific errors
 *     }
 *     
 *     notify.error('Save failed', parsed.message);
 *   }
 * };
 * ```
 */

/**
 * ========== INTEGRATION CHECKLIST ==========
 * 
 * ✓ LoadingProvider wraps entire app
 * ✓ NotificationContainer rendered at app root
 * ✓ GlobalLoader component rendered
 * ✓ ErrorBoundary wraps app for error safety
 * ✓ All API calls use try-catch with error parsing
 * ✓ Loading state managed via useLoading hook
 * ✓ Errors shown via useNotification hook
 * ✓ Retry logic for network errors
 * ✓ Form validation before submission
 * ✓ User-friendly error messages displayed
 * 
 * ========== TESTING TIPS ==========
 * 
 * 1. Test error scenarios:
 *    - Network timeout (mock with delay)
 *    - 401 Unauthorized (check redirect)
 *    - 422 Validation error (check field errors)
 *    - 500 Server error (check retry)
 * 
 * 2. Test loading states:
 *    - Check loader shows during requests
 *    - Check message updates
 *    - Check concurrent requests increment counter
 * 
 * 3. Test notifications:
 *    - Check success messages appear
 *    - Check error messages appear
 *    - Check auto-dismiss after 4s
 * 
 * 4. Test retry:
 *    - Check exponential backoff timing
 *    - Check max attempts limit
 *    - Check rate limit handling
 */

export default {};
