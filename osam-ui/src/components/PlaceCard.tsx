import React from 'react';
import Link from 'next/link';
import { Place } from '@/api/types/api';

interface PlaceCardProps {
  place: Place;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  return (
    <Link href={`/places/${place.id}`}>
      <div className="group h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-green-400">
        {/* Image Container */}
        <div className="relative h-48 w-full overflow-hidden bg-gray-200">
          <img
            src={
              place.image_url ||
              'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=400&h=300&fit=crop'
            }
            alt={place.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {place.is_featured && (
            <div className="absolute right-2 top-2 bg-yellow-400 px-3 py-1 rounded-full text-xs font-semibold text-yellow-900">
              Featured
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
        </div>

        {/* Content Container */}
        <div className="flex flex-col p-4">
          {/* Category Badge */}
          <span className="mb-2 inline-flex w-fit rounded-md bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
            {place.category}
          </span>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-green-600">
            {place.name}
          </h3>

          {/* Location */}
          <div className="mb-3 flex items-center text-sm text-gray-600">
            <svg
              className="mr-1 h-4 w-4"
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
            {place.location}
          </div>

          {/* Description */}
          <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-2">
            {place.description}
          </p>

          {/* Footer Stats */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${
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
              <span className="text-xs font-medium text-gray-700">
                {place.rating.toFixed(1)}
              </span>
            </div>

            {/* Visit Count */}
            <span className="text-xs text-gray-500">
              {place.visit_count.toLocaleString()} visits
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
