import React from 'react';

export const SeasonalBanner: React.FC = () => {
  return (
    <section className="mt-10 rounded-lg overflow-hidden">
      <div className="relative w-full h-56 md:h-80 lg:h-96 bg-cover bg-center" style={{ backgroundImage: `url('/images/monsoon-placeholder.jpg')` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-4xl mx-auto px-6 md:px-10 text-white">
            <h2 className="text-2xl md:text-4xl font-bold">Monsoon Beauty & Waterfalls</h2>
            <p className="mt-2 md:mt-4 text-sm md:text-base">Witness dramatic waterfalls, misted valleys, and vibrant green trails — the monsoon transforms OSAM Hill into a living postcard.</p>
            <a href="/places" className="inline-block mt-4 px-4 py-2 bg-forest-600 hover:bg-forest-700 rounded-md text-sm font-medium">Explore seasonal places</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalBanner;
