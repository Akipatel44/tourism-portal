/**
 * Page Stubs for Osam Tourism Portal
 * Placeholder components for remaining pages
 */

import React from "react";

// Mythology Page
export const MythologyPage: React.FC = () => (
  <div className="min-h-screen">
    <section className="bg-gradient-monsoon text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Mythology</h1>
        <p className="text-xl text-monsoon-100">
          Explore the rich mythology and legends of Osam Hill
        </p>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="prose prose-lg max-w-none">
        <h2>Ancient Stories & Legends</h2>
        <p>Coming soon: Detailed mythology content...</p>
      </div>
    </section>
  </div>
);

// Nature Page
export const NaturePage: React.FC = () => (
  <div className="min-h-screen">
    <section className="bg-gradient-nature text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Nature</h1>
        <p className="text-xl text-forest-100">
          Experience the biodiversity and natural wonders
        </p>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Flora", icon: "🌿" },
          { title: "Fauna", icon: "🦁" },
          { title: "Ecosystems", icon: "🌳" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold text-forest-800 mb-4">
              {item.title}
            </h3>
            <p className="text-monsoon-600">Explore more content coming soon</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// Events Page
export const EventsPage: React.FC = () => (
  <div className="min-h-screen">
    <section className="bg-gradient-golden text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brown-900">
          Events & Festivals
        </h1>
        <p className="text-xl text-brown-800">
          Celebrate culture and heritage with us
        </p>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-6">
        {[1, 2, 3].map((event) => (
          <div
            key={event}
            className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-accent-gold hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-forest-800">
                Festival {event}
              </h3>
              <span className="px-3 py-1 bg-accent-gold text-brown-900 rounded-full text-sm font-semibold">
                Mar 2026
              </span>
            </div>
            <p className="text-monsoon-600 mb-4">Event description coming soon</p>
            <button className="px-6 py-2 bg-forest-600 text-white rounded hover:bg-forest-700 transition-colors">
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// Gallery Page
export const GalleryPage: React.FC = () => (
  <div className="min-h-screen">
    <section className="bg-gradient-forest text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
        <p className="text-xl text-forest-100">
          Visual journey through Osam Hill & Chichod
        </p>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-monsoon-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <div className="w-full h-full bg-gradient-monsoon flex items-center justify-center text-white text-4xl">
              📸
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// Visit Guide Page
export const VisitGuidePage: React.FC = () => (
  <div className="min-h-screen">
    <section className="bg-gradient-forest text-white py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Visit Guide</h1>
        <p className="text-xl text-forest-100">
          Everything you need to know for your visit
        </p>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          {
            title: "Getting Here",
            icon: "🚗",
            desc: "Directions and transportation options",
          },
          {
            title: "Accommodation",
            icon: "🏨",
            desc: "Places to stay near Osam Hill",
          },
          {
            title: "Facilities",
            icon: "🏢",
            desc: "Amenities available for visitors",
          },
          {
            title: "Best Time to Visit",
            icon: "📅",
            desc: "Seasonal information and weather",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h3 className="text-2xl font-bold text-forest-800 mb-2">
              {item.title}
            </h3>
            <p className="text-monsoon-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// Admin Page (Hidden from navigation)
export const AdminPage: React.FC = () => (
  <div className="min-h-screen bg-monsoon-50">
    <section className="bg-monsoon-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
      </div>
    </section>
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-monsoon-800 mb-4">
          Welcome to Admin
        </h2>
        <p className="text-monsoon-600 mb-6">
          Manage content, events, gallery, and more
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {["Content", "Events", "Gallery", "Users"].map((item) => (
            <button
              key={item}
              className="px-6 py-3 bg-forest-600 text-white rounded hover:bg-forest-700 transition-colors"
            >
              Manage {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  </div>
);
