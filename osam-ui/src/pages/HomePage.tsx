/**
 * Home Page
 * Landing page showcasing Osam Hill & Chichod
 */

import React from "react";

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-forest opacity-75"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')",
          }}
        ></div>

        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Welcome to Osam Hill
            </h1>
            <p className="text-xl md:text-2xl text-monsoon-100 mb-8 drop-shadow-md">
              Discover the Sacred Heritage and Natural Beauty
            </p>
            <button className="px-8 py-3 bg-accent-mint hover:bg-accent-mint/90 text-forest-900 font-bold rounded-lg transition-all duration-200 transform hover:scale-105 text-lg">
              Explore Now
            </button>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Places Card */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
            <div className="h-40 bg-gradient-nature"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-forest-800 mb-3">
                📍 Places
              </h3>
              <p className="text-monsoon-600 mb-4">
                Explore sacred sites and natural landmarks around Osam Hill.
              </p>
              <a
                href="/places"
                className="inline-block px-4 py-2 bg-forest-600 text-white rounded hover:bg-forest-700 transition-colors duration-200"
              >
                Discover Places
              </a>
            </div>
          </div>

          {/* Mythology Card */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
            <div className="h-40 bg-gradient-monsoon"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-monsoon-800 mb-3">
                📚 Mythology
              </h3>
              <p className="text-monsoon-600 mb-4">
                Learn the fascinating legends and myths of this sacred region.
              </p>
              <a
                href="/mythology"
                className="inline-block px-4 py-2 bg-monsoon-600 text-white rounded hover:bg-monsoon-700 transition-colors duration-200"
              >
                Read Stories
              </a>
            </div>
          </div>

          {/* Events Card */}
          <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
            <div className="h-40 bg-gradient-golden"></div>
            <div className="p-6">
              <h3 className="text-2xl font-bold text-brown-900 mb-3">
                🎉 Events
              </h3>
              <p className="text-monsoon-600 mb-4">
                Join festivals and events celebrating our cultural heritage.
              </p>
              <a
                href="/events"
                className="inline-block px-4 py-2 bg-accent-brown text-white rounded hover:bg-opacity-80 transition-colors duration-200"
              >
                View Events
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-forest-800 text-white py-16 my-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Plan Your Visit Today
          </h2>
          <p className="text-lg text-forest-100 mb-8">
            Get comprehensive guides, maps, and travel tips for your journey.
          </p>
          <button className="px-8 py-3 bg-accent-mint text-forest-900 font-bold rounded-lg hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105">
            Visit Planning Guide
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
