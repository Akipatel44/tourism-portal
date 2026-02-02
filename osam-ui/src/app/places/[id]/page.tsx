'use client';

/**
 * Place Detail Page
 * Displays detailed information about a single place
 */

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { usePlace } from '@/hooks/usePlace';

export default function PlaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { place, isLoading, error, refetch } = usePlace({ id, autoFetch: true });

  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-900">Invalid Place ID</h2>
          <p className="mt-2 text-red-700">Please go back and select a valid place.</p>
          <button
            onClick={() => router.back()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Skeleton Loader */}
          <div className="animate-pulse space-y-8">
            <div className="h-96 bg-gray-300 rounded-xl" />
            <div className="h-8 bg-gray-300 rounded w-3/4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded" />
              <div className="h-4 bg-gray-300 rounded w-5/6" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-900">Place Not Found</h2>
          <p className="mt-2 text-red-700">The place you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/places')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Places
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
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
                <p className="font-medium text-amber-900">Loaded from Cache</p>
                <p className="text-sm text-amber-800 mt-1">
                  {error.message || 'Using saved data'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back
        </button>

        {/* Image Banner */}
        <div className="mb-8 overflow-hidden rounded-xl shadow-xl border border-gray-200">
          <div className="relative h-96 w-full bg-gray-200">
            <img
              src={
                place.image_url ||
                'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=1200&h=600&fit=crop'
              }
              alt={place.name}
              className="h-full w-full object-cover"
            />
            {place.is_featured && (
              <div className="absolute right-4 top-4 bg-yellow-400 px-4 py-2 rounded-full text-sm font-semibold text-yellow-900 shadow-lg">
                Featured Place
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl bg-white shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{place.name}</h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-lg">{place.location}</span>
                </div>
              </div>

              {/* Category Badge */}
              <span className="inline-flex rounded-lg bg-green-50 px-4 py-2 text-lg font-semibold text-green-700">
                {place.category}
              </span>
            </div>

            {/* Rating and Stats */}
            <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-200">
              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(place.rating)
                          ? 'fill-current'
                          : 'text-gray-300 fill-current'
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    {place.rating.toFixed(1)}
                  </span>
                  <span className="text-gray-600 ml-1">(Rating)</span>
                </div>
              </div>

              {/* Visit Count */}
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <span className="text-gray-900 font-semibold">
                  {place.visit_count.toLocaleString()} visits
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this place</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{place.description}</p>
          </div>

          {/* Metadata */}
          <div className="grid gap-6 sm:grid-cols-2 rounded-lg bg-gray-50 p-6">
            {place.latitude && place.longitude && (
              <>
                <div>
                  <p className="text-sm font-medium text-gray-600">Latitude</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {place.latitude.toFixed(4)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Longitude</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">
                    {place.longitude.toFixed(4)}
                  </p>
                </div>
              </>
            )}

            <div>
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(place.updated_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Created</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(place.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={refetch}
              className="px-6 py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition-colors shadow-md"
            >
              Refresh
            </button>
            <button
              onClick={() => router.push('/places')}
              className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              View All Places
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
