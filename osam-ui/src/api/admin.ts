/**
 * Admin API Service
 * Handles CRUD operations for places, events, and galleries
 * Includes automatic loading state management and error handling
 */

import client from './client';
import { parseApiError } from '@/utils/errorHandler';

// Types for Admin Operations
export interface PlaceFormData {
  name: string;
  description?: string;
  location: string;
  category: 'place' | 'landmark' | 'viewpoint' | 'parking';
  latitude?: number;
  longitude?: number;
  elevation_meters?: number;
  entry_fee?: number;
  accessibility_level?: 'easily_accessible' | 'moderately_accessible' | 'difficult_to_access';
  has_parking: boolean;
  has_restrooms: boolean;
  has_food: boolean;
  best_time_to_visit?: string;
}

export interface EventFormData {
  name: string;
  description?: string;
  event_type: 'festival' | 'fair' | 'ceremony' | 'cultural';
  location: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  is_annual: boolean;
  is_free: boolean;
  entry_fee?: number;
  organizing_body?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  has_parking: boolean;
  has_accommodation: boolean;
}

export interface GalleryFormData {
  name: string;
  description?: string;
  gallery_type: 'photos' | 'videos' | '360photos';
  place_id?: number;
  temple_id?: number;
  site_id?: number;
  event_id?: number;
  is_featured: boolean;
}

export interface GalleryImageData {
  image_url: string;
  thumbnail_url?: string;
  title: string;
  caption?: string;
  photographer?: string;
  image_order: number;
}

export interface Place {
  place_id: number;
  name: string;
  description?: string;
  location: string;
  category: string;
  latitude?: number;
  longitude?: number;
  elevation_meters?: number;
  entry_fee?: number;
  accessibility_level?: string;
  has_parking: boolean;
  has_restrooms: boolean;
  has_food: boolean;
  best_time_to_visit?: string;
  view_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Event {
  event_id: number;
  name: string;
  description?: string;
  event_type: string;
  location: string;
  start_date: string;
  end_date: string;
  start_time?: string;
  end_time?: string;
  is_annual: boolean;
  is_free: boolean;
  entry_fee?: number;
  organizing_body?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  has_parking: boolean;
  has_accommodation: boolean;
  status: string;
  view_count: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  gallery_id: number;
  name: string;
  description?: string;
  gallery_type: string;
  place_id?: number;
  temple_id?: number;
  site_id?: number;
  event_id?: number;
  is_featured: boolean;
  view_count: number;
  image_count: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  image_id: number;
  gallery_id: number;
  image_url: string;
  thumbnail_url?: string;
  title: string;
  caption?: string;
  photographer?: string;
  view_count: number;
  image_order: number;
  is_featured: boolean;
  created_at: string;
}

export interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message?: string;
  error?: string;
}

const adminApi = {
  // PLACES CRUD
  async createPlace(data: PlaceFormData): Promise<Place> {
    try {
      const response = await client.post('/api/v1/places/', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to create place');
    }
  },

  async updatePlace(placeId: number, data: Partial<PlaceFormData>): Promise<Place> {
    try {
      const response = await client.patch(`/api/v1/places/${placeId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update place');
    }
  },

  async deletePlace(placeId: number): Promise<void> {
    try {
      await client.delete(`/api/v1/places/${placeId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to delete place');
    }
  },

  async getPlace(placeId: number): Promise<Place> {
    try {
      const response = await client.get(`/api/v1/places/${placeId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch place');
    }
  },

  async getAllPlaces(skip: number = 0, limit: number = 100): Promise<Place[]> {
    try {
      const response = await client.get('/api/v1/places/', {
        params: { skip, limit }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch places');
    }
  },

  // EVENTS CRUD
  async createEvent(data: EventFormData): Promise<Event> {
    try {
      const response = await client.post('/api/v1/events/', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to create event');
    }
  },

  async updateEvent(eventId: number, data: Partial<EventFormData>): Promise<Event> {
    try {
      const response = await client.patch(`/api/v1/events/${eventId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update event');
    }
  },

  async deleteEvent(eventId: number): Promise<void> {
    try {
      await client.delete(`/api/v1/events/${eventId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to delete event');
    }
  },

  async getEvent(eventId: number): Promise<Event> {
    try {
      const response = await client.get(`/api/v1/events/${eventId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch event');
    }
  },

  async getAllEvents(skip: number = 0, limit: number = 100): Promise<Event[]> {
    try {
      const response = await client.get('/api/v1/events/', {
        params: { skip, limit }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch events');
    }
  },

  // GALLERIES CRUD
  async createGallery(data: GalleryFormData): Promise<Gallery> {
    try {
      const response = await client.post('/api/v1/galleries/', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to create gallery');
    }
  },

  async updateGallery(galleryId: number, data: Partial<GalleryFormData>): Promise<Gallery> {
    try {
      const response = await client.patch(`/api/v1/galleries/${galleryId}`, data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to update gallery');
    }
  },

  async deleteGallery(galleryId: number): Promise<void> {
    try {
      await client.delete(`/api/v1/galleries/${galleryId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to delete gallery');
    }
  },

  async getGallery(galleryId: number): Promise<Gallery> {
    try {
      const response = await client.get(`/api/v1/galleries/${galleryId}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch gallery');
    }
  },

  async getAllGalleries(skip: number = 0, limit: number = 100): Promise<Gallery[]> {
    try {
      const response = await client.get('/api/v1/galleries/', {
        params: { skip, limit }
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch galleries');
    }
  },

  // GALLERY IMAGES
  async addImageToGallery(
    galleryId: number,
    imageData: GalleryImageData
  ): Promise<GalleryImage> {
    try {
      const response = await client.post(
        `/api/v1/galleries/${galleryId}/images`,
        imageData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to add image to gallery');
    }
  },

  async removeImageFromGallery(galleryId: number, imageId: number): Promise<void> {
    try {
      await client.delete(`/api/v1/galleries/${galleryId}/images/${imageId}`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to remove image');
    }
  },

  async getGalleryImages(galleryId: number): Promise<GalleryImage[]> {
    try {
      const response = await client.get(`/api/v1/galleries/${galleryId}/images`);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch gallery images');
    }
  },

  async setFeaturedImage(galleryId: number, imageId: number): Promise<void> {
    try {
      await client.post(`/api/v1/galleries/${galleryId}/images/${imageId}/featured`);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to set featured image');
    }
  },

  async toggleGalleryFeatured(galleryId: number): Promise<boolean> {
    try {
      const response = await client.post(`/api/v1/galleries/${galleryId}/featured`);
      return response.data.is_featured;
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to toggle featured status');
    }
  },

  async reorderGalleryImages(
    galleryId: number,
    imageOrder: number[]
  ): Promise<void> {
    try {
      await client.post(`/api/v1/galleries/${galleryId}/images/reorder`, {
        image_order: imageOrder
      });
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Failed to reorder images');
    }
  }
};

export default adminApi;
