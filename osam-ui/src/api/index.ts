/**
 * API Layer Index
 * 
 * Central export point for all API services and utilities
 * Usage: import { authApi, publicApi, protectedApi } from '@/api'
 */

// Core
export { apiClient } from './client';
export type { ApiError, ApiResponse } from './client';

// Token Management
export { tokenStorage, tokenUtils, useAuthState } from './tokenStorage';

// Public API (no authentication required)
export { publicApi, placesApi, eventsApi, galleriesApi } from './public';
export type {
  Place,
  Event,
  Gallery,
  GalleryImage,
  PaginatedResponse,
} from './public';

// Protected API (requires authentication)
export { protectedApi, protectedPlacesApi, protectedEventsApi, protectedGalleriesApi } from './protected';
export type {
  CreatePlaceRequest,
  UpdatePlaceRequest,
  CreateEventRequest,
  UpdateEventRequest,
  CreateGalleryRequest,
  UpdateGalleryRequest,
  UploadGalleryImageRequest,
} from './protected';

// Authentication
export { authApi, createAuthEvent, listenToAuthEvent } from './auth';
export type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  ApiErrorResponse,
} from './auth';
