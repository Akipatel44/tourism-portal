/**
 * Events API Service
 * 
 * Handles all event-related API calls
 * - List all events with pagination
 * - Get upcoming events
 * - Get past/completed events
 * - Get event by ID
 * - Search and filter events
 */

import { apiClient, handleApiError } from './client';

/* ==================== TYPES ==================== */

export interface Event {
  event_id: number;
  name: string;
  description?: string;
  event_type: 'festival' | 'fair' | 'ceremony' | 'cultural';
  location: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  start_time?: string; // HH:MM:SS
  end_time?: string; // HH:MM:SS
  status: 'upcoming' | 'ongoing' | 'completed';
  is_annual: boolean;
  is_free: boolean;
  entry_fee?: number;
  organizing_body?: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  has_parking?: boolean;
  has_accommodation?: boolean;
  is_featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface EventListResponse {
  event_id: number;
  name: string;
  event_type: 'festival' | 'fair' | 'ceremony' | 'cultural';
  location: string;
  start_date: string;
  end_date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  is_annual: boolean;
  is_free: boolean;
  entry_fee?: number;
  is_featured?: boolean;
}

export interface EventsListResponse {
  items: EventListResponse[];
  total: number;
  skip: number;
  limit: number;
  has_more: boolean;
}

/* ==================== DUMMY DATA ==================== */

const DUMMY_EVENTS: Event[] = [
  {
    event_id: 1,
    name: 'Janmashtami Festival',
    description: 'Grand celebration of Lord Krishna\'s birth with cultural performances, devotional songs, and traditional festivities.',
    event_type: 'festival',
    location: 'Osam Temple Complex',
    start_date: '2026-02-15',
    end_date: '2026-02-16',
    start_time: '06:00:00',
    end_time: '22:00:00',
    status: 'upcoming',
    is_annual: true,
    is_free: true,
    entry_fee: 0,
    organizing_body: 'Osam Temple Trust',
    contact_person: 'Sharma Ji',
    phone: '+91-9876543210',
    email: 'events@osamtemple.org',
    has_parking: true,
    has_accommodation: true,
    is_featured: true,
    created_at: '2026-01-01T10:00:00',
    updated_at: '2026-01-15T10:00:00',
  },
  {
    event_id: 2,
    name: 'Summer Meditation Retreat',
    description: 'Week-long spiritual retreat focusing on meditation, yoga, and self-discovery in the serene surroundings of the sacred sites.',
    event_type: 'ceremony',
    location: 'Sacred Lake Ashram',
    start_date: '2026-05-01',
    end_date: '2026-05-07',
    start_time: '05:30:00',
    end_time: '21:00:00',
    status: 'upcoming',
    is_annual: true,
    is_free: false,
    entry_fee: 5000,
    organizing_body: 'Spiritual Foundation',
    contact_person: 'Anand Kumar',
    phone: '+91-8765432109',
    email: 'retreat@spiritualarts.com',
    has_parking: true,
    has_accommodation: true,
    is_featured: true,
    created_at: '2025-12-01T08:00:00',
    updated_at: '2026-01-10T14:30:00',
  },
  {
    event_id: 3,
    name: 'Monsoon Dance Festival',
    description: 'Celebration of seasonal change with classical dance performances, music concerts, and cultural exhibitions from renowned artists.',
    event_type: 'cultural',
    location: 'Osam Amphitheater',
    start_date: '2026-07-10',
    end_date: '2026-07-12',
    start_time: '18:00:00',
    end_time: '22:00:00',
    status: 'upcoming',
    is_annual: true,
    is_free: true,
    entry_fee: 0,
    organizing_body: 'Cultural Ministry',
    contact_person: 'Priya Sharma',
    phone: '+91-7654321098',
    email: 'cultural@events.gov',
    has_parking: true,
    has_accommodation: false,
    is_featured: true,
    created_at: '2025-11-15T09:00:00',
    updated_at: '2026-01-12T11:20:00',
  },
  {
    event_id: 4,
    name: 'Winter Festival Fair',
    description: 'Annual fair featuring traditional crafts, local cuisine, folk performances, and shopping from various regional artisans.',
    event_type: 'fair',
    location: 'Market Square, Osam Town',
    start_date: '2025-12-20',
    end_date: '2025-12-31',
    start_time: '09:00:00',
    end_time: '21:00:00',
    status: 'completed',
    is_annual: true,
    is_free: true,
    entry_fee: 0,
    organizing_body: 'Town Administration',
    contact_person: 'Rajesh Patel',
    phone: '+91-6543210987',
    email: 'fair@osamtown.org',
    has_parking: true,
    has_accommodation: false,
    is_featured: true,
    created_at: '2025-10-01T07:00:00',
    updated_at: '2025-12-01T15:45:00',
  },
];

/* ==================== EVENTS API SERVICE ==================== */

const API_BASE = '/api/v1';

export const eventsApi = {
  /**
   * Get all events with pagination
   */
  async getAllEvents(skip = 0, limit = 20): Promise<EventListResponse[]> {
    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events`,
        { params: { skip, limit } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch all events:', error);
      // Return dummy data as fallback
      return DUMMY_EVENTS.slice(skip, skip + limit) as any;
    }
  },

  /**
   * Get upcoming events
   */
  async getUpcomingEvents(): Promise<EventListResponse[]> {
    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events/status/upcoming`
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch upcoming events:', error);
      // Return dummy upcoming events
      return DUMMY_EVENTS.filter((e) => e.status === 'upcoming') as any;
    }
  },

  /**
   * Get past/completed events
   */
  async getPastEvents(): Promise<EventListResponse[]> {
    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events/status/completed`
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch past events:', error);
      // Return dummy completed events
      return DUMMY_EVENTS.filter((e) => e.status === 'completed') as any;
    }
  },

  /**
   * Get ongoing events
   */
  async getOngoingEvents(): Promise<EventListResponse[]> {
    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events/status/ongoing`
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to fetch ongoing events:', error);
      // Return dummy ongoing events
      return DUMMY_EVENTS.filter((e) => e.status === 'ongoing') as any;
    }
  },

  /**
   * Get event by ID
   */
  async getEventById(eventId: number | null): Promise<Event> {
    if (!eventId) {
      throw new Error('Event ID is required');
    }

    try {
      const response = await apiClient.get<Event>(
        `${API_BASE}/events/${eventId}`
      );
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch event ${eventId}:`, error);
      // Return dummy event as fallback
      const dummyEvent = DUMMY_EVENTS.find((e) => e.event_id === eventId);
      if (dummyEvent) {
        return dummyEvent;
      }
      throw new Error('Event not found');
    }
  },

  /**
   * Get featured events
   */
  async getFeaturedEvents(): Promise<EventListResponse[]> {
    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events`,
        { params: { skip: 0, limit: 100 } }
      );
      const events = response.data || [];
      return events.filter((e: EventListResponse) => e.is_featured);
    } catch (error) {
      console.error('Failed to fetch featured events:', error);
      // Return dummy featured events
      return DUMMY_EVENTS.filter((e) => e.is_featured) as any;
    }
  },

  /**
   * Search events by name or location
   */
  async searchEvents(query: string): Promise<EventListResponse[]> {
    if (!query.trim()) {
      return this.getAllEvents();
    }

    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events/search/by-name`,
        { params: { query } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to search events:', error);
      // Return filtered dummy data
      const lowerQuery = query.toLowerCase();
      return DUMMY_EVENTS.filter((e) =>
        e.name.toLowerCase().includes(lowerQuery) ||
        e.location.toLowerCase().includes(lowerQuery) ||
        e.description?.toLowerCase().includes(lowerQuery)
      ) as any;
    }
  },

  /**
   * Filter events by type
   */
  async filterByEventType(
    eventType: 'festival' | 'fair' | 'ceremony' | 'cultural'
  ): Promise<EventListResponse[]> {
    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events/filter/by-type`,
        { params: { event_type: eventType } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to filter events:', error);
      // Return filtered dummy data
      return DUMMY_EVENTS.filter((e) => e.event_type === eventType) as any;
    }
  },

  /**
   * Filter events by status
   */
  async filterByStatus(
    status: 'upcoming' | 'ongoing' | 'completed'
  ): Promise<EventListResponse[]> {
    try {
      const response = await apiClient.get<EventListResponse[]>(
        `${API_BASE}/events/filter/by-status`,
        { params: { status } }
      );
      return response.data || [];
    } catch (error) {
      console.error('Failed to filter events by status:', error);
      // Return filtered dummy data
      return DUMMY_EVENTS.filter((e) => e.status === status) as any;
    }
  },
};

export { DUMMY_EVENTS };
