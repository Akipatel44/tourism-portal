/**
 * Gallery API Service
 * 
 * Handles all gallery-related API calls with optimization
 * - List galleries with pagination
 * - Fetch by category (place, temple, site, event)
 * - Search galleries
 * - Filter by type (photos, videos, 360photos)
 * - Get featured galleries
 * - Get gallery images
 */

import { apiClient } from './client';

/* ==================== TYPES ==================== */

export type GalleryType = 'photos' | 'videos' | '360photos';

export interface GalleryImage {
  image_id: number;
  gallery_id: number;
  image_url: string;
  thumbnail_url?: string;
  title: string;
  caption?: string;
  photographer?: string;
  image_order: number;
  is_featured?: boolean;
  view_count?: number;
  created_at?: string;
}

export interface Gallery {
  gallery_id: number;
  name: string;
  description?: string;
  gallery_type: GalleryType;
  is_featured?: boolean;
  view_count?: number;
  place_id?: number;
  temple_id?: number;
  site_id?: number;
  event_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryWithImages extends Gallery {
  gallery_images?: GalleryImage[];
}

export interface GalleryListResponse {
  gallery_id: number;
  name: string;
  description?: string;
  gallery_type: GalleryType;
  is_featured?: boolean;
  view_count?: number;
}

/* ==================== DUMMY DATA ==================== */

const DUMMY_GALLERY_IMAGES: GalleryImage[] = [
  {
    image_id: 1,
    gallery_id: 1,
    image_url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=300&h=200&fit=crop',
    title: 'Morning Light at the Temple',
    caption: 'Golden sunlight illuminates the ancient temple architecture',
    photographer: 'Nature Photography',
    image_order: 1,
    is_featured: true,
    view_count: 523,
    created_at: '2026-01-01T08:00:00',
  },
  {
    image_id: 2,
    gallery_id: 1,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop',
    title: 'Sunset View',
    caption: 'Panoramic sunset over the sacred hills',
    photographer: 'Landscape Photographer',
    image_order: 2,
    view_count: 412,
    created_at: '2026-01-02T17:00:00',
  },
  {
    image_id: 3,
    gallery_id: 1,
    image_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
    title: 'Ancient Stone Carvings',
    caption: 'Detailed carvings depicting ancient mythology',
    photographer: 'Heritage Documenter',
    image_order: 3,
    view_count: 389,
    created_at: '2026-01-03T10:30:00',
  },
  {
    image_id: 4,
    gallery_id: 2,
    image_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&h=200&fit=crop',
    title: 'Festival Celebration',
    caption: 'Vibrant colors and celebrations during the monsoon festival',
    photographer: 'Event Photographer',
    image_order: 1,
    is_featured: true,
    view_count: 654,
    created_at: '2026-01-05T14:00:00',
  },
  {
    image_id: 5,
    gallery_id: 2,
    image_url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&h=600&fit=crop',
    thumbnail_url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=300&h=200&fit=crop',
    title: 'Traditional Dance Performance',
    caption: 'Local dancers in traditional attire performing cultural dances',
    photographer: 'Cultural Documenter',
    image_order: 2,
    view_count: 521,
    created_at: '2026-01-06T18:45:00',
  },
];

const DUMMY_GALLERIES: Gallery[] = [
  {
    gallery_id: 1,
    name: 'Temple Architecture',
    description: 'Beautiful architectural elements of the sacred temple',
    gallery_type: 'photos',
    is_featured: true,
    view_count: 1324,
    place_id: 1,
  },
  {
    gallery_id: 2,
    name: 'Festival Moments',
    description: 'Vibrant moments from the annual monsoon festival',
    gallery_type: 'photos',
    is_featured: true,
    view_count: 1175,
    event_id: 1,
  },
  {
    gallery_id: 3,
    name: 'Nature & Landscape',
    description: 'Stunning natural beauty and landscape photography',
    gallery_type: 'photos',
    is_featured: false,
    view_count: 892,
  },
  {
    gallery_id: 4,
    name: 'Video Tours',
    description: '360 degree video tours of the sacred sites',
    gallery_type: 'videos',
    is_featured: false,
    view_count: 456,
  },
];

/* ==================== GALLERY API SERVICE ==================== */

const API_BASE = '/api/v1';

export const galleryApi = {
  /**
   * Get all galleries with pagination
   */
  async getAllGalleries(skip = 0, limit = 20): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries`,
        { params: { skip, limit } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch galleries:', error);
      return DUMMY_GALLERIES.slice(skip, skip + limit) as any;
    }
  },

  /**
   * Get gallery by ID with all images
   */
  async getGalleryById(galleryId: number | null): Promise<GalleryWithImages> {
    if (!galleryId) {
      throw new Error('Gallery ID is required');
    }

    try {
      const response = await apiClient.get<GalleryWithImages>(
        `${API_BASE}/galleries/${galleryId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch gallery ${galleryId}:`, error);
      // Return dummy data
      const gallery = DUMMY_GALLERIES.find((g) => g.gallery_id === galleryId);
      if (gallery) {
        const images = DUMMY_GALLERY_IMAGES.filter((img) => img.gallery_id === galleryId);
        return { ...gallery, gallery_images: images };
      }
      throw new Error('Gallery not found');
    }
  },

  /**
   * Get galleries for a place
   */
  async getGalleriesByPlace(placeId: number): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/for-place/${placeId}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch galleries for place ${placeId}:`, error);
      return DUMMY_GALLERIES.filter((g) => g.place_id === placeId) as any;
    }
  },

  /**
   * Get galleries for a temple
   */
  async getGalleriesByTemple(templeId: number): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/for-temple/${templeId}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch galleries for temple ${templeId}:`, error);
      return DUMMY_GALLERIES.filter((g) => g.temple_id === templeId) as any;
    }
  },

  /**
   * Get galleries for a mythological site
   */
  async getGalleriesBySite(siteId: number): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/for-site/${siteId}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch galleries for site ${siteId}:`, error);
      return DUMMY_GALLERIES.filter((g) => g.site_id === siteId) as any;
    }
  },

  /**
   * Get galleries for an event
   */
  async getGalleriesByEvent(eventId: number): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/for-event/${eventId}`
      );
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch galleries for event ${eventId}:`, error);
      return DUMMY_GALLERIES.filter((g) => g.event_id === eventId) as any;
    }
  },

  /**
   * Get featured galleries
   */
  async getFeaturedGalleries(): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/featured`
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch featured galleries:', error);
      return DUMMY_GALLERIES.filter((g) => g.is_featured) as any;
    }
  },

  /**
   * Get popular galleries
   */
  async getPopularGalleries(): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/popular`
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch popular galleries:', error);
      return DUMMY_GALLERIES.sort((a, b) => (b.view_count || 0) - (a.view_count || 0)) as any;
    }
  },

  /**
   * Search galleries by name
   */
  async searchGalleries(query: string): Promise<GalleryListResponse[]> {
    if (!query.trim()) {
      return this.getAllGalleries();
    }

    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/search/by-name`,
        { params: { query } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to search galleries:', error);
      // Fallback to dummy data
      const lowerQuery = query.toLowerCase();
      return DUMMY_GALLERIES.filter(
        (g) =>
          g.name.toLowerCase().includes(lowerQuery) ||
          g.description?.toLowerCase().includes(lowerQuery)
      ) as any;
    }
  },

  /**
   * Filter galleries by type
   */
  async filterByType(galleryType: GalleryType): Promise<GalleryListResponse[]> {
    try {
      const response = await apiClient.get<GalleryListResponse[]>(
        `${API_BASE}/galleries/filter/by-type`,
        { params: { gallery_type: galleryType } }
      );
      return response.data || [];
    } catch (error) {
      console.error(`Failed to filter galleries by type ${galleryType}:`, error);
      return DUMMY_GALLERIES.filter((g) => g.gallery_type === galleryType) as any;
    }
  },

  /**
   * Get gallery images
   */
  async getGalleryImages(galleryId: number): Promise<GalleryImage[]> {
    try {
      const response = await apiClient.get<GalleryImage[]>(
        `${API_BASE}/galleries/${galleryId}/images`
      );
      return response.data || [];
    } catch (error) {
      console.error(`Failed to fetch images for gallery ${galleryId}:`, error);
      return DUMMY_GALLERY_IMAGES.filter((img) => img.gallery_id === galleryId);
    }
  },
};

export { DUMMY_GALLERIES, DUMMY_GALLERY_IMAGES };
