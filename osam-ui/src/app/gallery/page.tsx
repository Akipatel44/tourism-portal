/**
 * Gallery Page
 * Main gallery view with category filters, lazy loading, and responsive grid
 * Optimized for performance
 */

'use client';

import React, { useState } from 'react';
import { useGallery } from '@/hooks';
import GalleryCard from '@/components/GalleryCard';
import GalleryModal from '@/components/GalleryModal';
import { GalleryItem } from '@/api/types/api';

const CATEGORIES = ['All', 'Nature', 'Architecture', 'Portrait', 'Abstract', 'Wildlife', 'Urban', 'Landscape'];
const ITEMS_PER_PAGE = 12;

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const { items, isLoading, error, pagination, setPage } = useGallery({
    page: 1,
    page_size: ITEMS_PER_PAGE,
    category: selectedCategory === 'All' ? undefined : selectedCategory,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? undefined : category);
  };

  const handleOpenModal = (item: GalleryItem, index: number) => {
    setSelectedItem(item);
    setSelectedItemIndex(index);
    setIsModalOpen(true);
  };

  const handleNavigateModal = (index: number) => {
    if (index >= 0 && index < items.length) {
      setSelectedItem(items[index]);
      setSelectedItemIndex(index);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      setPage(pagination.page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.total_pages) {
      setPage(pagination.page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Gallery</h1>
          <p className="text-gray-600">Explore our collection of stunning images</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-semibold">⚠️ Connection Error</p>
            <p className="text-red-600 text-sm">Showing fallback gallery data</p>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  (category === 'All' && !selectedCategory) ||
                  (category !== 'All' && selectedCategory === category)
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-3">
            {selectedCategory && selectedCategory !== 'All'
              ? `Showing ${selectedCategory} images`
              : 'Showing all images'}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
              <div key={idx} className="rounded-lg bg-gray-200 aspect-[4/3] animate-pulse" />
            ))}
          </div>
        )}

        {/* Gallery Grid */}
        {!isLoading && items.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => handleOpenModal(item, index)}
                  className="cursor-pointer"
                >
                  <GalleryCard item={item} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-8 border-t border-gray-300">
              <button
                onClick={handlePreviousPage}
                disabled={pagination.page === 1}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  pagination.page === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                ← Previous
              </button>

              <div className="text-center">
                <p className="text-gray-900 font-semibold">
                  Page {pagination.page} of {pagination.total_pages}
                </p>
                <p className="text-sm text-gray-600">
                  Total {pagination.total} items
                </p>
              </div>

              <button
                onClick={handleNextPage}
                disabled={pagination.page >= pagination.total_pages}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  pagination.page >= pagination.total_pages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next →
              </button>
            </div>
          </>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No images found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or checking back later</p>
            <button
              onClick={() => handleCategoryChange('All')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Images
            </button>
          </div>
        )}
      </div>

      {/* Gallery Modal Preview */}
      <GalleryModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allItems={items}
        currentIndex={selectedItemIndex}
        onNavigate={handleNavigateModal}
      />
    </main>
  );
}
