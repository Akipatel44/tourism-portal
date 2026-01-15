/**
 * Events Hooks
 * 
 * Custom React hooks for event-related data fetching with pagination and lazy loading
 * - useUpcomingEvents() - Fetch upcoming events with pagination
 * - usePastEvents() - Fetch completed events with pagination
 * - useEventById() - Fetch single event by ID
 * - useSearchEvents() - Search events with debouncing
 * - useFilterEventsByType() - Filter events by type
 * - useRefetchEvents() - Manual refetch trigger
 */

import { useState, useEffect, useCallback, useRef, type Dispatch, type SetStateAction } from 'react';
import {
  eventsApi,
  Event,
  EventListResponse,
  DUMMY_EVENTS,
} from '@/api/events';

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

/* ==================== HOOKS ==================== */

/**
 * Hook to fetch upcoming events with pagination
 */
export const useUpcomingEvents = (
  pageSize = 10
): UsePaginationState<EventListResponse> => {
  const [data, setData] = useState<EventListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allEventsLoaded, setAllEventsLoaded] = useState(false);

  const fetchUpcomingEvents = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const skip = pageNum * pageSize;
      const allEvents = await eventsApi.getUpcomingEvents();
      const paginatedEvents = allEvents.slice(skip, skip + pageSize);

      if (pageNum === 0) {
        setData(paginatedEvents);
      } else {
        setData((prev) => [...prev, ...paginatedEvents]);
      }

      setHasMore(skip + pageSize < allEvents.length);
      setAllEventsLoaded(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch upcoming events');
      // Fallback to dummy data
      const upcomingDummy = DUMMY_EVENTS.filter((e: Event) => e.status === 'upcoming');
      const skip = pageNum * pageSize;
      const paginatedEvents = upcomingDummy.slice(skip, skip + pageSize);
      if (pageNum === 0) {
        setData(paginatedEvents as any);
      } else {
        setData((prev) => [...prev, ...(paginatedEvents as any)]);
      }
      setHasMore(skip + pageSize < upcomingDummy.length);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchUpcomingEvents(0);
  }, [pageSize, fetchUpcomingEvents]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchUpcomingEvents(nextPage);
    }
  }, [page, isLoading, hasMore, fetchUpcomingEvents]);

  const resetPagination = useCallback(() => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchUpcomingEvents(0);
  }, [fetchUpcomingEvents]);

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
 * Hook to fetch past/completed events with pagination
 */
export const usePastEvents = (
  pageSize = 10
): UsePaginationState<EventListResponse> => {
  const [data, setData] = useState<EventListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchPastEvents = useCallback(async (pageNum: number) => {
    try {
      setIsLoading(true);
      setError(null);
      const skip = pageNum * pageSize;
      const allEvents = await eventsApi.getPastEvents();
      const paginatedEvents = allEvents.slice(skip, skip + pageSize);

      if (pageNum === 0) {
        setData(paginatedEvents);
      } else {
        setData((prev) => [...prev, ...paginatedEvents]);
      }

      setHasMore(skip + pageSize < allEvents.length);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch past events');
      // Fallback to dummy data
      const completedDummy = DUMMY_EVENTS.filter((e: Event) => e.status === 'completed');
      const skip = pageNum * pageSize;
      const paginatedEvents = completedDummy.slice(skip, skip + pageSize);
      if (pageNum === 0) {
        setData(paginatedEvents as any);
      } else {
        setData((prev) => [...prev, ...(paginatedEvents as any)]);
      }
      setHasMore(skip + pageSize < completedDummy.length);
    } finally {
      setIsLoading(false);
    }
  }, [pageSize]);

  useEffect(() => {
    fetchPastEvents(0);
  }, [pageSize, fetchPastEvents]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPastEvents(nextPage);
    }
  }, [page, isLoading, hasMore, fetchPastEvents]);

  const resetPagination = useCallback(() => {
    setPage(0);
    setData([]);
    setHasMore(true);
    fetchPastEvents(0);
  }, [fetchPastEvents]);

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
 * Hook to fetch single event by ID
 */
export const useEventById = (eventId: number | null): UseDataState<Event> => {
  const [data, setData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      setData(null);
      setIsLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const event = await eventsApi.getEventById(eventId);
        setData(event);
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : 'Failed to fetch event';
        setError(errorMsg);
        // Try dummy data
        const dummyEvent = DUMMY_EVENTS.find((e: Event) => e.event_id === eventId);
        if (dummyEvent) {
          setData(dummyEvent);
          setError(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  return { data, isLoading, error };
};

/**
 * Hook to search events with debouncing
 */
export const useSearchEvents = (
  query: string,
  debounceMs = 300
): UseDataState<EventListResponse[]> => {
  const [data, setData] = useState<EventListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Clear previous timeout
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // If query is empty, show all events
    if (!query.trim()) {
      setData([]);
      setIsLoading(false);
      return;
    }

    // Set new timeout for debounced search
    debounceTimer.current = setTimeout(async () => {
      try {
        setIsLoading(true);
        setError(null);
        const results = await eventsApi.searchEvents(query);
        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
        // Fallback to dummy data
        const lowerQuery = query.toLowerCase();
        const filtered = DUMMY_EVENTS.filter((e: Event) =>
          e.name.toLowerCase().includes(lowerQuery) ||
          e.location.toLowerCase().includes(lowerQuery) ||
          e.description?.toLowerCase().includes(lowerQuery)
        );
        setData(filtered as any);
      } finally {
        setIsLoading(false);
      }
    }, debounceMs);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [query, debounceMs]);

  return { data, isLoading, error };
};

/**
 * Hook to filter events by type
 */
export const useFilterEventsByType = (
  eventType: 'festival' | 'fair' | 'ceremony' | 'cultural' | null
): UseDataState<EventListResponse[]> => {
  const [data, setData] = useState<EventListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventType) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const fetchFiltered = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const results = await eventsApi.filterByEventType(eventType);
        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Filter failed');
        // Fallback to dummy data
        const filtered = DUMMY_EVENTS.filter((e: Event) => e.event_type === eventType);
        setData(filtered as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiltered();
  }, [eventType]);

  return { data, isLoading, error };
};

/**
 * Hook to filter events by status
 */
export const useFilterEventsByStatus = (
  status: 'upcoming' | 'ongoing' | 'completed' | null
): UseDataState<EventListResponse[]> => {
  const [data, setData] = useState<EventListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!status) {
      setData([]);
      setIsLoading(false);
      return;
    }

    const fetchFiltered = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const results = await eventsApi.filterByStatus(status);
        setData(results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Filter failed');
        // Fallback to dummy data
        const filtered = DUMMY_EVENTS.filter((e: Event) => e.status === status);
        setData(filtered as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFiltered();
  }, [status]);

  return { data, isLoading, error };
};

/**
 * Hook to get featured events
 */
export const useFeaturedEvents = (): UseDataState<EventListResponse[]> => {
  const [data, setData] = useState<EventListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const events = await eventsApi.getFeaturedEvents();
        setData(events);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch featured events');
        // Fallback to dummy data
        const featured = DUMMY_EVENTS.filter((e: Event) => e.is_featured);
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
 * Hook to get ongoing events
 */
export const useOngoingEvents = (): UseDataState<EventListResponse[]> => {
  const [data, setData] = useState<EventListResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOngoing = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const events = await eventsApi.getOngoingEvents();
        setData(events);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch ongoing events');
        // Fallback to dummy data
        const ongoing = DUMMY_EVENTS.filter((e: Event) => e.status === 'ongoing');
        setData(ongoing as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOngoing();
  }, []);

  return { data, isLoading, error };
};
