/**
 * Gallery Detail Page
 * Display full gallery item with metadata and navigation
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useGalleryItem, useGallery } from '@/hooks';
import GalleryModal from '@/components/GalleryModal';

export default function GalleryDetailPage() {
  const router = useRouter();
  const params = useParams();
  if (!params || !params.id) return null;
  const id = params.id as string;

  const { item, isLoading, error, refetch } = useGalleryItem({ id });
  const { items: galleryItems } = useGallery({ page_size: 100 });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (item && galleryItems.length > 0) {
      const index = galleryItems.findIndex((i) => i.id === item.id);
      if (index >= 0) {
        setCurrentIndex(index);
      }
    }
  }, [item, galleryItems]);

  const handleNavigateModal = (index: number) => {
    if (index >= 0 && index < galleryItems.length) {
      const newItem = galleryItems[index];
      router.push(`/gallery/${newItem.id}`);
      setCurrentIndex(index);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
          >
            ← Back to Gallery
          </button>

          {/* Skeleton Loaders */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-8 space-y-4">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-2/3" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
              <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // Error or not found
  if (error || !item) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <button
            onClick={() => router.back()}
            className="mb-6 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
          >
            ← Back to Gallery
          </button>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery Item Not Found</h2>
            <p className="text-gray-600 mb-6">
              {error ? 'Failed to load gallery item. Showing fallback data.' : 'The image you are looking for does not exist.'}
            </p>
            <button
              onClick={() => router.push('/gallery')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Gallery
            </button>
          </div>
        </div>
      </main>
    );
  }

  const CATEGORY_COLORS: Record<string, string> = {
    Nature: 'bg-green-100 text-green-800',
    Architecture: 'bg-blue-100 text-blue-800',
    Portrait: 'bg-purple-100 text-purple-800',
    Abstract: 'bg-pink-100 text-pink-800',
    Wildlife: 'bg-orange-100 text-orange-800',
    Urban: 'bg-slate-100 text-slate-800',
    Landscape: 'bg-teal-100 text-teal-800',
    Other: 'bg-gray-100 text-gray-800',
  };

  const categoryClass = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 px-4 py-2 text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2 transition-colors"
        >
          ← Back to Gallery
        </button>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-700 font-semibold">⚠️ Connection Error</p>
            <p className="text-yellow-600 text-sm">Showing fallback gallery data</p>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Container */}
          <div className="relative aspect-video bg-gray-100 overflow-hidden group cursor-pointer" onClick={openModal}>
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Featured Badge */}
            {item.is_featured && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                ⭐ Featured
              </div>
            )}
            {/* Click Hint */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <span className="text-white font-semibold">Click to Preview</span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h1>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${categoryClass}`}>
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-gray-700 text-lg leading-relaxed">{item.description}</p>
              )}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-t border-b border-gray-200">
              {/* Views */}
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Views</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {item.view_count.toLocaleString()}
                </p>
              </div>

              {/* Uploaded By */}
              <div>
                <p className="text-sm text-gray-600 font-medium">Uploaded By</p>
                <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
                  {item.uploaded_by}
                </p>
              </div>

              {/* Upload Date */}
              <div>
                <p className="text-sm text-gray-600 font-medium">Upload Date</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {new Date(item.upload_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm text-gray-600 font-medium">Status</p>
                <p className="text-lg font-semibold text-gray-900 mt-1">
                  {item.is_featured ? '⭐ Featured' : 'Active'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {/* Preview Modal Button */}
              <button
                onClick={openModal}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                🔍 Preview Full Size
              </button>

              {/* Refresh Button */}
              <button
                onClick={refetch}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
              >
                🔄 Refresh
              </button>

              {/* Back to Gallery Button */}
              <button
                onClick={() => router.push('/gallery')}
                className="flex-1 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors"
              >
                ← View All Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <GalleryModal
        item={item}
        isOpen={isModalOpen}
        onClose={closeModal}
        allItems={galleryItems}
        currentIndex={currentIndex}
        onNavigate={handleNavigateModal}
      />
    </main>
  );
}
