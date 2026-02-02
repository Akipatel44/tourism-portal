import React from 'react';
import Layout from '../components/Layout';
import { EventCard } from '../components/EventCard';
import { Event } from '@/api/types/api';
import PastEventCard, { PastEventCardProps } from '../components/PastEventCard';

// Upcoming events data
const UPCOMING_EVENTS: Event[] = [
  {
    id: '1',
    name: 'Osam Hill Marathon: 1000 Stairs Race',
    date: '2025-03-22',
    time: '06:00',
    description:
      'Challenge yourself on a legendary 1000-stair mountain race! Starting from the base of Osam Hill, runners will ascend the ancient stone steps, conquering steep climbs while taking in breathtaking views. This race celebrates human endurance and the spiritual journey of mountain climbing. All skill levels welcome.',
    image_url: 'https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=600&h=400&fit=crop',
    location: 'Osam Hill Base to Summit',
    status: 'upcoming' as const,
    attendees_count: 500,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'Ashadhi Beej Mela: Monsoon Festival',
    date: '2025-06-08',
    time: '10:00',
    description:
      'Experience the vibrant Ashadhi Beej Festival celebrating the start of monsoon season! Join thousands of pilgrims in processions, temple ceremonies, cultural performances, and local food fairs. The festival honors ancient traditions while celebrating the life-giving rains that transform the hills into emerald valleys.',
    image_url: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=600&h=400&fit=crop',
    location: 'Osam Hill Temple & Surrounding Villages',
    status: 'upcoming' as const,
    attendees_count: 5000,
    created_at: '2025-01-01T00:00:00Z',
    updated_at: '2025-01-01T00:00:00Z',
  },
];

// Past events data
const PAST_EVENTS: PastEventCardProps[] = [
  {
    title: 'Summer Trek Festival 2024',
    date: 'May 2024',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    attendees: 250,
  },
  {
    title: 'Monsoon Photography Workshop',
    date: 'July 2024',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    attendees: 80,
  },
  {
    title: 'Temple Restoration Drive',
    date: 'September 2024',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=300&fit=crop',
    attendees: 120,
  },
  {
    title: 'Harvest Festival Celebration',
    date: 'October 2024',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
    attendees: 500,
  },
  {
    title: 'Winter Wildlife Expedition',
    date: 'December 2024',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    attendees: 150,
  },
  {
    title: 'Flower Bloom Festival',
    date: 'February 2024',
    image: 'https://images.unsplash.com/photo-1504939149991-0c6b78b639f9?w=400&h=300&fit=crop',
    attendees: 300,
  },
];

export default function EventsPage() {
  return (
    <Layout pageTitle={undefined}>
      {/* Intro Banner */}
      <section className="mb-12">
        <div
          className="relative w-full h-80 md:h-96 bg-cover bg-center rounded-xl overflow-hidden"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1200&h=600&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-6 md:px-8 pb-8 text-white">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Events & Festivals</h1>
              <p className="mt-3 text-lg text-white/80 max-w-2xl">
                Join us for celebrations that honor tradition, nature, and community—where pilgrims, adventurers, and storytellers gather at Osam Hill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">🎉</span>
              <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900">Upcoming Events</h2>
            </div>
            <p className="text-stone-600">Mark your calendar for these unmissable celebrations at Osam Hill.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {UPCOMING_EVENTS.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Event Highlights / What to Expect */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0 bg-gradient-to-r from-emerald-50 to-forest-50 rounded-xl shadow-md p-8 border border-emerald-200">
          <h3 className="text-2xl font-bold text-monsoon-900 mb-6">✨ What to Expect</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-lg font-semibold text-forest-700 mb-2">🏔️ Adventure & Challenge</p>
              <p className="text-stone-700">Push your limits on scenic mountain races and outdoor expeditions designed for all fitness levels.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-forest-700 mb-2">🙏 Spiritual Immersion</p>
              <p className="text-stone-700">Connect with ancient traditions through temple ceremonies, guided meditations, and sacred rituals.</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-forest-700 mb-2">🎭 Cultural Celebration</p>
              <p className="text-stone-700">Experience vibrant performances, local cuisine, artisan markets, and community gatherings.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Gallery */}
      <section className="mb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">📸</span>
              <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900">Past Events Gallery</h2>
            </div>
            <p className="text-stone-600">Relive the magic from our previous celebrations—see what our community has experienced.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PAST_EVENTS.map((event, idx) => (
              <PastEventCard key={idx} {...event} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="mb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0 bg-white rounded-xl shadow-md p-8 border border-stone-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-bold text-monsoon-900 mb-2">Don't miss upcoming events!</h3>
              <p className="text-stone-600">Subscribe to our newsletter for event updates, early registration, and special offers.</p>
            </div>
            <div className="w-full md:w-auto flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 md:flex-none px-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-600"
              />
              <button className="px-6 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Festive Footer */}
      <section className="mt-12 pt-8 border-t border-stone-200 text-center">
        <p className="text-lg text-stone-700 mb-6">
          Whether you seek adventure, spirituality, or community—there's an event at Osam Hill for you. 🌿✨
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/places" className="inline-flex items-center justify-center px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white rounded-md text-sm font-medium">
            Explore Places
          </a>
          <a href="/visit-guide" className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 bg-white text-monsoon-900 rounded-md text-sm font-medium hover:bg-stone-50">
            Plan Your Visit
          </a>
        </div>
      </section>
    </Layout>
  );
}
