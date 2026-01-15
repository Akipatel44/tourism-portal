# Authentication Flow Diagrams

## 1. Login Flow

```
┌─────────────┐
│  User       │
│  Enters     │
│  Creds      │
└──────┬──────┘
       │
       ▼
┌──────────────────────┐
│  LoginPage Component │
│  useAuth().login()   │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│  authApi.login()             │
│  POST /auth/login (form)     │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  FastAPI Backend             │
│  Validate credentials        │
│  Generate JWT token          │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Response with:              │
│  - access_token              │
│  - user object               │
│  - token_type: "bearer"      │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  tokenStorage.setAccessToken │
│  Store in localStorage       │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  AuthContext.setUser()       │
│  Update global state         │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  dispatchAuthStateChange()   │
│  Send 'login' event          │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Components re-render        │
│  useAuth() receives new data │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Navigate to /dashboard      │
│  Login complete ✓            │
└──────────────────────────────┘
```

---

## 2. Protected Request Flow

```
┌─────────────────────────────┐
│  Component calls:           │
│  apiClient.get('/users')    │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Request Interceptor runs   │
│  - Get token from storage   │
│  - Check if token exists    │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Token found?               │
│  YES → Add to header        │
└──────┬──────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│  Request with:                   │
│  Authorization: Bearer {token}   │
│  Content-Type: application/json  │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  FastAPI Backend             │
│  Verify JWT signature        │
│  Check token expiration      │
│  Identify user (user_id)     │
└──────┬───────────────────────┘
       │
       ├─ Token valid?
       │
       ├─ YES → Process request
       │         Return 200 + data
       │
       └─ NO → Return 401 Unauthorized
              Invalid/expired token
```

---

## 3. 401 Unauthorized Handling

```
┌──────────────────────────┐
│  Response interceptor    │
│  receives 401 status     │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│  Check status === 401?   │
└──────┬───────────────────┘
       │
       ▼ YES
┌──────────────────────────────┐
│  tokenStorage.clearAccessToken
│  Remove from localStorage    │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  dispatchEvent('auth:      │
│    unauthorized')            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  AuthContext listens         │
│  Sets user = null            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  All useAuth() hooks receive │
│  isAuthenticated = false     │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  window.location.href =      │
│  '/login'                    │
└──────────────────────────────┘

Result: User automatically logged out ✓
```

---

## 4. Route Protection Flow

```
┌─────────────────────────┐
│  User navigates to      │
│  /admin                 │
└──────┬──────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  ProtectedRoute component    │
│  renders with requireAdmin   │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Check: isLoading?           │
└──────┬───────────────────────┘
       │
       ├─ YES → Show <Loader />
       │
       └─ NO → Continue
              │
              ▼
          ┌──────────────────────────┐
          │  Check: isAuthenticated? │
          └──────┬───────────────────┘
                 │
                 ├─ NO → <Navigate to /login />
                 │
                 └─ YES → Continue
                        │
                        ▼
                    ┌──────────────────────────┐
                    │  Check: requireAdmin?    │
                    └──────┬───────────────────┘
                           │
                           ├─ YES & !isAdmin
                           │  → <Navigate to /unauthorized />
                           │
                           └─ ALL CHECKS PASS
                              → Render children ✓
```

---

## 5. State Management Architecture

```
┌────────────────────────────────────────┐
│  AuthContext                           │
│  ┌──────────────────────────────────┐  │
│  │ State:                           │  │
│  │ - user: User | null             │  │
│  │ - isAuthenticated: boolean       │  │
│  │ - isLoading: boolean             │  │
│  │ - error: string | null           │  │
│  │ - isAdmin: boolean               │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ Methods:                         │  │
│  │ - login()                        │  │
│  │ - logout()                       │  │
│  │ - refreshUser()                  │  │
│  │ - clearError()                   │  │
│  └──────────────────────────────────┘  │
└─────────────┬──────────────────────────┘
              │
              ├─ useAuth()
              ├─ useIsAdmin()
              ├─ useIsAuthenticated()
              ├─ useLogin()
              └─ useLogout()
              
              ↓
              
      Components re-render
      when state changes
```

---

## 6. API Layer Stack

```
┌─────────────────────────────────────┐
│  Components / Hooks                 │
│  useAuth(), useLogin(), etc.        │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  API Services                       │
│  authApi.login(), authApi.me(), etc │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Axios Instance (apiClient)         │
│  ┌─────────────────────────────────┐│
│  │ Request Interceptor:            ││
│  │ - Add Authorization header      ││
│  │ - Add JWT token                 ││
│  └─────────────────────────────────┘│
│  ┌─────────────────────────────────┐│
│  │ Response Interceptor:           ││
│  │ - Handle 401 (logout)           ││
│  │ - Handle 403 (forbidden)        ││
│  │ - Retry 5XX errors              ││
│  │ - Global error handling         ││
│  └─────────────────────────────────┘│
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Token Management                   │
│  tokenStorage (localStorage)        │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  Network Request                    │
│  HTTP/HTTPS to FastAPI              │
└────────────┬────────────────────────┘
             │
             ▼
┌─────────────────────────────────────┐
│  FastAPI Backend                    │
│  - Verify JWT                       │
│  - Process request                  │
│  - Return response                  │
└─────────────────────────────────────┘
```

---

## 7. Component Interaction

```
     ┌──────────────┐
     │   App.tsx    │
     │  AuthProvider│
     └──────┬───────┘
            │
     ┌──────▼───────────────┐
     │    Routes            │
     │  /login              │
     │  /dashboard (public) │
     │  /admin (protected)  │
     └──────┬───────────────┘
            │
    ┌───────┼───────────────────────────┐
    │       │                           │
    ▼       ▼                           ▼
┌────────────┐   ┌─────────────┐  ┌──────────────┐
│ LoginPage  │   │ Dashboard   │  │ AdminPanel   │
│ useAuth()  │   │ useAuth()   │  │ Protected    │
│ .login()   │   │ .user       │  │ requireAdmin │
└────────────┘   └─────────────┘  └──────────────┘

All components can access auth state
without prop drilling!
```

---

## 8. Token Lifecycle

```
┌──────────────────────────────────────┐
│  Token Generated on Login            │
│  JWT = Header.Payload.Signature      │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Token Stored in localStorage        │
│  Key: osam_access_token              │
│  Persists across page refreshes      │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Token Attached to Requests          │
│  Authorization: Bearer {token}       │
│  Every API call includes it          │
└──────────┬───────────────────────────┘
           │
           ▼
┌──────────────────────────────────────┐
│  Backend Validates Token             │
│  - Verify signature                  │
│  - Check expiration (exp claim)      │
│  - Extract user_id                   │
└──────────┬───────────────────────────┘
           │
           ├─ Valid → Process request
           │          Return 200 + data
           │
           └─ Invalid/Expired
              → Return 401
              → Frontend clears token
              → User redirected to /login
              → Token lifecycle ends
```

---

## 9. Decision Tree: Should Component Use Auth?

```
Does your component need:

├─ User info (name, email, etc)?
│  └─ YES → useAuth().user
│
├─ Check if logged in?
│  └─ YES → useAuth().isAuthenticated
│          or useIsAuthenticated()
│
├─ Check if admin?
│  └─ YES → useAuth().isAdmin
│          or useIsAdmin()
│
├─ Handle login?
│  └─ YES → useAuth().login()
│          or useLogin()
│
├─ Handle logout?
│  └─ YES → useAuth().logout()
│          or useLogout()
│
├─ Display error?
│  └─ YES → useAuth().error
│
├─ Show loading state?
│  └─ YES → useAuth().isLoading
│
└─ Guard a route?
   └─ YES → <ProtectedRoute requireAdmin={boolean}>
            </ProtectedRoute>
```

---

## 10. Error Handling Flow

```
┌─────────────────────────────┐
│  Error occurs in:           │
│  - API call                 │
│  - Network request          │
│  - Response parsing         │
└──────┬──────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Check error type:           │
└──────┬───────────────────────┘
       │
       ├─ Axios error?
       │  └─ YES → handleApiError()
       │          Transforms to ApiError
       │
       ├─ Status 401?
       │  └─ YES → Auto-logout
       │          Redirect to /login
       │
       ├─ Status 403?
       │  └─ YES → Log warning
       │          Show permission error
       │
       ├─ Status 5XX?
       │  └─ YES → Retry once
       │          Wait 1 second
       │          Then fail if still fails
       │
       └─ Network error?
          └─ YES → Show network error
                   Suggest retry

Result: Consistent error handling ✓
```

---

## 11. File Dependency Graph

```
App.tsx
├── AuthProvider (AuthContext.tsx)
│   ├── useAuth hook
│   ├── useIsAdmin hook
│   ├── useLogin hook
│   └── useLogout hook
│
├── LoginPage.tsx
│   └── useAuth()
│
├── ProtectedRoute.tsx
│   └── useAuth()
│
└── Layout.tsx
    └── Can use auth hooks
    
authApi (auth.ts)
├── apiClient (client.ts)
│   ├── tokenStorage (tokenStorage.ts)
│   └── Axios interceptors
│       ├── Request: Attach token
│       └── Response: Handle 401
│
└── tokenStorage (tokenStorage.ts)
    └── localStorage
```

---

These diagrams show how all pieces work together!
