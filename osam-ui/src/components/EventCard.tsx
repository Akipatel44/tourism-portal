import React from 'react';

export type EventCardProps = {
  id: string;
  title: string;
  date: string; // e.g., "March 15-17, 2025"
  description: string;
  image: string;
  duration?: string; // e.g., "3 days"
  location?: string;
  ctaText?: string;
};

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  date,
  description,
  image,
  duration,
  location = 'Osam Hill',
  ctaText = 'Learn More',
}) => {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative h-56 md:h-64 overflow-hidden bg-gray-200">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={title}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Date Badge */}
        <div className="absolute top-4 right-4 bg-forest-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
          {duration ? `${duration}` : 'Event'}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-monsoon-900">{title}</h3>
            <p className="mt-2 text-sm text-stone-500 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {date}
            </p>
            {location && (
              <p className="text-sm text-stone-500 flex items-center gap-2 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </p>
            )}
          </div>
        </div>

        <p className="text-base leading-relaxed text-stone-700 mb-6">{description}</p>

        <button className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors">
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
