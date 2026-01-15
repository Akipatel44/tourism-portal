import React, { useEffect, useCallback } from 'react';
import { GalleryImage } from '@/api/gallery';

interface ImageModalProps {
  isOpen: boolean;
  image: GalleryImage | null;
  onClose: () => void;
  onNextImage?: () => void;
  onPrevImage?: () => void;
  hasNextImage?: boolean;
  hasPrevImage?: boolean;
}

const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  image,
  onClose,
  onNextImage,
  onPrevImage,
  hasNextImage = false,
  hasPrevImage = false,
}) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowRight':
          if (hasNextImage && onNextImage) {
            onNextImage();
          }
          break;
        case 'ArrowLeft':
          if (hasPrevImage && onPrevImage) {
            onPrevImage();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNextImage, onPrevImage, hasNextImage, hasPrevImage]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !image) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
        aria-label="Close modal"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      {hasPrevImage && (
        <button
          onClick={onPrevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          aria-label="Previous image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center">
        <img
          src={image.image_url}
          alt={image.title}
          className="max-w-full max-h-[70vh] rounded-lg shadow-2xl object-contain"
        />

        {/* Image Info */}
        <div className="mt-6 text-center text-white max-w-full px-4">
          <h3 className="text-2xl font-bold mb-2">{image.title}</h3>
          {image.caption && <p className="text-gray-300 text-sm mb-3">{image.caption}</p>}
          {image.photographer && (
            <p className="text-xs text-gray-400">
              <span className="font-semibold">Photographer:</span> {image.photographer}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-2">
            <span className="font-semibold">Views:</span> {image.view_count || 0}
          </p>
        </div>
      </div>

      {/* Next Button */}
      {hasNextImage && (
        <button
          onClick={onNextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-40 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors"
          aria-label="Next image"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Keyboard hints */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs text-center opacity-75">
        <p>Press ESC to close • Use arrow keys to navigate</p>
      </div>
    </div>
  );
};

export default ImageModal;
