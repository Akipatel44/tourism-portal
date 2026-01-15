import React, { useState } from 'react';
import { usePlaces, useFilterPlaces, useSearchPlaces } from '@/hooks/usePlaces';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';

const PlacesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch places - use API by default, fallback to dummy if fails
  const { data: allPlaces, isLoading: loadingAll, error: errorAll } = usePlaces(0, 100);

  // Filter by category when selected
  const {
    data: categoryPlaces,
    isLoading: loadingCategory,
    error: errorCategory,
  } = useFilterPlaces(selectedCategory);

  // Search when term is entered
  const {
    data: searchResults,
    isLoading: loadingSearch,
    error: errorSearch,
  } = useSearchPlaces(searchTerm);

  // Determine which data to display
  let displayPlaces = allPlaces || [];
  let isLoading = loadingAll;
  let error = errorAll;

  if (searchTerm) {
    displayPlaces = searchResults;
    isLoading = loadingSearch;
    error = errorSearch;
  } else if (selectedCategory) {
    displayPlaces = categoryPlaces;
    isLoading = loadingCategory;
    error = errorCategory;
  }

  const categories = [
    { id: null, label: 'All Places', icon: '🌍' },
    { id: 'temple', label: 'Temples', icon: '▦' },
    { id: 'mythology', label: 'Mythology', icon: '■' },
    { id: 'nature', label: 'Nature', icon: '◆' },
    { id: 'landmark', label: 'Landmarks', icon: '▲' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== PAGE HEADER ===== */}
      <section className="bg-gradient-to-r from-forest-800 to-forest-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-mint font-semibold text-sm uppercase tracking-wider mb-2">
            Explore
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Places to Visit</h1>
          <p className="text-lg text-forest-100 max-w-2xl">
            Discover sacred temples, mythological sites, and natural wonders of Osam Hill & Chichod
          </p>
        </div>
      </section>

      {/* ===== SEARCH & FILTER SECTION ===== */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search places by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-lg border-2 border-gray-200 focus:border-forest-600 focus:outline-none transition-colors duration-200"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id || 'all'}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSearchTerm('');
                }}
                className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id && !searchTerm
                    ? 'bg-forest-800 text-white shadow-lg scale-105'
                    : 'bg-white text-forest-800 border-2 border-gray-200 hover:border-forest-600'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          {!isLoading && (
            <p className="mt-6 text-monsoon-600 font-medium">
              Showing {displayPlaces.length} place{displayPlaces.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </section>

      {/* ===== LOADING STATE ===== */}
      {isLoading && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex justify-center">
            <Loader />
          </div>
        </section>
      )}

      {/* ===== ERROR STATE ===== */}
      {error && !isLoading && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <ErrorMessage
              title="Unable to load places"
              message={error}
              onRetry={() => {
                setSearchTerm('');
                setSelectedCategory(null);
              }}
            />
          </div>
        </section>
      )}

      {/* ===== PLACES GRID ===== */}
      {!isLoading && !error && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {displayPlaces.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {displayPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-200">
                      <img
                        src={place.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop'}
                        alt={place.name}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <span
                          className={`px-4 py-2 rounded-full text-white font-semibold text-sm backdrop-blur-sm ${
                            place.category === 'temple'
                              ? 'bg-amber-600/80'
                              : place.category === 'mythology'
                              ? 'bg-purple-600/80'
                              : place.category === 'nature'
                              ? 'bg-green-600/80'
                              : 'bg-blue-600/80'
                          }`}
                        >
                          {place.category?.charAt(0).toUpperCase() +
                            place.category?.slice(1).toLowerCase()}
                        </span>
                      </div>

                      {/* Rating Badge */}
                      {place.rating && (
                        <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-1">
                          <span className="text-yellow-400 text-lg">★</span>
                          <span className="font-bold text-forest-800">{place.rating.toFixed(1)}</span>
                        </div>
                      )}

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7">
                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-forest-800 mb-2 group-hover:text-forest-600 transition-colors duration-300">
                        {place.name}
                      </h3>

                      {/* Description */}
                      <p className="text-monsoon-600 text-sm sm:text-base mb-4 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
                        {place.description}
                      </p>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-gray-200">
                        {/* Location */}
                        {place.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-lg">📍</span>
                            <span className="text-monsoon-600 font-medium truncate">
                              {place.location}
                            </span>
                          </div>
                        )}

                        {/* Entry Fee */}
                        {place.entry_fee !== undefined && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-lg">₹</span>
                            <span className="text-monsoon-600 font-medium">
                              {place.entry_fee === 0 ? 'Free' : `₹${place.entry_fee}`}
                            </span>
                          </div>
                        )}

                        {/* Best Season */}
                        {place.best_season && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-lg">🌤️</span>
                            <span className="text-monsoon-600 font-medium truncate">
                              {place.best_season}
                            </span>
                          </div>
                        )}

                        {/* Estimated Time */}
                        {place.estimated_time && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-lg">⏱️</span>
                            <span className="text-monsoon-600 font-medium">
                              {place.estimated_time}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <a
                          href={`/places/${place.id}`}
                          className="flex-1 px-4 py-2 bg-forest-800 text-white text-center rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300 transform hover:scale-105"
                        >
                          Learn More
                        </a>
                        <button className="px-4 py-2 border-2 border-forest-800 text-forest-800 rounded-lg font-semibold hover:bg-forest-800 hover:text-white transition-all duration-300">
                          ♥️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* No Results State */
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-forest-800 mb-2">No places found</h3>
                <p className="text-monsoon-600 mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchTerm('');
                  }}
                  className="px-6 py-3 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-800 mb-12 text-center">
            Why Visit These Places?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '▦', label: 'Historic Sites', value: '15+' },
              { icon: '◆', label: 'Nature Trails', value: '20+' },
              { icon: '■', label: 'Mythological', value: '10+' },
              { icon: '★', label: 'Avg Rating', value: '4.7' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-forest-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-monsoon-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-800 to-forest-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Explore?</h2>
          <p className="text-lg text-forest-100 mb-8">
            Plan your itinerary and book your adventure to Osam Hill & Chichod today
          </p>
          <button className="px-8 py-4 bg-accent-mint text-forest-800 rounded-lg font-bold text-lg hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Plan Your Visit
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlacesPage;

  return (
    <div className="min-h-screen bg-white">
      {/* ===== PAGE HEADER ===== */}
      <section className="bg-gradient-to-r from-forest-800 to-forest-900 text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-accent-mint font-semibold text-sm uppercase tracking-wider mb-2">
            Explore
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Places to Visit</h1>
          <p className="text-lg text-forest-100 max-w-2xl">
            Discover sacred temples, mythological sites, and natural wonders of Osam Hill & Chichod
          </p>
        </div>
      </section>

      {/* ===== SEARCH & FILTER SECTION ===== */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 sticky top-16 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search places by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-5 py-3 pl-12 rounded-lg border-2 border-gray-200 focus:border-forest-600 focus:outline-none transition-colors duration-200"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedCategory === cat.id
                    ? 'bg-forest-800 text-white shadow-lg scale-105'
                    : 'bg-white text-forest-800 border-2 border-gray-200 hover:border-forest-600'
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="text-sm">{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          <p className="mt-6 text-monsoon-600 font-medium">
            Showing {filteredPlaces.length} place{filteredPlaces.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* ===== PLACES GRID ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {filteredPlaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-200">
                    <img
                      src={place.image}
                      alt={place.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className={`px-4 py-2 rounded-full text-white font-semibold text-sm backdrop-blur-sm ${
                          place.category === 'temple'
                            ? 'bg-amber-600/80'
                            : place.category === 'mythology'
                            ? 'bg-purple-600/80'
                            : 'bg-green-600/80'
                        }`}
                      >
                        {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-1">
                      <span className="text-yellow-400 text-lg">★</span>
                      <span className="font-bold text-forest-800">{place.rating}</span>
                    </div>

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-forest-800 mb-2 group-hover:text-forest-600 transition-colors duration-300">
                      {place.name}
                    </h3>

                    {/* Description */}
                    <p className="text-monsoon-600 text-sm sm:text-base mb-4 line-clamp-2 group-hover:line-clamp-3 transition-all duration-300">
                      {place.description}
                    </p>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-5 pb-5 border-b border-gray-200">
                      {/* Distance */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-lg">◐</span>
                        <span className="text-monsoon-600 font-medium">{place.distance}</span>
                      </div>

                      {/* Best Time */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-lg">◉</span>
                        <span className="text-monsoon-600 font-medium">{place.bestTime}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300 transform hover:scale-105">
                        Learn More
                      </button>
                      <button className="px-4 py-2 border-2 border-forest-800 text-forest-800 rounded-lg font-semibold hover:bg-forest-800 hover:text-white transition-all duration-300">
                        ♥️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* No Results State */
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-forest-800 mb-2">No places found</h3>
              <p className="text-monsoon-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                }}
                className="px-6 py-3 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-800 mb-12 text-center">
            Why Visit These Places?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '▦', label: 'Historic Sites', value: '15+' },
              { icon: '◆', label: 'Nature Trails', value: '20+' },
              { icon: '■', label: 'Mythological', value: '10+' },
              { icon: '★', label: 'Avg Rating', value: '4.7' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold text-forest-800 mb-1">
                  {stat.value}
                </div>
                <div className="text-monsoon-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-800 to-forest-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Explore?
          </h2>
          <p className="text-lg text-forest-100 mb-8">
            Plan your itinerary and book your adventure to Osam Hill & Chichod today
          </p>
          <button className="px-8 py-4 bg-accent-mint text-forest-800 rounded-lg font-bold text-lg hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Plan Your Visit
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlacesPage;
