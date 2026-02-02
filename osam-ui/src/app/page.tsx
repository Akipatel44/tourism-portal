'use client';

import React from 'react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-forest-50 via-emerald-50 to-sky-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-black text-forest-700">🏔️ Osam Tourism</div>
          <div className="flex gap-6 items-center">
            <Link href="/places" className="text-gray-700 hover:text-forest-600 font-medium">Places</Link>
            <Link href="/events" className="text-gray-700 hover:text-forest-600 font-medium">Events</Link>
            <Link href="/gallery" className="text-gray-700 hover:text-forest-600 font-medium">Gallery</Link>
            <Link href="/login" className="px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 font-medium">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 mb-6 leading-tight">
          Welcome to <span className="text-forest-600">Osam Hill</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-12">
          Discover ancient temples, breathtaking mountain peaks, and spiritual traditions at one of India's most mystical destinations.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/places" className="px-8 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 font-semibold text-lg transition-colors">
            Explore Places
          </Link>
          <Link href="/events" className="px-8 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 font-semibold text-lg transition-colors">
            View Events
          </Link>
          <Link href="/gallery" className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold text-lg transition-colors">
            Gallery
          </Link>
        </div>

        <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
            alt="Osam Hill"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">What Makes Osam Special</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🏛️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ancient Temples</h3>
            <p className="text-gray-700">Centuries-old shrines with intricate stone carvings and spiritual significance revered by pilgrims worldwide.</p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">⛰️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Mountain Adventures</h3>
            <p className="text-gray-700">Trek the legendary 1000 stairs, witness stunning sunrises, and challenge yourself on scenic mountain peaks.</p>
          </div>

          <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Natural Beauty</h3>
            <p className="text-gray-700">Lush forests, cascading waterfalls, and pristine wildlife habitats showcase nature's raw, untamed splendor.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-forest-600 to-emerald-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Your Adventure?</h2>
          <p className="text-lg mb-8 opacity-90">Start exploring the mystical Osam Hill today.</p>
          <Link href="/places" className="inline-block px-8 py-3 bg-white text-forest-600 rounded-lg hover:bg-gray-100 font-semibold transition-colors">
            Begin Exploring
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2026 Osam Tourism. All rights reserved. Built with ❤️ for adventurers.</p>
        </div>
      </footer>
    </main>
  );
}
