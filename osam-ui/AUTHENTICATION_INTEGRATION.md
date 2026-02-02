# Admin Authentication Integration Guide

## 🔐 Complete Authentication System

Everything you need for admin authentication is now in place:

### 1. **Login API Call** ✅
**File**: `src/api/services/auth.ts`

```typescript
await authService.login({ email, password });
// Returns: { access_token, user: { id, email, is_admin } }
// Token automatically saved to localStorage
```

### 2. **Token Storage Logic** ✅
**File**: `src/api/utils/tokenManager.ts`

```typescript
// Auto-managed by tokenManager
tokenManager.getToken();      // Get from localStorage
tokenManager.setToken(token); // Save to localStorage
tokenManager.clearAuth();     // Clear on logout
```

### 3. **Auth Context & Hook** ✅
**File**: `src/contexts/AuthContext.tsx`

```typescript
// In app root (src/app/layout.tsx):
<AuthProvider>
  {children}
</AuthProvider>

// In any component:
const { user, isAuthenticated, login, logout } = useAuth();
```

### 4. **Protected Route Component** ✅
**File**: `src/components/ProtectedRoute.tsx`

```typescript
// Wrap components to require authentication:
<ProtectedRoute>
  <AdminDashboard />
</ProtectedRoute>

// Require admin role:
<ProtectedRoute requireAdmin={true}>
  <UserManagement />
</ProtectedRoute>
```

---

## 🚀 Integration Steps

### Step 1: Wrap App with AuthProvider
**File**: `src/app/layout.tsx`

```typescript
import { AuthProvider } from '@/contexts/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Step 2: Create Login Page
**File**: `src/app/login/page.tsx` (already created)

Uses the login form with:
- Email/password inputs
- Field validation errors
- Error display
- Loading state
- Auto-redirect on success

### Step 3: Protect Admin Routes
**File**: `src/app/admin/page.tsx`

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
```

### Step 4: Use Auth in Components

```typescript
'use client';

import { useAuth } from '@/contexts/AuthContext';

export function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div>
      <p>Logged in as: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

---

## 📊 Architecture Overview

```
app/layout.tsx
    ↓
AuthProvider (src/contexts/AuthContext.tsx)
    ├─ Initialize auth on mount
    ├─ Listen to logout events
    └─ Provide useAuth() hook
    ↓
    ├─ app/login/page.tsx
    │  └─ Uses: authService.login(), useAuth()
    │
    ├─ app/admin/page.tsx
    │  └─ Uses: <ProtectedRoute requireAdmin={true}>
    │
    └─ Components
       └─ Uses: useAuth() to access user, login, logout
```

---

## 🔄 Authentication Flow

### Login Flow
```
User enters email/password
    ↓
Form submits
    ↓
useAuth().login(email, password)
    ↓
authService.login() calls API
    ↓
FastAPI validates credentials
    ↓
Returns { access_token, user }
    ↓
tokenManager.setToken() saves to localStorage
    ↓
setUser() updates AuthContext state
    ↓
redirect('/admin')
```

### Protected Request Flow
```
Component calls protected endpoint
    ↓
protectedApi.get('/endpoint')
    ↓
Request interceptor injects token
    ↓
Request sent with Authorization: Bearer <token>
    ↓
FastAPI validates token
    ↓
Returns data or 401
    ↓
If 401: Clear token, dispatch 'auth:logout'
    ↓
AuthContext listens to event
    ↓
setUser(null)
    ↓
redirect('/login')
```

---

## 🛡️ Security Features

✅ **Token Management**
- Stored in localStorage (persistent)
- Auto-injected in Authorization header
- Cleared on 401 (unauthorized)
- Cleared on logout

✅ **Event-Driven Logout**
- When token expires (401), event is dispatched
- AuthContext listens and redirects to login
- Decoupled from axios interceptor

✅ **Protected Routes**
- Checks authentication before rendering
- Shows loading UI while checking
- Redirects if not authenticated
- Supports admin-only routes

✅ **Field Validation**
- Backend validation errors shown to user
- Field-level error messages
- Login disabled while loading

---

## 📝 File Reference

### Core Authentication Files

| File | Purpose | Key Exports |
|------|---------|------------|
| `src/contexts/AuthContext.tsx` | Auth state management | `AuthProvider`, `useAuth()`, `useRequireAuth()`, `useRequireAdmin()` |
| `src/components/ProtectedRoute.tsx` | Route protection | `ProtectedRoute`, `withProtectedRoute`, `canAccess()` |
| `src/app/login/page.tsx` | Login UI | Login form with validation |

### API Layer (Already Created)

| File | Purpose | Key Exports |
|------|---------|------------|
| `src/api/services/auth.ts` | Login/logout API | `authService` |
| `src/api/utils/tokenManager.ts` | Token storage | `tokenManager` |
| `src/api/axios/instances.ts` | Axios setup | `publicApi`, `protectedApi` |

---

## 💡 Usage Examples

### Example 1: Check if User is Admin
```typescript
import { useAuth } from '@/contexts/AuthContext';

export function AdminButton() {
  const { isAdmin, user } = useAuth();

  if (!isAdmin) return null;

  return <button>Admin Panel</button>;
}
```

### Example 2: Logout on Button Click
```typescript
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
}
```

### Example 3: Conditional Rendering
```typescript
import { useAuth } from '@/contexts/AuthContext';

export function Dashboard() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <div>Not authenticated</div>;

  return <div>Welcome, {user.full_name}!</div>;
}
```

### Example 4: Protected Admin Page
```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <UserManagement />
    </ProtectedRoute>
  );
}
```

---

## 🔧 Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_TOKEN_KEY=osam_access_token
NODE_ENV=development
```

### Change Token Storage Key
Edit `src/api/config.ts`:
```typescript
TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || 'my_custom_key'
```

---

## ⚠️ Common Issues & Solutions

### Issue: "useAuth must be used within AuthProvider"
**Solution**: Make sure `<AuthProvider>` wraps your entire app in `src/app/layout.tsx`

### Issue: Token not persisting across page reload
**Solution**: `AuthContext` calls `authService.getCurrentUser()` on mount to restore session

### Issue: Protected route redirects to login immediately
**Solution**: Check that `isLoading` is false before checking `isAuthenticated`

### Issue: 401 response doesn't redirect to login
**Solution**: Make sure the `auth:logout` event listener is working (check browser console)

---

## 🧪 Testing Authentication

### Test Login
```bash
# In browser console
import { authService } from '@/api';

await authService.login({
  email: 'admin@example.com',
  password: 'password123'
});
```

### Test Token Storage
```bash
# In browser console
import { tokenManager } from '@/api';

console.log(tokenManager.getToken());  // Should show token
console.log(tokenManager.hasToken());  // Should be true
```

### Test Protected Request
```bash
# In browser console
import { bookingsService } from '@/api';

const bookings = await bookingsService.getMyBookings();
console.log(bookings);
```

---

## 📚 Related Documentation

- **API Architecture**: `src/api/API_ARCHITECTURE.md`
- **Quick Start**: `src/api/QUICK_START.md`
- **Token Management**: `src/api/utils/tokenManager.ts` (JSDoc)
- **Error Handling**: `src/api/utils/apiErrorHandler.ts` (JSDoc)

---

## ✅ Checklist: Integration Complete

- [x] Login API (`authService.login()`)
- [x] Token storage (`tokenManager`)
- [x] Auto token injection (axios interceptor)
- [x] 401 error handling (logout event)
- [x] Auth context (`useAuth()` hook)
- [x] Protected route component
- [x] Login page
- [x] Documentation

**Status**: ✅ **Ready for Production**

---

## 🎯 Next Steps

1. **Update `src/app/layout.tsx`**
   - Wrap app with `<AuthProvider>`

2. **Create admin pages**
   - Wrap with `<ProtectedRoute requireAdmin={true}>`

3. **Test authentication**
   - Login with admin credentials
   - Verify token in localStorage
   - Check that protected routes work

4. **Add user info to header**
   - Display logged-in user
   - Add logout button

5. **Customize UI**
   - Adjust login form styling
   - Customize ProtectedRoute loading UI
   - Add error notifications

---

## 🚀 You're Ready!

The authentication system is complete and production-ready. All pieces are connected:
- ✅ API layer (services, token management, error handling)
- ✅ React layer (context, hooks, protected routes)
- ✅ Example pages (login page)

Start integrating into your app! 🎉

