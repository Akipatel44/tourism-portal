/**
 * PLACES API INTEGRATION - Quick Reference
 * 
 * This file documents the Places API integration with React UI
 */

/**
 * 1. FETCH ALL PLACES EXAMPLE
 * ============================
 */

// src/app/places/page.tsx
// import { usePlaces } from '@/hooks/usePlaces';
// import { PlaceCard } from '@/components/PlaceCard';
//
// export default function PlacesPage() {
//   const { places, isLoading, error, pagination, setPage } = usePlaces({
//     page_size: 12,
//     category: 'Museum',
//     autoFetch: true,
//   });
//
//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;
//
//   return (
//     <div className="grid grid-cols-3 gap-6">
//       {places.map(place => (
//         <PlaceCard key={place.id} place={place} />
//       ))}
//     </div>
//   );
// }

/**
 * 2. FETCH SINGLE PLACE EXAMPLE
 * =============================
 */

// src/app/places/[id]/page.tsx
// import { usePlace } from '@/hooks/usePlace';
//
// export default function PlaceDetailPage() {
//   const { place, isLoading, error, refetch } = usePlace({
//     id: '123',
//     autoFetch: true,
//   });
//
//   if (isLoading) return <div>Loading place details...</div>;
//   if (!place) return <div>Place not found</div>;
//
//   return (
//     <div>
//       <h1>{place.name}</h1>
//       <p>{place.description}</p>
//       <img src={place.image_url} alt={place.name} />
//       <button onClick={refetch}>Refresh</button>
//     </div>
//   );
// }

/**
 * 3. PLACE CARD COMPONENT EXAMPLE
 * ===============================
 */

// <PlaceCard place={placeObject} />
// 
// PlaceCard displays:
// - Image with featured badge
// - Category badge
// - Title and location
// - Description (truncated to 2 lines)
// - Star rating (1-5 stars)
// - Visit count
// - Click to navigate to detail page

/**
 * 4. HOOKS REFERENCE
 * ==================
 */

// usePlaces() - Fetch list of places
// ----------------------------------
// const {
//   places,           // Place[] - Array of place objects
//   isLoading,        // boolean - True while fetching
//   error,            // ParsedApiError | null - Error if fetch failed
//   pagination: {     // Pagination info
//     page,           // Current page number
//     page_size,      // Items per page
//     total,          // Total places
//     total_pages,    // Total pages
//   },
//   refetch,          // () => Promise<void> - Manually refetch
//   setPage,          // (page: number) => void - Change page
// } = usePlaces({ page_size: 12, category: 'Museum' });

// usePlace() - Fetch single place
// --------------------------------
// const {
//   place,            // Place | null - Single place object
//   isLoading,        // boolean - True while fetching
//   error,            // ParsedApiError | null - Error if fetch failed
//   refetch,          // () => Promise<void> - Manually refetch
// } = usePlace({ id: 'place-123', autoFetch: true });

/**
 * 5. ERROR HANDLING
 * =================
 */

// Errors are automatically handled:
// 1. If API call fails, error state is set
// 2. Dummy fallback data is used
// 3. Component shows error alert but continues functioning
// 4. User can click "Refresh" to retry

// Example error structure:
// {
//   status: 404,
//   message: "Place not found",
//   errors: { name: ["Field is required"] } // Field-level errors
// }

/**
 * 6. DUMMY FALLBACK DATA
 * ======================
 */

// If API fails, these dummy places are used:
// - City Museum (Featured)
// - Central Park (Featured)
// - Historic Fort
// - Art Gallery

// Allows UI to continue working even if backend is down

/**
 * 7. FEATURES
 * ===========
 */

// ✓ Fetch all places with pagination
// ✓ Fetch single place by ID
// ✓ Filter places by category
// ✓ Handle loading states
// ✓ Handle error states with fallback data
// ✓ Auto-refresh functionality
// ✓ Page navigation
// ✓ Type-safe with full TypeScript support
// ✓ Responsive UI with Tailwind CSS
// ✓ Images with lazy loading
// ✓ Star ratings display
// ✓ Visit count tracking

/**
 * 8. COMPONENT STRUCTURE
 * ======================
 */

// Pages/
//   places/
//     page.tsx          ← List all places with filters & pagination
//     [id]/
//       page.tsx        ← Single place detail view
//
// Components/
//   PlaceCard.tsx       ← Reusable place card component
//
// Hooks/
//   usePlaces.ts        ← Hook for fetching places list
//   usePlace.ts         ← Hook for fetching single place
//   index.ts            ← Barrel export

/**
 * 9. USAGE IN COMPONENTS
 * ======================
 */

// Example: Check if place is featured
// if (place.is_featured) {
//   // Show featured badge
// }

// Example: Display rating
// Math.round(place.rating) // 4 or 5 stars

// Example: Format visit count
// place.visit_count.toLocaleString() // "1,250 visits"

// Example: Format dates
// new Date(place.created_at).toLocaleDateString()

/**
 * 10. ENVIRONMENT CONFIG
 * ======================
 */

// Required .env.local variables:
// NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
// NEXT_PUBLIC_API_TIMEOUT=30000
// NEXT_PUBLIC_TOKEN_KEY=osam_access_token

// API Endpoints used:
// GET /api/places/          ← Get all places
// GET /api/places/{id}/     ← Get single place
// GET /api/places/search/   ← Search places
// GET /api/places/category/ ← Filter by category

export default function QuickReference() {
  return (
    <div className="prose prose-invert max-w-4xl mx-auto p-8">
      <h1>Places API Integration - Complete</h1>
      <p>See code comments above for detailed usage examples.</p>
      
      <h2>Features Implemented</h2>
      <ul>
        <li>✅ Fetch all places with pagination</li>
        <li>✅ Fetch single place by ID</li>
        <li>✅ Category filtering</li>
        <li>✅ Loading states</li>
        <li>✅ Error handling with fallback data</li>
        <li>✅ PlaceCard component</li>
        <li>✅ usePlaces hook</li>
        <li>✅ usePlace hook</li>
        <li>✅ Full TypeScript support</li>
        <li>✅ Responsive design with Tailwind</li>
      </ul>

      <h2>File Structure</h2>
      <pre><code>{`
src/
├── app/
│   └── places/
│       ├── page.tsx           # List view with filters
│       └── [id]/
│           └── page.tsx       # Detail view
│
├── components/
│   └── PlaceCard.tsx          # Reusable card component
│
└── hooks/
    ├── usePlaces.ts           # Hook for list
    ├── usePlace.ts            # Hook for single
    └── index.ts               # Barrel export
      `}</code></pre>

      <h2>Quick Start</h2>
      <pre><code>{`
// In any component:
import { usePlaces } from '@/hooks';

function MyComponent() {
  const { places, isLoading, error } = usePlaces();
  
  return (
    &lt;div&gt;
      {places.map(place =&gt; (
        &lt;PlaceCard key={place.id} place={place} /&gt;
      ))}
    &lt;/div&gt;
  );
}
      `}</code></pre>
    </div>
  );
}
