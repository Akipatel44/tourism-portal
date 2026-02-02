/**
 * GALLERY API INTEGRATION REFERENCE
 * Complete guide to using Gallery hooks, components, and pages
 * 
 * Features:
 * ✅ Category-based filtering
 * ✅ Lazy loading images with Intersection Observer
 * ✅ Full-screen modal preview with zoom
 * ✅ Error fallback UI with dummy data
 * ✅ Performance optimized
 */

// ============================================================================
// 1. HOOKS
// ============================================================================

/**
 * useGallery Hook
 * Fetch paginated gallery items with optional category filtering
 */
export const useGalleryExample = () => {
  // Example 1: Fetch all items
  const { items, isLoading, error, pagination, setPage } = useGallery({
    page: 1,
    page_size: 12,
  });

  // Example 2: Fetch by category
  const { items: natureItems } = useGallery({
    page_size: 12,
    category: 'Nature',
  });

  // Example 3: With all options
  const galleryHook = useGallery({
    page: 1,
    page_size: 12,
    category: 'Architecture',
    autoFetch: true, // Default: true
  });

  return {
    // Returns:
    items, // GalleryItem[]
    isLoading, // boolean
    error, // ParsedApiError | null
    pagination: {
      page: 1, // Current page number
      page_size: 12, // Items per page
      total: 100, // Total items
      total_pages: 9, // Total pages
    },
    refetch, // () => Promise<void>
    setPage, // (page: number) => void
  };
};

/**
 * useGalleryItem Hook
 * Fetch single gallery item by ID
 */
export const useGalleryItemExample = () => {
  const { item, isLoading, error, refetch } = useGalleryItem({
    id: 'gallery-1',
    autoFetch: true, // Default: true
  });

  return {
    // Returns:
    item, // GalleryItem | null
    isLoading, // boolean
    error, // ParsedApiError | null
    refetch, // () => Promise<void>
  };
};

// ============================================================================
// 2. COMPONENT USAGE
// ============================================================================

/**
 * GalleryCard Component
 * Displays single gallery item with lazy loading and hover effects
 */
export const GalleryCardExample = () => {
  const { items } = useGallery();

  return (
    <div className="grid grid-cols-4 gap-6">
      {items.map((item) => (
        <GalleryCard
          key={item.id}
          item={item}
          onClick={() => console.log('Item clicked')}
        />
      ))}
    </div>
  );
};

/**
 * GalleryModal Component
 * Full-screen modal preview with navigation and zoom
 */
export const GalleryModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { items } = useGallery({ page_size: 100 });

  const handleNavigate = (index: number) => {
    if (index >= 0 && index < items.length) {
      setSelectedItem(items[index]);
      setCurrentIndex(index);
    }
  };

  return (
    <GalleryModal
      item={selectedItem}
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      allItems={items}
      currentIndex={currentIndex}
      onNavigate={handleNavigate}
    />
  );
};

// ============================================================================
// 3. PAGE COMPONENTS
// ============================================================================

/**
 * /gallery - Gallery List Page
 * 
 * Features:
 * - Category filter buttons (Nature, Architecture, Portrait, etc.)
 * - Responsive grid layout (1 col mobile → 4 cols desktop)
 * - Pagination with previous/next buttons
 * - Error alerts showing fallback data
 * - Loading skeleton loaders
 * - Empty state message
 * - Modal preview on click
 * 
 * Usage:
 * Navigate to /gallery in browser
 */

/**
 * /gallery/[id] - Gallery Detail Page
 * 
 * Features:
 * - Full-size image display
 * - Metadata grid (views, uploader, date, status)
 * - Category badge with color coding
 * - Featured badge indicator
 * - Preview button (opens modal)
 * - Refresh button
 * - Back navigation
 * - Error handling with fallback
 * 
 * Usage:
 * Navigate to /gallery/gallery-1
 */

// ============================================================================
// 4. API INTEGRATION
// ============================================================================

/**
 * Gallery Service Methods
 */
export const galleryServiceExample = {
  // Get paginated list with optional category
  async getGallery(params?: {
    page?: number;
    page_size?: number;
    category?: string;
  }) {
    // GET /api/gallery/?page=1&page_size=12&category=Nature
  },

  // Get items by specific category
  async getGalleryByCategory(category: string, params?: {
    page?: number;
    page_size?: number;
  }) {
    // GET /api/gallery/category/{category}/?page=1&page_size=12
  },

  // Get single item
  async getGalleryItem(id: string) {
    // GET /api/gallery/{id}/
  },

  // Get featured items only
  async getFeaturedGallery(params?: {
    page?: number;
    page_size?: number;
  }) {
    // GET /api/gallery/featured/?page=1&page_size=12
  },
};

// ============================================================================
// 5. DATA STRUCTURES
// ============================================================================

/**
 * GalleryItem Interface
 */
export interface GalleryItemExample {
  id: string; // Unique identifier
  image_url: string; // Image URL (lazy loaded)
  title: string; // Image title
  category: string; // Nature, Architecture, Portrait, etc.
  description?: string; // Optional description
  uploaded_by: string; // Username of uploader
  upload_date: string; // ISO 8601 date string
  view_count: number; // Total views
  is_featured: boolean; // Featured status
}

/**
 * Pagination Object
 */
export interface PaginationExample {
  page: number; // Current page (1-indexed)
  page_size: number; // Items per page
  total: number; // Total items
  total_pages: number; // Total pages
}

// ============================================================================
// 6. DUMMY FALLBACK DATA
// ============================================================================

/**
 * Used when API fails - 6 sample gallery items
 */
export const dummyGalleryData = [
  {
    id: 'gallery-1',
    title: 'Mountain Landscape',
    category: 'Nature',
    image_url: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=500&h=400&fit=crop',
    description: 'Stunning mountain vista at sunset',
    uploaded_by: 'photographer1',
    upload_date: '2025-12-01T10:00:00Z',
    view_count: 1250,
    is_featured: true,
  },
  {
    id: 'gallery-2',
    title: 'Urban Architecture',
    category: 'Architecture',
    image_url: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=500&h=400&fit=crop',
    description: 'Modern city skyline photography',
    uploaded_by: 'photographer2',
    upload_date: '2025-11-28T14:30:00Z',
    view_count: 890,
    is_featured: true,
  },
  {
    id: 'gallery-3',
    title: 'Ocean Waves',
    category: 'Nature',
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop',
    description: 'Dramatic seascape with waves',
    uploaded_by: 'photographer3',
    upload_date: '2025-11-25T09:15:00Z',
    view_count: 2100,
    is_featured: false,
  },
  {
    id: 'gallery-4',
    title: 'Forest Path',
    category: 'Nature',
    image_url: 'https://images.unsplash.com/photo-1578321272176-b39e7b889b99?w=500&h=400&fit=crop',
    description: 'Serene woodland trail',
    uploaded_by: 'photographer1',
    upload_date: '2025-11-20T16:45:00Z',
    view_count: 1680,
    is_featured: false,
  },
  {
    id: 'gallery-5',
    title: 'City Lights',
    category: 'Architecture',
    image_url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=500&h=400&fit=crop',
    description: 'Night photography of city lights',
    uploaded_by: 'photographer4',
    upload_date: '2025-11-18T20:00:00Z',
    view_count: 945,
    is_featured: true,
  },
  {
    id: 'gallery-6',
    title: 'Beach Sunset',
    category: 'Nature',
    image_url: 'https://images.unsplash.com/photo-1495884468989-3c3d7b1fed46?w=500&h=400&fit=crop',
    description: 'Golden hour at the beach',
    uploaded_by: 'photographer5',
    upload_date: '2025-11-15T18:30:00Z',
    view_count: 3200,
    is_featured: true,
  },
];

// ============================================================================
// 7. PERFORMANCE OPTIMIZATIONS
// ============================================================================

/**
 * GalleryCard Performance Features:
 * - Lazy loading with Intersection Observer
 * - Image loading state with placeholder
 * - Skeleton loaders while fetching
 * - Smooth transitions (200ms-500ms)
 * - Hover effects (scale, overlay)
 * - Responsive grid (1→2→3→4 columns)
 * - decoding="async" for non-blocking image decode
 * - loading="lazy" for native lazy loading
 * - CSS transforms for GPU acceleration
 */

/**
 * GalleryModal Performance Features:
 * - Image zoom with smooth scale transform
 * - Navigation with keyboard shortcuts (← → Esc)
 * - Prevent body scroll when open
 * - Image load state tracking
 * - Efficient re-renders with React.memo (optional)
 * - CSS transitions for smooth interactions
 */

/**
 * GalleryPage Performance Features:
 * - 12 items per page (optimal for loading)
 * - Skeleton loaders during fetch
 * - Smooth scroll on pagination
 * - Category filter reduces payload
 * - Grid layout with CSS Grid
 * - Error fallback with dummy data
 */

// ============================================================================
// 8. CATEGORY COLORS
// ============================================================================

export const CATEGORY_COLORS = {
  'Nature': '#22c55e', // green
  'Architecture': '#3b82f6', // blue
  'Portrait': '#a855f7', // purple
  'Abstract': '#ec4899', // pink
  'Wildlife': '#f97316', // orange
  'Urban': '#475569', // slate
  'Landscape': '#14b8a6', // teal
};

// ============================================================================
// 9. ERROR HANDLING
// ============================================================================

/**
 * When API fails:
 * 1. Error state is set in hook
 * 2. Fallback dummy data is used
 * 3. Error alert is displayed to user
 * 4. User sees "Connection Error - Showing Fallback Data" message
 * 5. All functionality remains available
 * 6. Refetch button allows retry
 */

// ============================================================================
// 10. COMPLETE USAGE EXAMPLE
// ============================================================================

/**
 * Full Gallery Integration in a Component
 */
export const CompleteGalleryExample = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { items, isLoading, error, pagination, setPage } = useGallery({
    page_size: 12,
    category: selectedCategory,
  });

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return <div>Loading gallery items...</div>;
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800">
        Connection failed - showing fallback data
      </div>
    );
  }

  return (
    <div>
      {/* Category Filters */}
      <div className="flex gap-2 mb-6">
        {['All', 'Nature', 'Architecture', 'Portrait'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === 'All' ? undefined : cat)}
            className={`px-4 py-2 rounded ${
              selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-6 mb-6">
        {items.map((item) => (
          <div key={item.id} onClick={() => handleOpenModal(item)}>
            <GalleryCard item={item} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setPage(pagination.page - 1)}
          disabled={pagination.page === 1}
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

      {/* Modal Preview */}
      <GalleryModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        allItems={items}
      />
    </div>
  );
};

export default () => null;
