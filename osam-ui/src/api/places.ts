/**
 * Places API Service
 * 
 * Handles all place-related API calls
 * - List all places
 * - Get place by ID
 * - Search places
 * - Filter by category
 */

import { apiClient, handleApiError } from './client';
import type { AxiosError } from 'axios';

/* ==================== TYPES ==================== */

export interface Place {
  id: number;
  name: string;
  description: string;
  location: string;
  category: 'place' | 'landmark' | 'viewpoint' | 'parking' | 'temple' | 'nature' | 'mythology';
  image_url?: string;
  distance?: string;
  best_time?: string;
  rating?: number;
  entry_fee?: number;
  best_season?: string;
  difficulty_level?: string;
  estimated_time?: string;
  facilities?: string[];
  view_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PlaceListResponse {
  id: number;
  name: string;
  description: string;
  location: string;
  category: string;
  image_url?: string;
  rating?: number;
  entry_fee?: number;
  view_count?: number;
}

export interface PlacesListError {
  status: number;
  message: string;
  detail?: string;
}

/* ==================== DUMMY DATA FALLBACK ==================== */

export const DUMMY_PLACES: Place[] = [
  {
    id: 1,
    name: 'Osam Hill Summit',
    description: 'The main sacred peak offering panoramic views of the entire region with spiritual significance.',
    location: 'Osam Hill',
    category: 'nature',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    distance: '2 km from town',
    best_time: 'Morning (5 AM - 7 AM)',
    rating: 4.8,
    entry_fee: 0,
    best_season: 'October to March',
    difficulty_level: 'Moderate',
    estimated_time: '2-3 hours',
    facilities: ['Parking', 'Restroom', 'Water'],
  },
  {
    id: 2,
    name: 'Chichod Ancient Temple',
    description: 'A centuries-old temple with intricate stone carvings and architectural marvel of the region.',
    location: 'Chichod',
    category: 'temple',
    image_url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
    distance: '1.5 km from town',
    best_time: 'Evening (6 PM - 8 PM)',
    rating: 4.9,
    entry_fee: 0,
    best_season: 'Year-round',
    difficulty_level: 'Easy',
    estimated_time: '1-2 hours',
    facilities: ['Parking', 'Temple shop', 'Water'],
  },
  {
    id: 3,
    name: 'Mystic Forest Trail',
    description: 'Enchanting woodland path with rare species, waterfalls, and serene meditation spots.',
    location: 'Forest Area',
    category: 'nature',
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    distance: '3 km from town',
    best_time: 'Afternoon (2 PM - 5 PM)',
    rating: 4.7,
    entry_fee: 0,
    best_season: 'October to March',
    difficulty_level: 'Moderate',
    estimated_time: '3-4 hours',
    facilities: ['Parking', 'Guide available'],
  },
  {
    id: 4,
    name: 'Devashree Temple Ruins',
    description: 'Ancient ruins of the legendary Devashree temple with mythological inscriptions.',
    location: 'Ancient Site',
    category: 'mythology',
    image_url: 'https://images.unsplash.com/photo-1549887534-7eb63f1f58ab?w=600&h=400&fit=crop',
    distance: '4 km from town',
    best_time: 'Early morning',
    rating: 4.6,
    entry_fee: 50,
    best_season: 'November to February',
    difficulty_level: 'Moderate',
    estimated_time: '2-3 hours',
    facilities: ['Parking', 'Water'],
  },
];

/* ==================== PLACES API SERVICE ==================== */

export const placesApi = {
  /**
   * Fetch all places with pagination
   * 
   * @param skip Number of records to skip (default: 0)
   * @param limit Maximum records to return (default: 100)
   * @returns List of places
   */
  getAllPlaces: async (skip: number = 0, limit: number = 100): Promise<Place[]> => {
    try {
      const response = await apiClient.get<Place[]>('/places', {
        params: { skip, limit },
      });

      // Return response data directly or wrapped
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      return data.length > 0 ? data : DUMMY_PLACES;
    } catch (error) {
      console.error('[PlacesApi] Failed to fetch places:', error);
      // Return dummy data as fallback
      return DUMMY_PLACES;
    }
  },

  /**
   * Fetch single place by ID
   * 
   * @param placeId Place ID
   * @returns Place details
   * @throws Error if place not found
   */
  getPlaceById: async (placeId: number): Promise<Place> => {
    try {
      const response = await apiClient.get<Place>(`/places/${placeId}`);

      // Extract data from response
      const place = response.data.data || response.data;
      return place;
    } catch (error) {
      const apiError = handleApiError(error);

      if (apiError.status === 404) {
        console.warn('[PlacesApi] Place not found:', placeId);
        // Return dummy place as fallback
        const dummyPlace = DUMMY_PLACES.find((p) => p.id === placeId);
        if (dummyPlace) return dummyPlace;
      }

      console.error('[PlacesApi] Failed to fetch place:', apiError.message);
      throw new Error(apiError.message || 'Failed to fetch place');
    }
  },

  /**
   * Search places by name
   * 
   * @param query Search query string
   * @returns Matching places
   */
  searchPlaces: async (query: string): Promise<Place[]> => {
    try {
      if (!query.trim()) return DUMMY_PLACES;

      const response = await apiClient.get<Place[]>('/places/search/by-name', {
        params: { query },
      });

      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      return data.length > 0 ? data : DUMMY_PLACES;
    } catch (error) {
      console.warn('[PlacesApi] Search failed, using dummy data:', error);
      // Return filtered dummy data
      return DUMMY_PLACES.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    }
  },

  /**
   * Filter places by category
   * 
   * @param category Category to filter by
   * @returns Filtered places
   */
  filterByCategory: async (category: string): Promise<Place[]> => {
    try {
      const response = await apiClient.get<Place[]>('/places/filter/by-category', {
        params: { category },
      });

      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      return data.length > 0 ? data : DUMMY_PLACES;
    } catch (error) {
      console.warn('[PlacesApi] Filter failed, using dummy data:', error);
      // Return filtered dummy data
      return DUMMY_PLACES.filter((p) => p.category === category);
    }
  },

  /**
   * Get featured places
   * 
   * @returns Featured places
   */
  getFeaturedPlaces: async (): Promise<Place[]> => {
    try {
      const response = await apiClient.get<Place[]>('/places/featured');
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      return data.length > 0 ? data : DUMMY_PLACES.slice(0, 3);
    } catch (error) {
      console.warn('[PlacesApi] Featured places failed, using dummy data');
      return DUMMY_PLACES.slice(0, 3);
    }
  },

  /**
   * Get popular places (by view count)
   * 
   * @returns Popular places
   */
  getPopularPlaces: async (): Promise<Place[]> => {
    try {
      const response = await apiClient.get<Place[]>('/places/popular');
      const data = Array.isArray(response.data) ? response.data : response.data.data || [];
      return data.length > 0 ? data : DUMMY_PLACES.slice(0, 3);
    } catch (error) {
      console.warn('[PlacesApi] Popular places failed, using dummy data');
      return DUMMY_PLACES.slice(0, 3);
    }
  },
};
