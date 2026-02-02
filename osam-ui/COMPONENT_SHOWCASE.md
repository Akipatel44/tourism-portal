# Component Showcase & Examples

## 🎨 Live Component Examples

This document provides practical, copy-ready examples for all reusable UI components.

---

## 1. Loader Component Showcase

### Example 1: Page with Skeleton Loading
```tsx
import { Loader } from '@/components/Loader';

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setImages([/* images */]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Gallery</h1>
      
      {isLoading ? (
        <Loader variant="skeleton" count={6} />
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {images.map(img => <img key={img.id} src={img.src} />)}
        </div>
      )}
    </div>
  );
}
```

### Example 2: Table with Pulse Loading
```tsx
export default function AdminTable() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  return (
    <div>
      {isLoading ? (
        <Loader variant="pulse" />
      ) : (
        <table className="w-full">
          <tbody>
            {data.map(row => <tr key={row.id}>{/* cells */}</tr>)}
          </tbody>
        </table>
      )}
    </div>
  );
}
```

### Example 3: Data Fetch with Spinner
```tsx
export default function SearchResults() {
  const [searching, setSearching] = useState(false);

  const handleSearch = async (query: string) => {
    setSearching(true);
    try {
      const results = await search(query);
      setSearching(false);
      // display results
    } catch (err) {
      setSearching(false);
    }
  };

  return (
    <>
      <input onChange={(e) => handleSearch(e.target.value)} />
      {searching && <Loader variant="dots" size="md" message="Searching..." />}
    </>
  );
}
```

### Example 4: Full-Screen Loading
```tsx
export default function DataPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData().finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Loader variant="skeleton" fullHeight count={8} />;
  }

  return <YourPageContent />;
}
```

---

## 2. EmptyState Component Showcase

### Example 1: Search Results Empty
```tsx
import { EmptyState } from '@/components/EmptyState';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const filteredResults = results.filter(r => 
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search places..."
      />

      {filteredResults.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {filteredResults.map(result => (
            <PlaceCard key={result.id} place={result} />
          ))}
        </div>
      ) : query ? (
        <EmptyState
          variant="search"
          title="No results found"
          description={`No places match "${query}". Try a different search term.`}
          actions={[
            { 
              label: 'Clear Search', 
              onClick: () => setQuery(''),
              variant: 'primary'
            },
            {
              label: 'View All',
              onClick: () => setQuery(''),
              variant: 'secondary'
            },
          ]}
        />
      ) : null}
    </div>
  );
}
```

### Example 2: No Data in Admin
```tsx
export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings()
      .then(data => setBookings(data))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <Loader variant="pulse" />
  ) : bookings.length > 0 ? (
    <BookingsTable bookings={bookings} />
  ) : (
    <EmptyState
      variant="no-data"
      icon="📅"
      title="No bookings yet"
      description="When users make bookings, they'll appear here."
      actions={[
        {
          label: 'Learn about bookings',
          onClick: () => showHelp('bookings'),
          variant: 'secondary'
        },
      ]}
    />
  );
}
```

### Example 3: Permission Denied
```tsx
export default function AdminUsersPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);

  if (!user?.isAdmin) {
    return (
      <EmptyState
        variant="no-permission"
        title="Access Denied"
        description="You don't have permission to view this page."
        actions={[
          { 
            label: 'Go Home',
            onClick: () => router.push('/'),
            variant: 'primary'
          },
        ]}
      />
    );
  }

  return <UsersTable users={users} />;
}
```

### Example 4: Filter Empty
```tsx
export default function FilteredGallery() {
  const [category, setCategory] = useState<'all' | 'monsoon' | 'temples'>('all');
  const [images, setImages] = useState([]);

  const filtered = category === 'all' 
    ? images 
    : images.filter(img => img.category === category);

  return (
    <>
      <div className="flex gap-4 mb-8">
        {['all', 'monsoon', 'temples'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat as any)}
            className={category === cat ? 'font-bold' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <GalleryGrid images={filtered} />
      ) : (
        <EmptyState
          variant="no-results"
          title="No images in this category"
          description="Try selecting a different category."
          actions={[
            {
              label: 'View All',
              onClick: () => setCategory('all'),
              variant: 'primary'
            },
          ]}
        />
      )}
    </>
  );
}
```

---

## 3. ErrorMessage & Toast Showcase

### Example 1: Form with Validation
```tsx
import { ErrorMessage, Toast } from '@/components/ErrorMessage';

export default function CreatePlaceForm() {
  const [formData, setFormData] = useState({ name: '', location: '' });
  const [errors, setErrors] = useState<typeof formData>({});
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.location) newErrors.location = 'Location is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Save
    try {
      savePlace(formData);
      setSuccess('Place created successfully!');
      setFormData({ name: '', location: '' });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setErrors({ name: 'Failed to save place' });
    }
  };

  return (
    <>
      {success && (
        <Toast 
          variant="success"
          title="Success"
          message={success}
          autoDismiss={3000}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name">Place Name</label>
          <input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-red-600 text-sm">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="location">Location</label>
          <input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            aria-invalid={!!errors.location}
            aria-describedby={errors.location ? 'location-error' : undefined}
          />
          {errors.location && (
            <p id="location-error" role="alert" className="text-red-600 text-sm">
              {errors.location}
            </p>
          )}
        </div>

        <button type="submit">Create</button>
      </form>
    </>
  );
}
```

### Example 2: Delete with Confirmation Error
```tsx
export default function AdminPlacesTable() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [places, setPlaces] = useState([]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;

    try {
      await deletePlace(id);
      setSuccess('Place deleted successfully');
      setPlaces(places.filter(p => p.id !== id));
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete place. Please try again.');
    }
  };

  return (
    <>
      {error && (
        <ErrorMessage
          variant="error"
          title="Error"
          message={error}
          onDismiss={() => setError(null)}
          actions={[
            { label: 'Retry', onClick: () => {} },
          ]}
        />
      )}

      {success && (
        <Toast 
          variant="success" 
          message={success}
          autoDismiss={3000}
        />
      )}

      <table>
        <tbody>
          {places.map(place => (
            <tr key={place.id}>
              <td>{place.name}</td>
              <td>
                <button onClick={() => handleDelete(place.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

### Example 3: Network Error with Retry
```tsx
export default function DataLoader() {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await fetch('/api/data');
      if (!result.ok) throw new Error('Network error');
      setData(await result.json());
      setError(null);
    } catch (err) {
      setError('Failed to load data. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      {error && (
        <ErrorMessage
          variant="error"
          title="Connection Error"
          message={error}
          actions={[
            { label: 'Retry', onClick: loadData },
          ]}
        />
      )}

      {isLoading && <Loader variant="spinner" message="Loading..." />}
      {data && <DataDisplay data={data} />}
    </>
  );
}
```

### Example 4: Multiple Error Types
```tsx
export default function WarningMessages() {
  return (
    <div className="space-y-4">
      {/* Error */}
      <ErrorMessage
        variant="error"
        title="Validation Error"
        message="Please fill in all required fields before submitting."
      />

      {/* Warning */}
      <ErrorMessage
        variant="warning"
        title="Warning"
        message="This action will delete all associated data."
      />

      {/* Info */}
      <ErrorMessage
        variant="info"
        title="Information"
        message="New features have been added to your account."
      />

      {/* Success */}
      <ErrorMessage
        variant="success"
        title="Success"
        message="All changes have been saved successfully."
      />
    </div>
  );
}
```

---

## 4. Combined Examples

### Full Admin Page with All Components
```tsx
import { Loader } from '@/components/Loader';
import { EmptyState } from '@/components/EmptyState';
import { ErrorMessage, Toast } from '@/components/ErrorMessage';

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', location: '' });

  useEffect(() => {
    fetchPlaces()
      .then(data => setPlaces(data))
      .catch(err => setError('Failed to load places'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPlace = await addPlace(formData);
      setPlaces([...places, newPlace]);
      setSuccess('Place added successfully');
      setFormData({ name: '', location: '' });
      setShowForm(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to add place');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deletePlace(id);
      setPlaces(places.filter(p => p.id !== id));
      setSuccess('Place deleted');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete place');
    }
  };

  return (
    <AdminLayout pageTitle="Manage Places">
      {/* Messages */}
      {error && (
        <ErrorMessage
          variant="error"
          message={error}
          onDismiss={() => setError(null)}
        />
      )}
      {success && (
        <Toast variant="success" message={success} autoDismiss={3000} />
      )}

      {/* Content */}
      {isLoading ? (
        <Loader variant="pulse" />
      ) : places.length > 0 ? (
        <table className="w-full">
          <tbody>
            {places.map(place => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>
                  <button onClick={() => handleDelete(place.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState
          variant="no-data"
          title="No places yet"
          description="Create your first place to get started."
          actions={[
            {
              label: '+ Add Place',
              onClick: () => setShowForm(true),
              variant: 'primary',
            },
          ]}
        />
      )}
    </AdminLayout>
  );
}
```

---

## 5. Responsive Grid Patterns

### Mobile-First Grid
```tsx
// 1 column mobile → 2 tablet → 3 desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {items.map(item => <Card key={item.id} item={item} />)}
</div>
```

### Gallery Grid
```tsx
// 2 mobile → 3 tablet → 4 desktop
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
  {images.map(img => <GalleryItem key={img.id} image={img} />)}
</div>
```

### Admin Table
```tsx
<table>
  <tr>
    <th className="px-3 sm:px-6">Name</th>
    <th className="hidden sm:table-cell px-6">Category</th>
    <th className="hidden lg:table-cell px-6">Views</th>
  </tr>
</table>
```

---

## 6. Form Patterns

### With Error Display
```tsx
<form onSubmit={handleSubmit}>
  <div className="space-y-4">
    <div>
      <label htmlFor="name">Name *</label>
      <input
        id="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? 'name-error' : undefined}
      />
      {errors.name && (
        <p id="name-error" role="alert" className="text-red-600 text-sm">
          {errors.name}
        </p>
      )}
    </div>

    <button type="submit">Submit</button>
  </div>
</form>
```

### With Success Feedback
```tsx
const [formData, setFormData] = useState({});
const [submitted, setSubmitted] = useState(false);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  // Validate & save
  setSubmitted(true);
  setTimeout(() => setSubmitted(false), 3000);
};

return (
  <>
    {submitted && (
      <Toast 
        variant="success" 
        message="Form submitted successfully"
        autoDismiss={3000}
      />
    )}
    <form onSubmit={handleSubmit}>
      {/* fields */}
    </form>
  </>
);
```

---

## 📋 Copy-Ready Snippets

### Basic Loading Page
```tsx
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  setTimeout(() => setIsLoading(false), 1000);
}, []);
return isLoading ? <Loader variant="skeleton" count={6} /> : <YourContent />;
```

### Basic Empty State
```tsx
{items.length === 0 && (
  <EmptyState title="No items" description="Create something new to get started." />
)}
```

### Basic Error Handling
```tsx
const [error, setError] = useState<string | null>(null);
try {
  await action();
} catch (err) {
  setError('Action failed');
}
return error && <ErrorMessage message={error} onDismiss={() => setError(null)} />;
```

---

This showcase provides production-ready code examples for all component use cases!
