import React from 'react';
import Layout from '../components/Layout';
import InfoCard, { InfoCardProps } from '../components/InfoCard';
import DoAndDontList, { DoAndDontItem } from '../components/DoAndDontList';
import FoodCard, { FoodCardProps } from '../components/FoodCard';

// Transport & Accommodation Info
const TRANSPORT_INFO: InfoCardProps[] = [
  {
    icon: '✈️',
    title: 'By Air',
    items: [
      'Nearest airport: Pune (180 km away)',
      'Flight time: ~2 hours from major metros (Mumbai, Delhi, Bangalore)',
      'From airport, hire a taxi or book a ride (~5 hours to Osam Hill)',
    ],
  },
  {
    icon: '🚂',
    title: 'By Train',
    items: [
      'Nearest railway station: Kolhapur (120 km away)',
      'Direct trains from Mumbai, Pune, Bangalore',
      'From station, take a bus or taxi (~3 hours to Osam Hill)',
    ],
  },
  {
    icon: '🚌',
    title: 'By Road',
    items: [
      'Well-connected by NH48 and state highways',
      'Drive time from Pune: 4-5 hours; from Mumbai: 6-7 hours',
      'Regular buses available from major cities',
      'Self-driving is popular; roads are well-maintained',
    ],
  },
];

const ACCOMMODATION_INFO: InfoCardProps[] = [
  {
    icon: '🏨',
    title: 'Hotels & Resorts',
    items: [
      'Mid-range hotels near the base village',
      'Eco-lodges offering nature immersion experience',
      'Book in advance during monsoon and festival season',
    ],
  },
  {
    icon: '🏡',
    title: 'Homestays & Guesthouses',
    items: [
      'Stay with local families and experience authentic culture',
      'Farm-to-table meals included',
      'More affordable and personal than hotels',
    ],
  },
  {
    icon: '🏕️',
    title: 'Camping & Budget Options',
    items: [
      'Organized camping sites with proper facilities',
      'Hostels for solo travelers and backpackers',
      'Great for group treks and adventure enthusiasts',
    ],
  },
];

// Do's and Don'ts
const DOS_AND_DONTS: DoAndDontItem[] = [
  { category: 'do', text: 'Respect local customs and religious practices' },
  { category: 'do', text: 'Greet locals with "Namaste" and smile' },
  { category: 'do', text: 'Remove shoes before entering temples' },
  { category: 'do', text: 'Ask permission before photographing people or ceremonies' },
  { category: 'do', text: 'Eat with your right hand (cultural tradition)' },
  { category: 'do', text: 'Carry cash; not all places accept cards' },
  { category: 'do', text: 'Dress modestly, especially near temples' },
  { category: 'do', text: 'Learn a few local words and phrases' },
  { category: 'dont', text: 'Point feet at religious statues or people' },
  { category: 'dont', text: 'Touch people on the head—considered disrespectful' },
  { category: 'dont', text: 'Sit on temple steps or sacred spaces carelessly' },
  { category: 'dont', text: "Refuse food or drink offered by locals—it's an honor" },
  { category: 'dont', text: 'Litter or disturb wildlife' },
  { category: 'dont', text: 'Assume all Indians speak English—some villagers may not' },
  { category: 'dont', text: 'Share food with your left hand' },
  { category: 'dont', text: 'Drink tap water; always use bottled or filtered water' },
];

// Local Food
const LOCAL_FOOD: FoodCardProps[] = [
  {
    name: 'Misal Pav',
    emoji: '🥘',
    description: 'Spicy curry made with sprouts and beans, served with bread. A hearty Maharashtrian breakfast.',
    ingredients: 'sprouts, lentils, spices, pav (bread)',
  },
  {
    name: 'Bhakri',
    emoji: '🫓',
    description: 'Thick flatbread made from millet, a staple in hill villages. Best eaten with butter and local pickles.',
    ingredients: 'millet flour, water, salt',
  },
  {
    name: 'Kolhapuri Mutton Curry',
    emoji: '🍲',
    description: 'Fiery, aromatic meat curry using local spices. A signature dish of the Kolhapur region.',
    ingredients: 'mutton, coconut, spices, tomato',
  },
  {
    name: 'Puran Poli',
    emoji: '🥞',
    description: 'Sweet flatbread with lentil filling. Comfort food for festivals and celebrations.',
    ingredients: 'flour, jaggery, lentils, ghee',
  },
  {
    name: 'Chikhalwali (Hill Greens)',
    emoji: '🥬',
    description: 'Fresh seasonal leafy greens cooked simply with local spices. Nutritious and authentic.',
    ingredients: 'seasonal greens, mustard oil, spices',
  },
  {
    name: 'Til ke Laddu',
    emoji: '🍬',
    description: 'Sesame and jaggery sweets, especially popular during winter. Made by local artisans.',
    ingredients: 'sesame, jaggery, peanuts',
  },
];

export default function VisitGuidePage() {
  return (
    <Layout pageTitle={undefined}>
      {/* Intro Banner */}
      <section className="mb-12">
        <div
          className="relative w-full h-80 md:h-96 bg-cover bg-center rounded-xl overflow-hidden"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-6 md:px-8 pb-8 text-white">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Visitor Guide</h1>
              <p className="mt-3 text-lg text-white/80 max-w-2xl">
                Everything you need to know to plan a memorable, respectful, and safe visit to Osam Hill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Reach Section */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900 mb-8">🚀 How to Reach Osam Hill</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {TRANSPORT_INFO.map((info, idx) => (
              <InfoCard key={idx} {...info} />
            ))}
          </div>

          <div className="bg-sky-50 rounded-lg p-6 border-l-4 border-sky-600">
            <p className="text-lg text-stone-700 font-medium">
              💡 <strong>Pro Tip:</strong> During monsoon season (Jun–Sep), roads can be slippery. Hire an experienced local driver or book a guided tour. The experience is worth every rupee!
            </p>
          </div>
        </div>
      </section>

      {/* Accommodation Section */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900 mb-8">🏠 Where to Stay</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACCOMMODATION_INFO.map((info, idx) => (
              <InfoCard key={idx} {...info} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900 mb-8">🗓️ Best Time to Visit</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-emerald-600">
              <h3 className="text-xl font-bold text-monsoon-900 mb-3">Winter (Nov–Feb)</h3>
              <p className="text-stone-700 mb-4">Clear skies, cool temperatures, perfect for trekking and sightseeing. Ideal for all ages.</p>
              <p className="text-xs font-semibold text-emerald-600">⭐⭐⭐⭐⭐ Best for beginners</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-amber-600">
              <h3 className="text-xl font-bold text-monsoon-900 mb-3">Monsoon (Jun–Sep)</h3>
              <p className="text-stone-700 mb-4">Dramatic waterfalls, lush greenery, spiritual festivals. Challenging but magical experience.</p>
              <p className="text-xs font-semibold text-amber-600">⭐⭐⭐⭐ For experienced trekkers</p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-600">
              <h3 className="text-xl font-bold text-monsoon-900 mb-3">Spring (Mar–May)</h3>
              <p className="text-stone-700 mb-4">Wildflowers bloom, pleasant weather. Great for photography and nature walks.</p>
              <p className="text-xs font-semibold text-orange-600">⭐⭐⭐⭐ For photographers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Do's and Don'ts */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <DoAndDontList title="🤝 Cultural Etiquette: Do's & Don'ts" items={DOS_AND_DONTS} />
        </div>
      </section>

      {/* Local Culture & Food */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900 mb-3">🍽️ Local Culture & Food</h2>
            <p className="text-lg text-stone-700">
              Osam Hill's villages are home to warm, hospitable people with centuries-old traditions. Food is central to their culture—sharing meals is an act of love and respect.
            </p>
          </div>

          <div className="mb-10 bg-amber-50 rounded-lg p-6 border-l-4 border-amber-600">
            <h3 className="text-xl font-bold text-monsoon-900 mb-3">Local Customs</h3>
            <ul className="space-y-2 text-stone-700">
              <li className="flex items-start gap-3">
                <span className="font-bold text-amber-600">•</span>
                <span>Villagers wake up early and are outdoor-oriented</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-amber-600">•</span>
                <span>Festivals celebrate agriculture, seasons, and spirituality</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-amber-600">•</span>
                <span>Hospitality is sacred—guests are treated as divine</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-amber-600">•</span>
                <span>Community gatherings and shared meals are frequent</span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-monsoon-900 mb-6">Must-Try Dishes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {LOCAL_FOOD.map((food, idx) => (
              <FoodCard key={idx} {...food} />
            ))}
          </div>
        </div>
      </section>

      {/* Responsible Tourism */}
      <section className="mb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900 mb-8">🌍 Responsible Tourism</h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-forest-50 to-emerald-50 rounded-lg p-6 border-l-4 border-forest-600">
              <h3 className="text-xl font-bold text-monsoon-900 mb-3">🌱 Environmental Responsibility</h3>
              <ul className="space-y-2 text-stone-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-forest-600">✓</span>
                  <span>Carry out all trash—use a small bag for waste</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-forest-600">✓</span>
                  <span>Use only marked trails to protect vegetation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-forest-600">✓</span>
                  <span>Don't pick plants, flowers, or mushrooms</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-forest-600">✓</span>
                  <span>Use biodegradable toiletries and sunscreen</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-forest-600">✓</span>
                  <span>Respect wildlife—observe from a distance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-emerald-50 to-sky-50 rounded-lg p-6 border-l-4 border-emerald-600">
              <h3 className="text-xl font-bold text-monsoon-900 mb-3">🤝 Community Responsibility</h3>
              <ul className="space-y-2 text-stone-700">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Support local businesses—eat at village restaurants</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Buy from local artisans and farmers directly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Learn and respect local history and traditions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Participate in conservation projects if interested</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span>Fair bargaining—don't exploit vendors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Information */}
      <section className="mb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900 mb-8">ℹ️ Practical Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-monsoon-900 mb-4">Health & Safety</h3>
              <ul className="space-y-2 text-stone-700">
                <li>🏥 Nearest hospital: 25 km away in Kolhapur</li>
                <li>💊 Carry basic medications and first aid kit</li>
                <li>💉 Consult doctor before visit if altitude sensitive</li>
                <li>🦟 Mosquito repellent for monsoon season</li>
                <li>☀️ High SPF sunscreen for sun protection</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-monsoon-900 mb-4">Essentials</h3>
              <ul className="space-y-2 text-stone-700">
                <li>💰 Currency: Indian Rupee (₹), carry cash</li>
                <li>📱 Mobile coverage available (Airtel, Jio reliable)</li>
                <li>🔌 Electricity: 220V, bring universal adapter</li>
                <li>🗣️ Language: Marathi and Hindi spoken locally</li>
                <li>⏰ Time Zone: IST (UTC+5:30)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-12 pt-8 border-t border-stone-200 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900 mb-4">Ready for Your Adventure?</h2>
        <p className="text-lg text-stone-700 mb-8 max-w-2xl mx-auto">
          With this guide in hand, you're ready to explore Osam Hill responsibly, respectfully, and with open eyes and heart. Safe travels!
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/places" className="inline-flex items-center justify-center px-8 py-3 bg-forest-600 hover:bg-forest-700 text-white rounded-lg text-sm font-bold transition-colors">
            Explore Places
          </a>
          <a href="/events" className="inline-flex items-center justify-center px-8 py-3 border-2 border-forest-600 text-forest-600 hover:bg-forest-50 rounded-lg text-sm font-bold transition-colors">
            Upcoming Events
          </a>
          <a href="/trek" className="inline-flex items-center justify-center px-8 py-3 border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 rounded-lg text-sm font-bold transition-colors">
            Trek Guide
          </a>
        </div>
      </section>
    </Layout>
  );
}
