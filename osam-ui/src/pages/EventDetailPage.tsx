import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEventById } from '@/hooks/useEvents';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const eventId = id ? parseInt(id, 10) : null;

  const { data: event, isLoading, error } = useEventById(eventId);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'logistics'>('overview');

  if (!eventId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          title="Invalid Event"
          message="No event ID provided"
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

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ErrorMessage
          title="Event Not Found"
          message={error || 'This event does not exist or could not be loaded'}
        />
      </div>
    );
  }

  const getEventTypeColor = (eventType: string) => {
    const colorMap: Record<string, { bg: string; text: string }> = {
      festival: { bg: 'bg-red-600', text: 'Festival' },
      fair: { bg: 'bg-orange-600', text: 'Fair' },
      ceremony: { bg: 'bg-blue-600', text: 'Ceremony' },
      cultural: { bg: 'bg-purple-600', text: 'Cultural' },
    };
    return colorMap[eventType] || { bg: 'bg-gray-600', text: 'Event' };
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string; emoji: string }> = {
      upcoming: { bg: 'bg-blue-100 text-blue-800', text: 'Upcoming', emoji: '🔔' },
      ongoing: { bg: 'bg-green-100 text-green-800', text: 'Ongoing', emoji: '🔴' },
      completed: { bg: 'bg-gray-100 text-gray-800', text: 'Completed', emoji: '✓' },
    };
    return statusMap[status] || { bg: 'bg-gray-100', text: 'Unknown', emoji: '?' };
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (timeStr?: string) => {
    if (!timeStr) return null;
    const [hours, minutes] = timeStr.split(':');
    return `${hours}:${minutes}`;
  };

  const eventType = getEventTypeColor(event.event_type);
  const statusBadge = getStatusBadge(event.status);
  const startDate = formatDate(event.start_date);
  const endDate = formatDate(event.end_date);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate('/events')}
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
            Back to Events
          </button>
        </div>
      </div>

      {/* ===== HERO SECTION ===== */}
      <section className="relative bg-gradient-to-r from-forest-700 to-forest-600 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${eventType.bg}`}>
              {eventType.text}
            </span>
            <span className={`px-4 py-2 rounded-full font-semibold text-sm ${statusBadge.bg}`}>
              {statusBadge.emoji} {statusBadge.text}
            </span>
            {event.is_featured && (
              <span className="px-4 py-2 rounded-full bg-yellow-400 text-yellow-900 font-semibold text-sm">
                ⭐ Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            {event.name}
          </h1>

          {/* Location */}
          <div className="flex items-center gap-3 text-lg text-forest-100">
            <span>📍</span>
            <span>{event.location}</span>
          </div>

          {/* Price */}
          <div className="mt-6">
            {event.is_free ? (
              <div className="text-2xl font-bold text-accent-mint">FREE ENTRY</div>
            ) : (
              <div className="text-2xl font-bold">
                Entry Fee: ₹{event.entry_fee}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== KEY INFO SECTION ===== */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Start Date */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-gray-600 text-sm font-medium mb-2">Start Date</div>
              <div className="text-forest-800 font-semibold text-sm">
                {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-gray-600 text-sm font-medium mb-2">Duration</div>
              <div className="text-forest-800 font-semibold text-sm">
                {Math.ceil((new Date(event.end_date).getTime() - new Date(event.start_date).getTime()) / (1000 * 60 * 60 * 24)) + 1} Days
              </div>
            </div>

            {/* Time */}
            {event.start_time && (
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="text-gray-600 text-sm font-medium mb-2">Start Time</div>
                <div className="text-forest-800 font-semibold text-sm">
                  {formatTime(event.start_time)}
                </div>
              </div>
            )}

            {/* Annual Info */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-gray-600 text-sm font-medium mb-2">Frequency</div>
              <div className="text-forest-800 font-semibold text-sm">
                {event.is_annual ? 'Annual' : 'One-time'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TABS SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'details', label: 'Details' },
              { id: 'logistics', label: 'Logistics' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`pb-4 px-2 font-semibold transition-all whitespace-nowrap ${
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
                <h2 className="text-3xl font-bold text-forest-800 mb-4">About This Event</h2>
                <p className="text-monsoon-600 text-lg leading-relaxed">
                  {event.description}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-forest-800 mb-4">Event Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Type */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-monsoon-600 font-medium mb-1">Event Type</div>
                    <div className="text-lg font-semibold text-forest-800 capitalize">
                      {event.event_type}
                    </div>
                  </div>

                  {/* Status */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-monsoon-600 font-medium mb-1">Status</div>
                    <div className="text-lg font-semibold text-forest-800 capitalize">
                      {event.status}
                    </div>
                  </div>

                  {/* Start Date */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-monsoon-600 font-medium mb-1">Start Date</div>
                    <div className="text-lg font-semibold text-forest-800">{startDate}</div>
                  </div>

                  {/* End Date */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-monsoon-600 font-medium mb-1">End Date</div>
                    <div className="text-lg font-semibold text-forest-800">{endDate}</div>
                  </div>

                  {/* Annual Event */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-monsoon-600 font-medium mb-1">Recurring</div>
                    <div className="text-lg font-semibold text-forest-800">
                      {event.is_annual ? 'Annual Event' : 'One-time Event'}
                    </div>
                  </div>

                  {/* Price */}
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-sm text-monsoon-600 font-medium mb-1">Entry Fee</div>
                    <div className="text-lg font-semibold text-forest-800">
                      {event.is_free ? 'FREE' : `₹${event.entry_fee}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              {(event.organizing_body || event.contact_person) && (
                <div>
                  <h4 className="text-xl font-bold text-forest-800 mb-4">Contact Information</h4>
                  <div className="space-y-3">
                    {event.organizing_body && (
                      <p className="text-monsoon-600">
                        <span className="font-semibold">Organizing Body:</span> {event.organizing_body}
                      </p>
                    )}
                    {event.contact_person && (
                      <p className="text-monsoon-600">
                        <span className="font-semibold">Contact Person:</span> {event.contact_person}
                      </p>
                    )}
                    {event.phone && (
                      <p className="text-monsoon-600">
                        <span className="font-semibold">Phone:</span> {event.phone}
                      </p>
                    )}
                    {event.email && (
                      <p className="text-monsoon-600">
                        <span className="font-semibold">Email:</span>{' '}
                        <a href={`mailto:${event.email}`} className="text-forest-800 hover:underline">
                          {event.email}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'logistics' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-forest-800 mb-4">Facilities & Amenities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                    <span className="text-2xl">📍</span>
                    <div>
                      <div className="font-semibold text-forest-800">Location</div>
                      <div className="text-sm text-monsoon-600">{event.location}</div>
                    </div>
                  </div>

                  {event.has_parking && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <span className="text-2xl">🅿️</span>
                      <div>
                        <div className="font-semibold text-green-800">Parking Available</div>
                        <div className="text-sm text-green-600">On-site parking provided</div>
                      </div>
                    </div>
                  )}

                  {event.has_accommodation && (
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <span className="text-2xl">🏨</span>
                      <div>
                        <div className="font-semibold text-blue-800">Accommodation Nearby</div>
                        <div className="text-sm text-blue-600">Hotels and guest houses available</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Visiting Guide */}
              <div>
                <h4 className="text-xl font-bold text-forest-800 mb-4">Plan Your Visit</h4>
                <div className="bg-forest-50 p-6 rounded-lg border border-forest-200">
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-lg flex-shrink-0">✓</span>
                      <span className="text-monsoon-600">
                        Event runs from {new Date(event.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} to{' '}
                        {new Date(event.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-lg flex-shrink-0">✓</span>
                      <span className="text-monsoon-600">
                        Entry is {event.is_free ? 'FREE for all visitors' : `₹${event.entry_fee} per person`}
                      </span>
                    </li>
                    {event.has_parking && (
                      <li className="flex gap-3">
                        <span className="text-lg flex-shrink-0">✓</span>
                        <span className="text-monsoon-600">Parking facilities available at the venue</span>
                      </li>
                    )}
                    {event.has_accommodation && (
                      <li className="flex gap-3">
                        <span className="text-lg flex-shrink-0">✓</span>
                        <span className="text-monsoon-600">
                          Nearby accommodation available in the region
                        </span>
                      </li>
                    )}
                    <li className="flex gap-3">
                      <span className="text-lg flex-shrink-0">✓</span>
                      <span className="text-monsoon-600">
                        {event.is_annual ? 'This is an annual event' : 'One-time event'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-forest-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Attend?</h2>
          <p className="text-lg text-forest-100 mb-8">
            Start planning your visit to {event.name}
          </p>
          <button className="px-8 py-4 bg-accent-mint text-forest-800 rounded-lg font-bold text-lg hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Register Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default EventDetailPage;
