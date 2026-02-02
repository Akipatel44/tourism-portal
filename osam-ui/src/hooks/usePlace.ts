/**
 * usePlace Hook
 * Fetches single place by ID with loading and error handling
 */

import { useState, useEffect } from 'react';
import PlacesService from '@/api/services/places';
import { Place } from '@/api/types/api';
import { ParsedApiError } from '@/api/types/error';

interface UsePlaceOptions {
  id: string;
  autoFetch?: boolean;
}

interface UsePlaceReturn {
  place: Place | null;
  isLoading: boolean;
  error: ParsedApiError | null;
  refetch: () => Promise<void>;
}

const DUMMY_PLACE: Place = {
  id: '1',
  name: 'City Museum',
  category: 'Museum',
  location: 'Downtown',
  description:
    'Explore fascinating exhibits and artifacts from around the world. Our museum features permanent collections and rotating exhibitions.',
  image_url:
    'https://images.unsplash.com/photo-1564399579883-451a5b44a0f7?w=800&h=600&fit=crop',
  visit_count: 1250,
  rating: 4.8,
  is_featured: true,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-15T00:00:00Z',
};

export const usePlace = ({ id, autoFetch = true }: UsePlaceOptions): UsePlaceReturn => {
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParsedApiError | null>(null);

  const fetchPlace = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await PlacesService.getPlace(id);
      setPlace(response);
    } catch (err) {
      const parsedError = err as ParsedApiError;
      setError(parsedError);
      // Use dummy data as fallback
      setPlace({ ...DUMMY_PLACE, id });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && id) {
      fetchPlace();
    }
  }, [id]);

  return {
    place,
    isLoading,
    error,
    refetch: fetchPlace,
  };
};
