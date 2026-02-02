/**
 * useEvents Hook
 * Fetches list of events with loading and error handling
 */

import { useState, useEffect } from 'react';
import EventsService from '@/api/services/events';
import { Event } from '@/api/types/api';
import { ParsedApiError } from '@/api/types/error';

interface UseEventsOptions {
  page?: number;
  page_size?: number;
  status?: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  autoFetch?: boolean;
}

interface UseEventsReturn {
  events: Event[];
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

const DUMMY_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Summer Festival 2026',
    description: 'Join us for a celebration of music, art, and culture. Three days of non-stop entertainment!',
    date: '2026-06-15',
    time: '10:00',
    location: 'Central Park',
    image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    status: 'upcoming',
    attendees_count: 2500,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Tech Conference 2026',
    description: 'Annual technology conference featuring keynotes from industry leaders and networking opportunities.',
    date: '2026-03-20',
    time: '09:00',
    location: 'Convention Center',
    image_url: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    status: 'upcoming',
    attendees_count: 1200,
    created_at: '2025-01-05T00:00:00Z',
    updated_at: '2025-01-12T00:00:00Z',
  },
  {
    id: '3',
    name: 'Art Exhibition Opening',
    description: 'Unveiling of contemporary art pieces from emerging artists. Reception with refreshments.',
    date: '2026-02-14',
    time: '18:00',
    location: 'Art Museum',
    image_url: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop',
    status: 'upcoming',
    attendees_count: 350,
    created_at: '2025-01-08T00:00:00Z',
    updated_at: '2025-01-14T00:00:00Z',
  },
  {
    id: '4',
    name: 'Winter Holiday Celebration',
    description: 'Traditional holiday celebration with decorations, performances, and family activities.',
    date: '2025-12-20',
    time: '16:00',
    location: 'Town Square',
    image_url: 'https://images.unsplash.com/photo-1609126281096-de4cfe4e5b47?w=400&h=300&fit=crop',
    status: 'past',
    attendees_count: 5000,
    created_at: '2024-10-01T00:00:00Z',
    updated_at: '2024-12-20T00:00:00Z',
  },
];

export const useEvents = (options: UseEventsOptions = {}): UseEventsReturn => {
  const {
    page = 1,
    page_size = 12,
    status,
    autoFetch = true,
  } = options;

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParsedApiError | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    page_size,
    total: 0,
    total_pages: 0,
  });
  const [currentPage, setCurrentPage] = useState(page);

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await EventsService.getEvents({
        page: currentPage,
        page_size,
        status,
      });

      setEvents(response.items);
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
      const filteredDummy = status
        ? DUMMY_EVENTS.filter(e => e.status === status)
        : DUMMY_EVENTS;
      setEvents(filteredDummy);
      setPagination({
        page: 1,
        page_size,
        total: filteredDummy.length,
        total_pages: 1,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchEvents();
    }
  }, [currentPage, status]);

  return {
    events,
    isLoading,
    error,
    pagination,
    refetch: fetchEvents,
    setPage: setCurrentPage,
  };
};
