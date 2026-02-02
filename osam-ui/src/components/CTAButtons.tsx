import React from 'react';

export const CTAButtons: React.FC = () => {
  return (
    <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
      <a href="/places" className="inline-flex items-center justify-center px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white rounded-md text-sm font-semibold">Explore Places</a>
      <a href="/visit-guide" className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 bg-white text-monsoon-900 rounded-md text-sm font-medium hover:bg-stone-50">Plan Visit</a>
    </div>
  );
};

export default CTAButtons;
