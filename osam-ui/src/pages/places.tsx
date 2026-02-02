import React, { useState } from 'react';
import Layout from '../components/Layout';
import PlaceCard, { PlaceCardProps } from '../components/PlaceCard';
import { Loader } from '../components/Loader';
import { EmptyState } from '../components/EmptyState';

// Dummy data
const PLACES: PlaceCardProps[] = [
  {
    id: '1',
    name: 'Osam Hill Temple',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Ancient hilltop shrine with panoramic views of the valley.',
    category: 'Temple',
  },
  {
    id: '2',
    name: 'Chichod Summit',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Breathtaking mountain peak perfect for sunrise treks.',
    category: 'Nature',
  },
  {
    id: '3',
    name: 'Sacred Spring',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Holy water spring surrounded by dense forest.',
    category: 'Mythology',
  },
  {
    id: '4',
    name: 'Monsoon Waterfall',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Dramatic cascades that come alive during the monsoon season.',
    category: 'Nature',
  },
  {
    id: '5',
    name: 'Temple of Legends',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Historic temple with intricate stone carvings and mythology tales.',
    category: 'Temple',
  },
  {
    id: '6',
    name: 'Sage\'s Cave',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Ancient cave dwelling linked to local folklore and legends.',
    category: 'Mythology',
  },
  {
    id: '7',
    name: 'Forest Trail',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Scenic walking path through dense biodiversity hotspot.',
    category: 'Nature',
  },
  {
    id: '8',
    name: 'Prayer Bell Temple',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Serene temple known for its ancient bronze bells.',
    category: 'Temple',
  },
  {
    id: '9',
    name: 'God\'s Footprint',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Rock formation believed to be a divine mark in local mythology.',
    category: 'Mythology',
  },
  {
    id: '10',
    name: 'Valley Viewpoint',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Panoramic vista overlooking three valleys and distant hills.',
    category: 'Nature',
  },
];

type FilterCategory = 'All' | 'Temple' | 'Mythology' | 'Nature';

export default function PlacesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPlaces = activeFilter === 'All' ? PLACES : PLACES.filter((p) => p.category === activeFilter);

  const filterButtons: FilterCategory[] = ['All', 'Temple', 'Mythology', 'Nature'];

  return (
    <Layout pageTitle="Places to Visit">
      {/* Filters */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              aria-pressed={activeFilter === filter}
              className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-forest-600 text-white shadow-md'
                  : 'bg-white border border-stone-200 text-monsoon-700 hover:border-forest-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-6">
        <p className="text-xs sm:text-sm text-stone-600">
          Showing <span className="font-semibold">{filteredPlaces.length}</span> of <span className="font-semibold">{PLACES.length}</span> places
        </p>
      </div>

      {/* Grid */}
      {isLoading ? (
        <Loader variant="skeleton" count={6} />
      ) : filteredPlaces.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPlaces.map((place) => (
            <PlaceCard key={place.id} {...place} />
          ))}
        </div>
      ) : (
        <EmptyState
          variant="no-results"
          title="No places found"
          description="Try selecting a different category to explore other places."
          actions={[
            {
              label: 'View All Places',
              onClick: () => setActiveFilter('All'),
              variant: 'primary',
            },
          ]}
        />
      )}
    </Layout>
  );
}
