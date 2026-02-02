'use client';

import React from 'react';
import { useGlobalUI } from '@/contexts/GlobalUIContext';

export default function GlobalLoader() {
  const { loadingCount } = useGlobalUI();

  if (loadingCount <= 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white/90 p-4 rounded-lg shadow-lg flex items-center gap-3">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        <div className="text-gray-800 font-medium">Loading...</div>
      </div>
    </div>
  );
}
