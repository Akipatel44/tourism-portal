import React, { useState, useEffect, useCallback } from 'react';
import adminApi, { Place, PlaceFormData } from '@/api/admin';
import { useNotification } from '@/components/NotificationContainer';
import { validatePlaceForm, getFieldError, hasFieldError } from '@/utils/validation';

interface PlaceForm extends PlaceFormData {
  [key: string]: any;
}

const AdminPlacesPage: React.FC = () => {
  const notify = useNotification();
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<PlaceForm>({
    name: '',
    location: '',
    category: 'place',
    has_parking: false,
    has_restrooms: false,
    has_food: false
  });
  const [errors, setErrors] = useState<any[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Fetch places on mount
  useEffect(() => {
    fetchPlaces();
  }, []);

  const fetchPlaces = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getAllPlaces(0, 100);
      setPlaces(data);
    } catch (error: any) {
      notify.error('Failed to Load Places', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue
    }));

    // Clear error for this field
    setErrors((prev) => prev.filter((e) => e.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validatePlaceForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      notify.error('Form Validation Failed', 'Please fix the errors and try again');
      return;
    }

    setIsLoading(true);
    try {
      if (editingId) {
        await adminApi.updatePlace(editingId, formData);
        notify.success('Place Updated Successfully');
      } else {
        await adminApi.createPlace(formData);
        notify.success('Place Created Successfully');
      }
      resetForm();
      fetchPlaces();
    } catch (error: any) {
      notify.error('Operation Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (place: Place) => {
    setEditingId(place.place_id);
    setFormData({
      name: place.name,
      description: place.description || '',
      location: place.location,
      category: place.category as any,
      latitude: place.latitude,
      longitude: place.longitude,
      elevation_meters: place.elevation_meters,
      entry_fee: place.entry_fee,
      accessibility_level: place.accessibility_level,
      has_parking: place.has_parking,
      has_restrooms: place.has_restrooms,
      has_food: place.has_food,
      best_time_to_visit: place.best_time_to_visit || ''
    });
    setIsFormOpen(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await adminApi.deletePlace(id);
      notify.success('Place Deleted Successfully');
      setDeleteConfirm(null);
      fetchPlaces();
    } catch (error: any) {
      notify.error('Delete Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      location: '',
      category: 'place',
      has_parking: false,
      has_restrooms: false,
      has_food: false
    });
    setEditingId(null);
    setErrors([]);
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Places Management</h1>
        <button
          onClick={() => (isFormOpen ? resetForm() : setIsFormOpen(true))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormOpen ? 'Cancel' : '+ Add Place'}
        </button>
      </div>

      {/* Form Section */}
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Place' : 'Create New Place'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Place Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'name') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Osam Hill"
                />
                {hasFieldError(errors, 'name') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'name')}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'location') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Chichod Village, Gujarat"
                />
                {hasFieldError(errors, 'location') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'location')}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'category') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="place">Place</option>
                  <option value="landmark">Landmark</option>
                  <option value="viewpoint">Viewpoint</option>
                  <option value="parking">Parking</option>
                </select>
                {hasFieldError(errors, 'category') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'category')}
                  </p>
                )}
              </div>

              {/* Accessibility Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Accessibility Level
                </label>
                <select
                  name="accessibility_level"
                  value={formData.accessibility_level || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Level</option>
                  <option value="easily_accessible">Easily Accessible</option>
                  <option value="moderately_accessible">Moderately Accessible</option>
                  <option value="difficult_to_access">Difficult to Access</option>
                </select>
              </div>

              {/* Latitude */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  name="latitude"
                  value={formData.latitude || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 23.5505"
                />
              </div>

              {/* Longitude */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  name="longitude"
                  value={formData.longitude || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 72.8937"
                />
              </div>

              {/* Elevation */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Elevation (meters)
                </label>
                <input
                  type="number"
                  name="elevation_meters"
                  value={formData.elevation_meters || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Entry Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Entry Fee
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="entry_fee"
                  value={formData.entry_fee || ''}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  hasFieldError(errors, 'description') ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Detailed description of the place"
              />
              {hasFieldError(errors, 'description') && (
                <p className="text-red-500 text-sm mt-1">
                  {getFieldError(errors, 'description')}
                </p>
              )}
            </div>

            {/* Best Time to Visit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Best Time to Visit
              </label>
              <input
                type="text"
                name="best_time_to_visit"
                value={formData.best_time_to_visit || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., October to March"
              />
            </div>

            {/* Facilities */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="has_parking"
                    checked={formData.has_parking}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="ml-2 text-gray-700">Parking Available</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="has_restrooms"
                    checked={formData.has_restrooms}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="ml-2 text-gray-700">Restrooms Available</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="has_food"
                    checked={formData.has_food}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="ml-2 text-gray-700">Food Options Available</span>
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isLoading ? 'Saving...' : editingId ? 'Update Place' : 'Create Place'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Places List */}
      {isLoading && !isFormOpen ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading places...</p>
        </div>
      ) : places.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No places found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {places.map((place) => (
            <div
              key={place.place_id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{place.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    📍 {place.location} • {place.category}
                  </p>
                  {place.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {place.description}
                    </p>
                  )}
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    {place.entry_fee && <span>💵 ₹{place.entry_fee}</span>}
                    {place.has_parking && <span>🅿️ Parking</span>}
                    {place.has_restrooms && <span>🚻 Restrooms</span>}
                    {place.has_food && <span>🍽️ Food</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(place)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  >
                    Edit
                  </button>
                  {deleteConfirm === place.place_id ? (
                    <>
                      <button
                        onClick={() => handleDelete(place.place_id)}
                        className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(place.place_id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPlacesPage;
