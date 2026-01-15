import React, { useState } from 'react';
import { useUpcomingEvents, usePastEvents, useSearchEvents } from '@/hooks/useEvents';
import { EventListResponse } from '@/api/events';
import { Loader } from '@/components/Loader';
import { ErrorMessage } from '@/components/ErrorMessage';

const EventsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Fetch events based on active tab
  const {
    data: upcomingEvents,
    isLoading: loadingUpcoming,
    error: errorUpcoming,
    hasMore: hasMoreUpcoming,
    loadMore: loadMoreUpcoming,
  } = useUpcomingEvents(6);

  const {
    data: pastEvents,
    isLoading: loadingPast,
    error: errorPast,
    hasMore: hasMorePast,
    loadMore: loadMorePast,
  } = usePastEvents(6);

  // Search events
  const { data: searchResults, isLoading: loadingSearch } = useSearchEvents(searchTerm);

  // Determine which events to display
  let displayEvents = activeTab === 'upcoming' ? upcomingEvents : pastEvents;
  let isLoading = activeTab === 'upcoming' ? loadingUpcoming : loadingPast;
  let error = activeTab === 'upcoming' ? errorUpcoming : errorPast;
  let hasMore = activeTab === 'upcoming' ? hasMoreUpcoming : hasMorePast;
  let loadMore = activeTab === 'upcoming' ? loadMoreUpcoming : loadMorePast;

  // If searching, use search results
  if (searchTerm) {
    displayEvents = searchResults;
    isLoading = loadingSearch;
    error = null;
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

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const getStatusBadgeColor = (isFree: boolean) => {
    return isFree ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Header Section */}
      <section className="bg-forest-800 text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Events & Festivals
          </h1>
          <p className="text-lg sm:text-xl text-forest-100 max-w-3xl">
            Discover and explore upcoming cultural celebrations, festivals, and events in the sacred Osam region
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-monsoon-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-3 rounded-lg border-2 border-gray-200 focus:border-forest-800 focus:outline-none transition-colors text-forest-800 placeholder-monsoon-400"
            />
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-8">
            {[
              { id: 'upcoming', label: 'Upcoming Events', icon: '🔔' },
              { id: 'past', label: 'Past Events', icon: '✓' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-2 font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-forest-800 border-b-3 border-forest-800'
                    : 'text-monsoon-600 hover:text-forest-600'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {isLoading && displayEvents.length === 0 && (
        <div className="min-h-[500px] flex items-center justify-center px-4">
          <Loader />
        </div>
      )}

      {/* Error State */}
      {!isLoading && error && displayEvents.length === 0 && (
        <div className="min-h-[400px] flex items-center justify-center px-4 py-12">
          <ErrorMessage
            title="Unable to Load Events"
            message={error || 'Failed to fetch events. Showing cached data instead.'}
          />
        </div>
      )}

      {/* Events Grid */}
      {!isLoading && displayEvents.length > 0 && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {displayEvents.map((event: EventListResponse) => {
                const eventType = getEventTypeColor(event.event_type);
                const startDate = formatDate(event.start_date);
                const endDate = formatDate(event.end_date);

                return (
                  <div
                    key={event.event_id}
                    className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                  >
                    {/* Header with type badge */}
                    <div className="bg-gradient-to-r from-forest-700 to-forest-600 p-6 relative h-32">
                      <div className="absolute top-4 right-4 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-white font-semibold text-xs ${eventType.bg}`}
                        >
                          {eventType.text}
                        </span>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(
                          event.is_free
                        )}`}
                      >
                        {event.is_free ? 'Free' : `₹${event.entry_fee}`}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-accent-mint transition-colors duration-300 line-clamp-2">
                        {event.name}
                      </h3>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Location */}
                      <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
                        <span className="text-lg flex-shrink-0 mt-1">📍</span>
                        <span className="text-monsoon-600 font-medium text-sm">
                          {event.location}
                        </span>
                      </div>

                      {/* Date Range */}
                      <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-lg">📅</span>
                          <span className="text-forest-800 font-semibold">{startDate}</span>
                        </div>
                        {event.start_date !== event.end_date && (
                          <div className="flex items-center gap-2 text-sm text-monsoon-600 ml-6">
                            to {endDate}
                          </div>
                        )}
                      </div>

                      {/* Info Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {/* Time */}
                        {event.start_time && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🕐</span>
                            <span className="text-monsoon-600 text-xs font-medium">
                              {event.start_time.substring(0, 5)}
                            </span>
                          </div>
                        )}

                        {/* Annual Event */}
                        {event.is_annual && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🔄</span>
                            <span className="text-monsoon-600 text-xs font-medium">
                              Annual
                            </span>
                          </div>
                        )}

                        {/* Parking */}
                        {event.has_parking && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🅿️</span>
                            <span className="text-monsoon-600 text-xs font-medium">
                              Parking
                            </span>
                          </div>
                        )}

                        {/* Accommodation */}
                        {event.has_accommodation && (
                          <div className="flex items-center gap-2">
                            <span className="text-lg">🏨</span>
                            <span className="text-monsoon-600 text-xs font-medium">
                              Accommodation
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <a
                        href={`/events/${event.event_id}`}
                        className="w-full px-4 py-3 bg-forest-800 text-white text-center rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300 transform hover:scale-105 block"
                      >
                        View Details
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            {!searchTerm && hasMore && (
              <div className="mt-12 text-center">
                <button
                  onClick={loadMore}
                  disabled={isLoading}
                  className="px-8 py-4 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 transform hover:scale-105"
                >
                  {isLoading ? 'Loading...' : 'Load More Events'}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Empty State */}
      {!isLoading && displayEvents.length === 0 && !error && (
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-forest-800 mb-2">
              {searchTerm ? 'No events found' : 'No events available'}
            </h3>
            <p className="text-monsoon-600 mb-6">
              {searchTerm
                ? 'Try adjusting your search terms'
                : 'Check back soon for upcoming events'}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="px-6 py-3 bg-forest-800 text-white rounded-lg font-semibold hover:bg-forest-700 transition-colors duration-300"
              >
                Clear Search
              </button>
            )}
          </div>
        </section>
      )}

      {/* Stats Section */}
      {!searchTerm && (
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest-800 mb-12 text-center">
              Why Attend These Events?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: '🌍', label: 'Global Recognition', value: 'Celebrated Worldwide' },
                { icon: '👥', label: 'Community', value: '10K+ Attendees' },
                { icon: '🎭', label: 'Cultural', value: 'Rich Traditions' },
                { icon: '🎊', label: 'Celebration', value: 'Unforgettable Experience' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-sm text-monsoon-600 font-medium mb-1">
                    {stat.label}
                  </div>
                  <div className="text-lg font-bold text-forest-800">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default EventsPage;
