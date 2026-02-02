import React from 'react';
import Link from 'next/link';
import { Event } from '@/api/types/api';

interface EventCardProps {
  event: Event;
}

const STATUS_COLORS: Record<string, string> = {
  upcoming: 'bg-green-50 text-green-700 border-green-200',
  ongoing: 'bg-blue-50 text-blue-700 border-blue-200',
  past: 'bg-gray-50 text-gray-700 border-gray-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
};

const STATUS_BADGES: Record<string, string> = {
  upcoming: 'Upcoming',
  ongoing: 'Happening Now',
  past: 'Past Event',
  cancelled: 'Cancelled',
};

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const statusColor = STATUS_COLORS[event.status] || STATUS_COLORS.upcoming;
  const statusLabel = STATUS_BADGES[event.status] || 'Event';

  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const isPast = event.status === 'past';

  return (
    <Link href={`/events/${event.id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-blue-400">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <img
            src={
              event.image_url ||
              'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop'
            }
            alt={event.name}
            className={`h-full w-full object-cover transition-transform duration-300 ${
              !isPast ? 'group-hover:scale-105' : ''
            }`}
          />
          {isPast && (
            <div className="absolute inset-0 bg-black/30" />
          )}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col p-4">
          {/* Status Badge */}
          <div className={`mb-2 inline-flex w-fit rounded-md border px-3 py-1 text-xs font-medium ${statusColor}`}>
            {statusLabel}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600">
            {event.name}
          </h3>

          {/* Date & Time */}
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="h-4 w-4"
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
            {formattedDate}
          </div>

          {/* Time & Location */}
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="h-4 w-4"
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
            {event.time}
          </div>

          {/* Location */}
          <div className="mb-3 flex items-center gap-2 text-sm text-gray-600">
            <svg
              className="h-4 w-4"
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
            {event.location}
          </div>

          {/* Description */}
          <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2">
            {event.description}
          </p>

          {/* Footer Stats */}
          <div className="border-t border-gray-100 pt-3">
            <div className="flex items-center justify-between">
              {/* Attendees */}
              <div className="flex items-center gap-1">
                <svg
                  className="h-4 w-4 text-blue-600"
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
                <span className="text-xs text-gray-600">
                  {event.attendees_count.toLocaleString()} attending
                </span>
              </div>

              {/* Arrow indicator */}
              <svg
                className="h-4 w-4 text-gray-400 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
