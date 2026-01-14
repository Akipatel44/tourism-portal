/**
 * Public API Service
 * 
 * Endpoints that don't require authentication
 * - GET /places - Fetch all places
 * - GET /places/:id - Fetch single place
 * - GET /events - Fetch all events
 * - GET /events/:id - Fetch single event
 * - GET /galleries - Fetch all galleries
 * - GET /galleries/:id - Fetch single gallery
 */

import { apiClient } from './client';
import type { AxiosError } from 'axios';

/**
 * Place Interface
 * Matches FastAPI Place model
 */
export interface Place {
  id: number;
  name: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  significance: string;
  season: string;
  image_url: string;
  created_at?: string;
  updated_at?: string;
}

/**
 * Event Interface
 * Matches FastAPI Event model
 */
export interface Event {
  id: number;
  name: string;
  description: string;
  date: string;
  location: string;
  event_type: string;
  image_url: string;
  capacity?: number;
  available_seats?: number;
  created_at?: string;
  updated_at?: string;
}

/**
 * Gallery Interface
 * Matches FastAPI Gallery model
 */
export interface Gallery {
  id: number;
  name: string;
  description: string;
  place_id?: number;
  images: GalleryImage[];
  created_at?: string;
  updated_at?: string;
}

/**
 * Gallery Image Interface
 */
export interface GalleryImage {
  id: number;
  gallery_id: number;
  image_url: string;
  alt_text: string;
  caption?: string;
  order: number;
}

/**
 * Pagination Response Interface
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

/**
 * Places API Service
 */
export const placesApi = {
  /**
   * Get all places with optional filtering/pagination
   */
  getPlaces: async (params?: {
    skip?: number;
    limit?: number;
    season?: string;
    search?: string;
  }): Promise<PaginatedResponse<Place> | Place[]> => {
    try {
      const response = await apiClient.get('/places', { params });
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
   * Get single place by ID
   */
  getPlace: async (id: number): Promise<Place> => {
    try {
      const response = await apiClient.get(`/places/${id}`);
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
   * Get places by season
   */
  getPlacesBySeason: async (season: string): Promise<Place[]> => {
    try {
      const response = await apiClient.get('/places/season', {
        params: { season },
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

  /**
   * Search places by keyword
   */
  searchPlaces: async (query: string): Promise<Place[]> => {
    try {
      const response = await apiClient.get('/places/search', {
        params: { q: query },
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
 * Events API Service
 */
export const eventsApi = {
  /**
   * Get all events
   */
  getEvents: async (params?: {
    skip?: number;
    limit?: number;
    upcoming?: boolean;
  }): Promise<PaginatedResponse<Event> | Event[]> => {
    try {
      const response = await apiClient.get('/events', { params });
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
   * Get single event by ID
   */
  getEvent: async (id: number): Promise<Event> => {
    try {
      const response = await apiClient.get(`/events/${id}`);
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
   * Get upcoming events
   */
  getUpcomingEvents: async (limit?: number): Promise<Event[]> => {
    try {
      const response = await apiClient.get('/events/upcoming', {
        params: { limit },
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

  /**
   * Get events by place
   */
  getEventsByPlace: async (placeId: number): Promise<Event[]> => {
    try {
      const response = await apiClient.get(`/places/${placeId}/events`);
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
 * Galleries API Service
 */
export const galleriesApi = {
  /**
   * Get all galleries
   */
  getGalleries: async (params?: {
    skip?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Gallery> | Gallery[]> => {
    try {
      const response = await apiClient.get('/galleries', { params });
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
   * Get single gallery by ID
   */
  getGallery: async (id: number): Promise<Gallery> => {
    try {
      const response = await apiClient.get(`/galleries/${id}`);
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
   * Get gallery images
   */
  getGalleryImages: async (galleryId: number): Promise<GalleryImage[]> => {
    try {
      const response = await apiClient.get(`/galleries/${galleryId}/images`);
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
   * Get galleries by place
   */
  getGalleriesByPlace: async (placeId: number): Promise<Gallery[]> => {
    try {
      const response = await apiClient.get(`/places/${placeId}/galleries`);
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
 * Public API Namespace
 * Aggregates all public endpoints
 */
export const publicApi = {
  places: placesApi,
  events: eventsApi,
  galleries: galleriesApi,
};
