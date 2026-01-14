/**
 * Protected API Service
 * 
 * Endpoints that require authentication
 * Admin operations for CRUD management
 * - POST/PUT/DELETE /admin/* endpoints
 * - Requires valid JWT token in Authorization header
 * - Token automatically injected via axios interceptor
 */

import { apiClient } from './client';
import type { AxiosError } from 'axios';
import type {
  Place,
  Event,
  Gallery,
  GalleryImage,
} from './public';

/**
 * Create Place Request
 */
export interface CreatePlaceRequest {
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  significance: string;
  season: string;
  image_url: string;
}

/**
 * Update Place Request
 */
export interface UpdatePlaceRequest extends Partial<CreatePlaceRequest> {
  id?: number;
}

/**
 * Create Event Request
 */
export interface CreateEventRequest {
  name: string;
  description: string;
  date: string;
  location: string;
  event_type: string;
  image_url: string;
  capacity?: number;
}

/**
 * Update Event Request
 */
export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  id?: number;
}

/**
 * Create Gallery Request
 */
export interface CreateGalleryRequest {
  name: string;
  description: string;
  place_id?: number;
}

/**
 * Update Gallery Request
 */
export interface UpdateGalleryRequest extends Partial<CreateGalleryRequest> {
  id?: number;
}

/**
 * Gallery Image Upload Request
 */
export interface UploadGalleryImageRequest {
  gallery_id: number;
  image_url: string;
  alt_text: string;
  caption?: string;
  order?: number;
}

/**
 * Protected Places API Service
 */
export const protectedPlacesApi = {
  /**
   * Create new place
   * @requires Authentication
   */
  createPlace: async (data: CreatePlaceRequest): Promise<Place> => {
    try {
      const response = await apiClient.post('/admin/places', data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Update existing place
   * @requires Authentication
   */
  updatePlace: async (
    id: number,
    data: UpdatePlaceRequest
  ): Promise<Place> => {
    try {
      const response = await apiClient.put(`/admin/places/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Delete place
   * @requires Authentication
   */
  deletePlace: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await apiClient.delete(`/admin/places/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
      };
    }
  },

  /**
   * Bulk update places
   * @requires Authentication
   */
  bulkUpdatePlaces: async (
    updates: Array<{ id: number; data: UpdatePlaceRequest }>
  ): Promise<Place[]> => {
    try {
      const response = await apiClient.post('/admin/places/bulk-update', {
        updates,
      });
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
      };
    }
  },
};

/**
 * Protected Events API Service
 */
export const protectedEventsApi = {
  /**
   * Create new event
   * @requires Authentication
   */
  createEvent: async (data: CreateEventRequest): Promise<Event> => {
    try {
      const response = await apiClient.post('/admin/events', data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Update existing event
   * @requires Authentication
   */
  updateEvent: async (
    id: number,
    data: UpdateEventRequest
  ): Promise<Event> => {
    try {
      const response = await apiClient.put(`/admin/events/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Delete event
   * @requires Authentication
   */
  deleteEvent: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await apiClient.delete(`/admin/events/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
      };
    }
  },

  /**
   * Update available seats for event
   * @requires Authentication
   */
  updateEventCapacity: async (
    id: number,
    availableSeats: number
  ): Promise<Event> => {
    try {
      const response = await apiClient.patch(
        `/admin/events/${id}/capacity`,
        { available_seats: availableSeats }
      );
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
      };
    }
  },
};

/**
 * Protected Galleries API Service
 */
export const protectedGalleriesApi = {
  /**
   * Create new gallery
   * @requires Authentication
   */
  createGallery: async (data: CreateGalleryRequest): Promise<Gallery> => {
    try {
      const response = await apiClient.post('/admin/galleries', data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Update existing gallery
   * @requires Authentication
   */
  updateGallery: async (
    id: number,
    data: UpdateGalleryRequest
  ): Promise<Gallery> => {
    try {
      const response = await apiClient.put(`/admin/galleries/${id}`, data);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Delete gallery
   * @requires Authentication
   */
  deleteGallery: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await apiClient.delete(`/admin/galleries/${id}`);
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
      };
    }
  },

  /**
   * Add image to gallery
   * @requires Authentication
   */
  addGalleryImage: async (
    data: UploadGalleryImageRequest
  ): Promise<GalleryImage> => {
    try {
      const response = await apiClient.post(
        `/admin/galleries/${data.gallery_id}/images`,
        {
          image_url: data.image_url,
          alt_text: data.alt_text,
          caption: data.caption,
          order: data.order,
        }
      );
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
        data: apiError.response?.data,
      };
    }
  },

  /**
   * Delete gallery image
   * @requires Authentication
   */
  deleteGalleryImage: async (
    galleryId: number,
    imageId: number
  ): Promise<{ message: string }> => {
    try {
      const response = await apiClient.delete(
        `/admin/galleries/${galleryId}/images/${imageId}`
      );
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
      };
    }
  },

  /**
   * Reorder gallery images
   * @requires Authentication
   */
  reorderImages: async (
    galleryId: number,
    imageIds: number[]
  ): Promise<GalleryImage[]> => {
    try {
      const response = await apiClient.post(
        `/admin/galleries/${galleryId}/reorder`,
        { image_ids: imageIds }
      );
      return response.data;
    } catch (error) {
      const apiError = error as AxiosError;
      throw {
        status: apiError.response?.status,
        message: apiError.message,
      };
    }
  },
};

/**
 * Protected API Namespace
 * Aggregates all protected endpoints
 */
export const protectedApi = {
  places: protectedPlacesApi,
  events: protectedEventsApi,
  galleries: protectedGalleriesApi,
};
