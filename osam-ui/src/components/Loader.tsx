/**
 * Loader Component
 * Reusable loading spinner with multiple variants
 */

import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  message?: string;
  variant?: 'spinner' | 'dots' | 'bars';
}

export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  fullScreen = false,
  message = 'Loading...',
  variant = 'spinner',
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Spinner Variant */}
      {variant === 'spinner' && (
        <div className={`${sizeClasses[size]} border-4 border-gray-200 border-t-forest-600 rounded-full animate-spin`} />
      )}

      {/* Dots Variant */}
      {variant === 'dots' && (
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-forest-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      )}

      {/* Bars Variant */}
      {variant === 'bars' && (
        <div className="flex gap-1 items-end">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 bg-forest-600 rounded-full animate-pulse"
              style={{
                height: `${12 + i * 6}px`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      )}

      {message && <p className="text-monsoon-600 font-bold">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-8">{content}</div>;
};
