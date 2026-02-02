/**
 * Generic API Response Types
 * Reusable types for all API responses
 */

/**
 * Paginated response wrapper
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/**
 * Standard success response
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  timestamp?: string;
}

/**
 * Batch operation response (e.g., bulk delete)
 */
export interface BatchResponse {
  success_count: number;
  failure_count: number;
  failed_ids?: string[];
  message: string;
}

/**
 * File upload response
 */
export interface FileUploadResponse {
  url: string;
  filename: string;
  size: number;
  content_type: string;
  uploaded_at: string;
}

/**
 * Place entity type
 */
export interface Place {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  latitude?: number;
  longitude?: number;
  image_url?: string;
  visit_count: number;
  rating: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Event entity type
 */
export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url?: string;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  attendees_count: number;
  created_at: string;
  updated_at: string;
}

/**
 * Gallery item entity type
 */
export interface GalleryItem {
  id: string;
  image_url: string;
  title: string;
  category: string;
  description?: string;
  uploaded_by: string;
  upload_date: string;
  view_count: number;
  is_featured: boolean;
}

/**
 * Booking entity type
 */
export interface Booking {
  id: string;
  user_id: string;
  place_id: string;
  event_id?: string;
  booking_date: string;
  visit_date: string;
  number_of_guests: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  total_price: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}
