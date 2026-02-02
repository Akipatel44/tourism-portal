/**
 * useGalleryItem Hook
 * Fetches single gallery item by ID with lazy loading support
 */

import { useState, useEffect } from 'react';
import GalleryService from '@/api/services/gallery';
import { GalleryItem } from '@/api/types/api';
import { ParsedApiError } from '@/api/types/error';

interface UseGalleryItemOptions {
  id?: string;
  autoFetch?: boolean;
}

interface UseGalleryItemReturn {
  item: GalleryItem | null;
  isLoading: boolean;
  error: ParsedApiError | null;
  refetch: () => Promise<void>;
}

// Dummy fallback data
const DUMMY_ITEM: GalleryItem = {
  id: 'gallery-1',
  image_url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=800&h=600&fit=crop',
  title: 'Mountain Landscape',
  category: 'Nature',
  description: 'Stunning mountain vista at sunset with golden light reflecting across the peaks',
  uploaded_by: 'photographer1',
  upload_date: '2025-12-01T10:00:00Z',
  view_count: 1250,
  is_featured: true,
};

const useGalleryItem = ({
  id,
  autoFetch = true,
}: UseGalleryItemOptions = {}): UseGalleryItemReturn => {
  const [item, setItem] = useState<GalleryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParsedApiError | null>(null);

  const fetchItem = async () => {
    if (!id) {
      setItem(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await GalleryService.getGalleryItem(id);
      setItem(response);
    } catch (err) {
      const parsedError = err as ParsedApiError;
      setError(parsedError);
      // Use dummy fallback data
      setItem(DUMMY_ITEM);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchItem();
  };

  useEffect(() => {
    if (autoFetch && id) {
      fetchItem();
    }
  }, [id]);

  return {
    item,
    isLoading,
    error,
    refetch,
  };
};

export default useGalleryItem;
