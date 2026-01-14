/**
 * SkeletonLoader Component
 * Animated skeleton loaders for content placeholders
 */

import React from 'react';

interface SkeletonProps {
  type?: 'text' | 'card' | 'image' | 'title' | 'paragraph' | 'grid';
  count?: number;
  height?: string;
  width?: string;
  circle?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  type = 'text',
  count = 1,
  height = 'h-4',
  width = 'w-full',
  circle = false,
}) => {
  const baseClasses = 'bg-gray-200 animate-pulse rounded';

  if (type === 'text') {
    return (
      <div className="space-y-3">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={`${baseClasses} ${height} ${width}`} />
          ))}
      </div>
    );
  }

  if (type === 'title') {
    return (
      <div>
        <div className={`${baseClasses} h-8 w-3/4 mb-4`} />
        <div className={`${baseClasses} h-4 w-full`} />
      </div>
    );
  }

  if (type === 'paragraph') {
    return (
      <div className="space-y-2">
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-full`} />
        <div className={`${baseClasses} h-4 w-2/3`} />
      </div>
    );
  }

  if (type === 'image') {
    return <div className={`${baseClasses} aspect-video ${width}`} />;
  }

  if (type === 'card') {
    return (
      <div className={`${baseClasses} p-6 rounded-xl`}>
        <div className={`${baseClasses} h-48 w-full mb-4`} />
        <div className={`${baseClasses} h-6 w-3/4 mb-3`} />
        <div className="space-y-2">
          <div className={`${baseClasses} h-4 w-full`} />
          <div className={`${baseClasses} h-4 w-5/6`} />
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(count)
          .fill(0)
          .map((_, i) => (
            <div key={i} className={`${baseClasses} p-6 rounded-xl`}>
              <div className={`${baseClasses} h-48 w-full mb-4`} />
              <div className={`${baseClasses} h-6 w-3/4 mb-3`} />
              <div className="space-y-2">
                <div className={`${baseClasses} h-4 w-full`} />
                <div className={`${baseClasses} h-4 w-5/6`} />
              </div>
            </div>
          ))}
      </div>
    );
  }

  return null;
};

export default Skeleton;
