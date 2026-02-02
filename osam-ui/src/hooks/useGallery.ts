/**
 * useGallery Hook
 * Fetches paginated gallery items with category filtering and error handling
 */

import { useState, useEffect } from 'react';
import GalleryService from '@/api/services/gallery';
import { GalleryItem } from '@/api/types/api';
import { ParsedApiError } from '@/api/types/error';

interface UseGalleryOptions {
  page?: number;
  page_size?: number;
  category?: string;
  autoFetch?: boolean;
}

interface UseGalleryReturn {
  items: GalleryItem[];
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

// Dummy fallback data for when API fails
const DUMMY_GALLERY: GalleryItem[] = [
  {
    id: 'gallery-1',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=400&fit=crop',
    title: 'Mountain Landscape',
    category: 'Nature',
    description: 'Stunning mountain vista at sunset',
    uploaded_by: 'photographer1',
    upload_date: '2025-12-01T10:00:00Z',
    view_count: 1250,
    is_featured: true,
  },
  {
    id: 'gallery-2',
    image_url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
    title: 'Urban Architecture',
    category: 'Architecture',
    description: 'Modern city skyline photography',
    uploaded_by: 'photographer2',
    upload_date: '2025-11-28T14:30:00Z',
    view_count: 890,
    is_featured: true,
  },
  {
    id: 'gallery-3',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    title: 'Ocean Waves',
    category: 'Nature',
    description: 'Dramatic seascape with waves',
    uploaded_by: 'photographer3',
    upload_date: '2025-11-25T09:15:00Z',
    view_count: 2100,
    is_featured: false,
  },
  {
    id: 'gallery-4',
    image_url: 'https://images.unsplash.com/photo-1578321272176-b39e7b889b99?w=500&h=400&fit=crop',
    title: 'Forest Path',
    category: 'Nature',
    description: 'Serene woodland trail',
    uploaded_by: 'photographer1',
    upload_date: '2025-11-20T16:45:00Z',
    view_count: 1680,
    is_featured: false,
  },
  {
    id: 'gallery-5',
    image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop',
    title: 'City Lights',
    category: 'Architecture',
    description: 'Night photography of city lights',
    uploaded_by: 'photographer4',
    upload_date: '2025-11-18T20:00:00Z',
    view_count: 945,
    is_featured: true,
  },
  {
    id: 'gallery-6',
    image_url: 'https://images.unsplash.com/photo-1495884468989-3c3d7b1fed46?w=500&h=400&fit=crop',
    title: 'Beach Sunset',
    category: 'Nature',
    description: 'Golden hour at the beach',
    uploaded_by: 'photographer5',
    upload_date: '2025-11-15T18:30:00Z',
    view_count: 3200,
    is_featured: true,
  },
];

const useGallery = ({
  page = 1,
  page_size = 12,
  category,
  autoFetch = true,
}: UseGalleryOptions = {}): UseGalleryReturn => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParsedApiError | null>(null);
  const [pagination, setPagination] = useState({
    page,
    page_size,
    total: 0,
    total_pages: 0,
  });

  const fetchGallery = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use category-specific endpoint if category is provided
      const response = category
        ? await GalleryService.getGalleryByCategory(category, {
            page,
            page_size,
          })
        : await GalleryService.getGallery({
            page,
            page_size,
            category,
          });

      setItems(response.items || []);
      setPagination({
        page: response.page,
        page_size: response.page_size,
        total: response.total,
        total_pages: response.total_pages,
      });
    } catch (err) {
      const parsedError = err as ParsedApiError;
      setError(parsedError);
      // Use dummy fallback data
      setItems(DUMMY_GALLERY.slice(0, page_size));
      setPagination({
        page,
        page_size,
        total: DUMMY_GALLERY.length,
        total_pages: Math.ceil(DUMMY_GALLERY.length / page_size),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = async () => {
    await fetchGallery();
  };

  const setPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchGallery();
    }
  }, [page, page_size, category]);

  return {
    items,
    isLoading,
    error,
    pagination,
    refetch,
    setPage,
  };
};

export default useGallery;
