import React, { useState } from 'react';

interface Event {
  id: number;
  title: string;
  date: string;
  duration: string;
  description: string;
  fullDetails: string;
  image: string;
  location: string;
  category: 'upcoming' | 'past';
  participants?: string;
  highlights?: string[];
}

const EVENTS: Event[] = [
  {
    id: 1,
    title: '1000 Stairs Marathon',
    date: 'March 15, 2026',
    duration: '1 day',
    category: 'upcoming',
    description: 'Challenge yourself with the legendary 1000 stairs race up Osam Hill. Experience breathtaking views and test your endurance.',
    fullDetails:
      'The 1000 Stairs Marathon is an exhilarating endurance challenge that takes participants on a thrilling journey up the sacred slopes of Osam Hill. This iconic race covers 1000 meticulously counted stone steps, each one bringing you closer to the summit and the divine energy of the hills. Participants range from seasoned athletes to fitness enthusiasts looking for their ultimate challenge.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&h=600&fit=crop',
    location: 'Osam Hill Summit Trail',
    participants: '500+ expected',
    highlights: ['Sunrise finish celebration', 'Free refreshments', 'Certificate of achievement', 'Photography services'],
  },
  {
    id: 2,
    title: 'Ashadhi Beej Mela',
    date: 'July 10-12, 2026',
    duration: '3 days',
    category: 'upcoming',
    description: 'The grand 3-day traditional festival celebrating monsoon arrival with cultural programs, spiritual rituals, and community celebrations.',
    fullDetails:
      'Ashadhi Beej Mela is one of the most celebrated festivals in the region, marking the arrival of the monsoon season and the agricultural cycle. Over three days, the hillsides come alive with vibrant colors, devotional songs, traditional dances, and spiritual ceremonies. Thousands of devotees and visitors gather to witness the divine connection between the Pandavas and Osam Hill. The festival features traditional performances, religious processions, food stalls with local cuisines, craft exhibitions, and nightly celebrations illuminated by thousands of lamps.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
    location: 'Osam Hill Temple Complex',
    participants: '10000+ devotees',
    highlights: ['Traditional dance performances', 'Spiritual processions', 'Local food festival', 'Craft exhibitions', 'Nightly lantern show'],
  },
  {
    id: 3,
    title: 'Yoga & Meditation Retreat',
    date: 'May 20-22, 2026',
    duration: '3 days',
    category: 'upcoming',
    description: 'A serene retreat combining ancient yogic practices with modern wellness in the spiritual ambiance of Osam Hill.',
    fullDetails:
      'Join certified yoga masters and spiritual guides for an immersive wellness retreat at Osam Hill. Daily sessions include sunrise yoga, meditation workshops, pranayama (breathing) techniques, and spiritual talks. Accommodations are provided in traditional homestays with vegetarian meals prepared from organic local produce.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop',
    location: 'Meditation Ground near Sacred Spring',
    participants: '100 participants',
    highlights: ['Yoga certification', 'Expert instructors', 'Organic meals', 'Nature immersion'],
  },
  {
    id: 4,
    title: 'Photography Festival 2025',
    date: 'December 5-7, 2025',
    duration: '3 days',
    category: 'past',
    description: 'Captured stunning vistas of Osam Hill during monsoon with participants from across the country.',
    fullDetails:
      'The Photography Festival showcased the incredible biodiversity and cultural richness of Osam Hill through the lenses of talented photographers. The event featured guided photo tours, workshops on landscape photography, exhibitions, and awards for the best captures.',
    image: 'https://images.unsplash.com/photo-1606807159062-56f84d6f1f06?w=800&h=600&fit=crop',
    location: 'Osam Hill',
    participants: '300 photographers',
  },
  {
    id: 5,
    title: 'Monsoon Trek & Nature Walk',
    date: 'August 10-11, 2025',
    duration: '2 days',
    category: 'past',
    description: 'Explored the lush greenery and waterfalls with naturalists and eco-enthusiasts.',
    fullDetails:
      'This guided nature expedition took participants through pristine forest trails, visiting all major waterfalls and learning about the local flora and fauna from expert naturalists.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
    location: 'Forest Trails',
    participants: '250 nature enthusiasts',
  },
  {
    id: 6,
    title: 'Food Festival 2024',
    date: 'October 15-17, 2024',
    duration: '3 days',
    category: 'past',
    description: 'Celebrated local cuisines and traditional recipes with cooking demonstrations and tasting sessions.',
    fullDetails:
      'A culinary celebration featuring local farmers, chefs, and food enthusiasts sharing traditional recipes, conducting cooking workshops, and serving delicious regional dishes.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561a1b?w=800&h=600&fit=crop',
    location: 'Community Ground',
    participants: '500 food lovers',
  },
];

const EventsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [expandedEvent, setExpandedEvent] = useState<number | null>(null);

  const filteredEvents = EVENTS.filter((event) => event.category === selectedTab);
  const upcomingEvents = EVENTS.filter((e) => e.category === 'upcoming');
  const featured = upcomingEvents[0];

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-96 sm:h-[500px] lg:h-[600px] bg-cover bg-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506157786151-b8491531f063?w=1400&h=800&fit=crop"
          alt="Events & Festivals"
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/50"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-yellow-300 font-bold text-sm uppercase tracking-widest mb-4 animate-pulse">
              ● Celebrations & Community
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Events & Festivals
            </h1>
            <p className="text-xl sm:text-2xl text-yellow-100 max-w-2xl mx-auto">
              Experience the vibrant energy, cultural celebrations, and exciting adventures at Osam Hill
            </p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED EVENT BANNER ===== */}
      {featured && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Image */}
              <div className="relative h-80 rounded-xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4 bg-white text-orange-600 px-4 py-2 rounded-full font-bold text-lg">
                  FEATURED
                </div>
              </div>

              {/* Content */}
              <div className="text-white">
                <p className="text-orange-100 font-bold text-sm uppercase tracking-wider mb-2">Upcoming Event</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-4">{featured.title}</h2>
                <p className="text-xl text-orange-50 mb-6">{featured.description}</p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <span className="text-lg font-semibold">{featured.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">◐</span>
                    <span className="text-lg font-semibold">{featured.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>
                    <span className="text-lg font-semibold">{featured.participants}</span>
                  </div>
                </div>

                <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-orange-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== TAB NAVIGATION ===== */}
      <section className="sticky top-16 z-40 bg-white border-b-2 border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {[
              { id: 'upcoming', label: 'Upcoming Events' },
              { id: 'past', label: 'Past Events' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-4 font-bold text-lg transition-all duration-300 border-b-4 ${
                  selectedTab === tab.id
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-monsoon-600 hover:text-orange-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== UPCOMING EVENTS HIGHLIGHTS ===== */}
      {selectedTab === 'upcoming' && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange-600 font-bold text-sm uppercase tracking-wider mb-2">Coming Soon</p>
              <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Don't Miss Out!</h2>
              <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
                Mark your calendar and join us for these incredible events
              </p>
            </div>

            {/* Highlight Cards for Key Events */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* Marathon Card */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden bg-gray-200">
                  <img
                    src={EVENTS[0].image}
                    alt={EVENTS[0].title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-3">
                    <span className="inline-block px-4 py-2 bg-orange-500 rounded-full font-bold text-sm">
                      🏃 MARATHON
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{EVENTS[0].title}</h3>
                  <p className="text-orange-100 text-lg font-semibold mb-4">{EVENTS[0].date}</p>
                  <p className="text-orange-50 mb-4">{EVENTS[0].description}</p>

                  {EVENTS[0].highlights && (
                    <div className="space-y-1 mb-4">
                      {EVENTS[0].highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="text-sm text-orange-100">
                          ✨ {highlight}
                        </div>
                      ))}
                    </div>
                  )}

                  <button className="w-full px-4 py-2 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 transition-colors">
                    Register
                  </button>
                </div>
              </div>

              {/* Mela Card */}
              <div className="group relative rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-80 overflow-hidden bg-gray-200">
                  <img
                    src={EVENTS[1].image}
                    alt={EVENTS[1].title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="mb-3">
                    <span className="inline-block px-4 py-2 bg-pink-500 rounded-full font-bold text-sm">
                      ▲ FESTIVAL
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{EVENTS[1].title}</h3>
                  <p className="text-pink-100 text-lg font-semibold mb-4">{EVENTS[1].date}</p>
                  <p className="text-pink-50 mb-4">{EVENTS[1].description}</p>

                  {EVENTS[1].highlights && (
                    <div className="space-y-1 mb-4">
                      {EVENTS[1].highlights.slice(0, 2).map((highlight, idx) => (
                        <div key={idx} className="text-sm text-pink-100">
                          ✨ {highlight}
                        </div>
                      ))}
                    </div>
                  )}

                  <button className="w-full px-4 py-2 bg-white text-pink-600 rounded-lg font-bold hover:bg-pink-50 transition-colors">
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== EVENTS GRID ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-gray-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full font-bold text-xs ${
                        event.category === 'upcoming'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}
                    >
                      {event.category === 'upcoming' ? '◉ UPCOMING' : '✓ PAST'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-forest-800 mb-2 group-hover:text-orange-600 transition-colors">
                    {event.title}
                  </h3>

                  {/* Date & Duration */}
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <span className="text-lg">📅</span>
                    <div>
                      <p className="font-semibold text-forest-700">{event.date}</p>
                      <p className="text-monsoon-600 text-xs">{event.duration}</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="text-lg">◐</span>
                    <span className="text-monsoon-600">{event.location}</span>
                  </div>

                  {/* Description */}
                  <p className="text-monsoon-600 text-sm mb-4 line-clamp-2">{event.description}</p>

                  {/* Participants */}
                  {event.participants && (
                    <div className="flex items-center gap-2 mb-4 text-sm">
                      <span className="text-lg">👥</span>
                      <span className="text-monsoon-600 font-semibold">{event.participants}</span>
                    </div>
                  )}

                  {/* Highlights */}
                  {event.highlights && event.highlights.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-gray-200">
                      <p className="text-xs font-bold text-forest-800 mb-2 uppercase">Highlights</p>
                      <div className="flex flex-wrap gap-1">
                        {event.highlights.slice(0, 2).map((highlight, idx) => (
                          <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                            {highlight}
                          </span>
                        ))}
                        {event.highlights.length > 2 && (
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            +{event.highlights.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                    className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-bold transition-colors duration-300"
                  >
                    {expandedEvent === event.id ? 'Hide Details' : 'View Details'}
                  </button>

                  {/* Expanded Details */}
                  {expandedEvent === event.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200 animate-in fade-in">
                      <p className="text-monsoon-600 text-sm leading-relaxed mb-4">{event.fullDetails}</p>
                      <button className="w-full px-4 py-2 bg-forest-800 text-white rounded-lg font-bold hover:bg-forest-700 transition-colors">
                        Register Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* No Events Message */}
          {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-forest-800 mb-2">No events found</h3>
              <p className="text-monsoon-600">Check back later for exciting updates!</p>
            </div>
          )}
        </div>
      </section>

      {/* ===== EVENT TESTIMONIALS ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-100 via-pink-100 to-red-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-12 text-center">What Attendees Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                event: 'Marathon Participant',
                quote: 'The 1000 stairs challenge was incredible! The views and energy at the summit were unforgettable.',
                rating: 5,
              },
              {
                name: 'Priya Sharma',
                event: 'Ashadhi Beej Mela Visitor',
                quote: 'A magical experience! The spiritual energy combined with cultural celebrations was mesmerizing.',
                rating: 5,
              },
              {
                name: 'Arjun Patel',
                event: 'Photography Festival Participant',
                quote: 'Captured some of my best work here. Osam Hill is a photographer\'s paradise!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow">
                <div className="flex gap-1 mb-3">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-2xl">★</span>
                    ))}
                </div>
                <p className="text-monsoon-600 mb-4 italic text-lg">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-forest-800">{testimonial.name}</p>
                  <p className="text-sm text-monsoon-600">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER CTA ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-pink-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Never Miss an Event</h2>
          <p className="text-xl text-orange-100 mb-8">
            Subscribe to our newsletter for updates on upcoming festivals and events
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-forest-800 font-semibold focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-8 py-4 bg-white text-orange-600 rounded-lg font-bold hover:bg-orange-50 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              Subscribe
            </button>
          </div>

          <p className="text-sm text-orange-100 mt-4">We respect your privacy. Unsubscribe at any time.</p>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;
