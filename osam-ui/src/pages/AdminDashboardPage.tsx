import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '@/api/admin';

interface AdminStats {
  totalPlaces: number;
  totalEvents: number;
  totalGalleries: number;
  totalImages: number;
}

const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalPlaces: 0,
    totalEvents: 0,
    totalGalleries: 0,
    totalImages: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setIsLoading(true);
    try {
      const [placesData, eventsData, galleriesData] = await Promise.all([
        adminApi.getAllPlaces(0, 1),
        adminApi.getAllEvents(0, 1),
        adminApi.getAllGalleries(0, 1)
      ]);

      // In a real app, you'd get total counts from the API response
      // For now, we'll use the array length as a placeholder
      setStats({
        totalPlaces: placesData.length,
        totalEvents: eventsData.length,
        totalGalleries: galleriesData.length,
        totalImages: 0 // This would need a dedicated endpoint
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const adminSections = [
    {
      title: 'Places Management',
      description: 'Create, update, and manage all places in the system',
      icon: '📍',
      href: '/admin/places',
      color: 'from-blue-500 to-blue-600',
      stats: {
        label: 'Total Places',
        value: stats.totalPlaces
      }
    },
    {
      title: 'Events Management',
      description: 'Manage festivals, ceremonies, and cultural events',
      icon: '📅',
      href: '/admin/events',
      color: 'from-purple-500 to-purple-600',
      stats: {
        label: 'Total Events',
        value: stats.totalEvents
      }
    },
    {
      title: 'Gallery Management',
      description: 'Upload and manage image/video galleries',
      icon: '🖼️',
      href: '/admin/gallery',
      color: 'from-green-500 to-green-600',
      stats: {
        label: 'Total Galleries',
        value: stats.totalGalleries
      }
    }
  ];

  const quickStats = [
    {
      label: 'Total Places',
      value: stats.totalPlaces,
      icon: '📍',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      label: 'Total Events',
      value: stats.totalEvents,
      icon: '📅',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      label: 'Total Galleries',
      value: stats.totalGalleries,
      icon: '🖼️',
      color: 'bg-green-100 text-green-600'
    },
    {
      label: 'Total Images',
      value: stats.totalImages,
      icon: '📸',
      color: 'bg-yellow-100 text-yellow-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Manage content, galleries, and events for the OSAM platform
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} rounded-lg p-6 shadow-sm border border-gray-200`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{isLoading ? '-' : stat.value}</p>
              </div>
              <div className="text-4xl">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Admin Sections */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {adminSections.map((section, index) => (
            <Link
              key={index}
              to={section.href}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div
                className={`bg-gradient-to-br ${section.color} p-8 h-full relative`}
              >
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-300"></div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-6xl mb-4">{section.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {section.title}
                  </h3>
                  <p className="text-white text-opacity-90 mb-6 text-sm">
                    {section.description}
                  </p>

                  {/* Stats */}
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-white text-opacity-75 text-xs">
                      {section.stats.label}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {isLoading ? '-' : section.stats.value}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all duration-300">
                    <span>Go to {section.title.split(' ')[0]}</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7m0 0l-7 7m7-7H5"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-8 border-l-4 border-indigo-600">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/places"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-blue-300 transition group"
          >
            <div className="text-3xl">📍</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                Add New Place
              </h3>
              <p className="text-sm text-gray-600">Create a new place entry</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7m0 0l-7 7m7-7H5"
                stroke="currentColor"
              />
            </svg>
          </Link>

          <Link
            to="/admin/events"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-purple-300 transition group"
          >
            <div className="text-3xl">📅</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">
                Create New Event
              </h3>
              <p className="text-sm text-gray-600">Schedule a new event</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7m0 0l-7 7m7-7H5"
                stroke="currentColor"
              />
            </svg>
          </Link>

          <Link
            to="/admin/gallery"
            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-green-300 transition group"
          >
            <div className="text-3xl">🖼️</div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 group-hover:text-green-600">
                Upload Gallery
              </h3>
              <p className="text-sm text-gray-600">Add images or videos</p>
            </div>
            <svg className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7m0 0l-7 7m7-7H5"
                stroke="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Help Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-8 border border-indigo-200">
        <div className="flex items-start gap-4">
          <div className="text-4xl">❓</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Each section has detailed forms with validation. All changes are saved to the
              database immediately. You can edit or delete any entry at any time.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900">Places</h4>
                <p className="text-gray-600">Manage temples, landmarks, and viewpoints</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Events</h4>
                <p className="text-gray-600">Create and manage festivals and ceremonies</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Gallery</h4>
                <p className="text-gray-600">Upload images and organize galleries</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
