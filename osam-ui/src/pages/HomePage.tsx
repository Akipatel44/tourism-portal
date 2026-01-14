import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('monsoon');

  // Highlight cards data
  const highlights = [
    {
      id: 1,
      title: 'Ancient Temples',
      description: 'Centuries-old temples with intricate architecture and deep spiritual significance',
      icon: '▦',
      color: 'from-amber-600 to-amber-700',
      link: '/places',
    },
    {
      id: 2,
      title: 'Mythological Heritage',
      description: 'Explore rich legends and cultural narratives passed down through generations',
      icon: '■',
      color: 'from-purple-600 to-purple-700',
      link: '/mythology',
    },
    {
      id: 3,
      title: 'Natural Landscapes',
      description: 'Experience breathtaking waterfalls, forests, and pristine scenic viewpoints',
      icon: '◆',
      color: 'from-emerald-600 to-emerald-700',
      link: '/nature',
    },
    {
      id: 4,
      title: 'Festivals & Events',
      description: 'Year-round celebrations, festivals, and cultural experiences',
      icon: '●',
      color: 'from-rose-600 to-rose-700',
      link: '/events',
    },
  ];

  // Seasonal info
  const seasonalContent = {
    monsoon: {
      title: 'Monsoon Magic',
      subtitle: 'July to September',
      description: 'Experience the lush greenery, magnificent waterfalls, and refreshing misty mornings. Perfect for nature lovers and photographers.',
      highlights: ['Waterfall Treks', 'Lush Landscapes', 'Scenic Photography', 'Misty Mornings'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    },
    summer: {
      title: 'Summer Serenity',
      subtitle: 'March to June',
      description: 'Cool mountain breeze, clear skies, and pleasant weather. Ideal for adventure activities and sightseeing.',
      highlights: ['Clear Skies', 'Adventure Activities', 'Temperature: 15-25°C', 'Best Photography'],
      image: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=1200&h=600&fit=crop',
    },
    winter: {
      title: 'Winter Charm',
      subtitle: 'October to February',
      description: 'Cool mornings with misty valleys and occasional frost. Experience the serene beauty with warm hospitality.',
      highlights: ['Misty Valleys', 'Cool Mornings', 'Clear Nights', 'Cozy Stays'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    },
  };

  const currentSeason = seasonalContent[activeTab as keyof typeof seasonalContent];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section
        className="relative w-full h-screen max-h-[700px] bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=900&fit=crop")',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/50 opacity-60"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-in">
            <p className="text-emerald-300 text-lg font-semibold tracking-wider uppercase">
              Discover Sacred Beauty
            </p>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Osam Hill & Chichod
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Where ancient temples meet pristine nature. Discover mythology, adventure, and cultural treasures in the heart of nature.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/places"
              className="inline-flex items-center justify-center px-8 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition-colors gap-2"
            >
              Explore Places
            </Link>
            <Link
              to="/visitor-guide"
              className="inline-flex items-center justify-center px-8 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors border border-white/30"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-pulse">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== HIGHLIGHTS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-accent-mint font-semibold text-sm uppercase tracking-wider mb-2">
              Discover
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">
              Why Choose Osam Hill?
            </h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              A unique destination offering spiritual journey, cultural heritage, and natural beauty
            </p>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
            {highlights.map((highlight) => (
              <Link
                key={highlight.id}
                to={highlight.link}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative p-8 bg-white group-hover:bg-opacity-10 transition-all duration-300 h-full flex flex-col justify-between">
                  <div>
                    <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">
                      {highlight.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-forest-800 group-hover:text-white mb-3 transition-colors duration-300">
                      {highlight.title}
                    </h3>
                    <p className="text-monsoon-600 group-hover:text-gray-100 transition-colors duration-300">
                      {highlight.description}
                    </p>
                  </div>

                  {/* Arrow Icon */}
                  <div className="mt-6 flex items-center gap-2 text-accent-mint group-hover:text-white transition-colors duration-300">
                    <span className="font-semibold">Learn More</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEASONAL BANNER SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-accent-mint font-semibold text-sm uppercase tracking-wider mb-2">
              Seasonal Experiences
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">
              Visit Anytime, Experience Differently
            </h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              Each season brings unique beauty and activities to Osam Hill
            </p>
          </div>

          {/* Seasonal Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 sm:mb-12">
            {Object.keys(seasonalContent).map((season) => (
              <button
                key={season}
                onClick={() => setActiveTab(season)}
                className={`px-6 sm:px-8 py-3 rounded-full font-semibold transition-all duration-300 capitalize ${
                  activeTab === season
                    ? 'bg-forest-800 text-white shadow-lg'
                    : 'bg-gray-100 text-forest-800 hover:bg-gray-200'
                }`}
              >
                {season}
              </button>
            ))}
          </div>

          {/* Seasonal Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image */}
            <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-xl">
              <img
                src={currentSeason.image}
                alt={currentSeason.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <p className="text-accent-mint font-semibold text-sm uppercase tracking-wider mb-2">
                {currentSeason.subtitle}
              </p>
              <h3 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">
                {currentSeason.title}
              </h3>
              <p className="text-lg text-monsoon-600 mb-6 leading-relaxed">
                {currentSeason.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-3 mb-8">
                {currentSeason.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-mint rounded-full"></div>
                    <span className="text-forest-700 font-medium">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link
                to="/visit-guide"
                className="inline-flex items-center gap-2 px-6 py-3 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300 w-fit"
              >
                Plan for {currentSeason.title}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== QUICK STATS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-800 to-forest-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '2', label: 'Sacred Hills' },
              { number: '15+', label: 'Temples' },
              { number: '20+', label: 'Waterfalls' },
              { number: '5000+', label: 'Yearly Visitors' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-accent-mint mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-200 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-accent-gold/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-6">
            Ready for Your Journey?
          </h2>
          <p className="text-lg text-monsoon-600 mb-8 max-w-2xl mx-auto">
            Discover the magic of Osam Hill and Chichod. From ancient temples to pristine nature, every moment is unforgettable.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/places"
              className="px-8 py-4 bg-forest-800 text-white rounded-lg font-bold text-lg hover:bg-forest-700 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Explore All Places
            </Link>
            <Link
              to="/visit-guide"
              className="px-8 py-4 border-2 border-forest-800 text-forest-800 rounded-lg font-bold text-lg hover:bg-forest-800 hover:text-white transition-all duration-300 w-full sm:w-auto"
            >
              Complete Travel Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
