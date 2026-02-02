import React, { createContext, useContext, useEffect, useState } from 'react';
import GlobalUIController, { onLoading, onError } from './GlobalUIController';
import { ErrorMessage, Toast } from '@/components/ErrorMessage';

interface GlobalUIContextValue {
  loadingCount: number;
  showError: (message: string) => void;
  clearError: () => void;
}

const GlobalUIContext = createContext<GlobalUIContextValue | undefined>(undefined);

export const GlobalUIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState<number>(GlobalUIController.getLoadingCount());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const offLoad = onLoading((count) => setLoadingCount(count));
    const offErr = onError((payload) => setError(payload.message || 'An error occurred'));
    return () => {
      offLoad();
      offErr();
    };
  }, []);

  const showError = (message: string) => setError(message);
  const clearError = () => setError(null);

  return (
    <GlobalUIContext.Provider value={{ loadingCount, showError, clearError }}>
      {children}
      {/* Inline global toast */}
      {error && <Toast variant="error" message={error} onDismiss={() => setError(null)} />}
    </GlobalUIContext.Provider>
  );
};

export function useGlobalUI() {
  const ctx = useContext(GlobalUIContext);
  if (!ctx) throw new Error('useGlobalUI must be used within GlobalUIProvider');
  return ctx;
}

export default GlobalUIContext;
