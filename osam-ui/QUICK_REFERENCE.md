# Quick Reference: Reusable UI Components

## 1️⃣ Loader Component

### Centered Spinner
```tsx
import { Loader } from '@/components/Loader';

<Loader 
  variant="spinner" 
  size="md" 
  message="Loading..." 
/>
```

### Skeleton Grid (for pages)
```tsx
<Loader 
  variant="skeleton" 
  count={6}  // Number of skeleton cards
/>
```

### Table Loading
```tsx
<Loader variant="pulse" />
```

### Full Screen Loading
```tsx
<Loader 
  variant="skeleton" 
  fullHeight 
  count={4} 
/>
```

---

## 2️⃣ EmptyState Component

### Basic Empty State
```tsx
import { EmptyState } from '@/components/EmptyState';

<EmptyState
  title="No places found"
  description="Try adjusting your search."
/>
```

### With Actions
```tsx
<EmptyState
  title="No places found"
  description="Try adjusting your search."
  actions={[
    { label: 'Reset', onClick: () => reset(), variant: 'primary' },
    { label: 'Back', onClick: () => goBack(), variant: 'secondary' },
  ]}
/>
```

### Specific Variants
```tsx
// Search results
<EmptyState variant="search" title="No results" />

// No data available
<EmptyState variant="no-data" title="No data" />

// Access denied
<EmptyState variant="no-permission" title="Access Denied" />

// Filter results
<EmptyState variant="no-results" title="No items" />
```

---

## 3️⃣ Error Message Component

### Inline Alert
```tsx
import { ErrorMessage, Toast } from '@/components/ErrorMessage';

<ErrorMessage
  variant="error"
  title="Error"
  message="Something went wrong"
  onDismiss={() => setError(null)}
/>
```

### Success Alert
```tsx
<ErrorMessage
  variant="success"
  title="Success"
  message="Place created successfully"
/>
```

### Warning Alert
```tsx
<ErrorMessage
  variant="warning"
  title="Warning"
  message="This action cannot be undone"
/>
```

### Info Alert
```tsx
<ErrorMessage
  variant="info"
  title="Information"
  message="This feature is new"
/>
```

### Toast Notification
```tsx
<Toast
  variant="success"
  title="Success"
  message="Saved successfully"
  autoDismiss={3000}  // milliseconds
/>
```

### Alert with Actions
```tsx
<ErrorMessage
  variant="error"
  title="Error"
  message="Failed to save"
  actions={[
    { label: 'Retry', onClick: () => retry() },
    { label: 'Help', onClick: () => showHelp() },
  ]}
/>
```

---

## 📋 Common Implementation Patterns

### Gallery/Grid Page with Loading
```tsx
import { Loader } from '@/components/Loader';
import { EmptyState } from '@/components/EmptyState';

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  return (
    <>
      {isLoading ? (
        <Loader variant="skeleton" count={6} />
      ) : items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map(item => <ItemCard key={item.id} item={item} />)}
        </div>
      ) : (
        <EmptyState title="No items" />
      )}
    </>
  );
}
```

### Admin Table with Error Handling
```tsx
import { ErrorMessage, Toast } from '@/components/ErrorMessage';
import { EmptyState } from '@/components/EmptyState';

export default function AdminPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [items, setItems] = useState([]);

  const handleDelete = async (id: string) => {
    try {
      await deleteItem(id);
      setSuccess('Item deleted');
      setItems(items.filter(i => i.id !== id));
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to delete');
    }
  };

  return (
    <>
      {success && <Toast variant="success" message={success} autoDismiss={3000} />}
      {error && <ErrorMessage variant="error" message={error} onDismiss={() => setError(null)} />}
      
      {items.length > 0 ? (
        <table>
          {/* table content */}
        </table>
      ) : (
        <EmptyState title="No items" />
      )}
    </>
  );
}
```

### Form with Validation
```tsx
import { ErrorMessage } from '@/components/ErrorMessage';

export default function FormPage() {
  const [formData, setFormData] = useState({ name: '' });
  const [errors, setErrors] = useState<Partial<typeof formData>>({});
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: typeof errors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Success
    setSuccess('Submitted successfully');
    setTimeout(() => setSuccess(null), 3000);
  };

  return (
    <>
      {success && <Toast variant="success" message={success} />}
      
      <form onSubmit={handleSubmit}>
        <input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" role="alert">{errors.name}</p>
        )}
      </form>
    </>
  );
}
```

---

## 🎨 Responsive Grid Sizes

```tsx
// 1 column mobile → 2 desktop
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">

// 1 mobile → 2 tablet → 3 desktop
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

// 1 mobile → 2 tablet → 3 desktop → 4 xl
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

// Responsive gaps
<div className="gap-2 sm:gap-3 lg:gap-4">

// Responsive text
<h1 className="text-2xl sm:text-3xl md:text-4xl">
<p className="text-xs sm:text-sm md:text-base">
<button className="px-2 sm:px-3 md:px-4 py-1 sm:py-2">
```

---

## ♿ Accessibility Essentials

### Form with Proper Labels
```tsx
<label htmlFor="field-id" className="block text-sm font-medium mb-1">
  Field Label *
</label>
<input
  id="field-id"
  aria-invalid={!!error}
  aria-describedby={error ? 'field-error' : undefined}
/>
{error && (
  <p id="field-error" role="alert" className="text-red-600 text-sm">
    {error}
  </p>
)}
```

### Button Labels
```tsx
// Always use aria-label for icon buttons
<button aria-label="Close dialog">✕</button>
<button aria-label={`Edit ${item.name}`}>Edit</button>
```

### Semantic HTML
```tsx
// ❌ Don't use divs for buttons
<div onClick={handleClick}>Delete</div>

// ✅ Use semantic elements
<button onClick={handleClick}>Delete</button>
```

### Dialog
```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-label="Create place form"
>
  {/* content */}
</div>
```

---

## 📐 Common Responsive Patterns

### Table with Hidden Columns
```tsx
<table>
  <tr>
    <th className="px-3 sm:px-6">Name</th>
    <th className="hidden sm:table-cell px-6">Category</th>
    <th className="hidden md:table-cell px-6">Date</th>
    <th className="hidden lg:table-cell px-6">Stats</th>
  </tr>
</table>
```

### Flexible Form Buttons
```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <button className="flex-1">Save</button>
  <button className="flex-1">Cancel</button>
</div>
```

### Responsive Modal
```tsx
<div className="fixed inset-0 p-4 flex items-center justify-center">
  <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg">
    {/* content */}
  </div>
</div>
```

### Responsive Hero
```tsx
<section className="h-56 sm:h-64 md:h-96 lg:h-screen flex items-center justify-center">
  <div className="text-center px-4">
    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">Title</h1>
    <p className="text-sm sm:text-base md:text-lg mt-4">Description</p>
  </div>
</section>
```

---

## 🧪 Testing Accessibility

```bash
# Keyboard navigation checklist
- Tab through all interactive elements
- Enter/Space activates buttons
- Escape closes modals
- Arrow keys work in carousels

# Screen reader checklist
- All buttons have labels
- Form fields have labels
- Errors announced with role="alert"
- Images have alt text
- Navigation landmarks present

# Visual checklist
- Color not sole indicator
- Text contrast >= 4.5:1
- Touch targets >= 44px
- Responsive at 320px width
```

---

## 💾 Copy-Paste Snippets

### Loading Grid Page
```tsx
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  const timer = setTimeout(() => setIsLoading(false), 500);
  return () => clearTimeout(timer);
}, []);

return isLoading ? <Loader variant="skeleton" count={6} /> : <div>{/* content */}</div>;
```

### Error/Success Toast
```tsx
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState<string | null>(null);

const handleAction = async () => {
  try {
    await someAction();
    setSuccess('Action successful');
    setTimeout(() => setSuccess(null), 3000);
  } catch (err) {
    setError('Action failed');
  }
};

return (
  <>
    {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
    {success && <Toast variant="success" message={success} autoDismiss={3000} />}
  </>
);
```

### Filter with EmptyState
```tsx
const filtered = items.filter(i => i.name.includes(search));

return filtered.length > 0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    {filtered.map(item => <Card key={item.id} item={item} />)}
  </div>
) : (
  <EmptyState
    variant="no-results"
    title="No results found"
    actions={[{ label: 'Clear filters', onClick: () => setSearch('') }]}
  />
);
```
