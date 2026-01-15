/**
 * Places Hooks
 * 
 * Custom React hooks for place-related data fetching
 * - usePlaces() - Fetch all places
 * - usePlaceById() - Fetch single place
 * - useSearchPlaces() - Search places
 * - useFilterPlaces() - Filter by category
 * - useFeaturedPlaces() - Get featured places
 */

import { useState, useEffect, useCallback } from 'react';
import { placesApi, Place, DUMMY_PLACES } from '@/api/places';

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
}

/* ==================== HOOKS ==================== */

/**
 * Fetch all places with pagination
 */
export const usePlaces = (skip: number = 0, limit: number = 100) => {
  const [state, setState] = useState<UsePaginationState<Place>>({
    data: DUMMY_PLACES,
    isLoading: false,
    error: null,
    page: 0,
    hasMore: true,
  });

  useEffect(() => {
    const fetchPlaces = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await placesApi.getAllPlaces(skip, limit);
        setState((prev) => ({
          ...prev,
          data,
          isLoading: false,
          hasMore: data.length >= limit,
        }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load places';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          // Keep dummy data as fallback
          data: prev.data,
        }));
      }
    };

    fetchPlaces();
  }, [skip, limit]);

  return state;
};

/**
 * Fetch single place by ID
 */
export const usePlaceById = (placeId: number | null) => {
  const [state, setState] = useState<UseDataState<Place>>({
    data: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!placeId) return;

    const fetchPlace = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await placesApi.getPlaceById(placeId);
        setState((prev) => ({ ...prev, data, isLoading: false }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load place';

        // Try to get from dummy data
        const dummyPlace = DUMMY_PLACES.find((p) => p.id === placeId);
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          data: dummyPlace || null,
        }));
      }
    };

    fetchPlace();
  }, [placeId]);

  return state;
};

/**
 * Search places by name
 */
export const useSearchPlaces = (query: string) => {
  const [state, setState] = useState<UseDataState<Place[]>>({
    data: [],
    isLoading: false,
    error: null,
  });

  const search = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setState({ data: [], isLoading: false, error: null });
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await placesApi.searchPlaces(searchQuery);
        setState((prev) => ({ ...prev, data, isLoading: false }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Search failed';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          data: prev.data,
        }));
      }
    },
    []
  );

  useEffect(() => {
    search(query);
  }, [query, search]);

  return state;
};

/**
 * Filter places by category
 */
export const useFilterPlaces = (category: string | null) => {
  const [state, setState] = useState<UseDataState<Place[]>>({
    data: DUMMY_PLACES,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!category) {
      setState((prev) => ({ ...prev, data: DUMMY_PLACES }));
      return;
    }

    const filterPlaces = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await placesApi.filterByCategory(category);
        setState((prev) => ({ ...prev, data, isLoading: false }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Filter failed';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          data: prev.data,
        }));
      }
    };

    filterPlaces();
  }, [category]);

  return state;
};

/**
 * Get featured places
 */
export const useFeaturedPlaces = () => {
  const [state, setState] = useState<UseDataState<Place[]>>({
    data: DUMMY_PLACES.slice(0, 3),
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchFeatured = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await placesApi.getFeaturedPlaces();
        setState((prev) => ({ ...prev, data, isLoading: false }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load featured places';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          data: prev.data,
        }));
      }
    };

    fetchFeatured();
  }, []);

  return state;
};

/**
 * Get popular places (by view count)
 */
export const usePopularPlaces = () => {
  const [state, setState] = useState<UseDataState<Place[]>>({
    data: DUMMY_PLACES.slice(0, 3),
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const fetchPopular = async () => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const data = await placesApi.getPopularPlaces();
        setState((prev) => ({ ...prev, data, isLoading: false }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to load popular places';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          data: prev.data,
        }));
      }
    };

    fetchPopular();
  }, []);

  return state;
};

/**
 * Manual refetch function wrapper
 * Useful for refreshing data after mutations
 */
export const useRefetchPlaces = () => {
  const refetch = useCallback(() => {
    // This would trigger a refetch in real implementation
    // For now, returning a promise for type safety
    return placesApi.getAllPlaces(0, 100);
  }, []);

  return refetch;
};
