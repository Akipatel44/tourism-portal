import React from 'react';
import Layout from '../components/Layout';
import HighlightCard from '../components/HighlightCard';
import SeasonalBanner from '../components/SeasonalBanner';
import CTAButtons from '../components/CTAButtons';

export default function HomePage() {
  return (
    <Layout pageTitle={undefined}>
      {/* HERO */}
      <section className="relative w-full">
        <div className="w-full h-[56vh] min-h-[360px] md:h-[72vh] lg:h-[78vh] bg-cover bg-center rounded-b-lg" style={{ backgroundImage: `url('/images/hero-placeholder.jpg')` }}>
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-5xl mx-auto px-6 md:px-8 text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight">Osam Hill &amp; Chichod</h1>
              <p className="mt-4 max-w-2xl text-sm md:text-lg text-white/90">Nature trails, ancient temples, and living myths — discover misted valleys and cascading waterfalls at OSAM Hill.</p>
              <CTAButtons />
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="mt-10">
        <div className="max-w-5xl mx-auto px-4 md:px-0">
          <h2 className="text-2xl font-bold text-monsoon-900">Highlights</h2>
          <p className="mt-2 text-sm text-stone-600">Quick entry points into what makes OSAM Hill special.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <HighlightCard title="Temples" description="Ancient hilltop shrines and serene spaces of worship." href="/places#temples" emoji="⛩️" />
            <HighlightCard title="Mythology" description="Folklore and legends that shaped local culture." href="/mythology" emoji="📜" />
            <HighlightCard title="Nature" description="Trails, biodiversity, and quiet viewpoints to recharge." href="/nature" emoji="🌿" />
            <HighlightCard title="Events" description="Festivals, monsoon treks, and local gatherings to join." href="/events" emoji="🎉" />
          </div>
        </div>
      </section>

      {/* Seasonal banner */}
      <div className="mt-12">
        <SeasonalBanner />
      </div>

      {/* Quick CTA strip */}
      <section className="mt-12">
        <div className="max-w-5xl mx-auto px-4 md:px-0 bg-white rounded-lg shadow-md py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-semibold text-monsoon-900">Ready to explore OSAM Hill?</h3>
            <p className="mt-1 text-sm text-stone-600">Plan your trip and discover curated places and seasonal experiences.</p>
          </div>
          <div className="">
            <CTAButtons />
          </div>
        </div>
      </section>
    </Layout>
  );
}
