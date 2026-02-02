import React from 'react';

type EmptyStateVariant = 'default' | 'search' | 'no-results' | 'no-data' | 'no-permission';

type EmptyStateProps = {
  icon?: string; // emoji icon
  title: string;
  description?: string;
  variant?: EmptyStateVariant;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary';
  }[];
  illustration?: React.ReactNode;
};

const defaultIcons: Record<EmptyStateVariant, string> = {
  default: '📦',
  search: '🔍',
  'no-results': '❌',
  'no-data': '📊',
  'no-permission': '🔒',
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  variant = 'default',
  actions = [],
  illustration,
}) => {
  const displayIcon = icon || defaultIcons[variant];

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Icon/Illustration */}
      {illustration ? (
        <div className="mb-6">{illustration}</div>
      ) : (
        <div className="text-6xl mb-6 animate-bounce">{displayIcon}</div>
      )}

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        {description && (
          <p className="text-gray-600 text-sm md:text-base mb-6">
            {description}
          </p>
        )}
      </div>

      {/* Actions */}
      {actions.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          {actions.map((action, idx) => (
            <button
              key={idx}
              onClick={action.onClick}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                action.variant === 'secondary'
                  ? 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'bg-forest-600 text-white hover:bg-forest-700'
              }`}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
