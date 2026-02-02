/**
 * API Index
 * Central exports for all API services and utilities
 * 
 * Usage:
 * import { authService, placesService, galleriesService } from '@/api';
 * import { LoginRequest } from '@/api/types';
 */

// Services
export { default as authService } from './services/auth';
export { default as placesService } from './services/places';
export { default as eventsService } from './services/events';
export { default as galleryService } from './services/gallery';
export { default as bookingsService } from './services/bookings';

// Token Management
export { default as tokenManager } from './utils/tokenManager';

// Error Handling
export * from './utils/apiErrorHandler';
export * from './types/error';

// Types
export * from './types/api';
export * from './types/auth';

// Axios Instances (advanced usage)
export { publicApi, protectedApi } from './axios/instances';

// Constants
export * from './constants';

// Config
export { default as config } from './config';
