/**
 * Component Exports Index
 * Central export point for all components
 */

// Layout Components
export { Header } from "./Header";
export { Footer } from "./Footer";
export { HamburgerMenu } from "./HamburgerMenu";
export { Layout } from "./Layout";

// Page Components
export { default as HomePage } from "../pages/HomePage";
export { default as PlacesPage } from "../pages/PlacesPage";
export { default as PlaceDetailPage } from "../pages/PlaceDetailPage";
export { default as MythologyPage } from "../pages/MythologyPage";
export { default as NaturePage } from "../pages/NaturePage";
export { default as EventsPage } from "../pages/EventsPage";
export { default as TrekkingPage } from "../pages/TrekkingPage";
export { default as VisitorGuidePage } from "../pages/VisitorGuidePage";
export { default as GalleryPage } from "../pages/GalleryPage";
export { default as AdminDashboard } from "../pages/AdminDashboard";
export { default as ProtectedRoute } from "./ProtectedRoute";

// Utility Components
export { default as Loader } from "./Loader";
export { default as EmptyState } from "./EmptyState";
export { default as ErrorMessage } from "./ErrorMessage";
export { default as Skeleton } from "./Skeleton";

// Main App
export { default as App } from "../App";
