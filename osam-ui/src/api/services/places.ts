/**
 * Places Service
 * Handles all places-related API calls
 */

import { AxiosError } from 'axios';
import { publicApi, protectedApi } from '../axios/instances';
import { PLACES_ENDPOINTS } from '../constants';
import { Place, PaginatedResponse } from '../types/api';
import { parseApiError } from '../utils/apiErrorHandler';

interface PlacesListParams {
  page?: number;
  page_size?: number;
  category?: string;
}

interface CreatePlaceRequest {
  name: string;
  category: string;
  location: string;
  description: string;
  latitude?: number;
  longitude?: number;
  image_url?: string;
  is_featured?: boolean;
}

class PlacesService {
  /**
   * Get list of places (public)
   * Supports pagination and filtering
   */
  async getPlaces(
    params?: PlacesListParams
  ): Promise<PaginatedResponse<Place>> {
    try {
      const response = await publicApi.get<PaginatedResponse<Place>>(
        PLACES_ENDPOINTS.LIST,
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get single place details (public)
   */
  async getPlace(id: string): Promise<Place> {
    try {
      const response = await publicApi.get<Place>(PLACES_ENDPOINTS.DETAIL(id));
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Search places (public)
   */
  async searchPlaces(
    query: string,
    params?: PlacesListParams
  ): Promise<PaginatedResponse<Place>> {
    try {
      const response = await publicApi.get<PaginatedResponse<Place>>(
        PLACES_ENDPOINTS.SEARCH,
        { params: { q: query, ...params } }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get places by category (public)
   */
  async getPlacesByCategory(
    category: string,
    params?: PlacesListParams
  ): Promise<PaginatedResponse<Place>> {
    try {
      const response = await publicApi.get<PaginatedResponse<Place>>(
        PLACES_ENDPOINTS.BY_CATEGORY(category),
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Create new place (protected)
   * Requires authentication
   */
  async createPlace(payload: CreatePlaceRequest): Promise<Place> {
    try {
      const response = await protectedApi.post<Place>(
        PLACES_ENDPOINTS.CREATE,
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Update place (protected)
   * Requires authentication
   */
  async updatePlace(id: string, payload: Partial<CreatePlaceRequest>): Promise<Place> {
    try {
      const response = await protectedApi.patch<Place>(
        PLACES_ENDPOINTS.UPDATE(id),
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Delete place (protected)
   * Requires authentication
   */
  async deletePlace(id: string): Promise<void> {
    try {
      await protectedApi.delete(PLACES_ENDPOINTS.DELETE(id));
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }
}

export default new PlacesService();
