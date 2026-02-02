import React from 'react';
import Layout from '../../components/Layout';
import ImageCarousel from '../../components/ImageCarousel';

// Dummy place data
const PLACE_DETAILS: Record<string, any> = {
  '1': {
    id: '1',
    name: 'Osam Hill Temple',
    category: 'Temple',
    description:
      'Perched at an elevation of 1,200 meters, Osam Hill Temple is an architectural marvel and spiritual sanctuary. Built over three centuries ago, it combines traditional hill-station aesthetics with intricate stone carvings that tell stories of local devotion.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    mythology:
      'Legend has it that a sage once meditated on this peak for 40 years, and divine light descended upon the hilltop. Local elders say the temple was built to mark this sacred moment. Pilgrims believe that wishes made here during monsoon season are especially blessed.',
    bestTimeToVisit: [
      { season: 'Monsoon (June–September)', details: 'Misty mornings, blooming flowers, and cool breezes.' },
      { season: 'Winter (November–February)', details: 'Clear skies, perfect for sunrise and sunset viewing.' },
      { season: 'Spring (March–May)', details: 'Ideal for trekking with pleasant weather.' },
    ],
    location: { lat: 15.8242, lng: 74.5292, name: 'Osam Hill, Western Ghats' },
  },
  '2': {
    id: '2',
    name: 'Chichod Summit',
    category: 'Nature',
    description:
      'Chichod Summit stands at 1,450 meters and offers one of the most breathtaking panoramic views in the region. The trek to the summit winds through dense forests and emerald meadows, rewarding hikers with unparalleled vistas of three surrounding valleys.',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    ],
    mythology:
      'In ancient texts, Chichod is described as the "Peak of Eagles"—a place where celestial beings were said to dwell. Local stories speak of a giant eagle that guides lost travelers to safety.',
    bestTimeToVisit: [
      { season: 'Monsoon (June–September)', details: 'Dramatic clouds, waterfalls, and lush greenery.' },
      { season: 'Winter (November–February)', details: 'Crisp air, stunning sunrises, and occasional frost.' },
      { season: 'Spring (March–May)', details: 'Wildflowers bloom across the meadows.' },
    ],
    location: { lat: 15.8356, lng: 74.5401, name: 'Chichod, Western Ghats' },
  },
};

type PlaceDetailPageProps = {
  params: { id: string };
};

export default function PlaceDetailPage() {
  // In a real app, get `id` from router params
  const id = '1'; // Dummy default

  const place = PLACE_DETAILS[id];

  if (!place) {
    return (
      <Layout pageTitle="Place Not Found">
        <div className="text-center py-12">
          <p className="text-stone-600">We couldn't find the place you're looking for.</p>
          <a href="/places" className="mt-4 inline-block text-forest-600 hover:underline">
            Back to Places
          </a>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Back navigation */}
      <div className="mb-6">
        <a href="/places" className="inline-flex items-center gap-2 text-forest-600 hover:text-forest-700 font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Places
        </a>
      </div>

      {/* Image Carousel */}
      <ImageCarousel images={place.images} title={place.name} />

      {/* Title & Category */}
      <div className="mt-8 mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl md:text-4xl font-bold text-monsoon-900">{place.name}</h1>
          <span
            className={`inline-flex items-center px-4 py-1 rounded-full text-sm font-medium ${
              place.category === 'Temple'
                ? 'bg-sky-100 text-sky-800'
                : place.category === 'Mythology'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-green-100 text-green-800'
            }`}
          >
            {place.category}
          </span>
        </div>
        <p className="text-stone-500 text-sm">{place.location.name}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-2xl font-bold text-monsoon-900 mb-4">About</h2>
            <p className="text-base leading-relaxed text-stone-700">{place.description}</p>
          </section>

          {/* Mythology / Historical Block */}
          <section className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded">
            <h2 className="text-2xl font-bold text-monsoon-900 mb-4">🗿 Mythology & History</h2>
            <p className="text-base leading-relaxed text-stone-700">{place.mythology}</p>
          </section>

          {/* Map Placeholder */}
          <section>
            <h2 className="text-2xl font-bold text-monsoon-900 mb-4">Location</h2>
            <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
              <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stone-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-stone-600 text-sm">
                  Lat: {place.location.lat}, Lng: {place.location.lng}
                </p>
                <p className="text-stone-500 text-xs mt-1">(Map integration coming soon)</p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Best Time to Visit */}
          <section className="sticky top-20 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-monsoon-900 mb-4">🗓️ Best Time to Visit</h3>
            <div className="space-y-4">
              {place.bestTimeToVisit.map((season: any, idx: number) => (
                <div key={idx} className="pb-4 border-b border-stone-200 last:border-0 last:pb-0">
                  <p className="font-semibold text-forest-700 text-sm">{season.season}</p>
                  <p className="text-xs text-stone-600 mt-1">{season.details}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button className="mt-6 w-full px-4 py-2 bg-forest-600 hover:bg-forest-700 text-white rounded-md font-medium transition-colors">
              Plan Your Visit
            </button>
          </section>
        </div>
      </div>

      {/* Related Places / Footer spacing */}
      <div className="mt-12 pt-8 border-t border-stone-200">
        <p className="text-stone-600 text-center">
          Exploring more places? <a href="/places" className="text-forest-600 hover:underline font-medium">
            Browse all places
          </a>
        </p>
      </div>
    </Layout>
  );
}
