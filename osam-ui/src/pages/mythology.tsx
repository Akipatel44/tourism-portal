import React from 'react';
import Layout from '../components/Layout';
import Timeline, { TimelineEvent } from '../components/Timeline';
import MythologyCard, { MythologyCardProps } from '../components/MythologyCard';

// Dummy timeline data
const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: '3102 BCE',
    title: 'The Great War at Kurukshetra',
    description:
      'Following their devastating loss in the war, the five Pandava brothers were sentenced to 12 years of exile in the forest, a period of atonement and spiritual reckoning.',
  },
  {
    year: 'Year 9 of Exile',
    title: 'Arrival at Osam Hill',
    description:
      'Seeking sanctuary and spiritual renewal, the Pandavas journeyed to the mystical peaks of Osam Hill, where they found refuge among ancient temples and verdant forests.',
  },
  {
    year: 'Year 10–12 of Exile',
    title: 'Years of Contemplation',
    description:
      'During their time at Osam Hill, Bhim encountered the divine, Draupadi found peace, and the brothers prepared for their return to the world, transformed by their experiences.',
  },
];

// Dummy mythology story data
const MYTHOLOGY_STORIES: MythologyCardProps[] = [
  {
    title: 'Bhim ni Thari',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=500&fit=crop',
    spiritualElement: 'The Step of Strength',
    story:
      'Legend speaks of Bhim, the strongest of the Pandavas, who carved a sacred step into the mountainside during his meditations. Pilgrims believe that touching this ancient stone grants physical and spiritual strength. Local elders say Bhim would stand here at dawn, channeling cosmic energy to prepare himself for the trials ahead.',
    layout: 'text-right',
  },
  {
    title: 'Bhim ni Theri',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&h=500&fit=crop',
    spiritualElement: 'The Cave of Solitude',
    story:
      'High above the valley lies Bhim ni Theri—a sacred cave where Bhim is said to have spent nights in deep meditation. The cave walls seem to echo with ancient chants, and visitors report a profound sense of peace. Local guides claim that Bhim\'s divine essence still lingers here, offering guidance to those who seek it.',
    layout: 'text-left',
  },
  {
    title: 'Hidimba no Hichko',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=500&fit=crop',
    spiritualElement: 'The Rakshasa\'s Peak',
    story:
      'According to local lore, a divine rakshasa once guarded these peaks, testing the worthiness of pilgrims. When Bhim arrived, the rakshasa bowed to his virtue. A small shrine marks the spot where this legendary encounter occurred—Hidimba no Hichko—honoring the intersection of the mortal and divine realms.',
    layout: 'text-right',
  },
];

export default function MythologyPage() {
  return (
    <Layout pageTitle={undefined}>
      {/* Intro Banner */}
      <section className="mb-12">
        <div className="relative w-full h-80 md:h-96 bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop')` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-5xl mx-auto px-6 md:px-8 pb-8 text-white">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">The Pandavas at Osam Hill</h1>
              <p className="mt-3 text-lg text-white/80 max-w-2xl">
                Explore the spiritual connection between the legendary Pandava brothers and the mystical peaks of Osam Hill—where history, mythology, and nature intertwine.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-monsoon-900">The Journey Through Time</h2>
            <p className="mt-3 text-stone-600">From exile to enlightenment: the Pandavas' sacred pilgrimage.</p>
          </div>

          <Timeline events={TIMELINE_EVENTS} />
        </div>
      </section>

      {/* Mythology Stories Section */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-monsoon-900">Sacred Places & Stories</h2>
            <p className="mt-3 text-stone-600">Spiritual landmarks that echo the Pandavas' presence.</p>
          </div>

          <div className="space-y-16">
            {MYTHOLOGY_STORIES.map((story, index) => (
              <MythologyCard key={index} {...story} />
            ))}
          </div>
        </div>
      </section>

      {/* Spiritual Reflection Section */}
      <section className="mb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0 bg-amber-50 rounded-lg shadow-md p-8 border-l-4 border-amber-400">
          <h3 className="text-2xl font-bold text-monsoon-900 mb-4">🙏 Spiritual Significance</h3>
          <p className="text-base leading-relaxed text-stone-700 mb-4">
            The Pandavas' exile at Osam Hill is more than a historical event—it represents a spiritual journey of atonement, growth, and renewal. Their struggle mirrors the eternal human quest for meaning and redemption. Today, pilgrims visit these sacred sites seeking blessings, wisdom, and inner peace.
          </p>
          <p className="text-base leading-relaxed text-stone-700">
            The mountains themselves are believed to hold the energy of those ancient days. Whether you visit as a devotee, history enthusiast, or spiritual seeker, Osam Hill invites you to connect with centuries of wisdom and sacred tradition.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-12 pt-8 border-t border-stone-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-monsoon-900 mb-4">Ready to experience these sacred sites?</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/places" className="inline-flex items-center justify-center px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white rounded-md text-sm font-medium">
              Explore all Places
            </a>
            <a href="/visit-guide" className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 bg-white text-monsoon-900 rounded-md text-sm font-medium hover:bg-stone-50">
              Plan Your Visit
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
