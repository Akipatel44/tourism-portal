import React from 'react';
import AdminLayout from '@/components/AdminLayout';

type StatCard = {
  label: string;
  value: number;
  change: number;
  icon: string;
  color: string;
};

type RecentActivity = {
  id: string;
  action: string;
  type: 'place' | 'event' | 'gallery' | 'user';
  timestamp: string;
  status: 'success' | 'pending' | 'warning';
};

const STAT_CARDS: StatCard[] = [
  {
    label: 'Total Places',
    value: 24,
    change: 2,
    icon: '📍',
    color: 'bg-blue-50 border-blue-200',
  },
  {
    label: 'Active Events',
    value: 8,
    change: 1,
    icon: '🎉',
    color: 'bg-emerald-50 border-emerald-200',
  },
  {
    label: 'Gallery Images',
    value: 156,
    change: 12,
    icon: '🖼️',
    color: 'bg-amber-50 border-amber-200',
  },
  {
    label: 'Bookings (Month)',
    value: 47,
    change: 8,
    icon: '📅',
    color: 'bg-purple-50 border-purple-200',
  },
];

const RECENT_ACTIVITIES: RecentActivity[] = [
  {
    id: '1',
    action: 'New place added: Zarna Waterfall',
    type: 'place',
    timestamp: '2 hours ago',
    status: 'success',
  },
  {
    id: '2',
    action: 'Event updated: Ashadhi Beej Mela',
    type: 'event',
    timestamp: '5 hours ago',
    status: 'success',
  },
  {
    id: '3',
    action: '23 gallery images uploaded',
    type: 'gallery',
    timestamp: '1 day ago',
    status: 'success',
  },
  {
    id: '4',
    action: 'User registration: John Doe',
    type: 'user',
    timestamp: '2 days ago',
    status: 'pending',
  },
  {
    id: '5',
    action: 'System backup completed',
    type: 'place',
    timestamp: '3 days ago',
    status: 'success',
  },
];

const statusBadges = {
  success: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  warning: 'bg-red-100 text-red-700',
};

export default function AdminDashboard() {
  return (
    <AdminLayout pageTitle="Dashboard">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {STAT_CARDS.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.color} border rounded-lg p-6 transition-all hover:shadow-md`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className="text-3xl">{stat.icon}</div>
            </div>
            <div className="text-emerald-600 text-sm font-semibold">
              ↑ {stat.change} this month
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <a
            href="/admin/places"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <span className="text-3xl mb-2">📍</span>
            <span className="font-semibold text-gray-700">Add New Place</span>
          </a>
          <a
            href="/admin/events"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-emerald-300 rounded-lg hover:bg-emerald-50 transition-colors"
          >
            <span className="text-3xl mb-2">🎉</span>
            <span className="font-semibold text-gray-700">Create Event</span>
          </a>
          <a
            href="/admin/gallery"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-amber-300 rounded-lg hover:bg-amber-50 transition-colors"
          >
            <span className="text-3xl mb-2">📸</span>
            <span className="font-semibold text-gray-700">Upload Gallery</span>
          </a>
          <a
            href="/admin/bookings"
            className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-purple-300 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <span className="text-3xl mb-2">📅</span>
            <span className="font-semibold text-gray-700">View Bookings</span>
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {RECENT_ACTIVITIES.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="text-2xl">
                  {activity.type === 'place' && '📍'}
                  {activity.type === 'event' && '🎉'}
                  {activity.type === 'gallery' && '🖼️'}
                  {activity.type === 'user' && '👤'}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  statusBadges[activity.status]
                }`}
              >
                {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
