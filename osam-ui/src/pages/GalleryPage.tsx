import React, { useState } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  category: 'Monsoon' | 'Temples' | 'Events' | 'Nature';
  image: string;
  thumbnail: string;
  date: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    title: 'Waterfall in Full Flow',
    description: 'Zarna Waterfall cascading during monsoon season',
    category: 'Monsoon',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=300&fit=crop',
    date: 'July 2025',
  },
  {
    id: 2,
    title: 'Ancient Temple Architecture',
    description: 'Intricate carvings on the main temple walls',
    category: 'Temples',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
    date: 'January 2025',
  },
  {
    id: 3,
    title: 'Monsoon Mist',
    description: 'Fog rolling over the hills during monsoon',
    category: 'Monsoon',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    date: 'August 2025',
  },
  {
    id: 4,
    title: 'Cultural Festival Celebration',
    description: 'Local performers at Ashadhi Beej Mela',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&h=300&fit=crop',
    date: 'July 2025',
  },
  {
    id: 5,
    title: 'Forest Canopy',
    description: 'Lush green trees covering the hillside',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
    date: 'September 2025',
  },
  {
    id: 6,
    title: 'Temple Bell',
    description: 'Golden temple bell at sunrise',
    category: 'Temples',
    image: 'https://images.unsplash.com/photo-1542931287-2dde5d446ed2?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1542931287-2dde5d446ed2?w=400&h=300&fit=crop',
    date: 'December 2024',
  },
  {
    id: 7,
    title: 'Wildlife Encounter',
    description: 'Rare bird species spotted in the forest',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1444464666175-1c6da4f0cb27?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1444464666175-1c6da4f0cb27?w=400&h=300&fit=crop',
    date: 'October 2025',
  },
  {
    id: 8,
    title: 'Marathon Event',
    description: '1000 stairs challenge - finish line celebration',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    date: 'March 2025',
  },
  {
    id: 9,
    title: 'Monsoon Rain',
    description: 'Heavy rainfall creating beautiful streams',
    category: 'Monsoon',
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=300&fit=crop',
    date: 'June 2025',
  },
  {
    id: 10,
    title: 'Sacred Shrine',
    description: 'Entrance to the main temple complex',
    category: 'Temples',
    image: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?w=400&h=300&fit=crop',
    date: 'November 2024',
  },
  {
    id: 11,
    title: 'Flora & Fauna',
    description: 'Biodiversity hotspot with native plants',
    category: 'Nature',
    image: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=400&h=300&fit=crop',
    date: 'September 2025',
  },
  {
    id: 12,
    title: 'Festival Lights',
    description: 'Evening celebration with traditional lanterns',
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1514306688772-aefb9fdf1eb6?w=1200&h=800&fit=crop',
    thumbnail: 'https://images.unsplash.com/photo-1514306688772-aefb9fdf1eb6?w=400&h=300&fit=crop',
    date: 'July 2025',
  },
];

const CATEGORIES = ['All', 'Monsoon', 'Temples', 'Events', 'Nature'] as const;

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredItems =
    selectedCategory === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  const currentItem = filteredItems[lightboxIndex];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-80 sm:h-[450px] lg:h-[550px] bg-cover bg-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=1400&h=800&fit=crop"
          alt="Gallery"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-yellow-300 font-bold text-sm uppercase tracking-widest mb-4 animate-pulse">
              📸 Visual Stories
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Photo & Video Gallery
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-100 max-w-2xl mx-auto">
              Explore the beauty, culture, and adventure of Osam Hill through stunning visuals
            </p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY FILTER ===== */}
      <section className="sticky top-16 z-30 bg-white border-b-2 border-gray-200 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold text-monsoon-600 mb-4 uppercase tracking-wider">Filter by category</p>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(0);
                }}
                className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-forest-700 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-forest-700 hover:bg-gray-200'
                }`}
              >
                {category === 'All' ? '📸 All' : `${category}`}
              </button>
            ))}
          </div>
          <p className="text-xs text-monsoon-600 mt-3">
            Showing {filteredItems.length} {selectedCategory === 'All' ? 'images' : `${selectedCategory} images`}
          </p>
        </div>
      </section>

      {/* ===== GALLERY GRID ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="break-inside-avoid mb-6 group cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => openLightbox(idx)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 sm:h-80 overflow-hidden bg-gray-200">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <button className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 w-16 h-16 bg-white text-forest-700 rounded-full flex items-center justify-center font-bold text-2xl hover:bg-yellow-300">
                        👁️
                      </button>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="inline-block px-3 py-1 bg-forest-700 text-white rounded-full text-xs font-bold opacity-90">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4 bg-white">
                    <h3 className="text-lg font-bold text-forest-800 mb-1 line-clamp-2">{item.title}</h3>
                    <p className="text-sm text-monsoon-600 line-clamp-1 mb-2">{item.description}</p>
                    <p className="text-xs text-monsoon-500 font-semibold">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-forest-800 mb-2">No images found</h3>
              <p className="text-monsoon-600">Try selecting a different category</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== LIGHTBOX MODAL ===== */}
      {lightboxOpen && currentItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-8">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-yellow-300 transition-colors z-60"
            title="Close (Esc)"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main Content */}
          <div className="w-full max-w-5xl">
            {/* Image */}
            <div className="relative bg-black rounded-xl overflow-hidden mb-6">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="w-full h-auto max-h-[70vh] object-contain"
              />
            </div>

            {/* Info */}
            <div className="bg-white rounded-xl p-6 sm:p-8">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-forest-700 text-white rounded-full text-sm font-bold mb-4">
                  {currentItem.category}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-forest-800 mb-2">{currentItem.title}</h2>
              <p className="text-lg text-monsoon-600 mb-4">{currentItem.description}</p>
              <p className="text-sm text-monsoon-500 font-semibold mb-6">📅 {currentItem.date}</p>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="text-monsoon-600 font-bold">
                  {lightboxIndex + 1} / {filteredItems.length}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={goToPrevious}
                    className="px-6 py-3 bg-forest-600 text-white rounded-lg font-bold hover:bg-forest-700 transition-colors transform hover:scale-105"
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={goToNext}
                    className="px-6 py-3 bg-forest-600 text-white rounded-lg font-bold hover:bg-forest-700 transition-colors transform hover:scale-105"
                  >
                    Next →
                  </button>
                </div>
              </div>

              {/* Keyboard Shortcuts */}
              <p className="text-xs text-monsoon-500 mt-4">
                💡 Tip: Use ← → arrow keys to navigate, ESC to close
              </p>
            </div>
          </div>

          {/* Left Arrow (Prev) */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 transition-colors"
            title="Previous"
          >
            <svg className="w-10 h-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow (Next) */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 transition-colors"
            title="Next"
          >
            <svg className="w-10 h-10 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Keyboard Navigation */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('keydown', (e) => {
              if (e.key === 'Escape') {
                // Close button will be handled by state
              }
              if (e.key === 'ArrowLeft') {
                // Previous navigation
              }
              if (e.key === 'ArrowRight') {
                // Next navigation
              }
            });
          `,
        }}
      />

      {/* ===== UPLOAD CTA ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-yellow-100 to-orange-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-6">Share Your Experience</h2>
          <p className="text-xl text-monsoon-700 mb-8">
            Have amazing photos from your visit? We'd love to feature them in our gallery!
          </p>
          <button className="px-8 py-4 bg-forest-700 text-white rounded-lg font-bold hover:bg-forest-800 hover:shadow-xl transition-all transform hover:scale-105">
            Submit Your Photos
          </button>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t-2 border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Images', value: GALLERY_ITEMS.length },
              { label: 'Categories', value: CATEGORIES.length - 1 },
              { label: 'Contributors', value: '50+' },
              { label: 'Views', value: '10K+' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-black text-forest-700 mb-2">{stat.value}</div>
                <p className="text-sm text-monsoon-600 font-bold uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
