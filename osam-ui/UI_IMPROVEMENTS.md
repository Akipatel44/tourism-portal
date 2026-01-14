# UI Improvements & Accessibility Guide

## Reusable Components Created

### 1. **Loader Component** (`src/components/Loader.tsx`)
Animated loading spinner with multiple variants.

**Props:**
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `fullScreen`: boolean (default: false)
- `message`: string (default: 'Loading...')
- `variant`: 'spinner' | 'dots' | 'bars' (default: 'spinner')

**Usage:**
```tsx
import { Loader } from './components';

// Simple loader
<Loader />

// Full screen loader
<Loader fullScreen message="Loading data..." />

// Dots variant
<Loader variant="dots" size="lg" />
```

---

### 2. **EmptyState Component** (`src/components/EmptyState.tsx`)
Display empty states with icon, message, and optional action.

**Props:**
- `icon`: string (default: '📭')
- `title`: string (required)
- `description`: string (optional)
- `actionLabel`: string (optional)
- `onAction`: () => void (optional)
- `variant`: 'default' | 'compact' (default: 'default')

**Usage:**
```tsx
import { EmptyState } from './components';

// Default empty state
<EmptyState 
  icon="🎪"
  title="No Events Found"
  description="Try adjusting your filters or check back later"
  actionLabel="Browse All Events"
  onAction={() => navigate('/events')}
/>

// Compact variant
<EmptyState 
  icon="📭"
  title="No data available"
  variant="compact"
/>
```

---

### 3. **ErrorMessage Component** (`src/components/ErrorMessage.tsx`)
Display error messages in multiple styles.

**Props:**
- `title`: string (optional)
- `message`: string (required)
- `actionLabel`: string (optional)
- `onAction`: () => void (optional)
- `onClose`: () => void (optional)
- `variant`: 'banner' | 'card' | 'inline' | 'toast' (default: 'banner')

**Variants:**
- `banner`: Full-width error at top
- `card`: Centered card style
- `inline`: Small inline message
- `toast`: Bottom-right notification

**Usage:**
```tsx
import { ErrorMessage } from './components';

// Banner error
<ErrorMessage 
  title="Failed to load data"
  message="Unable to fetch places. Please try again."
  actionLabel="Retry"
  onAction={refetch}
/>

// Toast error
<ErrorMessage 
  title="Error"
  message="Action failed"
  variant="toast"
  onClose={() => setError(null)}
/>

// Inline error
<ErrorMessage 
  message="Please enter a valid email"
  variant="inline"
/>
```

---

### 4. **Skeleton Component** (`src/components/Skeleton.tsx`)
Animated skeleton loaders for content placeholders.

**Props:**
- `type`: 'text' | 'card' | 'image' | 'title' | 'paragraph' | 'grid' (default: 'text')
- `count`: number (default: 1)
- `height`: string (default: 'h-4')
- `width`: string (default: 'w-full')
- `circle`: boolean (default: false)

**Usage:**
```tsx
import { Skeleton } from './components';

// Text skeleton
<Skeleton type="text" count={3} />

// Image skeleton
<Skeleton type="image" width="w-96" />

// Card grid skeleton
<Skeleton type="grid" count={6} />

// Title + paragraph skeleton
<>
  <Skeleton type="title" />
  <Skeleton type="paragraph" count={3} />
</>
```

---

## Mobile Responsiveness Improvements

### Key Practices Implemented:

1. **Responsive Grid Systems**
   ```tsx
   // Mobile first
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   ```

2. **Flexible Typography**
   ```tsx
   <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
   ```

3. **Touch-Friendly Spacing**
   - Minimum tap target: 44x44px
   - Button padding: `px-4 py-3` or larger
   - List item padding: `p-4` or larger

4. **Mobile-First Images**
   - Use `aspect-ratio` for consistent sizing
   - Use `object-cover` for image fitting
   - Lazy load images when possible

5. **Responsive Navigation**
   - Hamburger menu on mobile
   - Full navigation on desktop
   - Sticky header that collapses

6. **Responsive Modals/Lightbox**
   - Full viewport on mobile
   - Padding adjustments: `p-4 sm:p-8`
   - Scrollable on small screens

---

## Accessibility (A11y) Improvements

### ARIA Attributes:
```tsx
// Navigation
<nav aria-label="Main navigation">

// Buttons with icons only
<button aria-label="Close modal">×</button>

// Lists
<ul role="list" aria-label="Gallery items">

// Headings hierarchy
<h1>Main Title</h1>
<h2>Section</h2>
```

### Color Contrast:
- All text meets WCAG AA standards (4.5:1 ratio)
- Error messages use both color and icon
- Status indicators use icon + color

### Keyboard Navigation:
```tsx
// Tab-through friendly buttons
<button className="focus:outline-none focus:ring-2 focus:ring-forest-600">

// Visible focus states
.focus:ring-2 .focus:ring-offset-2
```

### Screen Reader Support:
```tsx
// Alt text for images
<img alt="Waterfall at Osam Hill during monsoon" />

// Form labels
<label htmlFor="email">Email Address</label>
<input id="email" />

// Semantic HTML
<button> instead of <div onClick>
<nav>, <main>, <article> for structure
```

### Skip Links:
```tsx
// Skip to main content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
<main id="main-content">
```

---

## Loading & Empty State Patterns

### Load Data with States:
```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

useEffect(() => {
  setLoading(true);
  fetchData()
    .then(data => setData(data))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
}, []);

// Render
if (loading) return <Skeleton type="grid" count={6} />;
if (error) return <ErrorMessage message={error} />;
if (!data || data.length === 0) 
  return <EmptyState title="No items found" />;
  
return <ItemGrid items={data} />;
```

---

## Error Handling Pattern

```tsx
const [error, setError] = useState<string | null>(null);

const handleSubmit = async (formData) => {
  try {
    await submitForm(formData);
  } catch (err) {
    setError(err.message);
  }
};

// Display error
{error && (
  <ErrorMessage 
    message={error}
    onClose={() => setError(null)}
  />
)}
```

---

## Component Usage Examples

### In PlacesPage:
```tsx
const [places, setPlaces] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetchPlaces()
    .then(setPlaces)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);

return (
  <div>
    {error && <ErrorMessage message={error} />}
    {loading && <Skeleton type="grid" count={6} />}
    {!loading && places.length === 0 && (
      <EmptyState 
        title="No places found"
        actionLabel="Browse all"
        onAction={() => refetch()}
      />
    )}
    {places.map(place => <PlaceCard key={place.id} {...place} />)}
  </div>
);
```

### In Forms:
```tsx
const [submitting, setSubmitting] = useState(false);
const [errors, setErrors] = useState({});

return (
  <form>
    {Object.keys(errors).map(field => (
      <ErrorMessage 
        key={field}
        message={errors[field]}
        variant="inline"
      />
    ))}
    <button disabled={submitting}>
      {submitting ? <Loader size="sm" /> : 'Submit'}
    </button>
  </form>
);
```

---

## Best Practices Summary

✅ **Mobile First**
- Design for mobile, enhance for larger screens
- Test on real devices
- Touch-friendly (44x44px minimum)

✅ **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

✅ **Loading States**
- Skeleton loaders for content
- Spinners for actions
- Clear loading messages

✅ **Empty States**
- Helpful messaging
- Suggest next actions
- Appropriate icons

✅ **Error Handling**
- User-friendly messages
- Actionable errors
- Clear visual indicators

✅ **Performance**
- Lazy load images
- Code splitting by route
- Optimize bundle size

---

## Testing Checklist

- [ ] Test on mobile (320px - 768px)
- [ ] Test on tablet (768px - 1024px)
- [ ] Test on desktop (1024px+)
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader (NVDA, JAWS, VoiceOver)
- [ ] Touch interactions
- [ ] Loading states
- [ ] Error states
- [ ] Empty states
- [ ] Form validation

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind CSS Accessibility](https://tailwindcss.com/docs/accessibility)
- [React Accessibility](https://react.dev/reference/react-dom/components#common-components)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
