import React, { useEffect, useState, useCallback } from 'react';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message?: string;
  duration?: number;
}

// Global notification store
let notificationId = 0;
const listeners: Set<(notifications: Notification[]) => void> = new Set();
let notifications: Notification[] = [];

export const notificationManager = {
  subscribe: (listener: (notifications: Notification[]) => void) => {
    listeners.add(listener);
    listener(notifications);
    return () => listeners.delete(listener);
  },

  notify: (type: NotificationType, title: string, message?: string, duration = 4000) => {
    const id = `notification-${notificationId++}`;
    const notification: Notification = { id, type, title, message, duration };

    notifications = [...notifications, notification];
    listeners.forEach((listener) => listener(notifications));

    if (duration > 0) {
      setTimeout(() => {
        notificationManager.remove(id);
      }, duration);
    }

    return id;
  },

  success: (title: string, message?: string, duration?: number) =>
    notificationManager.notify('success', title, message, duration),

  error: (title: string, message?: string, duration?: number) =>
    notificationManager.notify('error', title, message, duration),

  info: (title: string, message?: string, duration?: number) =>
    notificationManager.notify('info', title, message, duration),

  warning: (title: string, message?: string, duration?: number) =>
    notificationManager.notify('warning', title, message, duration),

  remove: (id: string) => {
    notifications = notifications.filter((n) => n.id !== id);
    listeners.forEach((listener) => listener(notifications));
  },

  clear: () => {
    notifications = [];
    listeners.forEach((listener) => listener(notifications));
  }
};

/**
 * Hook to use notifications
 */
export const useNotification = () => {
  return notificationManager;
};

/**
 * Notification Toast Component
 */
interface ToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  const getStyles = () => {
    switch (notification.type) {
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: '✓',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
          titleColor: 'text-green-900',
          messageColor: 'text-green-700'
        };
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: '✕',
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900',
          messageColor: 'text-red-700'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: '⚠',
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900',
          messageColor: 'text-yellow-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: 'ℹ',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-900',
          messageColor: 'text-blue-700'
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-lg p-4 shadow-lg flex items-start gap-3 animate-in slide-in-from-top-2 fade-in`}
    >
      <div className={`${styles.iconBg} ${styles.iconColor} rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-sm`}>
        {styles.icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`${styles.titleColor} font-semibold text-sm`}>
          {notification.title}
        </h3>
        {notification.message && (
          <p className={`${styles.messageColor} text-sm mt-1`}>
            {notification.message}
          </p>
        )}
      </div>
      <button
        onClick={() => onClose(notification.id)}
        className={`${styles.iconColor} flex-shrink-0 hover:opacity-70 transition-opacity`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

/**
 * Notification Container Component - Place at root of app
 */
export const NotificationContainer: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    return notificationManager.subscribe(setNotifications);
  }, []);

  const handleClose = useCallback((id: string) => {
    notificationManager.remove(id);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <Toast notification={notification} onClose={handleClose} />
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
