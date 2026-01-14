import React, { useState } from 'react';

interface StoryCard {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fullStory: string;
  image: string;
  historicalSite: string;
  deity: string;
  significance: string;
}

const MYTHOLOGY_STORIES: StoryCard[] = [
  {
    id: 1,
    title: 'Bhim ni Thari',
    subtitle: 'Bhima\'s Boulder Leap',
    description: 'The legendary place where mighty Bhima jumped across a gorge during the Pandavas\' exile.',
    fullStory:
      'During the thirteen years of exile, the Pandavas wandered through various kingdoms seeking refuge and protection. When they came to Osam Hill, they faced formidable challenges set by the gods to test their worthiness. Bhima, the strongest of the five brothers, was challenged to cross a deep gorge that separated two mountain peaks. With tremendous power and unwavering determination, Bhima took a massive leap and crossed the seemingly impossible chasm. His footprints are still visible on the rocks, and locals believe this boulder marks the exact spot where his feet touched the earth on the other side. The energy of that moment is said to be preserved in the stones, making it a place of pilgrimage for devotees seeking strength and courage.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
    historicalSite: 'Boulder Formation near Eastern Peak',
    deity: 'Bhima (God of Strength)',
    significance: 'Symbol of overcoming impossible challenges through determination',
  },
  {
    id: 2,
    title: 'Bhim ni Theri',
    subtitle: 'Bhima\'s Footprint Spring',
    description: 'A sacred spring where Bhima struck the ground with his foot, creating a natural water source.',
    fullStory:
      'As the Pandavas journeyed through the mountains, they faced the trial of finding pure water during their exile. Legend narrates that Bhima, moved by the suffering of his brothers and their companions, pressed his foot forcefully against the mountain rock. His divine strength caused the earth to yield, and a pure spring of water gushed forth from beneath the stone. This miraculous spring never dried, even during the harshest droughts, sustaining countless pilgrims and devotees for thousands of years. The water is believed to possess healing properties and is said to cure ailments and purify the soul. Many seekers and devotees still visit this sacred spring, collecting its waters for spiritual rituals and personal healing. The footprint visible on the rock is preserved as a sacred relic, a tangible connection to the superhuman feats of the legendary hero.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop',
    historicalSite: 'Sacred Spring Valley',
    deity: 'Bhima (Symbol of Life Force)',
    significance: 'Source of eternal blessings and miraculous healing',
  },
  {
    id: 3,
    title: 'Hidimba no Hichko',
    subtitle: 'Hidimba\'s Divine Blessing',
    description: 'The temple where Hidimba, the demoness, blessed the Pandavas with protection during their trials.',
    fullStory:
      'In the ancient epic, Hidimba was a demoness who fell in love with Bhima and eventually became his devoted wife and protector. During the Pandavas\' exile at Osam Hill, Hidimba blessed them with divine protection against the demons and negative forces that sought to harm them. She established a sacred space on the hilltop where her divine energy remains present even today. The temple that stands here is not just a structure of stone; it is a manifestation of her eternal love and protective grace. Hidimba is venerated as a feminine divine force, a symbol of transformation from darkness to light, from duality to unity. Devotees, especially women, offer prayers here seeking Hidimba\'s blessings for protection, strength, and spiritual transformation. The temple is said to resonate with a unique energy during full moons and festival seasons, when the veil between the material and spiritual worlds grows thin. Pilgrims report experiencing profound spiritual awakenings and divine encounters at this sacred shrine.',
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=500&fit=crop',
    historicalSite: 'Hidimba Temple Complex',
    deity: 'Hidimba (Divine Mother, Protector)',
    significance: 'Portal of feminine divine power and spiritual transformation',
  },
];

const TIMELINE_EVENTS = [
  {
    year: '~ 3139 BCE',
    event: 'The Great Kurukshetra War',
    description: 'The decisive battle between Pandavas and Kauravas that changed the course of history.',
  },
  {
    year: '~ 3138 BCE',
    event: 'Pandavas\' Thirteen-Year Exile Begins',
    description: 'The five brothers lose their kingdom and begin their wandering journey.',
  },
  {
    year: '~ 3125 BCE',
    event: 'Arrival at Osam Hill',
    description: 'The Pandavas reach the sacred hills and face trials set by the gods.',
  },
  {
    year: '~ 3124 BCE',
    event: 'Divine Blessings & Miraculous Events',
    description: 'Bhima\'s legendary feats and divine interventions occur at Osam Hill.',
  },
  {
    year: '~ 3112 BCE',
    event: 'End of Exile & Return to Kingdom',
    description: 'The Pandavas complete their exile and reclaim their rightful throne.',
  },
];

const MythologyPage: React.FC = () => {
  const [expandedStory, setExpandedStory] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* ===== INTRO BANNER ===== */}
      <section className="relative bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900 text-white py-16 sm:py-24 overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-indigo-200 font-semibold text-sm uppercase tracking-wider mb-4">
            📖 Ancient Legends & Divine Tales
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            The Pandavas & Osam Hill
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-100 max-w-3xl mx-auto leading-relaxed mb-8">
            A sacred connection between legendary heroes and the divine hills. Explore the mythological narratives
            that have shaped the spiritual essence of this land for millennia.
          </p>

          {/* Decorative Quote */}
          <div className="inline-block border-l-4 border-accent-mint pl-6 py-4">
            <p className="text-lg italic text-indigo-200">
              "In every stone, every spring, and every peak lies a story of courage, sacrifice, and divine grace."
            </p>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-2">
              📅 Historical Timeline
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Journey Through Time</h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              The Pandavas' path to Osam Hill and the divine events that unfolded here
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-400 via-indigo-400 to-purple-400"></div>

            {/* Timeline Events */}
            <div className="space-y-8 sm:space-y-12">
              {TIMELINE_EVENTS.map((event, index) => (
                <div
                  key={index}
                  className={`flex gap-8 ${index % 2 === 0 ? 'flex-row-reverse lg:flex-row' : 'flex-row-reverse lg:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className="w-full lg:w-5/12">
                    <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 hover:shadow-xl transition-shadow">
                      <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-3">
                        <span className="text-purple-800 font-bold text-sm">{event.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-forest-800 mb-2">{event.event}</h3>
                      <p className="text-monsoon-600 leading-relaxed">{event.description}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className="w-6 h-6 bg-purple-600 rounded-full border-4 border-white shadow-lg"></div>
                  </div>

                  {/* Spacer */}
                  <div className="w-full lg:w-5/12 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== STORY CARDS SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-2">
              🏛️ Sacred Sites
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-4">Divine Legends of Osam Hill</h2>
            <p className="text-lg text-monsoon-600 max-w-2xl mx-auto">
              Three legendary narratives connecting the Pandavas to this sacred destination
            </p>
          </div>

          {/* Story Cards */}
          <div className="space-y-16 lg:space-y-24">
            {MYTHOLOGY_STORIES.map((story, index) => (
              <div
                key={story.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`relative h-96 rounded-xl overflow-hidden shadow-xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}
                >
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Deity Badge */}
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3">
                    <p className="text-xs text-purple-600 font-semibold uppercase tracking-wider mb-1">Deity</p>
                    <p className="text-sm font-bold text-forest-800">{story.deity}</p>
                  </div>
                </div>

                {/* Content */}
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="inline-block px-4 py-2 bg-purple-100 rounded-full mb-4">
                    <span className="text-purple-700 font-semibold text-sm">Pandava Legacy</span>
                  </div>

                  <h3 className="text-4xl font-bold text-forest-800 mb-2">{story.title}</h3>
                  <p className="text-xl text-purple-600 font-semibold mb-4">{story.subtitle}</p>
                  <p className="text-lg text-monsoon-600 mb-6 leading-relaxed">{story.description}</p>

                  {/* Details */}
                  <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-200">
                    <div>
                      <p className="text-sm text-monsoon-500 font-semibold uppercase mb-1">Historical Site</p>
                      <p className="text-forest-700 font-semibold">{story.historicalSite}</p>
                    </div>
                    <div>
                      <p className="text-sm text-monsoon-500 font-semibold uppercase mb-1">Spiritual Significance</p>
                      <p className="text-forest-700 font-semibold">{story.significance}</p>
                    </div>
                  </div>

                  {/* Expandable Story */}
                  <button
                    onClick={() => setExpandedStory(expandedStory === story.id ? null : story.id)}
                    className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-all duration-300 transform hover:scale-105"
                  >
                    {expandedStory === story.id ? 'Hide Full Story' : 'Read Full Story'}
                  </button>

                  {/* Expanded Story */}
                  {expandedStory === story.id && (
                    <div className="mt-6 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-600 animate-in fade-in slide-in-from-top-4 duration-300">
                      <p className="text-monsoon-700 leading-relaxed text-lg italic">{story.fullStory}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPIRITUAL SIGNIFICANCE SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-100 via-indigo-50 to-purple-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-12 text-center">
            Spiritual Dimensions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '⚡',
                title: 'Divine Strength',
                description:
                  'Bhima\'s legendary exploits symbolize the triumph of strength and determination over seemingly insurmountable obstacles.',
              },
              {
                icon: '💧',
                title: 'Life & Healing',
                description:
                  'The sacred springs represent eternal life force and the miraculous power of divine intervention in healing and sustenance.',
              },
              {
                icon: '🙏',
                title: 'Spiritual Protection',
                description:
                  'Hidimba\'s blessings embody the protective grace of the divine feminine, offering shelter and transformation to seekers.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center border-t-4 border-purple-600"
              >
                <div className="text-6xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold text-forest-800 mb-3">{item.title}</h3>
                <p className="text-monsoon-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PILGRIMAGE GUIDE SECTION ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-forest-800 mb-12 text-center">
            Sacred Pilgrimage Guide
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                number: '1',
                title: 'Morning Rituals',
                description: 'Begin at sunrise with meditation and rituals at the main temple',
              },
              {
                number: '2',
                title: 'Bhim ni Thari',
                description: 'Visit the legendary boulder and feel the strength of Bhima',
              },
              {
                number: '3',
                title: 'Sacred Spring',
                description: 'Collect blessed water from Bhim ni Theri for spiritual purification',
              },
              {
                number: '4',
                title: 'Hidimba Temple',
                description: 'Offer prayers for protection and spiritual transformation',
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg p-6 text-white text-center hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold mb-3 opacity-40">{step.number}</div>
                  <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                  <p className="text-sm leading-relaxed">{step.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-2xl text-purple-400">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-forest-800 to-forest-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Experience the Divine Connection
          </h2>
          <p className="text-xl text-forest-100 mb-8 leading-relaxed">
            Walk in the footsteps of the legendary Pandavas and feel the timeless spiritual energy that flows through
            Osam Hill
          </p>
          <button className="px-10 py-4 bg-accent-mint text-forest-800 rounded-lg font-bold text-lg hover:bg-white hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            Plan Your Pilgrimage
          </button>
        </div>
      </section>
    </div>
  );
};

export default MythologyPage;
