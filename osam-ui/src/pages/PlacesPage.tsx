/**
 * Places Page
 * Showcase all sacred sites and places in Osam Hill
 */

import React from "react";

interface Place {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  significance: string;
}

const PLACES: Place[] = [
  {
    id: 1,
    name: "Osam Hill Summit",
    description: "The main peak offering panoramic views of the region",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    category: "landmark",
    significance: "Sacred peak with spiritual significance",
  },
  {
    id: 2,
    name: "Chichod Temple",
    description: "Ancient temple with intricate architecture",
    image:
      "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop",
    category: "temple",
    significance: "Major pilgrimage site",
  },
  {
    id: 3,
    name: "Forest Trails",
    description: "Scenic trails through pristine natural habitat",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    category: "nature",
    significance: "Biodiversity hotspot",
  },
];

export const PlacesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-forest text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Places to Explore
          </h1>
          <p className="text-xl text-forest-100">
            Discover the sacred sites and landmarks of Osam Hill & Chichod
          </p>
        </div>
      </section>

      {/* Places Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PLACES.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-forest-800">
                    {place.name}
                  </h3>
                  <span className="px-3 py-1 bg-forest-100 text-forest-800 text-xs font-semibold rounded-full">
                    {place.category}
                  </span>
                </div>
                <p className="text-monsoon-600 mb-3">{place.description}</p>
                <p className="text-sm text-accent-gold font-semibold mb-4">
                  ⭐ {place.significance}
                </p>
                <button className="w-full px-4 py-2 bg-forest-600 text-white rounded hover:bg-forest-700 transition-colors duration-200">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-monsoon-50 py-8 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-monsoon-800 mb-4">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-3">
            {["All", "Temple", "Nature", "Landmark"].map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border-2 border-forest-600 text-forest-600 hover:bg-forest-600 hover:text-white transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlacesPage;
