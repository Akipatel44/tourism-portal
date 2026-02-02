'use client';

/**
 * Places Page
 * Displays list of places with filtering and pagination
 */

import React, { useState } from 'react';
import { usePlaces } from '@/hooks/usePlaces';
import { PlaceCard } from '@/components/PlaceCard';

interface FilterOption {
  value: string;
  label: string;
}

const CATEGORY_FILTERS: FilterOption[] = [
  { value: '', label: 'All Categories' },
  { value: 'Museum', label: 'Museums' },
  { value: 'Park', label: 'Parks' },
  { value: 'Gallery', label: 'Galleries' },
  { value: 'Historical Site', label: 'Historical Sites' },
];

const ITEMS_PER_PAGE = 12;

export default function PlacesPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const { places, isLoading, error, pagination, setPage } = usePlaces({
    page_size: ITEMS_PER_PAGE,
    category: selectedCategory || undefined,
    autoFetch: true,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Explore Places</h1>
          <p className="text-lg text-gray-600">
            Discover amazing locations and hidden gems in our community
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow-sm border border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_FILTERS.map((filter) => (
              <button
                key={filter.value}
                onClick={() => handleCategoryChange(filter.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === filter.value
                    ? 'bg-green-600 text-white shadow-md'
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
                  {error.message || 'Unable to fetch places from server. Using fallback data.'}
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

        {/* Places Grid */}
        {!isLoading && places.length > 0 && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
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
                  ({pagination.total} total places)
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
        {!isLoading && places.length === 0 && (
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
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No places found</h3>
            <p className="mt-1 text-gray-600">
              Try adjusting your filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
