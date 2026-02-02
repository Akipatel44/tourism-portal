/**
 * Events Service
 * Handles all events-related API calls
 */

import { AxiosError } from 'axios';
import { publicApi, protectedApi } from '../axios/instances';
import { EVENTS_ENDPOINTS } from '../constants';
import { Event, PaginatedResponse } from '../types/api';
import { parseApiError } from '../utils/apiErrorHandler';

interface EventsListParams {
  page?: number;
  page_size?: number;
  status?: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
}

interface CreateEventRequest {
  name: string;
  description: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  location: string;
  image_url?: string;
  status?: 'upcoming' | 'ongoing' | 'cancelled';
}

class EventsService {
  /**
   * Get list of events (public)
   * Supports pagination and filtering
   */
  async getEvents(params?: EventsListParams): Promise<PaginatedResponse<Event>> {
    try {
      const response = await publicApi.get<PaginatedResponse<Event>>(
        EVENTS_ENDPOINTS.LIST,
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get single event details (public)
   */
  async getEvent(id: string): Promise<Event> {
    try {
      const response = await publicApi.get<Event>(EVENTS_ENDPOINTS.DETAIL(id));
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get upcoming events (public)
   * Convenience method for commonly requested data
   */
  async getUpcomingEvents(
    params?: Omit<EventsListParams, 'status'>
  ): Promise<PaginatedResponse<Event>> {
    try {
      const response = await publicApi.get<PaginatedResponse<Event>>(
        EVENTS_ENDPOINTS.UPCOMING,
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Search events (public)
   */
  async searchEvents(
    query: string,
    params?: EventsListParams
  ): Promise<PaginatedResponse<Event>> {
    try {
      const response = await publicApi.get<PaginatedResponse<Event>>(
        EVENTS_ENDPOINTS.SEARCH,
        { params: { q: query, ...params } }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Create new event (protected)
   * Requires authentication and admin role
   */
  async createEvent(payload: CreateEventRequest): Promise<Event> {
    try {
      const response = await protectedApi.post<Event>(
        EVENTS_ENDPOINTS.CREATE,
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Update event (protected)
   * Requires authentication and admin role
   */
  async updateEvent(id: string, payload: Partial<CreateEventRequest>): Promise<Event> {
    try {
      const response = await protectedApi.patch<Event>(
        EVENTS_ENDPOINTS.UPDATE(id),
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Delete event (protected)
   * Requires authentication and admin role
   */
  async deleteEvent(id: string): Promise<void> {
    try {
      await protectedApi.delete(EVENTS_ENDPOINTS.DELETE(id));
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }
}

export default new EventsService();
