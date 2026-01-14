/**
 * ErrorMessage Component
 * Reusable error display with icon, message, and optional action
 */

import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  variant?: 'banner' | 'card' | 'inline' | 'toast';
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title,
  message,
  actionLabel,
  onAction,
  onClose,
  variant = 'banner',
}) => {
  // Banner variant - full width at top
  if (variant === 'banner') {
    return (
      <div className="w-full bg-red-50 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl mt-1">⚠️</span>
          <div className="flex-1">
            {title && <h3 className="font-bold text-red-800 mb-1">{title}</h3>}
            <p className="text-red-700">{message}</p>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800 font-bold text-xl"
              aria-label="Close error message"
            >
              ✕
            </button>
          )}
        </div>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded font-bold hover:bg-red-700 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }

  // Card variant - centered card
  if (variant === 'card') {
    return (
      <div className="bg-red-50 rounded-xl border-2 border-red-500 p-8 text-center max-w-md mx-auto">
        <div className="text-5xl mb-4">❌</div>
        {title && <h3 className="text-xl font-bold text-red-800 mb-2">{title}</h3>}
        <p className="text-red-700 mb-6">{message}</p>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }

  // Inline variant - small inline message
  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 text-red-600 text-sm mb-4 p-3 bg-red-50 rounded-lg">
        <span className="text-lg">⚠️</span>
        <span className="font-bold">{message}</span>
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="ml-auto text-red-700 hover:text-red-900 font-bold underline"
          >
            {actionLabel}
          </button>
        )}
      </div>
    );
  }

  // Toast variant - small notification style
  if (variant === 'toast') {
    return (
      <div className="fixed bottom-4 right-4 bg-red-600 text-white rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm z-50">
        <span className="text-xl">❌</span>
        <div className="flex-1">
          {title && <p className="font-bold">{title}</p>}
          <p className="text-sm">{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-2 hover:bg-red-700 p-1 rounded transition-colors"
            aria-label="Close error"
          >
            ✕
          </button>
        )}
      </div>
    );
  }

  return null;
};

export default ErrorMessage;

