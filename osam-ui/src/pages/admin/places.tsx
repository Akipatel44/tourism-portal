import React, { useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { ErrorMessage, Toast } from '@/components/ErrorMessage';
import { EmptyState } from '@/components/EmptyState';

type Place = {
  id: string;
  name: string;
  category: string;
  location: string;
  status: 'published' | 'draft';
  visits: number;
  createdDate: string;
};

type FormData = {
  name: string;
  category: string;
  location: string;
  description: string;
  status: 'published' | 'draft';
};

const INITIAL_PLACES: Place[] = [
  {
    id: '1',
    name: 'Osam Hill Temple',
    category: 'Temple',
    location: 'Osam Hill',
    status: 'published',
    visits: 1240,
    createdDate: '2025-01-15',
  },
  {
    id: '2',
    name: 'Chichod Summit',
    category: 'Nature',
    location: 'Chichod',
    status: 'published',
    visits: 980,
    createdDate: '2025-01-20',
  },
  {
    id: '3',
    name: 'Zarna Waterfall',
    category: 'Nature',
    location: 'Zarna',
    status: 'published',
    visits: 650,
    createdDate: '2025-02-01',
  },
  {
    id: '4',
    name: 'Sacred Spring',
    category: 'Mythology',
    location: 'Sacred Valley',
    status: 'draft',
    visits: 0,
    createdDate: '2025-02-02',
  },
];

const CATEGORIES = ['Temple', 'Nature', 'Mythology', 'Adventure', 'Historical'];

export default function PlacesManagement() {
  const [places, setPlaces] = useState<Place[]>(INITIAL_PLACES);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: 'Temple',
    location: '',
    description: '',
    status: 'draft',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredPlaces = places.filter(
    (place) =>
      place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      place.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = 'Place name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingId) {
        setPlaces(
          places.map((p) =>
            p.id === editingId
              ? { ...p, name: formData.name, category: formData.category, location: formData.location, status: formData.status }
              : p
          )
        );
        setSuccessMessage(`Place "${formData.name}" updated successfully`);
        setEditingId(null);
      } else {
        const newPlace: Place = {
          id: Date.now().toString(),
          name: formData.name,
          category: formData.category,
          location: formData.location,
          status: formData.status,
          visits: 0,
          createdDate: new Date().toISOString().split('T')[0],
        };
        setPlaces([...places, newPlace]);
        setSuccessMessage(`Place "${formData.name}" created successfully`);
      }

      setFormData({ name: '', category: 'Temple', location: '', description: '', status: 'draft' });
      setShowForm(false);
      setErrorMessage(null);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setErrorMessage('Failed to save place. Please try again.');
    }
  };

  const handleEdit = (place: Place) => {
    setFormData({
      name: place.name,
      category: place.category,
      location: place.location,
      description: '',
      status: place.status,
    });
    setEditingId(place.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this place?')) {
      try {
        const deletedPlace = places.find(p => p.id === id);
        setPlaces(places.filter((p) => p.id !== id));
        setSuccessMessage(`Place "${deletedPlace?.name}" deleted successfully`);
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (error) {
        setErrorMessage('Failed to delete place. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({ name: '', category: 'Temple', location: '', description: '', status: 'draft' });
    setErrors({});
  };

  return (
    <AdminLayout pageTitle="Manage Places">
      {/* Success/Error Messages */}
      {successMessage && (
        <Toast variant="success" title="Success" message={successMessage} autoDismiss={3000} />
      )}
      {errorMessage && (
        <ErrorMessage
          variant="error"
          title="Error"
          message={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
      )}

      {/* Top Actions */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search places..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-6 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-semibold"
        >
          + Add New Place
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {editingId ? 'Edit Place' : 'Add New Place'}
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close dialog"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="place-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Place Name <span className="text-red-600" aria-label="required">*</span>
                </label>
                <input
                  id="place-name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-600 text-sm mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-600" aria-label="required">*</span>
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location <span className="text-red-600" aria-label="required">*</span>
                </label>
                <input
                  id="location"
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  aria-invalid={!!errors.location}
                  aria-describedby={errors.location ? 'location-error' : undefined}
                />
                {errors.location && (
                  <p id="location-error" className="text-red-600 text-sm mt-1" role="alert">
                    {errors.location}
                  </p>
                )}
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-600" aria-label="required">*</span>
                </label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  rows={3}
                  aria-invalid={!!errors.description}
                  aria-describedby={errors.description ? 'description-error' : undefined}
                />
                {errors.description && (
                  <p id="description-error" className="text-red-600 text-sm mt-1" role="alert">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Status Field */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors font-semibold"
                >
                  {editingId ? 'Update' : 'Create'}
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

      {/* Places Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Place Name
                </th>
                <th className="hidden sm:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="hidden md:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Location
                </th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="hidden lg:table-cell px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Visits
                </th>
                <th className="px-3 sm:px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPlaces.map((place) => (
                <tr key={place.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 sm:px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900 text-sm md:text-base">{place.name}</p>
                      <p className="text-xs text-gray-500 sm:hidden">{place.category}</p>
                    </div>
                  </td>
                  <th className="hidden sm:table-cell px-6 py-4 text-left text-gray-700 font-normal text-sm">
                    {place.category}
                  </th>
                  <td className="hidden md:table-cell px-6 py-4 text-gray-700 text-sm">
                    {place.location}
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                        place.status === 'published'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {place.status.charAt(0).toUpperCase() + place.status.slice(1)}
                    </span>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-4 text-gray-700 text-sm">
                    {place.visits}
                  </td>
                  <td className="px-3 sm:px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(place)}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors font-medium"
                        aria-label={`Edit ${place.name}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(place.id)}
                        className="px-2 sm:px-3 py-1 text-xs sm:text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors font-medium"
                        aria-label={`Delete ${place.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPlaces.length === 0 && (
          <EmptyState
            variant="no-results"
            title="No places found"
            description="Try adjusting your search or create a new place."
            actions={[
              {
                label: '+ Add New Place',
                onClick: () => setShowForm(true),
                variant: 'primary',
              },
            ]}
          />
        )}
      </div>
    </AdminLayout>
  );
}
