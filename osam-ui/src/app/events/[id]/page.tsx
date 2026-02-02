'use client';

/**
 * Event Detail Page
 * Displays detailed information about a single event
 */

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEvent } from '@/hooks/useEvent';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { event, isLoading, error, refetch } = useEvent({ id, autoFetch: true });

  if (!id) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-900">Invalid Event ID</h2>
          <p className="mt-2 text-red-700">Please go back and select a valid event.</p>
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

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg border border-red-200">
          <h2 className="text-xl font-semibold text-red-900">Event Not Found</h2>
          <p className="mt-2 text-red-700">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/events')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const statusColors: Record<string, string> = {
    upcoming: 'bg-green-100 text-green-800 border border-green-300',
    ongoing: 'bg-blue-100 text-blue-800 border border-blue-300',
    past: 'bg-gray-100 text-gray-800 border border-gray-300',
    cancelled: 'bg-red-100 text-red-800 border border-red-300',
  };

  const statusLabels: Record<string, string> = {
    upcoming: '🔜 Upcoming',
    ongoing: '🔴 Happening Now',
    past: '✓ Past Event',
    cancelled: '✖ Cancelled',
  };

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
          className="mb-6 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
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
                event.image_url ||
                'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=600&fit=crop'
              }
              alt={event.name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Content */}
        <div className="rounded-xl bg-white shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-3">{event.name}</h1>
              </div>

              {/* Status Badge */}
              <span
                className={`inline-flex rounded-lg px-4 py-2 text-lg font-semibold ${
                  statusColors[event.status] || statusColors.upcoming
                }`}
              >
                {statusLabels[event.status] || 'Event'}
              </span>
            </div>

            {/* Date, Time & Location */}
            <div className="space-y-2 py-4 border-y border-gray-200">
              {/* Date */}
              <div className="flex items-center gap-3">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-lg font-semibold text-gray-900">{formattedDate}</span>
              </div>

              {/* Time */}
              <div className="flex items-center gap-3">
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
                    d="M12 8v4l3 2m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-lg font-semibold text-gray-900">{event.time}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-lg font-semibold text-gray-900">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About this event</h2>
            <p className="text-lg text-gray-700 leading-relaxed">{event.description}</p>
          </div>

          {/* Attendees Info */}
          <div className="rounded-lg bg-blue-50 p-6 border border-blue-200 mb-8">
            <div className="flex items-center gap-3">
              <svg
                className="h-6 w-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.856-1.487M15 10a3 3 0 11-6 0 3 3 0 016 0zM6 20a9 9 0 0118 0v2h-2v-2a7 7 0 00-14 0v2H6v-2z"
                />
              </svg>
              <div>
                <p className="text-sm font-medium text-blue-900">Event Attendance</p>
                <p className="text-2xl font-bold text-blue-600">
                  {event.attendees_count.toLocaleString()} attendees
                </p>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid gap-6 sm:grid-cols-2 rounded-lg bg-gray-50 p-6 mb-8">
            <div>
              <p className="text-sm font-medium text-gray-600">Event Created</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(event.created_at).toLocaleDateString()}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {new Date(event.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={refetch}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors shadow-md"
            >
              Refresh
            </button>
            <button
              onClick={() => router.push('/events')}
              className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors"
            >
              View All Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
