import React from 'react';

export type GalleryItemType = {
  id: string;
  src: string;
  alt: string;
  category: 'Monsoon' | 'Temples' | 'Events' | 'Nature';
  caption?: string;
};

type GalleryItemProps = {
  item: GalleryItemType;
  onClick: (item: GalleryItemType) => void;
};

export const GalleryItem: React.FC<GalleryItemProps> = ({ item, onClick }) => {
  const categoryColors: Record<string, string> = {
    Monsoon: 'bg-blue-500',
    Temples: 'bg-amber-600',
    Events: 'bg-emerald-600',
    Nature: 'bg-green-600',
  };

  return (
    <button
      onClick={() => onClick(item)}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 h-64 sm:h-72 text-left w-full"
      aria-label={`View ${item.alt} image`}
    >
      {/* Image */}
      <img
        src={item.src}
        alt={item.alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

      {/* Category Badge */}
      <div className={`absolute top-3 right-3 ${categoryColors[item.category]} text-white text-xs font-bold px-3 py-1 rounded-full`}>
        {item.category}
      </div>

      {/* Caption Overlay (shows on hover) */}
      <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="text-white">
          <h3 className="font-bold text-base sm:text-lg leading-tight">{item.alt}</h3>
          {item.caption && <p className="text-xs sm:text-sm text-gray-200 mt-1">{item.caption}</p>}
        </div>
      </div>
    </button>
  );
};

export default GalleryItem;
