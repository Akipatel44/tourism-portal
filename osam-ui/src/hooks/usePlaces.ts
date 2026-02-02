/**
 * usePlaces Hook
 * Fetches list of places with loading and error handling
 */

import { useState, useEffect } from 'react';
import PlacesService from '@/api/services/places';
import { Place } from '@/api/types/api';
import { ParsedApiError } from '@/api/types/error';

interface UsePlacesOptions {
  page?: number;
  page_size?: number;
  category?: string;
  autoFetch?: boolean;
}

interface UsePlacesReturn {
  places: Place[];
  isLoading: boolean;
  error: ParsedApiError | null;
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
  refetch: () => Promise<void>;
  setPage: (page: number) => void;
}

const DUMMY_PLACES: Place[] = [
  {
    id: '1',
    name: 'City Museum',
    category: 'Museum',
    location: 'Downtown',
    description: 'Explore fascinating exhibits and artifacts',
    image_url: 'https://images.unsplash.com/photo-1564399579883-451a5b44a0f7?w=400&h=300&fit=crop',
    visit_count: 1250,
    rating: 4.8,
    is_featured: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Central Park',
    category: 'Park',
    location: 'City Center',
    description: 'Beautiful green space perfect for relaxation',
    image_url: 'https://images.unsplash.com/photo-1511885642381-4ddeea6fb103?w=400&h=300&fit=crop',
    visit_count: 5420,
    rating: 4.9,
    is_featured: true,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-15T00:00:00Z',
  },
  {
    id: '3',
    name: 'Historic Fort',
    category: 'Historical Site',
    location: 'North District',
    description: 'Step back in time at this historic landmark',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    visit_count: 876,
    rating: 4.7,
    is_featured: false,
    created_at: '2025-01-05T00:00:00Z',
    updated_at: '2025-01-12T00:00:00Z',
  },
  {
    id: '4',
    name: 'Art Gallery',
    category: 'Gallery',
    location: 'Arts District',
    description: 'Contemporary art exhibition and installations',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    visit_count: 654,
    rating: 4.6,
    is_featured: false,
    created_at: '2025-01-08T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
  },
];

export const usePlaces = (options: UsePlacesOptions = {}): UsePlacesReturn => {
  const {
    page = 1,
    page_size = 12,
    category,
    autoFetch = true,
  } = options;

  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParsedApiError | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size,
    total: 0,
    total_pages: 0,
  });
  const [currentPage, setCurrentPage] = useState(page);

  const fetchPlaces = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await PlacesService.getPlaces({
        page: currentPage,
        page_size,
        category,
      });

      setPlaces(response.items);
      setPagination({
        page: response.page,
        page_size: response.page_size,
        total: response.total,
        total_pages: response.total_pages,
      });
    } catch (err) {
      const parsedError = err as ParsedApiError;
      setError(parsedError);
      // Use dummy data as fallback
      setPlaces(DUMMY_PLACES);
      setPagination({
        page: 1,
        page_size,
        total: DUMMY_PLACES.length,
        total_pages: 1,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchPlaces();
    }
  }, [currentPage, category]);

  return {
    places,
    isLoading,
    error,
    pagination,
    refetch: fetchPlaces,
    setPage: setCurrentPage,
  };
};
