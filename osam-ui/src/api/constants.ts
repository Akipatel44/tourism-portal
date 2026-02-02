/**
 * API Constants
 * Centralized endpoint definitions
 */

// ============================================================================
// AUTH ENDPOINTS
// ============================================================================
export const AUTH_ENDPOINTS = {
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  ME: '/auth/me',
  CHANGE_PASSWORD: '/auth/change-password',
  REFRESH_TOKEN: '/auth/refresh',
} as const;

// ============================================================================
// PLACES ENDPOINTS
// ============================================================================
export const PLACES_ENDPOINTS = {
  LIST: '/places',
  DETAIL: (id: string) => `/places/${id}`,
  CREATE: '/places',
  UPDATE: (id: string) => `/places/${id}`,
  DELETE: (id: string) => `/places/${id}`,
  SEARCH: '/places/search',
  BY_CATEGORY: (category: string) => `/places/category/${category}`,
} as const;

// ============================================================================
// EVENTS ENDPOINTS
// ============================================================================
export const EVENTS_ENDPOINTS = {
  LIST: '/events',
  DETAIL: (id: string) => `/events/${id}`,
  CREATE: '/events',
  UPDATE: (id: string) => `/events/${id}`,
  DELETE: (id: string) => `/events/${id}`,
  SEARCH: '/events/search',
  UPCOMING: '/events/upcoming',
} as const;

// ============================================================================
// GALLERY ENDPOINTS
// ============================================================================
export const GALLERY_ENDPOINTS = {
  LIST: '/gallery',
  DETAIL: (id: string) => `/gallery/${id}`,
  CREATE: '/gallery',
  UPDATE: (id: string) => `/gallery/${id}`,
  DELETE: (id: string) => `/gallery/${id}`,
  UPLOAD: '/gallery/upload',
  BY_CATEGORY: (category: string) => `/gallery/category/${category}`,
  FEATURED: '/gallery/featured',
} as const;

// ============================================================================
// BOOKINGS ENDPOINTS
// ============================================================================
export const BOOKINGS_ENDPOINTS = {
  LIST: '/bookings',
  DETAIL: (id: string) => `/bookings/${id}`,
  CREATE: '/bookings',
  UPDATE: (id: string) => `/bookings/${id}`,
  CANCEL: (id: string) => `/bookings/${id}/cancel`,
  MY_BOOKINGS: '/bookings/me',
} as const;

// ============================================================================
// ADMIN ENDPOINTS
// ============================================================================
export const ADMIN_ENDPOINTS = {
  STATS: '/admin/stats',
  DASHBOARD: '/admin/dashboard',
  USERS: '/admin/users',
  USER_DETAIL: (id: string) => `/admin/users/${id}`,
  ANALYTICS: '/admin/analytics',
} as const;

// ============================================================================
// PUBLIC VS PROTECTED ENDPOINT GROUPS
// ============================================================================

export const PUBLIC_ENDPOINTS = {
  auth: [AUTH_ENDPOINTS.LOGIN, AUTH_ENDPOINTS.REGISTER],
  places: [PLACES_ENDPOINTS.LIST, PLACES_ENDPOINTS.SEARCH],
  events: [EVENTS_ENDPOINTS.LIST, EVENTS_ENDPOINTS.UPCOMING],
  gallery: [GALLERY_ENDPOINTS.LIST, GALLERY_ENDPOINTS.BY_CATEGORY],
};

export const PROTECTED_ENDPOINTS = {
  auth: [
    AUTH_ENDPOINTS.ME,
    AUTH_ENDPOINTS.LOGOUT,
    AUTH_ENDPOINTS.CHANGE_PASSWORD,
  ],
  places: [
    PLACES_ENDPOINTS.CREATE,
    PLACES_ENDPOINTS.UPDATE,
    PLACES_ENDPOINTS.DELETE,
  ],
  events: [
    EVENTS_ENDPOINTS.CREATE,
    EVENTS_ENDPOINTS.UPDATE,
    EVENTS_ENDPOINTS.DELETE,
  ],
  gallery: [
    GALLERY_ENDPOINTS.CREATE,
    GALLERY_ENDPOINTS.UPDATE,
    GALLERY_ENDPOINTS.DELETE,
    GALLERY_ENDPOINTS.UPLOAD,
  ],
  bookings: Object.values(BOOKINGS_ENDPOINTS),
  admin: Object.values(ADMIN_ENDPOINTS),
};

/**
 * Check if endpoint requires authentication
 */
export function isProtectedEndpoint(endpoint: string): boolean {
  const allProtected = Object.values(PROTECTED_ENDPOINTS).flat();
  return allProtected.some((p) => typeof p === 'string' && endpoint.includes(p));
}
