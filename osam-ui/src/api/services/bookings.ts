/**
 * Bookings Service
 * Handles all bookings-related API calls
 */

import { AxiosError } from 'axios';
import { protectedApi } from '../axios/instances';
import { BOOKINGS_ENDPOINTS } from '../constants';
import { Booking, PaginatedResponse } from '../types/api';
import { parseApiError } from '../utils/apiErrorHandler';

interface BookingsListParams {
  page?: number;
  page_size?: number;
  status?: 'confirmed' | 'pending' | 'cancelled' | 'completed';
}

interface CreateBookingRequest {
  place_id: string;
  event_id?: string;
  booking_date: string;
  visit_date: string;
  number_of_guests: number;
  notes?: string;
}

class BookingsService {
  /**
   * Get user's bookings (protected)
   * Requires authentication
   */
  async getMyBookings(
    params?: BookingsListParams
  ): Promise<PaginatedResponse<Booking>> {
    try {
      const response = await protectedApi.get<PaginatedResponse<Booking>>(
        BOOKINGS_ENDPOINTS.MY_BOOKINGS,
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get all bookings (protected, admin only)
   * Requires authentication and admin role
   */
  async getAllBookings(
    params?: BookingsListParams
  ): Promise<PaginatedResponse<Booking>> {
    try {
      const response = await protectedApi.get<PaginatedResponse<Booking>>(
        BOOKINGS_ENDPOINTS.LIST,
        { params }
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Get single booking details (protected)
   * Requires authentication
   */
  async getBooking(id: string): Promise<Booking> {
    try {
      const response = await protectedApi.get<Booking>(
        BOOKINGS_ENDPOINTS.DETAIL(id)
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Create new booking (protected)
   * Requires authentication
   */
  async createBooking(payload: CreateBookingRequest): Promise<Booking> {
    try {
      const response = await protectedApi.post<Booking>(
        BOOKINGS_ENDPOINTS.CREATE,
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Update booking (protected)
   * Requires authentication
   */
  async updateBooking(
    id: string,
    payload: Partial<CreateBookingRequest>
  ): Promise<Booking> {
    try {
      const response = await protectedApi.patch<Booking>(
        BOOKINGS_ENDPOINTS.UPDATE(id),
        payload
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }

  /**
   * Cancel booking (protected)
   * Requires authentication
   */
  async cancelBooking(id: string): Promise<Booking> {
    try {
      const response = await protectedApi.post<Booking>(
        BOOKINGS_ENDPOINTS.CANCEL(id)
      );
      return response.data;
    } catch (error) {
      const parsed = parseApiError(error as AxiosError);
      throw parsed;
    }
  }
}

export default new BookingsService();
