import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaceById } from '@/hooks/usePlaces';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';

const PlaceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const placeId = id ? parseInt(id, 10) : null;

  const { data: place, isLoading, error } = usePlaceById(placeId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'info' | 'visit'>('overview');

  if (!placeId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          title="Invalid Place"
          message="No place ID provided"
        />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          title="Place Not Found"
          message={error || 'This place does not exist or could not be loaded'}
        />
      </div>
    );
  }

  // Sample gallery (would come from API in real app)
  const gallery = [
    place.image_url || 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop',
  ];

  const currentImage = gallery[currentImageIndex];

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallery.length);
  };

  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      temple: { bg: 'bg-amber-600', text: 'Temple' },
      mythology: { bg: 'bg-purple-600', text: 'Mythology' },
      nature: { bg: 'bg-green-600', text: 'Nature' },
      landmark: { bg: 'bg-blue-600', text: 'Landmark' },
      viewpoint: { bg: 'bg-cyan-600', text: 'Viewpoint' },
      parking: { bg: 'bg-gray-600', text: 'Parking' },
      place: { bg: 'bg-indigo-600', text: 'Place' },
    };
    return colorMap[category] || { bg: 'bg-slate-600', text: 'Location' };
  };

  const categoryColor = getCategoryColor(place.category);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/places')}
            className="flex items-center gap-2 text-forest-800 hover:text-forest-600 font-semibold transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Places
          </button>
        </div>
      </div>

      {/* ===== HERO SECTION WITH IMAGE GALLERY ===== */}
      <section className="relative h-96 sm:h-[500px] lg:h-[600px] overflow-hidden bg-gray-200">
        {/* Main Image */}
        <img
          src={currentImage}
          alt={place.name}
          className="w-full h-full object-cover"
        />

        {/* Image Navigation */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={goToPreviousImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={goToNextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
            >
              <svg
                className="w-6 h-6"
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
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
              {currentImageIndex + 1} / {gallery.length}
            </div>
          </>
        )}

        {/* Overlay with info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8">
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-3 mb-4">
              <span
                className={`${categoryColor.bg} text-white px-4 py-2 rounded-full font-semibold text-sm`}
              >
                {categoryColor.text}
              </span>
              {place.rating && (
                <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-semibold text-sm flex items-center gap-1">
                  <span>★</span>
                  {place.rating.toFixed(1)}
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
              {place.name}
            </h1>
            {place.location && (
              <p className="text-lg text-white/90 flex items-center gap-2">
                <span>📍</span>
                {place.location}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ===== KEY INFO SECTION ===== */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {place.entry_fee !== undefined && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gray-600 text-sm font-medium mb-1">Entry Fee</div>
                <div className="text-2xl font-bold text-forest-800">
                  {place.entry_fee === 0 ? 'Free' : `₹${place.entry_fee}`}
                </div>
              </div>
            )}

            {place.estimated_time && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gray-600 text-sm font-medium mb-1">Duration</div>
                <div className="text-2xl font-bold text-forest-800">{place.estimated_time}</div>
              </div>
            )}

            {place.difficulty_level && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gray-600 text-sm font-medium mb-1">Difficulty</div>
                <div className="text-2xl font-bold text-forest-800">
                  {place.difficulty_level}
                </div>
              </div>
            )}

            {place.best_season && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gray-600 text-sm font-medium mb-1">Best Season</div>
                <div className="text-lg font-bold text-forest-800">{place.best_season}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== TABS SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200 mb-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'info', label: 'Information' },
              { id: 'visit', label: 'Visit Guide' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-4 font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-forest-800 border-b-2 border-forest-800'
                    : 'text-monsoon-600 hover:text-forest-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-forest-800 mb-4">About This Place</h3>
                <p className="text-monsoon-600 text-lg leading-relaxed">
                  {place.description}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-8">
              {place.facilities && place.facilities.length > 0 && (
                <div>
                  <h3 className="text-2xl font-bold text-forest-800 mb-4">Facilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {place.facilities.map((facility, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <span className="text-xl">✓</span>
                        <span className="text-monsoon-600">{facility}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'visit' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-forest-800 mb-4">
                  Plan Your Visit
                </h3>
                <div className="prose max-w-none text-monsoon-600">
                  <p className="mb-4">
                    This {place.category} is best visited during {place.best_season || 'the optimal season'}.
                    Plan to spend {place.estimated_time || '2-3 hours'} here. The difficulty level is {place.difficulty_level || 'moderate'}.
                  </p>
                  {place.entry_fee !== undefined && (
                    <p>
                      Entry fee is {place.entry_fee === 0 ? 'free' : `₹${place.entry_fee}`}. Please
                      check local guidelines before visiting.
                    </p>
                  )}
                </div>
              </div>

              {place.facilities && (
                <div>
                  <h4 className="text-xl font-bold text-forest-800 mb-3">Available Facilities</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {place.facilities.map((fac, idx) => (
                      <li key={idx} className="text-monsoon-600 flex items-center gap-2">
                        <span className="text-lg">▪</span>
                        {fac}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-forest-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Visit?</h2>
          <p className="text-lg text-forest-100 mb-8">
            Start planning your adventure to {place.name}
          </p>
          <button className="px-8 py-4 bg-accent-mint text-forest-800 rounded-lg font-bold text-lg hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Plan Your Trip
          </button>
        </div>
      </section>
    </div>
  );
};

export default PlaceDetailPage;
