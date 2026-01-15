# Auth Integration - Quick Reference

## Setup

### 1. Wrap App in AuthProvider
```tsx
// src/App.tsx
import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      {/* Routes here */}
    </AuthProvider>
  );
}
```

### 2. Environment Variables
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
```

---

## Hooks (Most Common)

### useAuth()
```tsx
const { user, isAuthenticated, isAdmin, isLoading, error, login, logout } = useAuth();
```

### useIsAuthenticated()
```tsx
const isLoggedIn = useIsAuthenticated();
if (!isLoggedIn) return <p>Please login</p>;
```

### useIsAdmin()
```tsx
const isAdmin = useIsAdmin();
if (!isAdmin) return <p>Admin only</p>;
```

### useLogin()
```tsx
const { login, isLoading, error } = useLogin();
await login(username, password);
```

### useLogout()
```tsx
const { logout, isLoading } = useLogout();
await logout();
```

---

## Components

### ProtectedRoute
```tsx
// Protected route
<Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} path="/dashboard" />

// Admin-only route
<Route element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} path="/admin" />
```

### Conditional Rendering
```tsx
import { IfAuthenticated, IfAdmin, AdminBadge } from '@/contexts/authUtils';

<IfAuthenticated>
  <p>Only shown if logged in</p>
</IfAuthenticated>

<IfAdmin>
  <p>Only shown if admin</p>
</IfAdmin>

<AdminBadge /> // Shows admin badge
```

---

## API Methods

### authApi.login(credentials)
```tsx
const { token, user } = await authApi.login({
  username: 'admin',
  password: 'password123'
});
```

### authApi.getCurrentUser()
```tsx
const user = await authApi.getCurrentUser();
```

### authApi.isAdmin()
```tsx
const isAdmin = await authApi.isAdmin();
```

### authApi.logout()
```tsx
await authApi.logout(); // Clears token and calls logout endpoint
```

### authApi.updateProfile(data)
```tsx
const result = await authApi.updateProfile({
  full_name: 'John Doe',
  email: 'john@example.com'
});
```

### authApi.changePassword(current, new)
```tsx
await authApi.changePassword('oldpass', 'newpass');
```

---

## Common Patterns

### Login Form
```tsx
const { login, isLoading, error } = useAuth();
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login(username, password);
    navigate('/dashboard');
  } catch (err) {
    // Error is in context.error
  }
};

return (
  <form onSubmit={handleSubmit}>
    <input value={username} onChange={e => setUsername(e.target.value)} />
    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
    <button disabled={isLoading}>{isLoading ? 'Signing in...' : 'Login'}</button>
    {error && <p>{error}</p>}
  </form>
);
```

### Logout Button
```tsx
const { logout, isLoading } = useLogout();

return (
  <button onClick={logout} disabled={isLoading}>
    {isLoading ? 'Logging out...' : 'Logout'}
  </button>
);
```

### User Info Display
```tsx
const { user, isAuthenticated } = useAuth();

if (!isAuthenticated) return <p>Not logged in</p>;

return (
  <div>
    <p>Hello, {user?.full_name}</p>
    {user?.is_admin && <span>Admin</span>}
  </div>
);
```

### Conditional Routes
```tsx
<Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/" element={<HomePage />} />
  
  <Route 
    path="/dashboard" 
    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
  />
  
  <Route 
    path="/admin" 
    element={<ProtectedRoute requireAdmin><AdminPanel /></ProtectedRoute>} 
  />
</Routes>
```

---

## Error Handling

### In Auth Context
```tsx
const { error, clearError } = useAuth();

// Error is automatically set on login failure
// Manual clear with:
clearError();
```

### From API Calls
```tsx
import { handleApiError } from '@/api/client';

try {
  const response = await apiClient.get('/protected-endpoint');
} catch (error) {
  const apiError = handleApiError(error);
  console.error(apiError.status, apiError.message);
}
```

### Auto 401 Handling
```
✓ Backend returns 401
✓ Response interceptor catches
✓ Token cleared from storage
✓ User set to null in context
✓ auth:state:unauthorized event fired
✓ Component can listen to event if needed
```

---

## File Structure

```
src/
├── api/
│   ├── auth.ts           ← Auth API service
│   ├── client.ts         ← Axios with interceptors
│   └── tokenStorage.ts   ← Token management
│
├── contexts/
│   ├── AuthContext.tsx   ← Auth state & hooks
│   └── authUtils.tsx     ← Helper components & hooks
│
├── components/
│   └── ProtectedRoute.tsx
│
├── pages/
│   └── LoginPage.tsx
│
└── App.tsx               ← Wrapped with AuthProvider
```

---

## Type Definitions

```tsx
// User type
interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_admin: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

// Login request
interface LoginRequest {
  username: string;
  password: string;
}

// API error
interface ApiError {
  status: number;
  message: string;
  code?: string;
  details?: Record<string, any>;
  originalError?: AxiosError;
}
```

---

## Debugging

### Check Auth State
```tsx
const auth = useAuth();
console.log('User:', auth.user);
console.log('Is authenticated:', auth.isAuthenticated);
console.log('Is admin:', auth.isAdmin);
console.log('Is loading:', auth.isLoading);
console.log('Error:', auth.error);
```

### Check Token
```tsx
import { tokenStorage } from '@/api/tokenStorage';

const token = tokenStorage.getAccessToken();
console.log('Token:', token);

// Check if token exists
if (tokenStorage.hasAccessToken()) {
  console.log('Token is stored');
}
```

### Listen to Auth Events
```tsx
useEffect(() => {
  const unsub = listenToAuthStateChange('login', (data) => {
    console.log('User logged in:', data);
  });
  
  return unsub;
}, []);
```

### Verify Backend Response
```
POST /auth/login should return:
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "username": "admin",
    "email": "admin@example.com",
    "full_name": "Admin User",
    "is_admin": true,
    "is_active": true
  }
}
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| useAuth throws error | Ensure component is wrapped with `<AuthProvider>` |
| Token not sent to API | Check `client.ts` request interceptor is configured |
| Auto logout not working | Verify backend returns 401 status code |
| Admin check not working | Ensure `user.is_admin` is true in backend response |
| CORS errors | Check backend CORS headers allow requests |
| "Invalid token format" | Ensure token is in `access_token` field, not nested |
| Redirect loops | Check `/login` route exists and is public |

---

## Next Steps

1. **Add Toast Notifications**: Use `react-toastify` for errors
2. **Implement Refresh Token**: For longer sessions
3. **Add User Settings**: Profile page using `authApi.updateProfile()`
4. **Add Password Reset**: Using `authApi.requestPasswordReset()`
5. **Add Role-Based Routes**: Extend `useCanAccess()` hook
6. **Add Session Timeout**: Auto-logout after inactivity

---

## Resources

- See `AUTHENTICATION_INTEGRATION_GUIDE.md` for detailed setup
- See `AUTH_INTEGRATION_SUMMARY.md` for architecture overview
- Example: `src/pages/LoginPage.tsx`
