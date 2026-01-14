import React, { useState } from 'react';

interface TransportMode {
  icon: string;
  name: string;
  duration: string;
  distance: string;
  cost: string;
  details: string;
}

interface BestTimeInfo {
  season: string;
  icon: string;
  temp: string;
  rainfall: string;
  highlights: string[];
  rating: string;
}

interface DosDont {
  do: string;
  dont: string;
}

interface LocalDish {
  name: string;
  description: string;
  type: string;
  icon: string;
}

const TRANSPORT_MODES: TransportMode[] = [
  {
    icon: '🚗',
    name: 'Private Car / Taxi',
    duration: '2.5-3 hours',
    distance: 'From nearest city',
    cost: '₹2,500-4,000',
    details:
      'Most convenient option. You can park at the base and trek at your own pace. Good for families and groups.',
  },
  {
    icon: '🚌',
    name: 'Public Bus',
    duration: '3.5-4 hours',
    distance: 'From city center',
    cost: '₹500-800',
    details: 'Budget-friendly option. Buses run regularly. Plan to reach early as buses can be crowded during peak season.',
  },
  {
    icon: '🚴',
    name: 'Two Wheeler',
    duration: '1.5-2 hours',
    distance: 'From city',
    cost: '₹50-100 fuel',
    details: 'Quick and flexible. Use helmets and drive safely. Road is well-maintained but winding in places.',
  },
  {
    icon: '✈️',
    name: 'Flight + Local Transport',
    duration: 'Varies',
    distance: 'Nearest airport',
    cost: '₹15,000+',
    details:
      'For international/long-distance travelers. Nearest airport is 4 hours away. Arrange local transport from airport.',
  },
];

const BEST_TIMES: BestTimeInfo[] = [
  {
    season: 'Winter',
    icon: '❄️',
    temp: '8-20°C',
    rainfall: 'Minimal',
    highlights: ['Clear blue skies', 'Perfect trekking weather', 'Ideal for photography', 'Most crowded period'],
    rating: '⭐⭐⭐⭐⭐',
  },
  {
    season: 'Spring',
    icon: '🌸',
    temp: '15-28°C',
    rainfall: 'Low',
    highlights: ['Wildflowers blooming', 'Pleasant mornings', 'Green hillsides', 'Lesser crowds'],
    rating: '⭐⭐⭐⭐',
  },
  {
    season: 'Monsoon',
    icon: '🌧️',
    temp: '18-25°C',
    rainfall: 'High',
    highlights: ['Waterfalls at peak', 'Lush green scenery', 'Misty mornings', 'Slippery trails'],
    rating: '⭐⭐⭐',
  },
  {
    season: 'Autumn',
    icon: '🍂',
    temp: '18-28°C',
    rainfall: 'Low',
    highlights: ['Clear visibility', 'Comfortable weather', 'Post-monsoon freshness', 'Ideal for all activities'],
    rating: '⭐⭐⭐⭐⭐',
  },
];

const DOS_AND_DONTS: DosDont[] = [
  {
    do: 'Start early morning to avoid midday heat and crowds',
    dont: "Don't trek alone, always go with a group or guide",
  },
  {
    do: 'Carry sufficient water (2-3 liters minimum)',
    dont: "Don't litter - carry all waste back with you",
  },
  {
    do: 'Wear proper trekking shoes with good grip',
    dont: "Don't wear loose or inappropriate clothing",
  },
  {
    do: 'Apply sunscreen (SPF 50+) and wear a hat',
    dont: "Don't trek during extreme weather conditions",
  },
  {
    do: 'Respect local culture and traditions',
    dont: "Don't take photos without permission in temples",
  },
  {
    do: 'Check weather forecast before planning',
    dont: "Don't stray from marked trails",
  },
  {
    do: 'Inform someone about your itinerary',
    dont: "Don't consume alcohol before or during trek",
  },
  {
    do: 'Support local guides and homestays',
    dont: "Don't ignore safety warnings from locals",
  },
];

const LOCAL_FOOD: LocalDish[] = [
  {
    name: 'Bhakri & Chikhalwali',
    icon: '🍞',
    type: 'Staple',
    description: 'Millet bread served with local vegetable curry. High in nutrients and perfect after trekking.',
  },
  {
    name: 'Rayan (Local Fruit)',
    icon: '🍎',
    type: 'Seasonal',
    description: 'Sweet monsoon fruit with health benefits. Acts as natural energy booster for trekkers.',
  },
  {
    name: 'Imli (Tamarind)',
    icon: '🫒',
    type: 'Local Spice',
    description: 'Local tamarind used in chutneys and dishes. Aids digestion and provides cooling effect.',
  },
  {
    name: 'Organic Dhal & Rice',
    icon: '🍚',
    type: 'Main Course',
    description: 'Simple, nutritious meal prepared fresh daily in homestays. High in protein.',
  },
  {
    name: 'Jaggery & Nuts',
    icon: '🌰',
    type: 'Energy',
    description: 'Traditional energy balls made with jaggery, nuts, and seeds. Perfect trek snack.',
  },
  {
    name: 'Herbal Teas',
    icon: '🍵',
    type: 'Wellness',
    description: 'Local herbal brews using forest plants. Known for healing properties and rejuvenation.',
  },
];

const VisitorGuidePage: React.FC = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'transport' | 'season' | 'dos' | 'culture' | 'responsible'>('transport');

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-80 sm:h-[450px] lg:h-[550px] bg-cover bg-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&h=800&fit=crop"
          alt="Visitor Guide"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 via-forest-800/60 to-forest-900/70"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-mint-400 font-bold text-sm uppercase tracking-widest mb-4">📖 Plan Your Visit</p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Visitor Guide
            </h1>
            <p className="text-xl sm:text-2xl text-mint-100 max-w-2xl mx-auto">
              Everything you need to know for a memorable and responsible visit to Osam Hill
            </p>
          </div>
        </div>
      </section>

      {/* ===== TAB NAVIGATION ===== */}
      <section className="sticky top-16 z-40 bg-white border-b-2 border-forest-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-2 sm:gap-6">
            {[
              { id: 'transport', label: '🚗 How to Reach', icon: '🚗' },
              { id: 'season', label: '📅 Best Time', icon: '📅' },
              { id: 'dos', label: '✅ Do\'s & Don\'ts', icon: '✅' },
              { id: 'culture', label: '🍜 Culture & Food', icon: '🍜' },
              { id: 'responsible', label: '🌱 Responsible Tourism', icon: '🌱' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-3 sm:px-6 font-bold text-sm sm:text-base transition-all duration-300 border-b-4 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-forest-600 text-forest-700'
                    : 'border-transparent text-monsoon-600 hover:text-forest-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW TO REACH ===== */}
      {activeTab === 'transport' && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-mint-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">How to Reach Osam Hill</h2>
              <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
                Multiple convenient transportation options available. Choose the one that suits your needs and budget.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {TRANSPORT_MODES.map((mode, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-t-4 border-mint-500">
                  <div className="text-5xl mb-3">{mode.icon}</div>
                  <h3 className="text-xl font-bold text-forest-800 mb-2">{mode.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-forest-600">⏱️</span>
                      <span className="text-monsoon-700">{mode.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-forest-600">📏</span>
                      <span className="text-monsoon-700">{mode.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-bold text-forest-600">💰</span>
                      <span className="text-monsoon-700 font-bold">{mode.cost}</span>
                    </div>
                  </div>
                  <p className="text-sm text-monsoon-600 leading-relaxed">{mode.details}</p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-gradient-to-br from-monsoon-100 to-mint-100 rounded-xl p-8 text-center border-2 border-dashed border-monsoon-300">
              <div className="text-5xl mb-3">🗺️</div>
              <h3 className="text-2xl font-bold text-forest-800 mb-2">Location Map</h3>
              <p className="text-monsoon-600 mb-4">
                Osam Hill is located in the Western Ghats region, easily accessible from nearby cities.
              </p>
              <div className="bg-white rounded-lg p-4 inline-block">
                <p className="font-bold text-forest-700">Coordinates: 23.45°N, 73.21°E</p>
                <p className="text-sm text-monsoon-600">Interactive map integration coming soon</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== BEST TIME TO VISIT ===== */}
      {activeTab === 'season' && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-yellow-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Best Time to Visit</h2>
              <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
                Each season offers unique experiences. Choose based on your preferences and activities planned.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BEST_TIMES.map((season, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                  <div className="bg-gradient-to-br from-forest-50 to-mint-50 p-6 text-center">
                    <div className="text-6xl mb-2">{season.icon}</div>
                    <h3 className="text-2xl font-bold text-forest-800">{season.season}</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-3 mb-4">
                      <div>
                        <p className="text-xs uppercase font-bold text-monsoon-600 mb-1">Temperature</p>
                        <p className="text-lg font-bold text-forest-800">{season.temp}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold text-monsoon-600 mb-1">Rainfall</p>
                        <p className="text-lg font-bold text-forest-800">{season.rainfall}</p>
                      </div>
                      <div>
                        <p className="text-xs uppercase font-bold text-monsoon-600 mb-1">Rating</p>
                        <p className="text-lg">{season.rating}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold text-monsoon-600 mb-2">Highlights</p>
                      <ul className="space-y-1">
                        {season.highlights.map((highlight, i) => (
                          <li key={i} className="text-sm text-monsoon-700 flex items-start gap-2">
                            <span className="text-mint-600 font-bold">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Booking Recommendation */}
            <div className="mt-12 bg-gradient-to-r from-forest-700 to-forest-800 text-white rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4">📅 Booking Advice</h3>
              <p className="mb-4 text-lg">
                <span className="font-bold">Peak Season (Dec-Feb):</span> Book accommodations and guides 2-3 weeks in advance. Expect larger crowds but perfect weather.
              </p>
              <p className="text-lg">
                <span className="font-bold">Off-Season (Mar-May, Oct-Nov):</span> Best for budget travelers. Get last-minute bookings with better rates and peaceful experience.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ===== DO'S AND DON'TS ===== */}
      {activeTab === 'dos' && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Do's and Don'ts</h2>
              <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
                Follow these guidelines to ensure a safe, enjoyable, and responsible visit.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Do's */}
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-3">
                  <span className="text-3xl">✅</span> Do's
                </h3>
                <div className="space-y-4">
                  {DOS_AND_DONTS.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border-l-4 border-green-500">
                      <p className="text-forest-800 font-bold flex items-start gap-3">
                        <span className="text-green-600 font-black text-lg">✓</span>
                        <span>{item.do}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Don'ts */}
              <div>
                <h3 className="text-2xl font-bold text-red-700 mb-6 flex items-center gap-3">
                  <span className="text-3xl">❌</span> Don'ts
                </h3>
                <div className="space-y-4">
                  {DOS_AND_DONTS.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-md border-l-4 border-red-500">
                      <p className="text-forest-800 font-bold flex items-start gap-3">
                        <span className="text-red-600 font-black text-lg">✕</span>
                        <span>{item.dont}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== LOCAL CULTURE & FOOD ===== */}
      {activeTab === 'culture' && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Local Culture & Food</h2>
              <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
                Experience authentic local traditions, cuisine, and hospitality.
              </p>
            </div>

            {/* Culture Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-forest-600">
                <h3 className="text-2xl font-bold text-forest-800 mb-4 flex items-center gap-3">
                  <span>🏛️</span> Local Culture
                </h3>
                <p className="text-monsoon-700 mb-4 leading-relaxed">
                  Osam Hill is deeply rooted in Pandava mythology and local traditions. The region is home to indigenous communities with rich cultural heritage.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-forest-600 font-bold">●</span>
                    <span className="text-monsoon-700">
                      <strong>Spiritual Significance:</strong> The hills are believed to have connections with the Pandavas from Mahabharata.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest-600 font-bold">●</span>
                    <span className="text-monsoon-700">
                      <strong>Local Festivals:</strong> Ashadhi Beej Mela celebrates the monsoon season with traditional ceremonies.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest-600 font-bold">●</span>
                    <span className="text-monsoon-700">
                      <strong>Indigenous Practices:</strong> Farming, herbal medicine, and forest conservation are integral to local life.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-orange-600">
                <h3 className="text-2xl font-bold text-forest-800 mb-4 flex items-center gap-3">
                  <span>👥</span> Interact Respectfully
                </h3>
                <p className="text-monsoon-700 mb-4 leading-relaxed">
                  The local communities are warm and welcoming. Show respect for their way of life and traditions.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-forest-600 font-bold">●</span>
                    <span className="text-monsoon-700">
                      <strong>Learn Local Language:</strong> Few basic phrases in local language go a long way.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest-600 font-bold">●</span>
                    <span className="text-monsoon-700">
                      <strong>Ask Permission:</strong> Before photographing people or sacred sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest-600 font-bold">●</span>
                    <span className="text-monsoon-700">
                      <strong>Support Local Business:</strong> Shop at local markets and eat at homestays.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Local Food */}
            <div>
              <h3 className="text-2xl font-bold text-forest-800 mb-8 flex items-center gap-3">
                <span>🍜</span> Must-Try Local Food
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LOCAL_FOOD.map((dish, idx) => (
                  <div key={idx} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border-2 border-orange-100">
                    <div className="text-5xl mb-3">{dish.icon}</div>
                    <h4 className="text-xl font-bold text-forest-800 mb-2">{dish.name}</h4>
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                        {dish.type}
                      </span>
                    </div>
                    <p className="text-monsoon-700 text-sm">{dish.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Dining Tips */}
            <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-forest-800 mb-4">🍽️ Dining Tips</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-forest-700 mb-2">What to Expect</h4>
                  <ul className="space-y-1 text-monsoon-700">
                    <li>✓ Freshly cooked meals using local ingredients</li>
                    <li>✓ Simple, nutritious food suited for trekkers</li>
                    <li>✓ Vegetarian options readily available</li>
                    <li>✓ Meals served at set times (plan accordingly)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-forest-700 mb-2">Hygiene & Safety</h4>
                  <ul className="space-y-1 text-monsoon-700">
                    <li>✓ Boil or filter drinking water if unsure</li>
                    <li>✓ Eat hot, freshly cooked food</li>
                    <li>✓ Avoid raw salads unless prepared carefully</li>
                    <li>✓ Carry basic digestive medicines</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== RESPONSIBLE TOURISM ===== */}
      {activeTab === 'responsible' && (
        <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Responsible Tourism</h2>
              <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
                Help preserve Osam Hill for future generations through conscious travel practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                {
                  icon: '♻️',
                  title: 'Environmental Conservation',
                  points: [
                    'No plastic bags - carry reusable bags',
                    'No littering - carry all waste down with you',
                    'Stay on marked trails to prevent erosion',
                    'Do not pick flowers or damage plants',
                    'No loud music or noise pollution',
                    'Respect wildlife - do not feed animals',
                  ],
                },
                {
                  icon: '💚',
                  title: 'Community Support',
                  points: [
                    'Hire local guides - supports local economy',
                    'Stay in homestays - helps local families',
                    'Buy local products - empowers artisans',
                    'Respect local customs and traditions',
                    'Fair pricing - pay decent wages for services',
                    'Give back - support local schools/charities',
                  ],
                },
                {
                  icon: '🌍',
                  title: 'Sustainable Practices',
                  points: [
                    'Use eco-friendly toiletries',
                    'Conserve water - short showers',
                    'Use solar energy - available in homestays',
                    'Minimize carbon footprint - carpool',
                    'Choose organic/local food',
                    'Support conservation initiatives',
                  ],
                },
                {
                  icon: '📢',
                  title: 'Positive Impact',
                  points: [
                    'Share responsible tourism stories',
                    'Educate others about preservation',
                    'Report environmental damage to authorities',
                    'Participate in cleanup drives',
                    'Support local conservation NGOs',
                    'Be a responsible tourist ambassador',
                  ],
                },
              ].map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-emerald-500">
                  <h3 className="text-2xl font-bold text-forest-800 mb-6 flex items-center gap-3">
                    <span className="text-4xl">{section.icon}</span>
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-monsoon-700">
                        <span className="text-emerald-600 font-bold text-lg">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Impact Stats */}
            <div className="bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-6">Your Impact Matters</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">2,500+</div>
                  <div className="text-sm font-bold opacity-90">Trees Planted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">500kg</div>
                  <div className="text-sm font-bold opacity-90">Waste Collected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">100+</div>
                  <div className="text-sm font-bold opacity-90">Jobs Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black mb-2">50+</div>
                  <div className="text-sm font-bold opacity-90">Students Supported</div>
                </div>
              </div>
            </div>

            {/* Pledge Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-emerald-200">
              <h3 className="text-2xl font-bold text-forest-800 mb-4">Make the Pledge</h3>
              <p className="text-monsoon-700 mb-6">
                Help us create a sustainable future for Osam Hill. Make these commitments during your visit:
              </p>
              <div className="space-y-2">
                {[
                  'I will not litter and carry all waste with me',
                  'I will respect local culture and traditions',
                  'I will support local guides and businesses',
                  'I will stay on marked trails',
                  'I will conserve water and energy',
                ].map((pledge, idx) => (
                  <label key={idx} className="flex items-center gap-3 p-3 hover:bg-emerald-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-emerald-600 cursor-pointer"
                      defaultChecked={false}
                    />
                    <span className="text-monsoon-700 font-bold">{pledge}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ===== CTA SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-700 to-forest-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Explore?</h2>
          <p className="text-xl text-forest-100 mb-8">
            Use this guide to plan a safe, enjoyable, and responsible visit to Osam Hill.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-8 py-4 bg-mint-500 text-forest-900 rounded-lg font-bold hover:bg-mint-400 hover:shadow-xl transition-all transform hover:scale-105">
              Download Full Guide
            </button>
            <button className="px-8 py-4 border-3 border-white text-white rounded-lg font-bold hover:bg-white/20 transition-all transform hover:scale-105">
              Contact Support
            </button>
          </div>

          <p className="text-sm text-forest-100">
            For more information, call: +91 XXXX XXXX XXX | Email: info@osamhill.com
          </p>
        </div>
      </section>

      {/* ===== EMERGENCY INFO ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-red-800 mb-6 flex items-center gap-3">
            <span className="text-3xl">🚨</span> Emergency Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Police', number: '100', icon: '🚔' },
              { label: 'Ambulance', number: '102', icon: '🚑' },
              { label: 'Local Help', number: '+91-XXXX-XXXX', icon: '📞' },
            ].map((emergency, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border-2 border-red-200">
                <div className="text-4xl mb-2">{emergency.icon}</div>
                <p className="text-sm text-monsoon-600 font-bold mb-1">{emergency.label}</p>
                <p className="text-2xl font-black text-red-600">{emergency.number}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisitorGuidePage;

