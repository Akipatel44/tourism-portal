import React from 'react';

export type LightboxImage = {
  id: string;
  src: string;
  alt: string;
  caption?: string;
};

type LightboxProps = {
  isOpen: boolean;
  image: LightboxImage | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalImages: number;
};

export const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  image,
  onClose,
  onPrevious,
  onNext,
  currentIndex,
  totalImages,
}) => {
  if (!isOpen || !image) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 p-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      {totalImages > 1 && (
        <button
          onClick={onPrevious}
          aria-label="Previous image"
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-8 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center px-4">
        <img
          src={image.src}
          alt={image.alt}
          className="max-w-full max-h-full object-contain"
        />
      </div>

      {/* Next Button */}
      {totalImages > 1 && (
        <button
          onClick={onNext}
          aria-label="Next image"
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-10 w-8 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Image Counter & Caption */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white max-w-lg px-4">
        <p className="text-xs sm:text-sm font-semibold mb-2">
          {currentIndex + 1} / {totalImages}
        </p>
        {image.caption && <p className="text-xs sm:text-sm text-gray-300">{image.caption}</p>}
      </div>

      {/* Keyboard & Click Outside Handling */}
      {typeof window !== 'undefined' && (
        <div
          onClick={onClose}
          className="absolute inset-0"
          style={{ cursor: 'pointer', zIndex: -1 }}
        />
      )}
    </div>
  );
};

export default Lightbox;
