import React, { useState } from 'react';

interface Trek {
  id: number;
  name: string;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  duration: string;
  distance: string;
  elevation: string;
  description: string;
  highlights: string[];
  bestSeason: string;
  image: string;
}

interface SafetyTip {
  id: number;
  icon: string;
  title: string;
  description: string;
  details: string[];
}

const TREKS: Trek[] = [
  {
    id: 1,
    name: '1000 Stairs Challenge',
    difficulty: 'Hard',
    duration: '2-3 hours',
    distance: '2.5 km',
    elevation: '600m',
    description:
      'The iconic 1000 stairs trek - a legendary challenge that tests your endurance and rewards you with breathtaking panoramic views of the entire Osam Hill region.',
    highlights: [
      'Exactly 1000 counted stone steps',
      'Multiple viewpoints with stunning vistas',
      'Ancient temple structures along the way',
      'Lush forest canopy for shade',
      'Sunrise or sunset finish options',
    ],
    bestSeason: 'October to March',
    image: 'https://images.unsplash.com/photo-1551632786-de41ec56a405?w=800&h=600&fit=crop',
  },
  {
    id: 2,
    name: 'Forest Loop Trail',
    difficulty: 'Easy',
    duration: '1-1.5 hours',
    distance: '3 km',
    elevation: '150m',
    description: 'A gentle circular trail perfect for beginners, families, and nature lovers. Experience the biodiversity and peaceful forest ambiance.',
    highlights: [
      'Scenic forest pathways',
      'Wildlife spotting opportunities',
      'Natural stream crossings',
      'Beginner-friendly terrain',
      'Educational signage about local flora',
    ],
    bestSeason: 'Year-round',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
  {
    id: 3,
    name: 'Waterfall Adventure Trek',
    difficulty: 'Moderate',
    duration: '3-4 hours',
    distance: '5 km',
    elevation: '350m',
    description: 'Visit all three major waterfalls with moderate climbing and stream crossings. Perfect for intermediate trekkers seeking adventure and natural beauty.',
    highlights: [
      'Visit Zarna Waterfall',
      'Twin Falls viewpoint',
      'Rock hopping sections',
      'Swimming opportunities',
      'Picnic spots by waterfalls',
    ],
    bestSeason: 'June to October',
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
  },
  {
    id: 4,
    name: 'Night Summit Trek',
    difficulty: 'Extreme',
    duration: '5-6 hours',
    distance: '4 km',
    elevation: '700m',
    description: 'Experience the mystical night trek to summit with guide. Witness the stars, experience the spiritual energy, and see the sunrise from the top.',
    highlights: [
      'Stargazing experience',
      'Guided night navigation',
      'Sunrise from summit',
      'Spiritual ceremonies at temple',
      'Professional guides included',
    ],
    bestSeason: 'Year-round (clear nights preferred)',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
  },
];

const SAFETY_TIPS: SafetyTip[] = [
  {
    id: 1,
    icon: '🥾',
    title: 'Footwear & Gear',
    description: 'Proper equipment is essential for safe trekking',
    details: [
      'Wear sturdy trekking shoes with good grip',
      'Avoid slippers, flip-flops, or casual sneakers',
      'Use trekking poles for steep sections',
      'Carry a backpack with waist straps',
      'Wear weather-appropriate clothing in layers',
    ],
  },
  {
    id: 2,
    icon: '💧',
    title: 'Hydration & Nutrition',
    description: 'Stay energized throughout your trek',
    details: [
      'Carry 2-3 liters of water minimum',
      'Drink water regularly, not just when thirsty',
      'Pack energy bars, nuts, and dry fruits',
      'Avoid heavy meals before trekking',
      'Carry electrolyte supplements for longer treks',
    ],
  },
  {
    id: 3,
    icon: '🧭',
    title: 'Navigation & Communication',
    description: 'Stay safe by being prepared and connected',
    details: [
      'Use offline maps or trek apps',
      'Inform someone about your route and time',
      'Carry a basic first-aid kit',
      'Keep phone charged with power bank',
      'Trek in groups, never alone',
    ],
  },
  {
    id: 4,
    icon: '☀️',
    title: 'Sun & Weather Safety',
    description: 'Protect yourself from elements',
    details: [
      'Apply sunscreen (SPF 50+) generously',
      'Wear a wide-brimmed hat or cap',
      'Check weather forecast before trekking',
      'Carry a light raincoat during monsoon',
      'Start early to finish before dark',
    ],
  },
  {
    id: 5,
    icon: '🏥',
    title: 'Physical Preparation',
    description: 'Build strength before challenging treks',
    details: [
      'Do cardiovascular exercises 2-3 weeks prior',
      'Practice stair climbing at home',
      'Stretch and warm up before starting',
      'Know your fitness limits',
      'Consult doctor if you have health issues',
    ],
  },
  {
    id: 6,
    icon: '⚠️',
    title: 'Emergency Protocols',
    description: 'Be prepared for unexpected situations',
    details: [
      'Know the emergency contact numbers',
      'Never trek during extreme weather',
      'Turn back if you feel unwell',
      'Watch for slippery sections after rain',
      'Stay on marked trails',
    ],
  },
];

const TrekkingPage: React.FC = () => {
  const [selectedTrek, setSelectedTrek] = useState<number>(1);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'difficulty' | 'safety' | 'season'>('overview');

  const currentTrek = TREKS.find((t) => t.id === selectedTrek) || TREKS[0];

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy':
        return 'bg-green-500 text-white';
      case 'Moderate':
        return 'bg-yellow-500 text-white';
      case 'Hard':
        return 'bg-orange-500 text-white';
      case 'Extreme':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getDifficultyEmoji = (level: string) => {
    switch (level) {
      case 'Easy':
        return '😊';
      case 'Moderate':
        return '💪';
      case 'Hard':
        return '🔥';
      case 'Extreme':
        return '⚡';
      default:
        return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO BANNER ===== */}
      <section className="relative h-96 sm:h-[500px] lg:h-[600px] bg-cover bg-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1551632786-de41ec56a405?w=1400&h=800&fit=crop"
          alt="Trekking Adventure"
          className="w-full h-full object-cover"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-lime-300 font-black text-sm uppercase tracking-widest mb-4 animate-bounce">
              ⛰️ ADVENTURE AWAITS
            </p>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-4 leading-tight drop-shadow-xl">
              TREKKING
            </h1>
            <h2 className="text-4xl sm:text-5xl font-black text-lime-300 mb-6 leading-tight drop-shadow-lg">
              & ADVENTURE
            </h2>
            <p className="text-xl sm:text-2xl text-lime-100 max-w-2xl mx-auto font-bold">
              Conquer the legendary 1000 stairs. Experience nature. Push your limits.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED TREK SECTION ===== */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-lime-50 via-green-50 to-lime-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trek Selection Sidebar */}
            <div className="space-y-3">
              <h3 className="text-2xl font-black text-forest-900 mb-6">CHOOSE YOUR TREK</h3>
              {TREKS.map((trek) => (
                <button
                  key={trek.id}
                  onClick={() => setSelectedTrek(trek.id)}
                  className={`w-full text-left p-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 ${
                    selectedTrek === trek.id
                      ? 'bg-lime-500 text-white shadow-lg scale-105'
                      : 'bg-white text-forest-800 shadow-md hover:shadow-lg border-2 border-lime-200'
                  }`}
                >
                  <div className="font-black text-lg mb-1">{trek.name}</div>
                  <div className={`text-sm font-semibold ${selectedTrek === trek.id ? 'text-lime-100' : 'text-monsoon-600'}`}>
                    {trek.duration} • {trek.distance}
                  </div>
                </button>
              ))}
            </div>

            {/* Trek Details */}
            <div className="lg:col-span-2">
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden shadow-2xl mb-6">
                <img src={currentTrek.image} alt={currentTrek.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <span
                    className={`inline-block px-6 py-3 rounded-full font-black text-lg shadow-lg ${getDifficultyColor(
                      currentTrek.difficulty
                    )}`}
                  >
                    {getDifficultyEmoji(currentTrek.difficulty)} {currentTrek.difficulty}
                  </span>
                </div>
              </div>

              <h2 className="text-5xl font-black text-forest-900 mb-4">{currentTrek.name}</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-lime-500">
                  <div className="text-3xl font-black text-lime-600 mb-1">⏱️</div>
                  <div className="text-xs uppercase font-black text-monsoon-600">Duration</div>
                  <div className="font-black text-lg text-forest-800">{currentTrek.duration}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-lime-500">
                  <div className="text-3xl font-black text-lime-600 mb-1">📏</div>
                  <div className="text-xs uppercase font-black text-monsoon-600">Distance</div>
                  <div className="font-black text-lg text-forest-800">{currentTrek.distance}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-lime-500">
                  <div className="text-3xl font-black text-lime-600 mb-1">⛏️</div>
                  <div className="text-xs uppercase font-black text-monsoon-600">Elevation</div>
                  <div className="font-black text-lg text-forest-800">{currentTrek.elevation}</div>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-md border-l-4 border-lime-500">
                  <div className="text-3xl font-black text-lime-600 mb-1">📅</div>
                  <div className="text-xs uppercase font-black text-monsoon-600">Best Season</div>
                  <div className="font-black text-lg text-forest-800">{currentTrek.bestSeason}</div>
                </div>
              </div>

              <p className="text-lg text-monsoon-700 font-bold mb-6 leading-relaxed">{currentTrek.description}</p>

              {/* Highlights */}
              <div>
                <h4 className="text-xl font-black text-forest-900 mb-4">TREK HIGHLIGHTS</h4>
                <div className="space-y-2">
                  {currentTrek.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-lime-100 rounded-lg">
                      <span className="text-2xl">✨</span>
                      <span className="font-bold text-forest-800">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DIFFICULTY LEVELS COMPARISON ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-forest-900 mb-4 text-center">DIFFICULTY BREAKDOWN</h2>
          <p className="text-xl text-monsoon-600 text-center mb-12 font-bold">
            Understand the challenge levels and what to expect
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                level: 'Easy',
                emoji: '😊',
                color: 'bg-green-500',
                description: 'Perfect for beginners',
                features: ['Gentle slopes', 'Well-marked trails', 'Plenty of rest spots', '1-2 hours'],
              },
              {
                level: 'Moderate',
                emoji: '💪',
                color: 'bg-yellow-500',
                description: 'Some experience needed',
                features: ['Steady climbing', 'Mixed terrain', 'Basic fitness required', '3-4 hours'],
              },
              {
                level: 'Hard',
                emoji: '🔥',
                color: 'bg-orange-500',
                description: 'For experienced trekkers',
                features: ['Steep sections', 'Long duration', 'High fitness needed', '4-5 hours'],
              },
              {
                level: 'Extreme',
                emoji: '⚡',
                color: 'bg-red-500',
                description: 'Expert adventurers only',
                features: ['Very steep', 'Challenging terrain', 'Elite fitness required', '5+ hours'],
              },
            ].map((item, idx) => (
              <div key={idx} className={`${item.color} rounded-xl p-6 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105`}>
                <div className="text-6xl mb-3">{item.emoji}</div>
                <h3 className="text-2xl font-black mb-2">{item.level}</h3>
                <p className="text-sm font-bold mb-4 opacity-90">{item.description}</p>
                <ul className="space-y-1 text-sm font-bold">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span>▸</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SAFETY TIPS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 via-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-forest-900 mb-4 text-center">⚠️ SAFETY FIRST</h2>
          <p className="text-xl text-monsoon-600 text-center mb-12 font-bold">
            Trekking is fun, but safety is paramount. Follow these essential tips.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAFETY_TIPS.map((tip) => (
              <div key={tip.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
                <button
                  onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                  className="w-full text-left p-6 hover:bg-lime-50 transition-colors"
                >
                  <div className="text-4xl mb-3">{tip.icon}</div>
                  <h3 className="text-xl font-black text-forest-900 mb-2">{tip.title}</h3>
                  <p className="text-monsoon-600 font-bold text-sm">{tip.description}</p>
                </button>

                {expandedTip === tip.id && (
                  <div className="px-6 pb-6 border-t-2 border-lime-200 bg-lime-50">
                    <ul className="space-y-2">
                      {tip.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="font-black text-lime-600 mt-1">✓</span>
                          <span className="text-monsoon-700 font-bold">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BEST SEASONS ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-forest-900 mb-12 text-center">BEST SEASONS TO TREK</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                season: 'Winter',
                icon: '❄️',
                months: 'Dec - Feb',
                description: 'Clear skies, cool weather, perfect trekking conditions',
                temp: '10-20°C',
                highlight: 'BEST TIME',
              },
              {
                season: 'Spring',
                icon: '🌸',
                months: 'Mar - May',
                description: 'Blooming flowers, pleasant weather, moderate trails',
                temp: '20-30°C',
                highlight: 'GOOD',
              },
              {
                season: 'Monsoon',
                icon: '🌧️',
                months: 'Jun - Sep',
                description: 'Lush greenery, waterfalls at peak, slippery trails',
                temp: '15-25°C',
                highlight: 'EXPERT ONLY',
              },
              {
                season: 'Autumn',
                icon: '🍂',
                months: 'Oct - Nov',
                description: 'Mild weather, clear visibility, ideal for trekking',
                temp: '15-25°C',
                highlight: 'BEST TIME',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className={`rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 ${
                  item.highlight === 'BEST TIME'
                    ? 'bg-gradient-to-br from-lime-400 to-green-500 text-white'
                    : item.highlight === 'EXPERT ONLY'
                      ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white'
                      : 'bg-white border-2 border-lime-200'
                }`}
              >
                <div className="text-5xl mb-3">{item.icon}</div>
                <h3 className={`text-2xl font-black mb-1 ${item.highlight !== 'BEST TIME' && item.highlight !== 'EXPERT ONLY' ? 'text-forest-900' : ''}`}>
                  {item.season}
                </h3>
                <div className={`text-sm font-bold mb-2 opacity-90`}>{item.months}</div>
                <p className={`mb-3 font-bold ${item.highlight !== 'BEST TIME' && item.highlight !== 'EXPERT ONLY' ? 'text-monsoon-700' : ''}`}>
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-black">🌡️ {item.temp}</span>
                  <span className={`px-3 py-1 rounded-full font-black text-xs ${item.highlight === 'BEST TIME' ? 'bg-white text-lime-600' : item.highlight === 'EXPERT ONLY' ? 'bg-white text-red-600' : 'bg-lime-200 text-lime-800'}`}>
                    {item.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRE-TREK CHECKLIST ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-100 to-lime-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black text-forest-900 mb-12 text-center">PRE-TREK CHECKLIST</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { category: 'Essentials', items: ['Sturdy trekking shoes', 'Comfortable clothes', 'Water bottle (2-3L)', 'Backpack (40-50L)', 'Hiking poles'] },
              { category: 'Safety', items: ['First-aid kit', 'Whistle', 'Headlamp/torch', 'Emergency contact card', 'Compass/GPS'] },
              { category: 'Nutrition', items: ['Energy bars/nuts', 'Dry fruits', 'Chocolate', 'Salt tablet', 'Electrolyte mix'] },
              { category: 'Weather', items: ['Sun protection (SPF 50+)', 'Hat/cap', 'Rain jacket', 'Warm layer', 'Socks (2-3 pairs)'] },
            ].map((group, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-2xl font-black text-forest-900 mb-4">{group.category}</h3>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-5 h-5 cursor-pointer accent-lime-600"
                        defaultChecked={false}
                      />
                      <span className="font-bold text-monsoon-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN CTA ===== */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-lime-500 via-green-500 to-lime-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl font-black mb-4 animate-bounce">🎯 READY FOR THE CHALLENGE?</p>
          <h2 className="text-6xl sm:text-7xl font-black mb-6 leading-tight">PREPARE FOR TREK</h2>
          <p className="text-2xl font-bold mb-8 text-lime-100">
            Join hundreds of adventurers who've conquered Osam Hill. Your journey starts now.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-white text-lime-600 rounded-xl font-black text-xl hover:bg-lime-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-110">
              BOOK A TREK NOW
            </button>
            <button className="px-10 py-5 bg-transparent border-4 border-white text-white rounded-xl font-black text-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
              DOWNLOAD GUIDE
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-black mb-2">5000+</div>
              <div className="font-bold">Successful Treks</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">98%</div>
              <div className="font-bold">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">⭐⭐⭐⭐⭐</div>
              <div className="font-bold">5-Star Rated</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-forest-900 mb-12 text-center">TREKKER STORIES</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Arjun Singh',
                trek: '1000 Stairs Challenge',
                quote: 'I never thought I could do it, but the trek changed my life! The views were worth every step.',
                rating: 5,
              },
              {
                name: 'Priya Patel',
                trek: 'Waterfall Adventure Trek',
                quote: 'Amazing experience! The guides were knowledgeable and made the trek so enjoyable. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Rahul Kumar',
                trek: 'Night Summit Trek',
                quote: 'Stargazing from the summit was magical. A spiritual and physical adventure combined!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-2xl">⭐</span>
                    ))}
                </div>
                <p className="text-monsoon-700 mb-4 italic font-bold text-lg">"{testimonial.quote}"</p>
                <div className="border-t-2 border-lime-200 pt-4">
                  <p className="font-black text-forest-900">{testimonial.name}</p>
                  <p className="text-sm text-monsoon-600 font-bold">{testimonial.trek}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black text-forest-900 mb-12 text-center">QUICK ANSWERS</h2>

          <div className="space-y-4">
            {[
              {
                q: 'Do I need prior trekking experience for the 1000 stairs?',
                a: 'While prior experience helps, many beginners successfully complete it with proper preparation and fitness training. Start with easier treks first.',
              },
              {
                q: 'What is the best time to trek?',
                a: 'Winter (Dec-Feb) and Autumn (Oct-Nov) are ideal with clear weather. Monsoon requires expert skills due to slippery trails.',
              },
              {
                q: 'Are guides available?',
                a: 'Yes, professional guides are available for all treks. They provide safety, navigation, and local knowledge.',
              },
              {
                q: 'Can I trek solo?',
                a: 'We recommend trekking in groups for safety. If trekking solo, inform someone about your route and carry emergency contacts.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl border-2 border-lime-200 p-6 hover:border-lime-500 transition-all">
                <h3 className="text-xl font-black text-forest-900 mb-3">{faq.q}</h3>
                <p className="text-monsoon-700 font-bold leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrekkingPage;
