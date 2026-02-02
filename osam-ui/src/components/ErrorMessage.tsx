import React, { useState } from 'react';

type AlertVariant = 'error' | 'warning' | 'success' | 'info';

type ErrorMessageProps = {
  message: string;
  variant?: AlertVariant;
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
};

const variantStyles: Record<AlertVariant, { bg: string; border: string; text: string; icon: string }> = {
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '❌',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    icon: '⚠️',
  },
  success: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    icon: '✅',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    icon: 'ℹ️',
  },
};

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  variant = 'error',
  title,
  dismissible = true,
  onDismiss,
  actions = [],
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const styles = variantStyles[variant];

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-lg p-4 mb-4`}
      role="alert"
      aria-live="polite"
    >
      <div className="flex gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 text-xl">{styles.icon}</div>

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h3 className={`font-semibold ${styles.text} mb-1`}>
              {title}
            </h3>
          )}
          <p className={`text-sm ${styles.text}`}>
            {message}
          </p>

          {/* Actions */}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.onClick}
                  className={`text-sm font-medium underline hover:no-underline ${styles.text}`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`flex-shrink-0 ${styles.text} hover:opacity-75 transition-opacity`}
            aria-label="Dismiss alert"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

// Toast-style error message (fixed position, auto-dismiss)
type ToastProps = Omit<ErrorMessageProps, 'dismissible'> & {
  autoDismiss?: number; // ms
};

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'error',
  title,
  autoDismiss = 5000,
  onDismiss,
  actions = [],
}) => {
  const [isVisible, setIsVisible] = useState(true);

  React.useEffect(() => {
    if (!autoDismiss) return;
    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, autoDismiss);
    return () => clearTimeout(timer);
  }, [autoDismiss, onDismiss]);

  if (!isVisible) return null;

  const styles = variantStyles[variant];

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in fade-in slide-in-from-bottom-4">
      <div
        className={`${styles.bg} border ${styles.border} rounded-lg p-4 shadow-lg`}
        role="status"
        aria-live="polite"
      >
        <div className="flex gap-3">
          <div className="flex-shrink-0 text-xl">{styles.icon}</div>
          <div className="flex-1">
            {title && <h3 className={`font-semibold ${styles.text} mb-1`}>{title}</h3>}
            <p className={`text-sm ${styles.text}`}>{message}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className={`flex-shrink-0 ${styles.text} hover:opacity-75 transition-opacity`}
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
