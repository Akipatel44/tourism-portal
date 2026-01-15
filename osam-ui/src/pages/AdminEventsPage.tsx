import React, { useState, useEffect } from 'react';
import adminApi, { Event, EventFormData } from '@/api/admin';
import { useNotification } from '@/components/NotificationContainer';
import { validateEventForm, getFieldError, hasFieldError } from '@/utils/validation';

interface EventForm extends EventFormData {
  [key: string]: any;
}

const AdminEventsPage: React.FC = () => {
  const notify = useNotification();
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<EventForm>({
    name: '',
    event_type: 'festival',
    location: '',
    start_date: '',
    end_date: '',
    is_annual: false,
    is_free: true,
    has_parking: false,
    has_accommodation: false
  });
  const [errors, setErrors] = useState<any[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const data = await adminApi.getAllEvents(0, 100);
      setEvents(data);
    } catch (error: any) {
      notify.error('Failed to Load Events', error.message);
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

    setErrors((prev) => prev.filter((e) => e.field !== name));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateEventForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      notify.error('Form Validation Failed', 'Please fix the errors and try again');
      return;
    }

    setIsLoading(true);
    try {
      if (editingId) {
        await adminApi.updateEvent(editingId, formData);
        notify.success('Event Updated Successfully');
      } else {
        await adminApi.createEvent(formData);
        notify.success('Event Created Successfully');
      }
      resetForm();
      fetchEvents();
    } catch (error: any) {
      notify.error('Operation Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.event_id);
    setFormData({
      name: event.name,
      description: event.description || '',
      event_type: event.event_type,
      location: event.location,
      start_date: event.start_date,
      end_date: event.end_date,
      start_time: event.start_time || '',
      end_time: event.end_time || '',
      is_annual: event.is_annual,
      is_free: event.is_free,
      entry_fee: event.entry_fee,
      organizing_body: event.organizing_body || '',
      contact_person: event.contact_person || '',
      phone: event.phone || '',
      email: event.email || '',
      has_parking: event.has_parking,
      has_accommodation: event.has_accommodation
    });
    setIsFormOpen(true);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      await adminApi.deleteEvent(id);
      notify.success('Event Deleted Successfully');
      setDeleteConfirm(null);
      fetchEvents();
    } catch (error: any) {
      notify.error('Delete Failed', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      event_type: 'festival',
      location: '',
      start_date: '',
      end_date: '',
      is_annual: false,
      is_free: true,
      has_parking: false,
      has_accommodation: false
    });
    setEditingId(null);
    setErrors([]);
    setIsFormOpen(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Events Management</h1>
        <button
          onClick={() => (isFormOpen ? resetForm() : setIsFormOpen(true))}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {isFormOpen ? 'Cancel' : '+ Add Event'}
        </button>
      </div>

      {/* Form Section */}
      {isFormOpen && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
          <h2 className="text-xl font-semibold mb-4">
            {editingId ? 'Edit Event' : 'Create New Event'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'name') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Janmashtami Festival"
                />
                {hasFieldError(errors, 'name') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'name')}
                  </p>
                )}
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type *
                </label>
                <select
                  name="event_type"
                  value={formData.event_type}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'event_type') ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="festival">Festival</option>
                  <option value="fair">Fair</option>
                  <option value="ceremony">Ceremony</option>
                  <option value="cultural">Cultural</option>
                </select>
                {hasFieldError(errors, 'event_type') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'event_type')}
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
                  placeholder="Event location"
                />
                {hasFieldError(errors, 'location') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'location')}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  name="start_date"
                  value={formData.start_date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'start_date') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {hasFieldError(errors, 'start_date') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'start_date')}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  name="end_date"
                  value={formData.end_date}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'end_date') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {hasFieldError(errors, 'end_date') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'end_date')}
                  </p>
                )}
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* End Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="end_time"
                  value={formData.end_time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Contact Person */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'phone') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {hasFieldError(errors, 'phone') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'phone')}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    hasFieldError(errors, 'email') ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {hasFieldError(errors, 'email') && (
                  <p className="text-red-500 text-sm mt-1">
                    {getFieldError(errors, 'email')}
                  </p>
                )}
              </div>

              {/* Organizing Body */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Organizing Body
                </label>
                <input
                  type="text"
                  name="organizing_body"
                  value={formData.organizing_body}
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
                  disabled={formData.is_free}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
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
                placeholder="Detailed description of the event"
              />
            </div>

            {/* Flags and Facilities */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Event Details</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_annual"
                    checked={formData.is_annual}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="ml-2 text-gray-700">Annual Recurring Event</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="is_free"
                    checked={formData.is_free}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="ml-2 text-gray-700">Free Event</span>
                </label>
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
                    name="has_accommodation"
                    checked={formData.has_accommodation}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span className="ml-2 text-gray-700">Accommodation Available</span>
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
                {isLoading ? 'Saving...' : editingId ? 'Update Event' : 'Create Event'}
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

      {/* Events List */}
      {isLoading && !isFormOpen ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading events...</p>
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No events found. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    📅 {event.start_date} to {event.end_date} • {event.event_type}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">📍 {event.location}</p>
                  {event.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                  <div className="flex gap-4 mt-3 text-sm text-gray-500">
                    {event.is_free ? (
                      <span>💰 Free</span>
                    ) : (
                      <span>💵 ₹{event.entry_fee}</span>
                    )}
                    {event.is_annual && <span>🔄 Annual</span>}
                    {event.has_parking && <span>🅿️ Parking</span>}
                    {event.has_accommodation && <span>🏨 Accommodation</span>}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                  >
                    Edit
                  </button>
                  {deleteConfirm === event.event_id ? (
                    <>
                      <button
                        onClick={() => handleDelete(event.event_id)}
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
                      onClick={() => setDeleteConfirm(event.event_id)}
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

export default AdminEventsPage;
