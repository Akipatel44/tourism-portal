/**
 * GalleryCard Component
 * Displays gallery item with lazy-loaded image and category tag
 * Optimized for performance with intersection observer
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { GalleryItem } from '@/api/types/api';

interface GalleryCardProps {
  item: GalleryItem;
  onClick?: () => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  // Use Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CATEGORY_COLORS: Record<string, string> = {
    Nature: 'bg-green-500',
    Architecture: 'bg-blue-500',
    Portrait: 'bg-purple-500',
    Abstract: 'bg-pink-500',
    Wildlife: 'bg-orange-500',
    Urban: 'bg-slate-600',
    Landscape: 'bg-teal-500',
    Other: 'bg-gray-500',
  };

  const categoryColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;

  return (
    <Link href={`/gallery/${item.id}`}>
      <div
        className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
        onClick={onClick}
      >
        {/* Image Container with Lazy Loading */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {/* Placeholder while loading */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
          )}

          {/* Lazy-loaded image */}
          {isInView && (
            <img
              ref={imageRef}
              src={item.image_url}
              alt={item.title}
              className={`w-full h-full object-cover transition-all duration-500 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              } group-hover:scale-110`}
              onLoad={() => setIsLoaded(true)}
              loading="lazy"
              decoding="async"
            />
          )}

          {/* Featured Badge */}
          {item.is_featured && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold">
              ⭐ Featured
            </div>
          )}

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="text-white font-semibold">View Gallery</span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 bg-white">
          {/* Category Tag */}
          <div className="mb-2 flex items-center gap-2">
            <span className={`${categoryColor} text-white text-xs font-bold px-2 py-1 rounded`}>
              {item.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
            {item.title}
          </h3>

          {/* Description (if available) */}
          {item.description && (
            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
              {item.description}
            </p>
          )}

          {/* Footer Info */}
          <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-2">
            <span className="flex items-center gap-1">
              👁️ {item.view_count.toLocaleString()} views
            </span>
            <span>📸 {item.uploaded_by}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GalleryCard;
