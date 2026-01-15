/**
 * App Component with React Router
 * Main application with routing setup
 * Includes authentication context provider
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { LoadingProvider } from "./contexts/LoadingContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import NotificationContainer from "./components/NotificationContainer";
import GlobalLoader from "./components/GlobalLoader";
import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import MythologyPage from "./pages/MythologyPage";
import NaturePage from "./pages/NaturePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import TrekkingPage from "./pages/TrekkingPage";
import VisitorGuidePage from "./pages/VisitorGuidePage";
import GalleryPage from "./pages/GalleryPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminPlacesPage from "./pages/AdminPlacesPage";
import AdminEventsPage from "./pages/AdminEventsPage";
import AdminGalleryPage from "./pages/AdminGalleryPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const SITE_LOGO = "https://via.placeholder.com/50x50?text=OSAM";
  const SITE_NAME = "Osam Hill & Chichod";

  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <LoadingProvider>
            <NotificationContainer />
            <GlobalLoader />
            <Layout logoUrl={SITE_LOGO} siteName={SITE_NAME}>
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/places" element={<PlacesPage />} />
            <Route path="/places/:id" element={<PlaceDetailPage />} />
            <Route path="/mythology" element={<MythologyPage />} />
            <Route path="/nature" element={<NaturePage />} />
            <Route path="/trekking" element={<TrekkingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:id" element={<EventDetailPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/visitor-guide" element={<VisitorGuidePage />} />
            <Route path="/visit-guide" element={<VisitorGuidePage />} />

            {/* Protected Admin Routes - requires admin role */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/places"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminPlacesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/events"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminEventsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/gallery"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminGalleryPage />
                </ProtectedRoute>
              }
            />

            {/* Unauthorized Access Page */}
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center bg-monsoon-50">
                  <div className="text-center">
                    <h1 className="text-5xl font-bold text-red-600 mb-4">
                      Access Denied
                    </h1>
                    <p className="text-xl text-monsoon-600 mb-8">
                      You do not have permission to access this page
                    </p>
                    <a
                      href="/"
                      className="px-8 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              }
            />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center bg-monsoon-50">
                  <div className="text-center">
                    <h1 className="text-5xl font-bold text-monsoon-800 mb-4">
                      404
                    </h1>
                    <p className="text-xl text-monsoon-600 mb-8">
                      Page not found
                    </p>
                    <a
                      href="/"
                      className="px-8 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
                    >
                      Back to Home
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
            </Layout>
          </LoadingProvider>
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
