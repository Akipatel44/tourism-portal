/**
 * Admin Authentication Integration Guide
 * 
 * Complete setup for FastAPI backend authentication
 * with React context-based state management
 */

/* =====================================================
   1. SETUP & CONFIGURATION
   ===================================================== */

// 1. Add AuthProvider to your main App.tsx
// ============================================

import { AuthProvider } from '@/contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Your routes here */}
      </Routes>
    </AuthProvider>
  );
}

// 2. Set up environment variables
// ============================================

// .env.local or .env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000


/* =====================================================
   2. USING AUTHENTICATION
   ===================================================== */

// A. Basic Login Page
// ============================================

import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      // Error is in context.error
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Login'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

// B. Logout
// ============================================

import { useLogout } from '@/contexts/AuthContext';

export function LogoutButton() {
  const { logout, isLoading } = useLogout();

  const handleLogout = async () => {
    await logout();
    // Optionally redirect
    window.location.href = '/login';
  };

  return (
    <button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
}

// C. Access Auth State
// ============================================

import { useAuth } from '@/contexts/AuthContext';

export function UserProfile() {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) return <p>Not logged in</p>;

  return (
    <div>
      <p>Welcome, {user?.full_name}</p>
      {isAdmin && <p>Admin user</p>}
    </div>
  );
}

// D. Custom Hooks
// ============================================

// Check if authenticated
import { useIsAuthenticated } from '@/contexts/AuthContext';
const isLoggedIn = useIsAuthenticated();

// Check if admin
import { useIsAdmin } from '@/contexts/AuthContext';
const isAdmin = useIsAdmin();

// Refresh user data after profile changes
import { useAuth } from '@/contexts/AuthContext';
const { refreshUser } = useAuth();
await refreshUser();


/* =====================================================
   3. PROTECTED ROUTES
   ===================================================== */

// A. Basic Protected Route
// ============================================

import ProtectedRoute from '@/components/ProtectedRoute';

<Routes>
  <Route element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} path="/dashboard" />
</Routes>

// B. Admin-Only Routes
// ============================================

<Routes>
  <Route 
    element={
      <ProtectedRoute requireAdmin>
        <AdminPanel />
      </ProtectedRoute>
    } 
    path="/admin" 
  />
</Routes>

// C. Unauthorized Page (optional)
// ============================================

// Create src/pages/UnauthorizedPage.tsx
export function UnauthorizedPage() {
  return (
    <div className="text-center py-12">
      <h1>Access Denied</h1>
      <p>You do not have permission to access this page.</p>
      <a href="/dashboard">Go to Dashboard</a>
    </div>
  );
}

// Add to your routes
<Route path="/unauthorized" element={<UnauthorizedPage />} />


/* =====================================================
   4. API CALLS WITH AUTH
   ===================================================== */

// Axios automatically attaches JWT token via interceptor
// No need to manually add Authorization header

import { apiClient } from '@/api/client';

// All requests automatically include: Authorization: Bearer {token}
const response = await apiClient.get('/users');
const users = response.data;

// Or use the auth service
import { authApi } from '@/api/auth';

const user = await authApi.getCurrentUser();
const isAdmin = await authApi.isAdmin();


/* =====================================================
   5. ERROR HANDLING
   ===================================================== */

// A. 401 Unauthorized (auto-handled)
// ============================================

// When 401 is received:
// 1. Token is cleared from localStorage
// 2. User state is reset
// 3. Redirect to /login happens automatically
// 4. Custom event 'auth:state:unauthorized' is dispatched

// B. Handle API Errors in Components
// ============================================

import { handleApiError } from '@/api/client';

try {
  const response = await apiClient.get('/users');
} catch (error) {
  const apiError = handleApiError(error);
  console.error(apiError.status, apiError.message);
  
  if (apiError.status === 403) {
    // Permission denied
  }
}

// C. Listen to Auth Events
// ============================================

import { listenToAuthStateChange } from '@/contexts/AuthContext';

useEffect(() => {
  const unsubscribe = listenToAuthStateChange('error', (data) => {
    console.log('Auth error:', data.message);
  });

  return unsubscribe;
}, []);


/* =====================================================
   6. BACKEND REQUIREMENTS (FastAPI)
   ===================================================== */

// Your FastAPI auth endpoints should return:

// POST /auth/login
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

// GET /auth/me
{
  "id": 1,
  "username": "admin",
  "email": "admin@example.com",
  "full_name": "Admin User",
  "is_admin": true,
  "is_active": true
}

// POST /auth/logout (optional)
{
  "message": "Successfully logged out"
}

// Error responses (401, 403, etc.)
{
  "detail": "Invalid credentials"
}


/* =====================================================
   7. ARCHITECTURE OVERVIEW
   ===================================================== */

/*
User Login Flow:
================

1. User enters credentials in LoginPage
2. useAuth().login(username, password) is called
3. authApi.login() sends POST to /auth/login
4. Axios client automatically sets Content-Type
5. Backend validates and returns JWT token
6. Token is stored in localStorage via tokenStorage
7. User info is stored in AuthContext
8. AuthContext broadcasts 'auth:state:login' event
9. Components subscribed to useAuth get updated
10. Page redirects to /dashboard

Subsequent Requests:
====================

1. Request interceptor checks for token
2. If token exists, adds Authorization header
3. Backend validates JWT and identifies user
4. Response is returned to component
5. If 401 received:
   - Token is cleared
   - User is logged out
   - Redirect to /login

Component Integration:
======================

const { user, isAuthenticated, isAdmin } = useAuth();

// Components re-render when auth state changes
// No prop drilling needed
// Global state management without Redux/Zustand

Protected Routes:
=================

<ProtectedRoute requireAdmin>
  <AdminPanel />
</ProtectedRoute>

// Checks:
// 1. Is loading? Show loader
// 2. Is authenticated? No → redirect to /login
// 3. Is admin? No → redirect to /unauthorized
// 4. All checks pass → render component
*/


/* =====================================================
   8. FILE STRUCTURE
   ===================================================== */

/*
src/
├── api/
│   ├── auth.ts              ← Auth API service
│   ├── client.ts            ← Axios instance with interceptors
│   ├── tokenStorage.ts      ← Token management
│   ├── protected.ts         ← Protected API client
│   └── index.ts
│
├── contexts/
│   └── AuthContext.tsx      ← Auth state & hooks
│
├── components/
│   ├── ProtectedRoute.tsx   ← Route guard component
│   ├── Header.tsx
│   └── ...
│
├── pages/
│   ├── LoginPage.tsx        ← Login page example
│   ├── DashboardPage.tsx
│   └── ...
│
└── App.tsx                  ← Wrap with AuthProvider
*/


/* =====================================================
   9. TROUBLESHOOTING
   ===================================================== */

// Problem: "useAuth must be used within AuthProvider"
// Solution: Wrap your app in <AuthProvider>

// Problem: Token not being sent to API
// Solution: Check that Axios client.ts interceptor is configured

// Problem: User redirects to login on every page refresh
// Solution: AuthContext initializes auth on mount - should load user if token exists

// Problem: Admin check not working
// Solution: Ensure user.is_admin is true in backend response

// Problem: CORS errors on login
// Solution: Check backend CORS headers allow POST /auth/login

// Problem: "Invalid token format"
// Solution: Ensure backend returns JWT in access_token field
