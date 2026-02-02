import React from 'react';

export type PastEventCardProps = {
  title: string;
  date: string;
  image: string;
  attendees?: number;
};

export const PastEventCard: React.FC<PastEventCardProps> = ({ title, date, image, attendees }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-200">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundImage: `url('${image}')` }}
          role="img"
          aria-label={`${title} - ${date}`}
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <h3 className="text-lg md:text-xl font-bold text-white text-center px-4">{title}</h3>
        <p className="mt-2 text-sm text-white/80">{date}</p>
        {attendees && <p className="mt-1 text-xs text-white/70">👥 {attendees}+ attended</p>}
      </div>
    </div>
  );
};

export default PastEventCard;
