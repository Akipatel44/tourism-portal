import React from 'react';

type LoaderVariant = 'spinner' | 'skeleton' | 'dots' | 'pulse';
type LoaderSize = 'sm' | 'md' | 'lg';

type LoaderProps = {
  variant?: LoaderVariant;
  size?: LoaderSize;
  fullHeight?: boolean;
  message?: string;
  count?: number; // For skeleton cards
};

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

// Spinner Loader
const Spinner: React.FC<{ size: LoaderSize }> = ({ size }) => (
  <div className={`${sizeClasses[size]} border-3 border-gray-300 border-t-forest-600 rounded-full animate-spin`} />
);

// Dot Loader
const DotLoader: React.FC<{ size: LoaderSize }> = ({ size }) => {
  const dotSize = size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${dotSize} bg-forest-600 rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
};

// Skeleton Loader (for cards/lists)
const SkeletonCard: React.FC = () => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-full animate-pulse" />
      <div className="h-3 bg-gray-200 rounded w-5/6 animate-pulse" />
      <div className="pt-2 space-y-2">
        <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
      </div>
    </div>
  </div>
);

// Skeleton Row (for tables)
const SkeletonRow: React.FC = () => (
  <div className="p-4 border-b border-gray-200 flex gap-4">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex-1">
        <div className="h-4 bg-gray-200 rounded animate-pulse" />
      </div>
    ))}
  </div>
);

// Pulse Loader (full content loading)
const PulseLoader: React.FC = () => (
  <div className="space-y-4">
    <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse" />
    <div className="space-y-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
      ))}
    </div>
    <div className="h-32 bg-gray-200 rounded animate-pulse" />
  </div>
);

export const Loader: React.FC<LoaderProps> = ({
  variant = 'spinner',
  size = 'md',
  fullHeight = false,
  message = 'Loading...',
  count = 3,
}) => {
  const containerClass = fullHeight ? 'min-h-screen' : 'py-12';

  // Skeleton grid
  if (variant === 'skeleton') {
    return (
      <div className={`${containerClass} px-4`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Skeleton table rows
  if (variant === 'pulse') {
    return (
      <div className={`${containerClass} px-4`}>
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>
      </div>
    );
  }

  // Centered spinner/dots
  return (
    <div className={`${containerClass} flex flex-col items-center justify-center gap-3`}>
      {variant === 'spinner' && <Spinner size={size} />}
      {variant === 'dots' && <DotLoader size={size} />}
      <p className="text-gray-600 text-sm">{message}</p>
    </div>
  );
};

export default Loader;
