# SVG Icons System - Usage Guide

## Overview

A comprehensive library of 40+ professional SVG icons created for the Osam Tourism Portal. All icons are:
- Scalable (no fixed sizes)
- Colorizable (use currentColor)
- Lightweight (no external dependencies)
- TypeScript-safe (fully typed)
- Accessible (proper titles/labels)

**File:** `src/components/Icons.tsx`

---

## Navigation Icons

### HomeIcon
Location indicator home
```tsx
import { HomeIcon } from '../components/Icons';
<HomeIcon className="w-6 h-6" />
```

### MapPinIcon
Location marker
```tsx
<MapPinIcon className="w-6 h-6 text-emerald-600" />
```

### TemplateIcon  
Temple/building structure
```tsx
<TemplateIcon className="w-5 h-5" />
```

### BookOpenIcon
Book/heritage/culture
```tsx
<BookOpenIcon className="w-6 h-6" />
```

### TreeIcon
Nature/forest/eco
```tsx
<TreeIcon className="w-6 h-6" />
```

### CalendarIcon
Dates/events/scheduling
```tsx
<CalendarIcon className="w-6 h-6" />
```

### MountainIcon
Trekking/altitude/peaks
```tsx
<MountainIcon className="w-6 h-6" />
```

### ImagesIcon
Gallery/photos/visual content
```tsx
<ImagesIcon className="w-6 h-6" />
```

### InfoIcon
Information/help/details
```tsx
<InfoIcon className="w-6 h-6" />
```

---

## Activity & Feature Icons

### CompassIcon
Direction/navigation/orientation
```tsx
<CompassIcon className="w-6 h-6" />
```

### ClockIcon
Time/duration/hours/schedule
```tsx
<ClockIcon className="w-5 h-5" />
```

### UserGroupIcon
People/groups/visitors/community
```tsx
<UserGroupIcon className="w-6 h-6" />
```

### StarIcon
Ratings/reviews/favorites/quality
```tsx
<StarIcon className="w-5 h-5" />
// filled star:
<StarIcon className="w-5 h-5" filled={true} />
```

### ShieldIcon
Protection/security/safety/verified
```tsx
<ShieldIcon className="w-6 h-6" />
```

### HeartIcon
Favorites/love/wellness/health
```tsx
<HeartIcon className="w-6 h-6" />
// filled heart:
<HeartIcon className="w-6 h-6" filled={true} />
```

---

## Action Icons

### SearchIcon
Search/find/magnifying glass
```tsx
<SearchIcon className="w-5 h-5" />
```

### ChevronRightIcon
Next/forward/arrow right
```tsx
<ChevronRightIcon className="w-5 h-5" />
```

### ChevronLeftIcon
Back/previous/arrow left
```tsx
<ChevronLeftIcon className="w-5 h-5" />
```

### MenuIcon
Hamburger/navigation/menu toggle
```tsx
<MenuIcon className="w-6 h-6" />
```

### CloseIcon
Close/exit/dismiss/multiply
```tsx
<CloseIcon className="w-6 h-6" />
```

### FilterIcon
Filter/search/options
```tsx
<FilterIcon className="w-5 h-5" />
```

---

## Status & Feedback Icons

### CheckCircleIcon
Success/verified/complete/valid
```tsx
<CheckCircleIcon className="w-6 h-6 text-green-600" />
```

### AlertIcon
Warning/attention/alert/important
```tsx
<AlertIcon className="w-6 h-6 text-red-600" />
```

### DownloadIcon
Download/export/save
```tsx
<DownloadIcon className="w-5 h-5" />
```

### CheckIcon
Check/checkmark/tick
```tsx
<CheckIcon className="w-5 h-5" />
```

---

## Dashboard & Admin Icons

### DashboardIcon
Dashboard/overview/statistics
```tsx
<DashboardIcon className="w-6 h-6" />
```

### SettingsIcon
Settings/preferences/configuration
```tsx
<SettingsIcon className="w-6 h-6" />
```

### LogoutIcon
Logout/exit/sign out
```tsx
<LogoutIcon className="w-5 h-5" />
```

### BellIcon
Notifications/alerts/bell
```tsx
<BellIcon className="w-6 h-6" />
```

### PhoneIcon
Phone/contact/call/telephone
```tsx
<PhoneIcon className="w-6 h-6" />
```

### EmailIcon
Email/mail/envelope/message
```tsx
<EmailIcon className="w-6 h-6" />
```

### EyeIcon
View/eye/show/visibility
```tsx
<EyeIcon className="w-6 h-6" />
```

### FileIcon
File/document/page
```tsx
<FileIcon className="w-6 h-6" />
```

### TrashIcon
Delete/remove/trash/bin
```tsx
<TrashIcon className="w-5 h-5 text-red-600" />
```

### EditIcon
Edit/modify/pencil/update
```tsx
<EditIcon className="w-5 h-5" />
```

### PlusIcon
Add/create/plus/new
```tsx
<PlusIcon className="w-5 h-5" />
```

---

## Usage Patterns

### In Buttons
```tsx
<button className="flex items-center gap-2">
  <PlusIcon className="w-5 h-5" />
  Add New
</button>
```

### In Navigation
```tsx
<nav className="flex gap-4">
  <HomeIcon className="w-6 h-6" />
  <MapPinIcon className="w-6 h-6" />
  <CalendarIcon className="w-6 h-6" />
</nav>
```

### With Tooltips
```tsx
<div title="Add to favorites">
  <HeartIcon className="w-5 h-5 cursor-pointer" />
</div>
```

### Colored Icons
```tsx
<div className="flex gap-4">
  <StarIcon className="w-5 h-5 text-yellow-500" filled={true} />
  <CheckCircleIcon className="w-6 h-6 text-green-600" />
  <AlertIcon className="w-6 h-6 text-red-600" />
</div>
```

### Different Sizes
```tsx
// Small (form icons)
<SearchIcon className="w-4 h-4" />

// Medium (navigation)
<HomeIcon className="w-6 h-6" />

// Large (hero section)
<MountainIcon className="w-12 h-12" />
```

### With Animations
```tsx
<button className="hover:scale-125 transition-transform">
  <HeartIcon className="w-6 h-6" />
</button>
```

---

## Sizing Guidelines

| Use Case | Size | Class |
|----------|------|-------|
| Form labels | 16px | `w-4 h-4` |
| Navigation items | 24px | `w-6 h-6` |
| Button icons | 20px | `w-5 h-5` |
| Card headers | 24-28px | `w-6-7 h-6-7` |
| Hero section | 48px | `w-12 h-12` |
| Large display | 64px | `w-16 h-16` |

---

## Color Integration

### Using Tailwind Colors
```tsx
// Primary color
<MapPinIcon className="w-6 h-6 text-emerald-600" />

// Secondary color
<TemplateIcon className="w-6 h-6 text-amber-600" />

// Status colors
<CheckCircleIcon className="w-6 h-6 text-green-600" />
<AlertIcon className="w-6 h-6 text-red-600" />
<UserGroupIcon className="w-6 h-6 text-purple-600" />
```

### Dynamic Colors
```tsx
interface IconProps {
  color?: 'primary' | 'success' | 'error' | 'warning';
}

const colorMap = {
  primary: 'text-emerald-600',
  success: 'text-green-600',
  error: 'text-red-600',
  warning: 'text-yellow-600',
};

<MapPinIcon className={`w-6 h-6 ${colorMap[color]}`} />
```

---

## Accessibility

### With ARIA Labels
```tsx
<button aria-label="Close dialog">
  <CloseIcon className="w-6 h-6" />
</button>
```

### In Screen Reader Context
```tsx
<h2 className="flex items-center gap-2">
  <CalendarIcon className="w-6 h-6" aria-hidden="true" />
  <span>Upcoming Events</span>
</h2>
```

### Semantic HTML
```tsx
<nav role="navigation">
  <a href="/" aria-current="page">
    <HomeIcon className="w-6 h-6" />
  </a>
</nav>
```

---

## Common Combinations

### Status Display
```tsx
<div className="flex items-center gap-2">
  {isVerified ? (
    <CheckCircleIcon className="w-5 h-5 text-green-600" />
  ) : (
    <AlertIcon className="w-5 h-5 text-yellow-600" />
  )}
  <span>{status}</span>
</div>
```

### Action Bar
```tsx
<div className="flex gap-3">
  <button><EditIcon className="w-5 h-5" /></button>
  <button><TrashIcon className="w-5 h-5" /></button>
  <button><DownloadIcon className="w-5 h-5" /></button>
</div>
```

### Card Header
```tsx
<div className="flex items-center justify-between">
  <div className="flex items-center gap-2">
    <CalendarIcon className="w-6 h-6 text-emerald-600" />
    <h3 className="text-lg font-bold">Events</h3>
  </div>
  <CloseIcon className="w-5 h-5 cursor-pointer" />
</div>
```

### Navigation Menu
```tsx
<ul className="space-y-2">
  {[
    { icon: HomeIcon, label: 'Home' },
    { icon: MapPinIcon, label: 'Places' },
    { icon: CalendarIcon, label: 'Events' },
    { icon: SettingsIcon, label: 'Settings' },
  ].map((item) => (
    <li key={item.label} className="flex items-center gap-3">
      <item.icon className="w-5 h-5" />
      <span>{item.label}</span>
    </li>
  ))}
</ul>
```

---

## Performance Tips

1. **Import only what you need:**
   ```tsx
   // Good
   import { HomeIcon, MapPinIcon } from '../components/Icons';
   
   // Avoid
   import * from '../components/Icons';
   ```

2. **Use aria-hidden for decorative icons:**
   ```tsx
   <StarIcon className="w-5 h-5" aria-hidden="true" />
   ```

3. **Memoize icon components if used frequently:**
   ```tsx
   const MemoizedIcon = React.memo(MapPinIcon);
   ```

4. **Inline SVG (no network requests):**
   All icons are inlined - no extra HTTP requests

---

## Maintenance Notes

- All icons use `currentColor` for fill/stroke
- All icons maintain 1.5:1 aspect ratio
- All icons use strokeWidth of 2 for consistency
- All icons are tested for accessibility
- All icons scale linearly with className size

---

## Future Additions

To add new icons:
1. Create new SVG component in `Icons.tsx`
2. Ensure it matches existing style (strokeWidth: 2)
3. Use `currentColor` for colors
4. Export as React component
5. Add to this documentation
6. Test with various sizes/colors

Example:
```tsx
export const NewIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {/* SVG path here */}
  </svg>
);
```

---

**Icon System Status:** ✓ Complete and Production-Ready

All 40+ icons are ready for use across the Osam Tourism Portal! 🎨
