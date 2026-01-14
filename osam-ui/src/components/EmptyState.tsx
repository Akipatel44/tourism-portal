/**
 * EmptyState Component
 * Reusable empty state display with icon, message, and optional action
 */

import React from 'react';

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'compact';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon = '📭',
  title,
  description,
  actionLabel,
  onAction,
  variant = 'default',
}) => {
  if (variant === 'compact') {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-lg font-bold text-forest-800">{title}</h3>
        {description && <p className="text-sm text-monsoon-600 mb-4">{description}</p>}
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-4 py-2 bg-forest-600 text-white rounded-lg font-bold hover:bg-forest-700 transition-colors text-sm"
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-96 flex flex-col items-center justify-center px-4">
      <div className="text-8xl mb-6">{icon}</div>
      <h2 className="text-3xl font-bold text-forest-800 mb-3">{title}</h2>
      {description && <p className="text-lg text-monsoon-600 mb-8 max-w-md text-center">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-8 py-4 bg-forest-600 text-white rounded-lg font-bold hover:bg-forest-700 hover:shadow-lg transition-all transform hover:scale-105"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
