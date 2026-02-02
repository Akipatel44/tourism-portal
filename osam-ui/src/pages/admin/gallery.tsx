import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';

type GalleryItem = {
  id: string;
  title: string;
  category: 'Monsoon' | 'Temples' | 'Events' | 'Nature';
  status: 'published' | 'draft';
  uploadDate: string;
};

type GalleryFormData = {
  title: string;
  category: 'Monsoon' | 'Temples' | 'Events' | 'Nature';
  caption: string;
  status: 'published' | 'draft';
};

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: '1',
    title: 'Monsoon Clouds',
    category: 'Monsoon',
    status: 'published',
    uploadDate: '2025-02-01',
  },
  {
    id: '2',
    title: 'Waterfall in Rain',
    category: 'Monsoon',
    status: 'published',
    uploadDate: '2025-02-01',
  },
  {
    id: '3',
    title: 'Ancient Temple',
    category: 'Temples',
    status: 'published',
    uploadDate: '2025-01-28',
  },
  {
    id: '4',
    title: 'Marathon Event',
    category: 'Events',
    status: 'draft',
    uploadDate: '2025-02-02',
  },
  {
    id: '5',
    title: 'Forest Trek',
    category: 'Nature',
    status: 'published',
    uploadDate: '2025-01-25',
  },
];

const CATEGORIES = ['Monsoon', 'Temples', 'Events', 'Nature'] as const;

export default function GalleryManagement() {
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | typeof CATEGORIES[number]>('all');
  const [formData, setFormData] = useState<GalleryFormData>({
    title: '',
    category: 'Monsoon',
    caption: '',
    status: 'draft',
  });
  const [errors, setErrors] = useState<Partial<GalleryFormData>>({});

  const filteredItems = gallery.filter(
    (item) =>
      (item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === 'all' || item.category === filterCategory)
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof GalleryFormData, string>> = {};
    if (!formData.title.trim()) newErrors.title = 'Image title is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.caption.trim()) newErrors.caption = 'Caption is required';
    setErrors(newErrors as Partial<GalleryFormData>);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingId) {
      setGallery(
        gallery.map((item) =>
          item.id === editingId
            ? { ...item, title: formData.title, category: formData.category, status: formData.status }
            : item
        )
      );
      setEditingId(null);
    } else {
      const newItem: GalleryItem = {
        id: Date.now().toString(),
        title: formData.title,
        category: formData.category,
        status: formData.status,
        uploadDate: new Date().toISOString().split('T')[0],
      };
      setGallery([...gallery, newItem]);
    }

    setFormData({ title: '', category: 'Monsoon', caption: '', status: 'draft' });
    setShowForm(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      title: item.title,
      category: item.category,
      caption: '',
      status: item.status,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this image?')) {
      setGallery(gallery.filter((item) => item.id !== id));
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', category: 'Monsoon', caption: '', status: 'draft' });
    setErrors({});
  };

  const getCategoryColor = (category: typeof CATEGORIES[number]) => {
    switch (category) {
      case 'Monsoon':
        return 'bg-blue-100 text-blue-700';
      case 'Temples':
        return 'bg-amber-100 text-amber-700';
      case 'Events':
        return 'bg-emerald-100 text-emerald-700';
      case 'Nature':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AdminLayout pageTitle="Manage Gallery">
      {/* Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
        >
          + Upload Image
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? 'Edit Image' : 'Upload New Image'}
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-amber-500 transition-colors">
                  <input type="file" accept="image/*" className="hidden" />
                  <div className="text-3xl mb-2">📸</div>
                  <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                </div>
              </div>

              {/* Title Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as typeof CATEGORIES[number] })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Caption Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Caption *
                </label>
                <textarea
                  value={formData.caption}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent ${
                    errors.caption ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={2}
                />
                {errors.caption && <p className="text-red-600 text-sm mt-1">{errors.caption}</p>}
              </div>

              {/* Status Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
                >
                  {editingId ? 'Update' : 'Upload'}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Image Placeholder */}
            <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <span className="text-4xl">🖼️</span>
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 flex-1">{item.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ml-2 ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-gray-500 mb-3">
                Uploaded: {new Date(item.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>

              <div className="flex items-center justify-between mb-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.status === 'published'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="flex-1 px-3 py-2 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-5xl mb-3">📸</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
          >
            Upload First Image
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
