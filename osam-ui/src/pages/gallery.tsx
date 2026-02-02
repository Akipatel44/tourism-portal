import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { GalleryItem, GalleryItemType } from '@/components/GalleryItem';
import { Lightbox, LightboxImage } from '@/components/Lightbox';
import { Loader } from '@/components/Loader';
import { EmptyState } from '@/components/EmptyState';

type CategoryFilter = 'All' | 'Monsoon' | 'Temples' | 'Events' | 'Nature';

// Dummy gallery data
const GALLERY_DATA: GalleryItemType[] = [
  // Monsoon images
  {
    id: 'monsoon-1',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    alt: 'Monsoon Clouds',
    category: 'Monsoon',
    caption: 'Heavy monsoon clouds over the hill',
  },
  {
    id: 'monsoon-2',
    src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=400&fit=crop',
    alt: 'Waterfall in Rain',
    category: 'Monsoon',
    caption: 'Cascading waterfalls during peak monsoon',
  },
  {
    id: 'monsoon-3',
    src: 'https://images.unsplash.com/photo-1514896834474-27033805aa75?w=500&h=400&fit=crop',
    alt: 'Monsoon Landscape',
    category: 'Monsoon',
    caption: 'Lush green valleys during monsoon season',
  },
  {
    id: 'monsoon-4',
    src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=400&fit=crop',
    alt: 'Rain on Hill',
    category: 'Monsoon',
    caption: 'Rain-soaked landscape with mist',
  },
  {
    id: 'monsoon-5',
    src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=500&h=400&fit=crop',
    alt: 'Waterfall Flow',
    category: 'Monsoon',
    caption: 'Powerful water flows in monsoon',
  },

  // Temple images
  {
    id: 'temple-1',
    src: 'https://images.unsplash.com/photo-1585301887214-38fb50519928?w=500&h=400&fit=crop',
    alt: 'Ancient Temple',
    category: 'Temples',
    caption: 'Ancient temple with intricate architecture',
  },
  {
    id: 'temple-2',
    src: 'https://images.unsplash.com/photo-1606603696934-ca67fc975f0d?w=500&h=400&fit=crop',
    alt: 'Temple Entrance',
    category: 'Temples',
    caption: 'Grand entrance of sacred temple',
  },
  {
    id: 'temple-3',
    src: 'https://images.unsplash.com/photo-1576837550147-8b55dae76f27?w=500&h=400&fit=crop',
    alt: 'Temple Interior',
    category: 'Temples',
    caption: 'Serene temple interior with spiritual ambiance',
  },
  {
    id: 'temple-4',
    src: 'https://images.unsplash.com/photo-1567427161537-41b75c73bfce?w=500&h=400&fit=crop',
    alt: 'Prayer Hall',
    category: 'Temples',
    caption: 'Devotees in the prayer hall',
  },
  {
    id: 'temple-5',
    src: 'https://images.unsplash.com/photo-1514306688772-2ff4155b2584?w=500&h=400&fit=crop',
    alt: 'Temple at Sunset',
    category: 'Temples',
    caption: 'Temple silhouette during golden hour',
  },

  // Event images
  {
    id: 'event-1',
    src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&h=400&fit=crop',
    alt: 'Marathon Event',
    category: 'Events',
    caption: '1000 Stairs Marathon in progress',
  },
  {
    id: 'event-2',
    src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&h=400&fit=crop',
    alt: 'Festival Celebration',
    category: 'Events',
    caption: 'Festive celebration with local community',
  },
  {
    id: 'event-3',
    src: 'https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=400&fit=crop',
    alt: 'Gathering',
    category: 'Events',
    caption: 'Community gathering at the summit',
  },
  {
    id: 'event-4',
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=400&fit=crop',
    alt: 'Celebration',
    category: 'Events',
    caption: 'Festive lights and celebrations',
  },
  {
    id: 'event-5',
    src: 'https://images.unsplash.com/photo-1540575467063-178f50911e94?w=500&h=400&fit=crop',
    alt: 'Event Crowd',
    category: 'Events',
    caption: 'Joyful crowd at event',
  },

  // Nature images
  {
    id: 'nature-1',
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=400&fit=crop',
    alt: 'Forest Trek',
    category: 'Nature',
    caption: 'Dense forest trails for exploration',
  },
  {
    id: 'nature-2',
    src: 'https://images.unsplash.com/photo-1489749798305-4fea3ba63d60?w=500&h=400&fit=crop',
    alt: 'Mountain View',
    category: 'Nature',
    caption: 'Panoramic mountain landscape',
  },
  {
    id: 'nature-3',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    alt: 'Valley Below',
    category: 'Nature',
    caption: 'Vast valley with lush vegetation',
  },
  {
    id: 'nature-4',
    src: 'https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=500&h=400&fit=crop',
    alt: 'Wildlife',
    category: 'Nature',
    caption: 'Local wildlife in natural habitat',
  },
  {
    id: 'nature-5',
    src: 'https://images.unsplash.com/photo-1434725039752-3a8797489d6d?w=500&h=400&fit=crop',
    alt: 'Mountain Peak',
    category: 'Nature',
    caption: 'Summit view at sunrise',
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItemType | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Filter gallery items based on selected category
  const filteredItems =
    selectedCategory === 'All'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === selectedCategory);

  // Handle image selection for lightbox
  const handleImageClick = (item: GalleryItemType) => {
    setSelectedImage(item);
    const index = filteredItems.findIndex((img) => img.id === item.id);
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  // Handle lightbox navigation
  const handlePrevious = () => {
    const newIndex = selectedIndex === 0 ? filteredItems.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  const handleNext = () => {
    const newIndex = selectedIndex === filteredItems.length - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    setSelectedImage(filteredItems[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') handlePrevious();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedIndex, filteredItems.length]);

  const categoryOptions: CategoryFilter[] = ['All', 'Monsoon', 'Temples', 'Events', 'Nature'];

  return (
    <Layout pageTitle="Photo & Video Gallery">
      {/* Hero Section */}
      <section className="h-56 sm:h-64 md:h-96 bg-gradient-to-r from-forest-600 to-emerald-600 flex items-center justify-center text-white px-4">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-lg md:text-xl text-emerald-50 max-w-2xl">
            Explore the beauty of Osam Hill and Chichod through our curated collection of images
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {categoryOptions.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxOpen(false);
                }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-forest-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center text-gray-600 mb-6">
            <p className="text-sm">
              Showing <span className="font-bold text-forest-600">{filteredItems.length}</span> {selectedCategory === 'All' ? 'photos' : `${selectedCategory.toLowerCase()} photos`}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <Loader variant="skeleton" count={6} />
          ) : filteredItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {filteredItems.map((item) => (
                <GalleryItem
                  key={item.id}
                  item={item}
                  onClick={handleImageClick}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              variant="no-results"
              icon="📸"
              title="No photos found"
              description="Try selecting a different category or explore all our beautiful images."
              actions={[
                {
                  label: 'View All Photos',
                  onClick: () => setSelectedCategory('All'),
                  variant: 'primary',
                },
                {
                  label: 'Back',
                  onClick: () => setSelectedCategory('All'),
                  variant: 'secondary',
                },
              ]}
            />
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        image={selectedImage ? { id: selectedImage.id, src: selectedImage.src, alt: selectedImage.alt, caption: selectedImage.caption } : null}
        onClose={() => setLightboxOpen(false)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        currentIndex={selectedIndex}
        totalImages={filteredItems.length}
      />

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-emerald-50 to-sage-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-forest-900 mb-4">
            Want to Experience This Yourself?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Plan your visit to Osam Hill and Chichod. Explore the places, trek the trails, and create your own memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/places"
              className="px-8 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-semibold"
            >
              Explore Places
            </a>
            <a
              href="/trek"
              className="px-8 py-3 border-2 border-forest-600 text-forest-600 rounded-lg hover:bg-forest-50 transition-colors font-semibold"
            >
              Plan a Trek
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
