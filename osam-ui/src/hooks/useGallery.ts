/**
 * Gallery Hooks
 * 
 * Custom React hooks for gallery data fetching with lazy loading optimization
 * - useGalleries() - Fetch all galleries with pagination
 * - useGalleryById() - Fetch single gallery with images
 * - useLazyLoadImages() - Lazy load images using Intersection Observer
 * - useGalleriesByCategory() - Fetch galleries by place, temple, site, or event
 * - useFeaturedGalleries() - Get featured galleries
 */

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import {
  galleryApi,
  Gallery,
  GalleryWithImages,
  GalleryListResponse,
  GalleryImage,
  DUMMY_GALLERIES,
  DUMMY_GALLERY_IMAGES,
} from '@/api/gallery';

/* ==================== TYPES ==================== */

interface UseDataState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

interface UsePaginationState<T> extends UseDataState<T[]> {
  data: T[];
  page: number;
  hasMore: boolean;
  loadMore: () => void;
  resetPagination: () => void;
}

type CategoryType = 'place' | 'temple' | 'site' | 'event';

/* ==================== HOOKS ==================== */

/**
 * Hook to fetch galleries with pagination
 */
export const useGalleries = (pageSize = 8): UsePaginationState<GalleryListResponse> => {
  const [data, setData] = useState<GalleryListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchGalleries = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const skip = pageNum * pageSize;
      const galleries = await galleryApi.getAllGalleries(skip, pageSize);

      if (pageNum === 0) {
        setData(galleries);
      } else {
        setData((prev) => [...prev, ...galleries]);
      }

      setHasMore(galleries.length === pageSize);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch galleries';
      setError(errorMsg);
      // Fallback to dummy data
      const skip = pageNum * pageSize;
      const dummyData = DUMMY_GALLERIES.slice(skip, skip + pageSize) as any;
      if (pageNum === 0) {
        setData(dummyData);
      } else {
        setData((prev) => [...prev, ...dummyData]);
      }
      setHasMore(dummyData.length === pageSize);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchGalleries(0);
  }, [pageSize, fetchGalleries]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchGalleries(nextPage);
    }
  }, [page, isLoading, hasMore, fetchGalleries]);

  const resetPagination = useCallback(() => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchGalleries(0);
  }, [fetchGalleries]);

  return {
    data,
    isLoading,
    error,
    page,
    hasMore,
    loadMore,
    resetPagination,
  };
};

/**
 * Hook to fetch single gallery with all images
 */
export const useGalleryById = (galleryId: number | null): UseDataState<GalleryWithImages> => {
  const [data, setData] = useState<GalleryWithImages | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!galleryId) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const gallery = await galleryApi.getGalleryById(galleryId);
        setData(gallery);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch gallery';
        setError(errorMsg);
        // Try dummy data
        const dummyGallery = DUMMY_GALLERIES.find((g: Gallery) => g.gallery_id === galleryId);
        if (dummyGallery) {
          const images = DUMMY_GALLERY_IMAGES.filter((img: GalleryImage) => img.gallery_id === galleryId);
          setData({ ...dummyGallery, gallery_images: images });
          setError(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, [galleryId]);

  return { data, isLoading, error };
};

/**
 * Hook for lazy loading images using Intersection Observer
 * Returns object with refs to attach to img elements and loaded state
 */
export const useLazyLoadImages = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const imageElements = document.querySelectorAll('[data-lazy="true"]');

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute('data-src');

            if (src && !loadedImages.has(src)) {
              img.src = src;
              img.removeAttribute('data-lazy');
              setLoadedImages((prev) => new Set(prev).add(src));
              observerRef.current?.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    imageElements.forEach((img) => {
      observerRef.current?.observe(img);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [loadedImages]);

  const getImageProps = useCallback(
    (src: string, thumbnail: string, alt: string) => ({
      src: thumbnail,
      'data-src': src,
      'data-lazy': 'true',
      alt,
      loading: 'lazy' as const,
    }),
    []
  );

  return { loadedImages, getImageProps };
};

/**
 * Hook to fetch galleries by category (place, temple, site, event)
 */
export const useGalleriesByCategory = (
  categoryType: CategoryType | null,
  categoryId: number | null
): UseDataState<GalleryListResponse[]> => {
  const [data, setData] = useState<GalleryListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!categoryType || !categoryId) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const fetchByCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let galleries: GalleryListResponse[] = [];

        switch (categoryType) {
          case 'place':
            galleries = await galleryApi.getGalleriesByPlace(categoryId);
            break;
          case 'temple':
            galleries = await galleryApi.getGalleriesByTemple(categoryId);
            break;
          case 'site':
            galleries = await galleryApi.getGalleriesBySite(categoryId);
            break;
          case 'event':
            galleries = await galleryApi.getGalleriesByEvent(categoryId);
            break;
        }

        setData(galleries);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch galleries';
        setError(errorMsg);
        // Fallback to dummy data
        const filtered = DUMMY_GALLERIES.filter((g: Gallery) => {
          switch (categoryType) {
            case 'place':
              return g.place_id === categoryId;
            case 'temple':
              return g.temple_id === categoryId;
            case 'site':
              return g.site_id === categoryId;
            case 'event':
              return g.event_id === categoryId;
            default:
              return false;
          }
        });
        setData(filtered as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchByCategory();
  }, [categoryType, categoryId]);

  return { data, isLoading, error };
};

/**
 * Hook to fetch featured galleries
 */
export const useFeaturedGalleries = (): UseDataState<GalleryListResponse[]> => {
  const [data, setData] = useState<GalleryListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const galleries = await galleryApi.getFeaturedGalleries();
        setData(galleries);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch featured galleries';
        setError(errorMsg);
        // Fallback to dummy data
        const featured = DUMMY_GALLERIES.filter((g: Gallery) => g.is_featured);
        setData(featured as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { data, isLoading, error };
};

/**
 * Hook to fetch popular galleries sorted by view count
 */
export const usePopularGalleries = (): UseDataState<GalleryListResponse[]> => {
  const [data, setData] = useState<GalleryListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const galleries = await galleryApi.getPopularGalleries();
        setData(galleries);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch popular galleries';
        setError(errorMsg);
        // Fallback to dummy data
        const popular = [...DUMMY_GALLERIES].sort((a, b) => (b.view_count || 0) - (a.view_count || 0));
        setData(popular as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopular();
  }, []);

  return { data, isLoading, error };
};
