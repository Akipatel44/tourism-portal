/**
 * Gallery Service
 * Handles all gallery-related API calls
 */

import { AxiosError } from 'axios';
import { publicApi, protectedApi } from '../axios/instances';
import { GALLERY_ENDPOINTS } from '../constants';
import { GalleryItem, PaginatedResponse, FileUploadResponse } from '../types/api';
import { parseApiError } from '../utils/apiErrorHandler';

interface GalleryListParams {
  page?: number;
  page_size?: number;
  category?: string;
}

interface CreateGalleryItemRequest {
  image_url: string;
  title: string;
  category: string;
  description?: string;
  is_featured?: boolean;
}

class GalleryService {
  /**
   * Get list of gallery items (public)
   * Supports pagination and category filtering
   */
  async getGallery(
    params?: GalleryListParams
  ): Promise<PaginatedResponse<GalleryItem>> {
    try {
      const response = await publicApi.get<PaginatedResponse<GalleryItem>>(
        GALLERY_ENDPOINTS.LIST,
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get single gallery item (public)
   */
  async getGalleryItem(id: string): Promise<GalleryItem> {
    try {
      const response = await publicApi.get<GalleryItem>(
        GALLERY_ENDPOINTS.DETAIL(id)
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get gallery items by category (public)
   */
  async getGalleryByCategory(
    category: string,
    params?: GalleryListParams
  ): Promise<PaginatedResponse<GalleryItem>> {
    try {
      const response = await publicApi.get<PaginatedResponse<GalleryItem>>(
        GALLERY_ENDPOINTS.BY_CATEGORY(category),
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get featured gallery items (public)
   */
  async getFeaturedGallery(
    params?: Omit<GalleryListParams, 'category'>
  ): Promise<PaginatedResponse<GalleryItem>> {
    try {
      const response = await publicApi.get<PaginatedResponse<GalleryItem>>(
        GALLERY_ENDPOINTS.FEATURED,
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Upload image file (protected)
   * Requires authentication
   * Handles FormData for multipart upload
   */
  async uploadImage(file: File): Promise<FileUploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await protectedApi.post<FileUploadResponse>(
        GALLERY_ENDPOINTS.UPLOAD,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Create new gallery item (protected)
   * Requires authentication
   */
  async createGalleryItem(
    payload: CreateGalleryItemRequest
  ): Promise<GalleryItem> {
    try {
      const response = await protectedApi.post<GalleryItem>(
        GALLERY_ENDPOINTS.CREATE,
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Update gallery item (protected)
   * Requires authentication
   */
  async updateGalleryItem(
    id: string,
    payload: Partial<CreateGalleryItemRequest>
  ): Promise<GalleryItem> {
    try {
      const response = await protectedApi.patch<GalleryItem>(
        GALLERY_ENDPOINTS.UPDATE(id),
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Delete gallery item (protected)
   * Requires authentication
   */
  async deleteGalleryItem(id: string): Promise<void> {
    try {
      await protectedApi.delete(GALLERY_ENDPOINTS.DELETE(id));
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }
}

export default new GalleryService();
