/**
 * App Component with React Router
 * Main application with routing setup
 * Includes authentication context provider
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import PlaceDetailPage from "./pages/PlaceDetailPage";
import MythologyPage from "./pages/MythologyPage";
import NaturePage from "./pages/NaturePage";
import EventsPage from "./pages/EventsPage";
import TrekkingPage from "./pages/TrekkingPage";
import VisitorGuidePage from "./pages/VisitorGuidePage";
import GalleryPage from "./pages/GalleryPage";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  const SITE_LOGO = "https://via.placeholder.com/50x50?text=OSAM";
  const SITE_NAME = "Osam Hill & Chichod";

  return (
    <Router>
      <AuthProvider>
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
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/visitor-guide" element={<VisitorGuidePage />} />

            {/* Protected Admin Route - requires admin role */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminDashboard />
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
      </AuthProvider>
    </Router>
  );
};

export default App;
