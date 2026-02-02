/**
 * PLACES API INTEGRATION - QUICK REFERENCE CARD
 * 
 * Copy & paste ready code snippets
 */

// ============================================
// 1. FETCH & DISPLAY PLACES LIST
// ============================================

import { usePlaces } from '@/hooks'
import { PlaceCard } from '@/components/PlaceCard'

export default function PlacesList() {
  const { places, isLoading, error, pagination, setPage } = usePlaces({
    page_size: 12,
  })

  return (
    <div>
      {isLoading && <p>Loading places...</p>}
      {error && <p>Error: {error.message}</p>}
      
      <div className="grid grid-cols-3 gap-6">
        {places.map(place => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      
      <div>
        <button onClick={() => setPage(pagination.page - 1)}>Prev</button>
        <span>Page {pagination.page} of {pagination.total_pages}</span>
        <button onClick={() => setPage(pagination.page + 1)}>Next</button>
      </div>
    </div>
  )
}

// ============================================
// 2. FETCH SINGLE PLACE
// ============================================

import { usePlace } from '@/hooks'

export default function PlaceDetail({ id }: { id: string }) {
  const { place, isLoading, error, refetch } = usePlace({ id })

  if (isLoading) return <p>Loading place...</p>
  if (!place) return <p>Place not found</p>

  return (
    <div>
      <h1>{place.name}</h1>
      <img src={place.image_url} alt={place.name} />
      <p>{place.description}</p>
      <p>Rating: {place.rating} ⭐</p>
      <p>Visits: {place.visit_count.toLocaleString()}</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}

// ============================================
// 3. USE PLACE CARD COMPONENT
// ============================================

import { PlaceCard } from '@/components/PlaceCard'
import { Place } from '@/api/types/api'

interface MyListProps {
  places: Place[]
}

export default function MyList({ places }: MyListProps) {
  return (
    <div className="grid grid-cols-3 gap-6">
      {places.map(place => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  )
}

// ============================================
// 4. FILTER PLACES BY CATEGORY
// ============================================

import { usePlaces } from '@/hooks'
import { useState } from 'react'

export default function FilteredPlaces() {
  const [category, setCategory] = useState('')
  const { places } = usePlaces({ category: category || undefined })

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={() => setCategory('')}>All</button>
        <button onClick={() => setCategory('Museum')}>Museums</button>
        <button onClick={() => setCategory('Park')}>Parks</button>
        <button onClick={() => setCategory('Gallery')}>Galleries</button>
      </div>
      
      {places.map(place => (
        <div key={place.id}>{place.name}</div>
      ))}
    </div>
  )
}

// ============================================
// 5. HANDLE ERROR & RETRY
// ============================================

import { usePlaces } from '@/hooks'

export default function SafePlacesList() {
  const { places, error, refetch, isLoading } = usePlaces()

  return (
    <div>
      {error && (
        <div className="bg-red-100 p-4 rounded">
          <p>Error: {error.message}</p>
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {places.map(place => (
            <div key={place.id}>{place.name}</div>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// 6. CHECK FEATURED PLACES
// ============================================

import { usePlaces } from '@/hooks'

export default function FeaturedPlaces() {
  const { places } = usePlaces()
  const featured = places.filter(p => p.is_featured)

  return (
    <div>
      <h2>Featured Places ({featured.length})</h2>
      {featured.map(place => (
        <div key={place.id}>
          <span className="badge">Featured</span>
          {place.name}
        </div>
      ))}
    </div>
  )
}

// ============================================
// 7. SORT BY RATING
// ============================================

import { usePlaces } from '@/hooks'

export default function SortedPlaces() {
  const { places } = usePlaces()
  const sorted = [...places].sort((a, b) => b.rating - a.rating)

  return (
    <div>
      {sorted.map(place => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>Rating: {place.rating}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// 8. SORT BY VISIT COUNT
// ============================================

import { usePlaces } from '@/hooks'

export default function PopularPlaces() {
  const { places } = usePlaces()
  const sorted = [...places].sort((a, b) => b.visit_count - a.visit_count)

  return (
    <div>
      {sorted.map(place => (
        <div key={place.id}>
          <h3>{place.name}</h3>
          <p>Visits: {place.visit_count.toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

// ============================================
// 9. EXPORT/IMPORT PATTERNS
// ============================================

// Import hooks
import { usePlaces, usePlace } from '@/hooks'

// Import component
import { PlaceCard } from '@/components/PlaceCard'

// Import types
import { Place, PaginatedResponse } from '@/api/types/api'
import { ParsedApiError } from '@/api/types/error'

// ============================================
// 10. TYPE DEFINITIONS
// ============================================

// From @/api/types/api
interface Place {
  id: string
  name: string
  category: string
  location: string
  description: string
  latitude?: number
  longitude?: number
  image_url?: string
  visit_count: number
  rating: number
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

// From @/api/types/error
interface ParsedApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}

// ============================================
// HOOK SIGNATURES
// ============================================

// usePlaces Hook
interface UsePlacesOptions {
  page?: number
  page_size?: number
  category?: string
  autoFetch?: boolean
}

interface UsePlacesReturn {
  places: Place[]
  isLoading: boolean
  error: ParsedApiError | null
  pagination: {
    page: number
    page_size: number
    total: number
    total_pages: number
  }
  refetch: () => Promise<void>
  setPage: (page: number) => void
}

// usePlace Hook
interface UsePlaceOptions {
  id: string
  autoFetch?: boolean
}

interface UsePlaceReturn {
  place: Place | null
  isLoading: boolean
  error: ParsedApiError | null
  refetch: () => Promise<void>
}

// ============================================
// API CALLS UNDER THE HOOD
// ============================================

// usePlaces calls:
// PlacesService.getPlaces({ page, page_size, category })
// ├─ GET /api/places/?page=1&page_size=12&category=Museum

// usePlace calls:
// PlacesService.getPlace(id)
// ├─ GET /api/places/123/

// Error handling:
// parseApiError(error as AxiosError)
// ├─ Converts to ParsedApiError
// ├─ Extracts status, message, errors
// └─ Returns user-friendly error

// ============================================
// EXPECTED RESPONSES
// ============================================

// Success - getPlaces()
{
  "items": [
    {
      "id": "1",
      "name": "City Museum",
      "category": "Museum",
      "location": "Downtown",
      "description": "...",
      "image_url": "...",
      "visit_count": 1250,
      "rating": 4.8,
      "is_featured": true,
      "created_at": "2025-01-01T00:00:00Z",
      "updated_at": "2025-01-15T00:00:00Z"
    }
  ],
  "total": 4,
  "page": 1,
  "page_size": 12,
  "total_pages": 1
}

// Success - getPlace()
{
  "id": "1",
  "name": "City Museum",
  "category": "Museum",
  "location": "Downtown",
  "description": "...",
  "image_url": "...",
  "visit_count": 1250,
  "rating": 4.8,
  "is_featured": true,
  "created_at": "2025-01-01T00:00:00Z",
  "updated_at": "2025-01-15T00:00:00Z"
}

// Error
{
  "status": 404,
  "message": "Place not found",
  "errors": {}
}

export default () => null
