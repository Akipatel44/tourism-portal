import React from 'react';
import Layout from '../components/Layout';
import TrekStatsCard, { TrekStat } from '../components/TrekStatsCard';
import SafetyTip, { SafetyTipProps } from '../components/SafetyTip';

const TREK_STATS: TrekStat[] = [
  { icon: '⏱️', label: 'Duration', value: '6-8 hrs', color: 'forest' },
  { icon: '📏', label: 'Distance', value: '4.2 km', color: 'emerald' },
  { icon: '⬆️', label: 'Elevation', value: '450 m', color: 'amber' },
  { icon: '🪜', label: 'Steps', value: '1000+', color: 'sky' },
];

const SAFETY_TIPS: SafetyTipProps[] = [
  {
    icon: '💧',
    title: 'Stay Hydrated',
    description: 'Carry 2-3 liters of water. Drink regularly, not just when thirsty. Dehydration at altitude is real!',
  },
  {
    icon: '🥾',
    title: 'Proper Footwear',
    description: 'Wear trekking shoes with good grip. The steps are ancient stone—they can be slippery, especially in monsoon.',
  },
  {
    icon: '⛑️',
    title: 'Protective Gear',
    description: 'Bring a helmet if you're comfortable wearing one. Sun protection (hat, sunscreen) is essential.',
  },
  {
    icon: '🧭',
    title: 'Stay on Trail',
    description: 'Follow marked paths. Never venture off-trail. Local guides are highly recommended.',
  },
  {
    icon: '⚡',
    title: 'Check Weather',
    description: 'Avoid trekking during heavy rain or storms. Check forecasts before you start.',
  },
  {
    icon: '🏥',
    title: 'First Aid',
    description: 'Carry a basic first aid kit. Know your fitness limits and listen to your body.',
  },
];

const BEST_SEASONS = [
  {
    season: 'Winter (Nov–Feb)',
    emoji: '❄️',
    details: 'Clear skies, cool temperatures, perfect visibility. Ideal for beginners.',
  },
  {
    season: 'Spring (Mar–May)',
    emoji: '🌸',
    details: 'Warm but not too hot. Wildflowers in bloom. Great for photography.',
  },
  {
    season: 'Monsoon (Jun–Sep)',
    emoji: '🌧️',
    details: 'Dramatic clouds, powerful waterfalls. For experienced trekkers only—slippery terrain!',
  },
];

export default function TrekPage() {
  return (
    <Layout pageTitle={undefined}>
      {/* Hero Section */}
      <section className="mb-12">
        <div
          className="relative w-full h-80 md:h-96 bg-cover bg-center rounded-xl overflow-hidden"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-6 md:px-8 pb-8 text-white">
              <h1 className="text-4xl md:text-6xl font-black leading-tight">
                Conquer the <br className="hidden md:block" />
                1000 Stairs
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-2xl">
                An epic mountain trek that tests your endurance and rewards you with views that will take your breath away. Are you ready?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trek Stats */}
      <section className="mb-16">
        <TrekStatsCard
          title="Osam Peak Trek: The 1000 Stairs Challenge"
          difficulty="Hard"
          stats={TREK_STATS}
          description="This legendary trek takes you from the base of Osam Hill to the ancient temple at its peak via 1000+ handcrafted stone steps. Built centuries ago by pilgrims, these stairs are a test of will, endurance, and spirit."
        />
      </section>

      {/* Trek Overview */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative">
            <div className="h-72 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=500&fit=crop')` }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-forest-600 rounded-full opacity-20 blur-3xl" />
          </div>

          {/* Content */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-monsoon-900 mb-4">What to Expect</h2>
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                The trek begins at the village base and immediately plunges you into an ancient stone staircase. The steps wind through dense forest, past small shrines, and natural springs. Each section tells a story—carved prayers, rest shelters, and viewpoints reveal centuries of pilgrimage.
              </p>
              <p className="text-lg text-stone-700 leading-relaxed mb-4">
                By kilometer 2, you'll feel the burn in your legs. By kilometer 3, you'll question your life choices. By kilometer 4, you'll reach the summit and realize it was totally worth it.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎯</span>
                <p className="text-stone-700 font-medium">Steady pace wins the race—no need to sprint!</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">📸</span>
                <p className="text-stone-700 font-medium">Bring a camera for epic summit photos</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎉</span>
                <p className="text-stone-700 font-medium">Summit temple serves tea and local snacks!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-black text-monsoon-900 mb-2">🛡️ Safety First</h2>
          <p className="text-stone-600 mb-8">
            Adventure is thrilling—but safety comes first. Follow these guidelines to ensure a safe and awesome trek.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SAFETY_TIPS.map((tip, idx) => (
              <SafetyTip key={idx} {...tip} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Time to Visit */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-3xl md:text-4xl font-black text-monsoon-900 mb-8">🗓️ Best Season to Trek</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BEST_SEASONS.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-8 border-t-4 border-forest-600 hover:shadow-lg transition-shadow">
                <p className="text-4xl mb-4">{item.emoji}</p>
                <h3 className="text-xl font-bold text-monsoon-900 mb-3">{item.season}</h3>
                <p className="text-stone-700">{item.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation Guide */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0 bg-gradient-to-r from-forest-600 to-emerald-600 rounded-xl shadow-lg p-8 md:p-12 text-white">
          <h2 className="text-3xl md:text-4xl font-black mb-6">🚀 Prepare for the Trek</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Physical Preparation</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Build leg strength (squats, lunges, stairs)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Do cardio 3-4 times per week</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Practice hiking on hills if possible</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Build up gradually over 4-6 weeks</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Gear Checklist</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Trekking shoes with ankle support</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Water bottles (2-3 liters total)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Snacks (energy bars, nuts, dried fruit)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-lg">✓</span>
                  <span>Sun protection (hat, sunscreen)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-12 pt-8 border-t border-stone-200">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-black text-monsoon-900 mb-4">Ready to Test Yourself?</h2>
          <p className="text-lg text-stone-700 mb-8 max-w-2xl mx-auto">
            Join thousands of adventurers who've conquered the 1000 stairs. Sign up for guided treks, training workshops, or go solo with maps and tips.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-forest-600 hover:bg-forest-700 text-white rounded-lg text-lg font-bold transition-colors">
              🎯 Book a Guided Trek
            </button>
            <button className="px-8 py-4 border-2 border-forest-600 text-forest-600 hover:bg-forest-50 rounded-lg text-lg font-bold transition-colors">
              📋 Get Training Plan
            </button>
          </div>
        </div>
      </section>

      {/* Footer tagline */}
      <section className="mt-12 text-center">
        <p className="text-xl font-bold text-emerald-600">
          "The view from the top is worth every step." — Osam Hill Trekkers
        </p>
      </section>
    </Layout>
  );
}
