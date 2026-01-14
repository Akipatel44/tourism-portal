import React, { useState } from 'react';

interface WaterFall {
  id: number;
  name: string;
  height: string;
  description: string;
  bestTime: string;
  difficulty: string;
  image: string;
}

interface LocalFruit {
  id: number;
  name: string;
  scientificName: string;
  season: string;
  description: string;
  health: string[];
  image: string;
}

interface SeasonalFlower {
  id: number;
  name: string;
  season: string;
  description: string;
  color: string;
  image: string;
}

const WATERFALLS: WaterFall[] = [
  {
    id: 1,
    name: 'Zarna Waterfall',
    height: '180 meters',
    description:
      'The most spectacular waterfall in the region, cascading down the monsoon cliffs with mesmerizing power. The thundering waters create a magical mist that rises above the valley.',
    bestTime: 'July - September',
    difficulty: 'Moderate',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Twin Falls of Osam',
    height: '120 meters',
    description:
      'Two graceful streams falling side by side, creating a picturesque twin waterfall surrounded by lush green vegetation.',
    bestTime: 'June - October',
    difficulty: 'Easy',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Hidden Cascade',
    height: '85 meters',
    description:
      'A serene waterfall hidden within dense forest, accessible only to the adventurous. Crystal clear pools perfect for swimming.',
    bestTime: 'August - November',
    difficulty: 'Challenging',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
];

const LOCAL_FRUITS: LocalFruit[] = [
  {
    id: 1,
    name: 'Rayan',
    scientificName: 'Ziziphus mauritiana',
    season: 'May - July',
    description:
      'A sweet, jujube-like fruit native to the region. Brown-red in color with a pleasant sweet taste. The locals have cultivated this fruit for centuries, and it holds cultural significance in the area.',
    health: ['Rich in Vitamin C', 'Improves digestion', 'Natural energy booster', 'Antioxidant properties'],
    image: 'https://images.unsplash.com/photo-1585518419759-47f6cd4200de?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Imli',
    scientificName: 'Tamarindus indica',
    season: 'March - June',
    description:
      'Tamarind is a key ingredient in Indian cuisine with a sweet-sour taste. The brown pods contain fibrous pulp used in curries, drinks, and traditional medicines. It\'s been part of local life for generations.',
    health: ['Aids digestion', 'Reduces inflammation', 'Rich in minerals', 'Natural laxative'],
    image: 'https://images.unsplash.com/photo-1599599810694-c6129f5b1b41?w=800&h=600&fit=crop',
  },
];

const SEASONAL_FLOWERS: SeasonalFlower[] = [
  {
    id: 1,
    name: 'Monsoon Orchids',
    season: 'July - September',
    description:
      'Delicate orchids in purple, pink, and white bloom during the monsoon, thriving in the cool, misty climate of the hills.',
    color: 'purple',
    image: 'https://images.unsplash.com/photo-1490633874177-96b4f5c73af5?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Spring Wildflowers',
    season: 'March - May',
    description:
      'Vibrant wildflowers carpet the meadows in spring, creating a colorful tapestry of yellows, reds, and oranges across the landscape.',
    color: 'yellow',
    image: 'https://images.unsplash.com/photo-1490633874177-96b4f5c73af5?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Winter Blossoms',
    season: 'October - December',
    description:
      'Delicate flowers bloom despite the cool weather, adding subtle beauty to the winter landscape with whites and soft pinks.',
    color: 'pink',
    image: 'https://images.unsplash.com/photo-1490633874177-96b4f5c73af5?w=800&h=600&fit=crop',
  },
];

const NaturePage: React.FC = () => {
  const [expandedWaterfall, setExpandedWaterfall] = useState<number | null>(null);
  const [expandedFruit, setExpandedFruit] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-96 sm:h-[500px] lg:h-[600px] bg-cover bg-center overflow-hidden group">
        <img
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1400&h=800&fit=crop"
          alt="Osam Hill Nature"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-end justify-start p-6 sm:p-12 lg:p-16">
          <div>
            <p className="text-green-300 font-semibold text-sm uppercase tracking-wider mb-2">
              🌿 Ecosystem & Biodiversity
            </p>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Nature's Sanctuary
            </h1>
            <p className="text-lg sm:text-xl text-green-100 max-w-2xl">
              Discover the rich biodiversity, cascading waterfalls, and vibrant life of Osam Hill
            </p>
          </div>
        </div>
      </section>

      {/* ===== NATURAL BEAUTY OVERVIEW ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative h-96 sm:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
                alt="Osam Hill Forest"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div>
              <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-3">
                Pristine Wilderness
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-6">Natural Beauty Overview</h2>

              <p className="text-lg text-monsoon-600 mb-6 leading-relaxed">
                Osam Hill stands as a sanctuary of untouched natural beauty, where lush forests stretch across the
                rolling hills and pristine streams flow through ancient valleys. The region is characterized by its
                diverse ecosystem, supporting thousands of plant and animal species.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '🌳', label: 'Forest Area', value: '2,500+ hectares' },
                  { icon: '💧', label: 'Water Sources', value: '15+ waterfalls' },
                  { icon: '🌸', label: 'Flora Species', value: '500+ species' },
                  { icon: '🦋', label: 'Fauna Species', value: '300+ species' },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
                    <div className="text-3xl mb-2">{stat.icon}</div>
                    <p className="text-sm text-monsoon-600 mb-1">{stat.label}</p>
                    <p className="font-bold text-green-700">{stat.value}</p>
                  </div>
                ))}
              </div>

              <p className="text-monsoon-600 leading-relaxed">
                The biodiversity of Osam Hill makes it a critical ecosystem that needs preservation and appreciation.
                Every visit is a journey into the heart of nature's majesty.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== MONSOON WATERFALLS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
              💧 Monsoon Magic
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Cascading Waterfalls</h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              Experience the raw power and beauty of nature's waterfalls during monsoon season
            </p>
          </div>

          <div className="space-y-12">
            {WATERFALLS.map((waterfall, index) => (
              <div
                key={waterfall.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image */}
                <div
                  className={`relative h-80 sm:h-96 rounded-xl overflow-hidden shadow-xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <img
                    src={waterfall.image}
                    alt={waterfall.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3">
                    <p className="text-2xl font-bold text-green-700">{waterfall.height}</p>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <h3 className="text-3xl sm:text-4xl font-bold text-forest-800 mb-3">{waterfall.name}</h3>
                  <p className="text-lg text-monsoon-600 mb-4 leading-relaxed">{waterfall.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b-2 border-gray-200">
                    <div>
                      <p className="text-sm text-monsoon-500 font-semibold uppercase mb-1">Best Time</p>
                      <p className="font-bold text-green-700">{waterfall.bestTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-monsoon-500 font-semibold uppercase mb-1">Difficulty</p>
                      <p className="font-bold text-green-700">{waterfall.difficulty}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedWaterfall(expandedWaterfall === waterfall.id ? null : waterfall.id)}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold transition-colors duration-300"
                  >
                    {expandedWaterfall === waterfall.id ? 'Hide Details' : 'Explore More'}
                  </button>

                  {expandedWaterfall === waterfall.id && (
                    <div className="mt-6 p-6 bg-green-50 rounded-lg border-l-4 border-green-600 animate-in fade-in">
                      <p className="text-monsoon-700 leading-relaxed">
                        The waterfall is best visited early morning when the mist is at its thickest and the light
                        creates magical rainbows. Bring proper trekking gear and stay hydrated. Local guides are
                        recommended for safer exploration.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LOCAL FRUITS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
              🍂 Local Harvest
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Indigenous Fruits</h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              Taste the unique flavors of fruits grown in Osam Hill's fertile soil
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {LOCAL_FRUITS.map((fruit) => (
              <div
                key={fruit.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-green-100">
                  <img
                    src={fruit.image}
                    alt={fruit.name}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-2xl font-bold text-white mb-1">{fruit.name}</p>
                    <p className="text-green-200 italic text-sm">{fruit.scientificName}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-gray-200">
                    <div>
                      <p className="text-sm text-monsoon-500 font-semibold uppercase mb-1">Season</p>
                      <p className="font-bold text-green-700">{fruit.season}</p>
                    </div>
                  </div>

                  <p className="text-monsoon-600 leading-relaxed mb-6">{fruit.description}</p>

                  {/* Health Benefits */}
                  <div className="mb-6">
                    <h4 className="font-bold text-forest-800 mb-3">Health Benefits</h4>
                    <div className="space-y-2">
                      {fruit.health.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-monsoon-600 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedFruit(expandedFruit === fruit.id ? null : fruit.id)}
                    className="w-full px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-semibold transition-colors duration-300"
                  >
                    {expandedFruit === fruit.id ? 'Hide Recipe Ideas' : 'Show Recipe Ideas'}
                  </button>

                  {expandedFruit === fruit.id && (
                    <div className="mt-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-600 animate-in fade-in">
                      <h5 className="font-bold text-forest-800 mb-2">Traditional Uses</h5>
                      <ul className="text-sm text-monsoon-700 space-y-1">
                        <li>• Fresh as a healthy snack</li>
                        <li>• In traditional beverages</li>
                        <li>• As natural medicine</li>
                        <li>• In local cuisine preparations</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SEASONAL FLOWERS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
              🌸 Year-Round Beauty
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Seasonal Flowers</h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              Every season brings a different bloom to Osam Hill's landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SEASONAL_FLOWERS.map((flower) => (
              <div
                key={flower.id}
                className="group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-green-100">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform group-hover:translate-y-0 transition-transform">
                  <h3 className="text-2xl font-bold mb-2">{flower.name}</h3>
                  <p className="text-sm text-green-100 font-semibold mb-3">{flower.season}</p>
                  <p className="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {flower.description}
                  </p>
                </div>

                {/* Background Card (visible when hover) */}
                <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-6 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-forest-800 mb-3">{flower.name}</h3>
                  <p className="text-sm text-green-600 font-semibold mb-3">{flower.season}</p>
                  <p className="text-monsoon-600 leading-relaxed">{flower.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FARMER LIFE SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-green-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">
              🌾 Community Life
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Farmer Life Around Osam Hill</h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              The timeless connection between the local communities and the land
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1500595046891-8a2b52ee4dab?w=800&h=600&fit=crop"
                alt="Farming"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            {/* Content */}
            <div>
              <h3 className="text-3xl sm:text-4xl font-bold text-forest-800 mb-6">Living with Nature</h3>

              <div className="space-y-6">
                {[
                  {
                    title: 'Sustainable Agriculture',
                    description:
                      'Farmers practice traditional, sustainable methods passed down through generations, respecting the land and its rhythms.',
                  },
                  {
                    title: 'Seasonal Cycles',
                    description:
                      'Life in Osam Hill revolves around the seasons - planting in spring, nurturing in monsoon, harvesting in autumn.',
                  },
                  {
                    title: 'Local Produce',
                    description:
                      'The fertile soil produces organic vegetables, fruits, and grains that feed the community and attract visitors.',
                  },
                  {
                    title: 'Cultural Heritage',
                    description:
                      'Farming traditions are intertwined with spiritual practices, making agriculture a sacred act connecting humans to divine.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="border-l-4 border-green-600 pl-6">
                    <h4 className="text-lg font-bold text-forest-800 mb-2">{item.title}</h4>
                    <p className="text-monsoon-600 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Farmer Activities Grid */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-forest-800 mb-8 text-center">A Day in the Life</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: '🌅', activity: 'Early Morning', time: '5-7 AM' },
                { icon: '🌱', activity: 'Field Work', time: '7-11 AM' },
                { icon: '☕', activity: 'Rest & Meals', time: '11-2 PM' },
                { icon: '👨‍🌾', activity: 'Evening Harvest', time: '2-6 PM' },
              ].map((item, idx) => (
                <div key={idx} className="text-center p-6 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
                  <div className="text-5xl mb-3">{item.icon}</div>
                  <h4 className="font-bold text-forest-800 mb-1">{item.activity}</h4>
                  <p className="text-sm text-monsoon-600">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== ECO-TOURISM CTA ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-700 to-green-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Experience Nature's Sanctuary</h2>
          <p className="text-xl text-green-100 mb-8 leading-relaxed">
            Immerse yourself in the natural beauty, witness the monsoon magic, taste the local flavors, and connect
            with the farming communities of Osam Hill
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-accent-mint text-forest-800 rounded-lg font-bold text-lg hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              Book Eco-Tour
            </button>
            <button className="px-10 py-4 border-2 border-white text-white rounded-lg font-bold text-lg hover:bg-white hover:text-green-700 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NaturePage;
