/**
 * GalleryModal Component
 * Full-screen modal preview for gallery items with navigation
 * Optimized for performance with lazy loading
 */

'use client';

import React, { useEffect, useState } from 'react';
import { GalleryItem } from '@/api/types/api';

interface GalleryModalProps {
  item: GalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
  allItems?: GalleryItem[];
  currentIndex?: number;
  onNavigate?: (index: number) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  item,
  isOpen,
  onClose,
  allItems = [],
  currentIndex = 0,
  onNavigate,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scale, setScale] = useState(1);

  const hasNavigation = allItems.length > 1;
  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < allItems.length - 1;

  const handlePrevious = () => {
    if (canGoPrev && onNavigate) {
      onNavigate(currentIndex - 1);
      setImageLoaded(false);
    }
  };

  const handleNext = () => {
    if (canGoNext && onNavigate) {
      onNavigate(currentIndex + 1);
      setImageLoaded(false);
    }
  };

  const handleZoom = () => {
    setScale(scale === 1 ? 1.5 : 1);
  };

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white">{item.title}</h2>
          <p className="text-sm text-gray-400">{item.category}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom Button */}
          <button
            onClick={handleZoom}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white"
            title="Zoom (1.5x)"
          >
            {scale === 1 ? '🔍+' : '🔍-'}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-white"
            title="Close (Esc)"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Image Container */}
      <div className="flex-1 flex items-center justify-center overflow-hidden p-4">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Loading Placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse" />
          )}

          {/* Image */}
          <img
            src={item.image_url}
            alt={item.title}
            className={`max-w-full max-h-full object-contain transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transform: `scale(${scale})` }}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Navigation Buttons */}
          {hasNavigation && (
            <>
              {/* Previous Button */}
              <button
                onClick={handlePrevious}
                disabled={!canGoPrev}
                className={`absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                  canGoPrev
                    ? 'bg-white/20 hover:bg-white/30 text-white cursor-pointer'
                    : 'bg-gray-600/20 text-gray-400 cursor-not-allowed'
                }`}
                title="Previous (← arrow)"
              >
                ❮
              </button>

              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={!canGoNext}
                className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                  canGoNext
                    ? 'bg-white/20 hover:bg-white/30 text-white cursor-pointer'
                    : 'bg-gray-600/20 text-gray-400 cursor-not-allowed'
                }`}
                title="Next (→ arrow)"
              >
                ❯
              </button>

              {/* Page Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-3 py-1 rounded-full text-sm text-gray-300">
                {currentIndex + 1} / {allItems.length}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer - Item Info */}
      <div className="border-t border-gray-700 bg-gray-900/50 p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {/* Views */}
          <div>
            <p className="text-gray-400">Views</p>
            <p className="text-white font-semibold">{item.view_count.toLocaleString()}</p>
          </div>

          {/* Category */}
          <div>
            <p className="text-gray-400">Category</p>
            <p className="text-white font-semibold">{item.category}</p>
          </div>

          {/* Uploaded By */}
          <div>
            <p className="text-gray-400">Uploaded By</p>
            <p className="text-white font-semibold truncate">{item.uploaded_by}</p>
          </div>

          {/* Upload Date */}
          <div>
            <p className="text-gray-400">Uploaded</p>
            <p className="text-white font-semibold">
              {new Date(item.upload_date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Description */}
        {item.description && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
          </div>
        )}

        {/* Keyboard Help */}
        <div className="mt-4 text-xs text-gray-500 text-center">
          Press <kbd className="bg-gray-800 px-1 rounded">Esc</kbd> to close • Use
          <kbd className="bg-gray-800 px-1 rounded">← →</kbd> to navigate
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
