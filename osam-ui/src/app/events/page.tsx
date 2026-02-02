'use client';

/**
 * Events Page
 * Displays list of events with status filtering and pagination
 */

import React, { useState } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/EventCard';

interface FilterOption {
  value: string | null;
  label: string;
}

const STATUS_FILTERS: FilterOption[] = [
  { value: null, label: 'All Events' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'ongoing', label: 'Happening Now' },
  { value: 'past', label: 'Past Events' },
];

const ITEMS_PER_PAGE = 12;

export default function EventsPage() {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const { events, isLoading, error, pagination, setPage } = useEvents({
    page_size: ITEMS_PER_PAGE,
    status: (selectedStatus as 'upcoming' | 'ongoing' | 'past' | 'cancelled' | undefined) || undefined,
    autoFetch: true,
  });

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus(status);
    setPage(1);
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPage(pagination.page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.total_pages) {
      setPage(pagination.page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Events</h1>
          <p className="text-lg text-gray-600">
            Discover and attend upcoming events in our community
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Status
          </label>
          <div className="flex flex-wrap gap-2">
            {STATUS_FILTERS.map((filter) => (
              <button
                key={filter.value || 'all'}
                onClick={() => handleStatusChange(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedStatus === filter.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-amber-600 mt-0.5 mr-3"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-amber-900">
                  Connection Error - Showing Dummy Data
                </p>
                <p className="text-sm text-amber-800 mt-1">
                  {error.message || 'Unable to fetch events from server. Using fallback data.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && events.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.total_pages > 1 && (
              <div className="flex items-center justify-between rounded-lg bg-white p-6 shadow-sm border border-gray-200">
                <div className="text-sm text-gray-600">
                  Page{' '}
                  <span className="font-medium">
                    {pagination.page} of {pagination.total_pages}
                  </span>
                  {' '}
                  ({pagination.total} total events)
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={pagination.page <= 1}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    ← Previous
                  </button>

                  <button
                    onClick={handleNextPage}
                    disabled={pagination.page >= pagination.total_pages}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoading && events.length === 0 && (
          <div className="rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
            <p className="mt-1 text-gray-600">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
