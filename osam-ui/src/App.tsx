/**
 * App Component with React Router
 * Main application with routing setup
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import PlacesPage from "./pages/PlacesPage";
import {
  MythologyPage,
  NaturePage,
  EventsPage,
  GalleryPage,
  VisitGuidePage,
  AdminPage,
} from "./pages/PageStubs";

const App: React.FC = () => {
  const SITE_LOGO = "https://via.placeholder.com/50x50?text=OSAM";
  const SITE_NAME = "Osam Hill & Chichod";

  return (
    <Router>
      <Layout logoUrl={SITE_LOGO} siteName={SITE_NAME}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/mythology" element={<MythologyPage />} />
          <Route path="/nature" element={<NaturePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/visit-guide" element={<VisitGuidePage />} />

          {/* Admin Route (Protected - add authentication) */}
          <Route path="/admin" element={<AdminPage />} />

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
    </Router>
  );
};

export default App;
