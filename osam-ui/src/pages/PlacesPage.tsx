import React, { useState } from 'react';

interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
  category: 'temple' | 'mythology' | 'nature';
  distance: string;
  bestTime: string;
  rating: number;
}

const PLACES_DATA: Place[] = [
  {
    id: 1,
    name: 'Osam Hill Summit',
    description: 'The main sacred peak offering panoramic views of the entire region with spiritual significance.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'nature',
    distance: '2 km from town',
    bestTime: 'Morning (5 AM - 7 AM)',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Chichod Ancient Temple',
    description: 'A centuries-old temple with intricate stone carvings and architectural marvel of the region.',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
    category: 'temple',
    distance: '1.5 km from town',
    bestTime: 'Evening (6 PM - 8 PM)',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Mystic Forest Trail',
    description: 'Enchanting woodland path with rare species, waterfalls, and serene meditation spots.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop',
    category: 'nature',
    distance: '3 km from town',
    bestTime: 'Afternoon (2 PM - 5 PM)',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Devashree Temple Ruins',
    description: 'Ancient ruins of the legendary Devashree temple with mythological inscriptions and carvings.',
    image: 'https://images.unsplash.com/photo-1549887534-7eb63f1f58ab?w=600&h=400&fit=crop',
    category: 'temple',
    distance: '5 km from town',
    bestTime: 'Morning (6 AM - 9 AM)',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'The Sacred Lake',
    description: 'Legend says gods bathed here. Pristine waters surrounded by divine atmosphere and mythology.',
    image: 'https://images.unsplash.com/photo-1506704720897-c6b0b8ef6dba?w=600&h=400&fit=crop',
    category: 'mythology',
    distance: '4 km from town',
    bestTime: 'Sunrise (5:30 AM - 6:30 AM)',
    rating: 4.8,
  },
  {
    id: 6,
    name: 'Celestial Valley Viewpoint',
    description: 'Breathtaking vistas where ancient gods are believed to have descended from heavens.',
    image: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=600&h=400&fit=crop',
    category: 'mythology',
    distance: '6 km from town',
    bestTime: 'Sunset (5 PM - 7 PM)',
    rating: 4.7,
  },
  {
    id: 7,
    name: 'Waterfall Cascade',
    description: 'Magnificent 3-tiered waterfall with emerald pools, perfect for nature photography.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'nature',
    distance: '7 km from town',
    bestTime: 'Afternoon (3 PM - 6 PM)',
    rating: 4.9,
  },
  {
    id: 8,
    name: 'Temple of Eternal Lights',
    description: 'Medieval temple famous for its evening light show and devotional ceremonies.',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&h=400&fit=crop',
    category: 'temple',
    distance: '2.5 km from town',
    bestTime: 'Evening (6 PM - 9 PM)',
    rating: 4.8,
  },
  {
    id: 9,
    name: 'Legends Rock Formation',
    description: 'Ancient rock formations shaped like legendary heroes from Hindu mythology.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop',
    category: 'mythology',
    distance: '3.5 km from town',
    bestTime: 'Morning (6 AM - 9 AM)',
    rating: 4.6,
  },
];

const PlacesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'temple' | 'mythology' | 'nature'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter places based on category and search
  const filteredPlaces = PLACES_DATA.filter((place) => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Places', icon: '🌍', color: 'forest' },
    { id: 'temple', label: 'Temples', icon: '🏛️', color: 'accent-gold' },
    { id: 'mythology', label: 'Mythology', icon: '📚', color: 'monsoon' },
    { id: 'nature', label: 'Nature', icon: '🌲', color: 'green' },
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
                      <span className="text-yellow-400 text-lg">⭐</span>
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
                        <span className="text-lg">📍</span>
                        <span className="text-monsoon-600 font-medium">{place.distance}</span>
                      </div>

                      {/* Best Time */}
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-lg">🕐</span>
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
              { icon: '🏛️', label: 'Historic Sites', value: '15+' },
              { icon: '🌲', label: 'Nature Trails', value: '20+' },
              { icon: '📚', label: 'Mythological', value: '10+' },
              { icon: '⭐', label: 'Avg Rating', value: '4.7' },
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
