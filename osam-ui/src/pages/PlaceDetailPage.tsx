import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface PlaceDetail {
  id: number;
  name: string;
  category: 'temple' | 'mythology' | 'nature';
  rating: number;
  distance: string;
  elevation: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  story: string;
  bestTimeToVisit: {
    season: string;
    months: string;
    temperature: string;
    highlights: string[];
  }[];
  location: {
    coordinates: string;
    address: string;
    nearbyPlaces: string[];
  };
  activities: string[];
  accessibility: {
    difficulty: string;
    duration: string;
    facilities: string[];
  };
}

const PLACE_DETAIL: PlaceDetail = {
  id: 1,
  name: 'Chichod Ancient Temple',
  category: 'temple',
  rating: 4.9,
  distance: '1.5 km from town center',
  elevation: '850 meters above sea level',
  gallery: [
    'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
  ],
  shortDescription: 'A centuries-old temple with intricate stone carvings and architectural marvel.',
  fullDescription:
    'Chichod Ancient Temple stands as a magnificent testament to the architectural and artistic brilliance of the medieval period. Built with locally quarried stone and adorned with intricate carvings depicting scenes from Hindu scriptures, this temple represents a pinnacle of religious devotion and craftsmanship. The temple complex spans over 2 acres and includes the main sanctum, multiple smaller shrines, and a traditional courtyard with a sacred well. Every corner of this architectural masterpiece tells a story of faith, sacrifice, and the enduring spirit of the local community.',
  story:
    'According to local legends, Chichod Temple was built by a devout king during the 12th century after receiving a divine vision. The king saw the deity Devi Chichod in his dreams, instructing him to build a temple at this sacred location. Upon waking, he gathered the finest craftsmen from across the kingdom and initiated construction. The temple was completed after 7 years of dedicated work. It is said that the water from the sacred well within the temple premises has healing properties and is blessed by the deity herself. Many devotees have reported miraculous healings and spiritual transformations after visiting this sacred place. During festivals, the temple glows with thousands of oil lamps, creating a breathtaking sight that attracts pilgrims from all corners of the land.',
  bestTimeToVisit: [
    {
      season: 'Monsoon',
      months: 'July - September',
      temperature: '18-24°C',
      highlights: ['Lush green surroundings', 'Fresh water flows', 'Misty mornings', 'Photography paradise'],
    },
    {
      season: 'Summer',
      months: 'March - June',
      temperature: '15-28°C',
      highlights: ['Clear skies', 'Perfect trekking weather', 'Early morning darshan', 'Fewer crowds'],
    },
    {
      season: 'Winter',
      months: 'October - February',
      temperature: '10-20°C',
      highlights: ['Crisp mornings', 'Star-filled nights', 'Festival season', 'Ideal for meditation'],
    },
  ],
  location: {
    coordinates: '21.3789° N, 75.8469° E',
    address: 'Osam Hill Region, Madhya Pradesh, India',
    nearbyPlaces: ['Osam Hill Summit (2 km)', 'Sacred Lake (3 km)', 'Forest Trails (1.5 km)'],
  },
  activities: ['Temple darshan', 'Photography', 'Meditation', 'Rituals', 'Historical tours', 'Spiritual ceremonies'],
  accessibility: {
    difficulty: 'Moderate',
    duration: '2-3 hours',
    facilities: ['Parking available', 'Drinking water', 'Restrooms', 'Guide services', 'Local vendors'],
  },
};

const PlaceDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'story' | 'visit'>('overview');

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + PLACE_DETAIL.gallery.length) % PLACE_DETAIL.gallery.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % PLACE_DETAIL.gallery.length);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'temple':
        return { bg: 'bg-amber-600', text: 'Temples' };
      case 'mythology':
        return { bg: 'bg-purple-600', text: 'Mythology' };
      case 'nature':
        return { bg: 'bg-green-600', text: 'Nature' };
      default:
        return { bg: 'bg-forest-600', text: 'Place' };
    }
  };

  const categoryColor = getCategoryColor(PLACE_DETAIL.category);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== BACK NAVIGATION ===== */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-forest-800 hover:text-forest-600 font-semibold transition-colors duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Places
          </button>
        </div>
      </div>

      {/* ===== IMAGE GALLERY / CAROUSEL ===== */}
      <section className="relative w-full h-96 sm:h-[500px] lg:h-[600px] bg-gray-900 overflow-hidden group">
        {/* Main Image */}
        <img
          src={PLACE_DETAIL.gallery[currentImageIndex]}
          alt={`${PLACE_DETAIL.name} - ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Navigation Arrows */}
        {PLACE_DETAIL.gallery.length > 1 && (
          <>
            {/* Left Arrow */}
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-forest-800 p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow */}
            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-forest-800 p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
              {PLACE_DETAIL.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white w-8' : 'bg-white/50 w-2 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 right-4 z-10 bg-black/60 text-white px-4 py-2 rounded-lg backdrop-blur-sm font-semibold">
          {currentImageIndex + 1} / {PLACE_DETAIL.gallery.length}
        </div>
      </section>

      {/* ===== HEADER SECTION ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Title & Category */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className={`${categoryColor.bg} text-white px-4 py-2 rounded-full font-semibold text-sm`}>
                {categoryColor.text}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐</span>
                <span className="font-bold text-forest-800">{PLACE_DETAIL.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-3">{PLACE_DETAIL.name}</h1>
            <p className="text-lg text-monsoon-600 mb-4">{PLACE_DETAIL.shortDescription}</p>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-6 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📍</span>
                <span className="text-monsoon-600 font-medium">{PLACE_DETAIL.distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">⛏️</span>
                <span className="text-monsoon-600 font-medium">{PLACE_DETAIL.elevation}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 sm:flex-col">
            <button className="flex-1 px-6 py-3 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300">
              Visit
            </button>
            <button className="flex-1 px-6 py-3 border-2 border-forest-800 text-forest-800 rounded-lg font-semibold hover:bg-forest-800 hover:text-white transition-colors duration-300">
              Share
            </button>
            <button className="px-6 py-3 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500 hover:text-white transition-colors duration-300">
              ♥️
            </button>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <section className="sticky top-20 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'story', label: 'Story & History' },
              { id: 'visit', label: 'Plan Your Visit' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 font-semibold transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'border-forest-800 text-forest-800'
                    : 'border-transparent text-monsoon-600 hover:text-forest-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTENT SECTIONS ===== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="text-3xl font-bold text-forest-800 mb-4">About this Place</h2>
                <p className="text-lg text-monsoon-600 leading-relaxed mb-4">{PLACE_DETAIL.fullDescription}</p>
              </div>

              {/* Activities */}
              <div>
                <h3 className="text-2xl font-bold text-forest-800 mb-4">Activities & Experiences</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {PLACE_DETAIL.activities.map((activity, idx) => (
                    <div key={idx} className="bg-forest-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
                      <p className="font-semibold text-forest-800">{activity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Location Map Placeholder */}
              <div>
                <h3 className="text-2xl font-bold text-forest-800 mb-4">Location</h3>
                <div className="relative bg-gray-100 rounded-xl overflow-hidden h-96 flex items-center justify-center border-2 border-gray-200">
                  <div className="text-center">
                    <div className="text-6xl mb-3">🗺️</div>
                    <p className="text-gray-600 font-semibold mb-2">Interactive Map</p>
                    <p className="text-sm text-monsoon-600">
                      {PLACE_DETAIL.location.coordinates}
                    </p>
                    <p className="text-sm text-monsoon-600">{PLACE_DETAIL.location.address}</p>
                    <button className="mt-4 px-6 py-2 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors">
                      Open in Maps
                    </button>
                  </div>
                </div>
              </div>

              {/* Nearby Places */}
              <div>
                <h3 className="text-2xl font-bold text-forest-800 mb-4">Nearby Places</h3>
                <div className="space-y-3">
                  {PLACE_DETAIL.location.nearbyPlaces.map((place, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span className="text-2xl">📍</span>
                      <div>
                        <p className="font-semibold text-forest-800">{place}</p>
                      </div>
                      <svg className="w-5 h-5 text-forest-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Accessibility Info */}
              <div className="bg-forest-50 rounded-xl p-6 mb-6 sticky top-40">
                <h4 className="text-xl font-bold text-forest-800 mb-4">Accessibility</h4>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-monsoon-600 mb-1">Difficulty Level</p>
                    <p className="font-bold text-forest-800">{PLACE_DETAIL.accessibility.difficulty}</p>
                  </div>
                  <div>
                    <p className="text-sm text-monsoon-600 mb-1">Estimated Duration</p>
                    <p className="font-bold text-forest-800">{PLACE_DETAIL.accessibility.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-monsoon-600 mb-2">Facilities</p>
                    <ul className="space-y-2">
                      {PLACE_DETAIL.accessibility.facilities.map((facility, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-accent-mint">✓</span>
                          <span className="text-sm text-forest-700">{facility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STORY & HISTORY TAB */}
        {activeTab === 'story' && (
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold text-forest-800 mb-8">Mythological & Historical Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg text-monsoon-600 leading-relaxed whitespace-pre-wrap">{PLACE_DETAIL.story}</p>
            </div>

            {/* Story Highlights */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Built in', content: '12th Century' },
                { title: 'Architectural Style', content: 'Medieval Hindu Temple' },
                { title: 'Sacred Well', content: 'Healing properties' },
                { title: 'Festival Light Show', content: 'Thousands of lamps' },
              ].map((item, idx) => (
                <div key={idx} className="bg-gradient-to-br from-forest-50 to-accent-mint/10 rounded-xl p-6 border-l-4 border-forest-800">
                  <p className="text-sm text-monsoon-600 font-semibold mb-1 uppercase">
                    {item.title}
                  </p>
                  <p className="text-2xl font-bold text-forest-800">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PLAN YOUR VISIT TAB */}
        {activeTab === 'visit' && (
          <div className="max-w-4xl">
            <h2 className="text-4xl font-bold text-forest-800 mb-8">Best Time to Visit</h2>

            {/* Seasonal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {PLACE_DETAIL.bestTimeToVisit.map((season, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden border-t-4 border-accent-mint"
                >
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-forest-800 mb-2">{season.season}</h3>
                    <p className="text-sm text-monsoon-600 mb-4 font-semibold">{season.months}</p>
                    <p className="text-lg text-accent-gold font-bold mb-4">{season.temperature}</p>

                    <div className="space-y-2">
                      {season.highlights.map((highlight, hidx) => (
                        <div key={hidx} className="flex items-center gap-2">
                          <span className="text-lg">✨</span>
                          <span className="text-sm text-forest-700">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Travel Tips */}
            <div className="bg-forest-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-forest-800 mb-6">Travel Tips</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    icon: '🚗',
                    title: 'Getting There',
                    description: 'Regular buses and taxis available from town center. Allow 30 minutes travel time.',
                  },
                  {
                    icon: '🏨',
                    title: 'Accommodation',
                    description: 'Multiple hotels and guesthouses near the temple. Book in advance during festivals.',
                  },
                  {
                    icon: '🍽️',
                    title: 'Food & Dining',
                    description: 'Local vegetarian restaurants nearby. Temple offers free meals to devotees.',
                  },
                  {
                    icon: '📸',
                    title: 'Photography',
                    description: 'Best light during golden hour. Permit may be required for commercial shoots.',
                  },
                ].map((tip, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-6">
                    <div className="text-4xl mb-3">{tip.icon}</div>
                    <h4 className="font-bold text-forest-800 mb-2">{tip.title}</h4>
                    <p className="text-sm text-monsoon-600">{tip.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== RELATED PLACES ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-forest-800 mb-8">Explore Nearby</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Osam Hill Summit', distance: '2 km away' },
              { name: 'Sacred Lake', distance: '3 km away' },
              { name: 'Forest Trails', distance: '1.5 km away' },
            ].map((related, idx) => (
              <button
                key={idx}
                className="text-left bg-white rounded-lg shadow hover:shadow-lg transition-all hover:-translate-y-1 p-6 group"
              >
                <div className="h-40 bg-gradient-to-br from-forest-100 to-accent-mint/20 rounded-lg mb-4 flex items-center justify-center text-4xl">
                  📍
                </div>
                <h4 className="text-lg font-bold text-forest-800 group-hover:text-forest-600 mb-1">
                  {related.name}
                </h4>
                <p className="text-sm text-monsoon-600">{related.distance}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-800 to-forest-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-lg text-forest-100 mb-8">
            Plan your journey and create unforgettable memories at this sacred destination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-accent-mint text-forest-800 rounded-lg font-bold hover:bg-white transition-all duration-300 transform hover:scale-105">
              Book Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-forest-800 transition-all duration-300">
              View Packages
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlaceDetailPage;
