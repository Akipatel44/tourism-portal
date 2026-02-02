/**
 * useEvent Hook
 * Fetches single event by ID with loading and error handling
 */

import { useState, useEffect } from 'react';
import EventsService from '@/api/services/events';
import { Event } from '@/api/types/api';
import { ParsedApiError } from '@/api/types/error';

interface UseEventOptions {
  id: string;
  autoFetch?: boolean;
}

interface UseEventReturn {
  event: Event | null;
  isLoading: boolean;
  error: ParsedApiError | null;
  refetch: () => Promise<void>;
}

const DUMMY_EVENT: Event = {
  id: '1',
  name: 'Summer Festival 2026',
  description:
    'Join us for a celebration of music, art, and culture. Three days of non-stop entertainment with performances from local and international artists!',
  date: '2026-06-15',
  time: '10:00',
  location: 'Central Park',
  image_url:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
  status: 'upcoming',
  attendees_count: 2500,
  created_at: '2025-01-01T00:00:00Z',
  updated_at: '2025-01-15T00:00:00Z',
};

export const useEvent = ({ id, autoFetch = true }: UseEventOptions): UseEventReturn => {
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ParsedApiError | null>(null);

  const fetchEvent = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await EventsService.getEvent(id);
      setEvent(response);
    } catch (err) {
      const parsedError = err as ParsedApiError;
      setError(parsedError);
      // Use dummy data as fallback
      setEvent({ ...DUMMY_EVENT, id });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch && id) {
      fetchEvent();
    }
  }, [id]);

  return {
    event,
    isLoading,
    error,
    refetch: fetchEvent,
  };
};
