import React from 'react';

export type PlaceCardProps = {
  id: string;
  name: string;
  image: string;
  description: string;
  category: 'Temple' | 'Mythology' | 'Nature';
};

export const PlaceCard: React.FC<PlaceCardProps> = ({ id, name, image, description, category }) => {
  const categoryColor = {
    Temple: 'bg-sky-100 text-sky-800',
    Mythology: 'bg-amber-100 text-amber-800',
    Nature: 'bg-green-100 text-green-800',
  }[category];

  return (
    <div className="group relative overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-200">
        <div
          className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-300"
          style={{ backgroundImage: `url('${image}')` }}
          aria-label={`${name} image`}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg md:text-xl font-semibold text-monsoon-900 line-clamp-2">{name}</h3>
            <p className="mt-2 text-sm text-stone-600 line-clamp-2">{description}</p>
          </div>
        </div>

        {/* Category Badge */}
        <div className="mt-4 flex items-center justify-between">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${categoryColor}`}>
            {category}
          </span>
          <a
            href={`/places/${id}`}
            className="text-sm font-medium text-forest-600 hover:text-forest-700 group-hover:underline"
          >
            Learn more →
          </a>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
