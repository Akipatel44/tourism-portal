import React from 'react';
import Layout from '../components/Layout';
import NatureSection from '../components/NatureSection';
import LocalProductCard, { LocalProductCardProps } from '../components/LocalProductCard';

// Local products data
const LOCAL_FRUITS: LocalProductCardProps[] = [
  {
    name: 'Rayan',
    emoji: '🍒',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    season: 'Summer (March–May)',
    description: 'Sweet red berries that grow wild on the hillsides, loved by both locals and visiting birds.',
    uses: ['Fresh juice and smoothies', 'Traditional jam making', 'Medicinal properties for digestion'],
  },
  {
    name: 'Imli',
    emoji: '🌳',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd64761?w=400&h=300&fit=crop',
    season: 'Monsoon (June–September)',
    description: 'Tangy tamarind pods that grow abundantly, a staple in local cuisine and Ayurvedic medicine.',
    uses: ['Refreshing drinks and chutneys', 'Cooling properties in summer heat', 'Aid digestion and immunity'],
  },
];

const SEASONAL_FLOWERS: LocalProductCardProps[] = [
  {
    name: 'Rhododendron',
    emoji: '🌸',
    image: 'https://images.unsplash.com/photo-1540546519652-8250adf30c9f?w=400&h=300&fit=crop',
    season: 'Spring (February–April)',
    description: 'Vibrant pink and red blooms that blanket the hillsides in a breathtaking display of color.',
  },
  {
    name: 'Monsoon Flowers',
    emoji: '🌺',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=300&fit=crop',
    season: 'Monsoon (June–August)',
    description: 'Delicate wildflowers that emerge after the rains, painting the valleys in blues, purples, and yellows.',
  },
  {
    name: 'Marigold',
    emoji: '🌼',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=300&fit=crop',
    season: 'Year-round, peak in Autumn',
    description: 'Golden-yellow blooms used in local festivals, religious ceremonies, and traditional medicine.',
  },
];

export default function NaturePage() {
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
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Nature & Biodiversity</h1>
              <p className="mt-3 text-lg text-white/80 max-w-2xl">
                Discover the rich natural heritage of Osam Hill—where monsoon mists meet ancient forests and life blooms in every season.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Natural Beauty Overview */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <NatureSection
            title="The Heartbeat of the Western Ghats"
            description="Osam Hill stands as a vital biodiversity hotspot, home to countless plant and animal species found nowhere else on Earth. The monsoon rains transform these peaks into lush, verdant landscapes—a natural symphony of colors, sounds, and life. From misty mornings to cascading waterfalls, every moment here celebrates the raw beauty of nature."
            image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=500&fit=crop"
            imageAlt="Lush green forest landscape at Osam Hill"
            layout="image-left"
            highlights={[
              'Over 200 species of birds documented in the region',
              'Endemic plants found only on these peaks',
              'Critical water source for seven surrounding villages',
              'Sacred ecosystem connecting ancient forests to modern conservation',
            ]}
          />
        </div>
      </section>

      {/* Monsoon Waterfalls */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <NatureSection
            title="Zarna Waterfall: A Monsoon Spectacle"
            description="When the monsoon arrives, Zarna Waterfall roars to life with tremendous power. Fed by cascading mountain streams, this 80-meter plunge transforms into a roaring, misty cascade that thunders down the cliff face. Local legends say the waterfall is the tears of the mountain goddess, blessing the land with fertility and abundance. Visitors who witness Zarna during monsoon describe it as a spiritual experience—the sheer force and beauty of nature on full display."
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=500&fit=crop"
            imageAlt="Zarna waterfall cascading during monsoon season"
            layout="image-right"
            highlights={[
              'Height: 80 meters of pure cascading power',
              'Best viewed during monsoon (June–September)',
              'Accessible via a moderate hiking trail (45 minutes)',
              'Sacred bathing spot for pilgrims seeking blessings',
            ]}
          />
        </div>
      </section>

      {/* Local Fruits */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900">Local Fruits & Harvests</h2>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
              The hills provide abundant fruits that sustain both wildlife and local communities. Each season brings its own bounty.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {LOCAL_FRUITS.map((fruit, idx) => (
              <LocalProductCard key={idx} {...fruit} />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Flowers */}
      <section className="mb-16">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-monsoon-900">Seasonal Flowers & Blooms</h2>
            <p className="mt-3 text-stone-600 max-w-2xl mx-auto">
              The changing seasons paint Osam Hill with a rotating palette of colors—nature's eternal art gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SEASONAL_FLOWERS.map((flower, idx) => (
              <LocalProductCard key={idx} {...flower} />
            ))}
          </div>
        </div>
      </section>

      {/* Farmer Life */}
      <section className="mb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <NatureSection
            title="Life on the Hills: Farmer Traditions"
            description="The farming communities around Osam Hill have lived in harmony with nature for generations. They practice terraced farming, growing rice, millet, and spices on the steep hillsides. Their deep knowledge of seasonal patterns, water management, and sustainable agriculture makes them guardians of the land. Visitors can experience their warm hospitality, taste home-cooked meals made from local produce, and learn traditional farming techniques that have endured for centuries."
            image="https://images.unsplash.com/photo-1500382017468-7049fae79941?w=600&h=500&fit=crop"
            imageAlt="Farmers working in terraced fields on Osam Hill"
            layout="image-left"
            highlights={[
              'Terraced farming practices adapted to steep terrain',
              'Organic cultivation of local crops and spices',
              'Traditional irrigation channels built centuries ago',
              'Community homestays offering authentic cultural experiences',
            ]}
          />
        </div>
      </section>

      {/* Reflection Section */}
      <section className="mb-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0 bg-sage-100 rounded-xl shadow-md p-8 border-l-4 border-emerald-500">
          <h3 className="text-2xl font-bold text-monsoon-900 mb-4">🌍 Conservation & Responsibility</h3>
          <p className="text-base leading-relaxed text-stone-700">
            Visiting Osam Hill is a privilege—one that comes with the responsibility to protect this delicate ecosystem. Please tread lightly, respect wildlife, carry out your waste, and support local conservation efforts. By visiting consciously, you become part of a larger movement to preserve this natural heritage for future generations.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12 pt-8 border-t border-stone-200 text-center">
        <h3 className="text-xl font-semibold text-monsoon-900 mb-4">Ready to explore nature?</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a href="/places" className="inline-flex items-center justify-center px-6 py-3 bg-forest-600 hover:bg-forest-700 text-white rounded-md text-sm font-medium">
            Explore Nature Trails
          </a>
          <a href="/visit-guide" className="inline-flex items-center justify-center px-6 py-3 border border-stone-200 bg-white text-monsoon-900 rounded-md text-sm font-medium hover:bg-stone-50">
            Plan Your Visit
          </a>
        </div>
      </section>
    </Layout>
  );
}
