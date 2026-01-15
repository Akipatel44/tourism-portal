import React, { useState, useCallback, useMemo } from 'react';
import { useGalleries, useLazyLoadImages, useFeaturedGalleries, useGalleryById } from '@/hooks/useGallery';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';
import ImageModal from '@/components/ImageModal';
import { GalleryType, GalleryImage } from '@/api/gallery';

const GalleryPage: React.FC = () => {
  // State management
  const [selectedGalleryId, setSelectedGalleryId] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [galleryTypeFilter, setGalleryTypeFilter] = useState<GalleryType | null>(null);

  // Fetch data
  const {
    data: galleries,
    isLoading: loadingGalleries,
    error: errorGalleries,
    hasMore,
    loadMore,
  } = useGalleries(8);

  const { data: selectedGallery, isLoading: loadingImages } = useGalleryById(selectedGalleryId);
  const { data: featuredGalleries } = useFeaturedGalleries();

  // Lazy load images
  const { getImageProps } = useLazyLoadImages();

  // Filter galleries by type
  const filteredGalleries = useMemo(() => {
    if (!galleryTypeFilter) return galleries;
    return galleries.filter((g: any) => g.gallery_type === galleryTypeFilter);
  }, [galleries, galleryTypeFilter]);

  // Get images from selected gallery
  const galleryImages = useMemo(() => {
    return selectedGallery?.gallery_images || [];
  }, [selectedGallery]);

  // Modal navigation handlers
  const handlePrevImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  const handleNextImage = useCallback(() => {
    setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const openImageModal = useCallback((image: GalleryImage, index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSelectGallery = useCallback((galleryId: number) => {
    setSelectedGalleryId(galleryId);
    setSelectedImageIndex(0);
  }, []);

  const handleFilterChange = useCallback((type: GalleryType | null) => {
    setGalleryTypeFilter(type);
  }, []);

  const currentImage = galleryImages[selectedImageIndex] || null;
  const galleryTypeOptions: Array<{ type: GalleryType | null; label: string }> = [
    { type: null, label: 'All Types' },
    { type: 'photos', label: 'Photos' },
    { type: 'videos', label: 'Videos' },
    { type: '360photos', label: '360 Photos' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header Section */}
      <section className="bg-forest-800 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-lg sm:text-xl text-forest-100 max-w-3xl">
            Explore stunning visual moments from sacred sites, festivals, and natural landscapes
          </p>
        </div>
      </section>

      {/* Featured Galleries Section */}
      {featuredGalleries.length > 0 && !loadingGalleries && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-forest-800 mb-8 flex items-center gap-2">
              <span>⭐</span> Featured Collections
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGalleries.slice(0, 3).map((gallery: any) => (
                <button
                  key={gallery.gallery_id}
                  onClick={() => handleSelectGallery(gallery.gallery_id)}
                  className="group relative bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 text-left"
                >
                  <div className="aspect-square bg-gray-200 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">
                      📷
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-forest-800 group-hover:text-forest-600 transition-colors">
                      {gallery.name}
                    </h3>
                    <p className="text-sm text-monsoon-600 line-clamp-2">
                      {gallery.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filter Section */}
      <section className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {galleryTypeOptions.map((option) => (
              <button
                key={option.type || 'all'}
                onClick={() => handleFilterChange(option.type)}
                className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                  galleryTypeFilter === option.type
                    ? 'bg-forest-800 text-white'
                    : 'bg-gray-100 text-forest-800 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Loading State */}
          {loadingGalleries && filteredGalleries.length === 0 && (
            <div className="min-h-[500px] flex items-center justify-center">
              <Loader />
            </div>
          )}

          {/* Error State */}
          {errorGalleries && filteredGalleries.length === 0 && (
            <div className="min-h-[400px] flex items-center justify-center">
              <ErrorMessage
                title="Unable to Load Galleries"
                message={errorGalleries || 'Failed to fetch galleries. Showing cached data instead.'}
              />
            </div>
          )}

          {/* Galleries Grid */}
          {filteredGalleries.length > 0 && (
            <div className="space-y-12">
              {filteredGalleries.map((gallery: any) => (
                <div key={gallery.gallery_id} className="space-y-4">
                  {/* Gallery Header */}
                  <div
                    className={`p-6 rounded-lg cursor-pointer transition-all duration-300 ${
                      selectedGalleryId === gallery.gallery_id
                        ? 'bg-forest-800 text-white shadow-lg'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                    onClick={() => handleSelectGallery(gallery.gallery_id)}
                  >
                    <h3 className="text-2xl font-bold mb-2">{gallery.name}</h3>
                    {gallery.description && (
                      <p className="text-sm opacity-90">{gallery.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-sm">
                      <span className="badge">
                        {gallery.gallery_type === 'photos' && '🖼️ Photos'}
                        {gallery.gallery_type === 'videos' && '🎥 Videos'}
                        {gallery.gallery_type === '360photos' && '🌐 360 Photos'}
                      </span>
                      <span>👁️ {gallery.view_count || 0} views</span>
                    </div>
                  </div>

                  {/* Gallery Images - Only show if selected */}
                  {selectedGalleryId === gallery.gallery_id && (
                    <div className="space-y-4">
                      {loadingImages && (
                        <div className="flex justify-center py-12">
                          <Loader />
                        </div>
                      )}

                      {!loadingImages && galleryImages.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          {galleryImages.map((image: any, index: number) => (
                            <div
                              key={image.image_id}
                              className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square cursor-pointer shadow-md hover:shadow-xl transition-shadow duration-300"
                              onClick={() => openImageModal(image, index)}
                            >
                              {/* Lazy loaded image */}
                              <img
                                {...getImageProps(image.image_url, image.thumbnail_url || image.image_url, image.title)}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />

                              {/* Overlay */}
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <button className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 rounded-full p-3 hover:bg-black/75">
                                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM5 6h14v12H5V6z" />
                                  </svg>
                                </button>
                              </div>

                              {/* Featured Badge */}
                              {image.is_featured && (
                                <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                                  Featured
                                </span>
                              )}

                              {/* Image Title on Hover */}
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <p className="text-sm font-semibold line-clamp-2">{image.title}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {!loadingImages && galleryImages.length === 0 && (
                        <div className="text-center py-12 bg-gray-50 rounded-lg">
                          <p className="text-monsoon-600">No images in this gallery</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loadingGalleries && filteredGalleries.length === 0 && !errorGalleries && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📷</div>
              <h3 className="text-2xl font-bold text-forest-800 mb-2">No galleries found</h3>
              <p className="text-monsoon-600 mb-6">
                {galleryTypeFilter ? 'No galleries of this type' : 'Check back soon for new galleries'}
              </p>
              {galleryTypeFilter && (
                <button
                  onClick={() => handleFilterChange(null)}
                  className="px-6 py-3 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors"
                >
                  Clear Filter
                </button>
              )}
            </div>
          )}

          {/* Load More Button */}
          {!galleryTypeFilter && hasMore && filteredGalleries.length > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                disabled={loadingGalleries}
                className="px-8 py-4 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loadingGalleries ? 'Loading...' : 'Load More Galleries'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image Modal for Preview */}
      <ImageModal
        isOpen={isModalOpen}
        image={currentImage}
        onClose={closeModal}
        onNextImage={handleNextImage}
        onPrevImage={handlePrevImage}
        hasNextImage={selectedImageIndex < galleryImages.length - 1}
        hasPrevImage={selectedImageIndex > 0}
      />

      {/* Stats Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-forest-800 mb-12 text-center">
            Gallery Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '📷', label: 'Total Collections', value: galleries.length },
              { icon: '🖼️', label: 'Total Images', value: '1000+' },
              { icon: '👥', label: 'Active Photographers', value: '50+' },
              { icon: '⭐', label: 'Featured', value: featuredGalleries.length },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-sm text-monsoon-600 font-medium mb-1">{stat.label}</div>
                <div className="text-2xl font-bold text-forest-800">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GalleryPage;
