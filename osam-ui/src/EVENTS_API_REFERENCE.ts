/**
 * EVENTS API INTEGRATION - REFERENCE
 * 
 * Complete integration with hooks, components, and pages
 */

/*
 * WHAT WAS CREATED
 * ================
 * 
 * HOOKS (2 files):
 *   src/hooks/useEvents.ts   - Fetch events list with pagination & filtering
 *   src/hooks/useEvent.ts    - Fetch single event by ID
 * 
 * COMPONENTS (1 file - updated):
 *   src/components/EventCard.tsx - Display event card with status & attendees
 * 
 * PAGES (2 files):
 *   src/app/events/page.tsx         - List view with status filters & pagination
 *   src/app/events/[id]/page.tsx    - Detail view with full event information
 */

/*
 * FEATURES IMPLEMENTED
 * ====================
 */

// ✅ UPCOMING EVENTS
// Fetch upcoming events with useEvents hook
// const { events } = useEvents({ status: 'upcoming' })

// ✅ PAST EVENTS
// Fetch past events with filtering
// const { events } = useEvents({ status: 'past' })

// ✅ EVENT DETAIL FETCH
// Fetch single event by ID
// const { event } = useEvent({ id: 'event-123' })

// ✅ PAGINATION
// Built-in pagination with page navigation
// const { pagination, setPage } = useEvents()
// pagination.page, pagination.total_pages, setPage(2)

// ✅ LAZY LOADING
// Skeleton loaders during data fetch
// isLoading state indicates loading

// ✅ CLEAN & REUSABLE CODE
// - Hooks follow React patterns
// - Components are composable
// - Error handling with fallbacks
// - Full TypeScript support

/*
 * HOOK SIGNATURES
 * ================
 */

// useEvents() Hook
interface UseEventsOptions {
  page?: number;                              // Page number (default: 1)
  page_size?: number;                         // Items per page (default: 12)
  status?: 'upcoming' | 'ongoing' | 'past' | 'cancelled';  // Filter by status
  autoFetch?: boolean;                        // Auto-fetch on mount (default: true)
}

interface UseEventsReturn {
  events: Event[];                            // Array of event objects
  isLoading: boolean;                         // Loading state
  error: ParsedApiError | null;               // Error object if failed
  pagination: {
    page: number;                             // Current page
    page_size: number;                        // Items per page
    total: number;                            // Total events
    total_pages: number;                      // Total pages
  };
  refetch: () => Promise<void>;               // Manual refetch function
  setPage: (page: number) => void;            // Change page number
}

// useEvent() Hook
interface UseEventOptions {
  id: string;                                 // Event ID to fetch
  autoFetch?: boolean;                        // Auto-fetch on mount (default: true)
}

interface UseEventReturn {
  event: Event | null;                        // Single event object
  isLoading: boolean;                         // Loading state
  error: ParsedApiError | null;               // Error object if failed
  refetch: () => Promise<void>;               // Manual refetch function
}

/*
 * DUMMY FALLBACK DATA
 * ===================
 */

// If API fails, these 4 events are shown:
//
// 1. Summer Festival 2026 (Upcoming)
//    - June 15, 2026 at 10:00
//    - Central Park
//    - 2,500 attendees
//
// 2. Tech Conference 2026 (Upcoming)
//    - March 20, 2026 at 09:00
//    - Convention Center
//    - 1,200 attendees
//
// 3. Art Exhibition Opening (Upcoming)
//    - February 14, 2026 at 18:00
//    - Art Museum
//    - 350 attendees
//
// 4. Winter Holiday Celebration (Past)
//    - December 20, 2025 at 16:00
//    - Town Square
//    - 5,000 attendees

/*
 * API INTEGRATION
 * ===============
 */

// EventsService methods used:

// Fetch events list:
// await EventsService.getEvents({
//   page: 1,
//   page_size: 12,
//   status: 'upcoming'
// })
// └─ Returns: PaginatedResponse<Event>

// Fetch single event:
// await EventsService.getEvent(id)
// └─ Returns: Event

// API Endpoints:
// ├─ GET /api/events/              (getEvents)
// ├─ GET /api/events/{id}/         (getEvent)
// ├─ GET /api/events/upcoming/     (getUpcomingEvents)
// └─ GET /api/events/search/       (searchEvents)

/*
 * EVENT DATA STRUCTURE
 * ====================
 */

interface Event {
  id: string;                   // Unique event ID
  name: string;                 // Event name
  description: string;          // Event description
  date: string;                 // ISO date string (YYYY-MM-DD)
  time: string;                 // Time in HH:MM format
  location: string;             // Event location
  image_url?: string;           // Event image URL
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  attendees_count: number;      // Number of attendees
  created_at: string;           // Created timestamp
  updated_at: string;           // Updated timestamp
}

/*
 * USAGE EXAMPLES
 * ==============
 */

// Example 1: Display Upcoming Events
import { useEvents } from '@/hooks'
import { EventCard } from '@/components/EventCard'

export function UpcomingEventsList() {
  const { events, isLoading, error } = useEvents({
    status: 'upcoming'
  })

  if (isLoading) return <p>Loading events...</p>
  if (error) return <p>Error loading events</p>

  return (
    <div className="grid grid-cols-3 gap-6">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}

// Example 2: Filter Events by Status
export function EventFilters() {
  const [status, setStatus] = useState<string | null>(null)
  const { events } = useEvents({ status })

  return (
    <div>
      <button onClick={() => setStatus(null)}>All</button>
      <button onClick={() => setStatus('upcoming')}>Upcoming</button>
      <button onClick={() => setStatus('past')}>Past</button>

      {events.map(event => (
        <div key={event.id}>{event.name}</div>
      ))}
    </div>
  )
}

// Example 3: Event Details Page
export function EventDetails({ eventId }: { eventId: string }) {
  const { event, isLoading, refetch } = useEvent({ id: eventId })

  if (!event) return <p>Event not found</p>

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>📅 {event.date} at {event.time}</p>
      <p>📍 {event.location}</p>
      <p>👥 {event.attendees_count} attending</p>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}

// Example 4: Pagination
export function PaginatedEvents() {
  const { events, pagination, setPage } = useEvents({
    page_size: 12
  })

  return (
    <div>
      {/* Events list */}
      <div>
        {events.map(event => (
          <div key={event.id}>{event.name}</div>
        ))}
      </div>

      {/* Pagination controls */}
      <div>
        <button
          onClick={() => setPage(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          Previous
        </button>
        <span>Page {pagination.page} of {pagination.total_pages}</span>
        <button
          onClick={() => setPage(pagination.page + 1)}
          disabled={pagination.page >= pagination.total_pages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

/*
 * STATUS COLORS & BADGES
 * ======================
 */

// upcoming:  🟢 Green  - "Upcoming"
// ongoing:   🔵 Blue   - "Happening Now"
// past:      ⚪ Gray   - "Past Event"
// cancelled: 🔴 Red    - "Cancelled"

/*
 * PAGE STRUCTURE
 * ==============
 */

// /events
// ├─ Header with title
// ├─ Status filter buttons
// ├─ Events grid (3 columns)
// ├─ Pagination controls
// └─ Empty state message

// /events/[id]
// ├─ Back button
// ├─ Event image banner
// ├─ Event name & status badge
// ├─ Date, time, location info
// ├─ Event description
// ├─ Attendee count badge
// ├─ Metadata (created/updated dates)
// └─ Action buttons (Refresh, View All)

/*
 * FEATURES SUMMARY
 * ================
 */

// ✅ Fetch upcoming events
// ✅ Fetch past events
// ✅ Fetch event by ID
// ✅ Pagination with prev/next buttons
// ✅ Status filtering (upcoming, past, happening now, cancelled)
// ✅ Lazy loading with skeleton loaders
// ✅ Error handling with fallback data
// ✅ Responsive grid layout
// ✅ Event cards with status badges
// ✅ Detail page with full information
// ✅ Full TypeScript support
// ✅ Clean, reusable code

export default () => null
