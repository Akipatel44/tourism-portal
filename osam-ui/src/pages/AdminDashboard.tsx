import React, { useState } from 'react';

interface Place {
  id: number;
  name: string;
  category: string;
  location: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  date: string;
}

interface FormErrors {
  [key: string]: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'places' | 'events' | 'gallery'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dashboard Stats
  const [stats] = useState({
    totalPlaces: 12,
    totalEvents: 8,
    totalImages: 156,
    totalVisitors: '2,345',
  });

  // Places Management
  const [places, setPlaces] = useState<Place[]>([
    { id: 1, name: 'Osam Hill Summit', category: 'Trek', location: 'High Altitude' },
    { id: 2, name: 'Ancient Temple', category: 'Religious', location: 'Valley' },
    { id: 3, name: 'Waterfall Basin', category: 'Nature', location: 'Stream Valley' },
  ]);
  const [placeForm, setPlaceForm] = useState({ name: '', category: '', location: '' });
  const [placeErrors, setPlaceErrors] = useState<FormErrors>({});

  // Events Management
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: '1000 Stairs Marathon', date: '2026-03-15', status: 'upcoming' },
    { id: 2, name: 'Ashadhi Beej Mela', date: '2026-07-10', status: 'upcoming' },
    { id: 3, name: 'Photography Festival', date: '2025-12-05', status: 'completed' },
  ]);
  const [eventForm, setEventForm] = useState({ name: '', date: '', status: 'upcoming' as const });
  const [eventErrors, setEventErrors] = useState<FormErrors>({});

  // Gallery Management
  const [gallery, setGallery] = useState<GalleryImage[]>([
    { id: 1, title: 'Monsoon Mist', category: 'Monsoon', date: '2025-08-15' },
    { id: 2, title: 'Temple Bell', category: 'Temples', date: '2025-12-05' },
    { id: 3, title: 'Forest Canopy', category: 'Nature', date: '2025-09-20' },
  ]);
  const [galleryForm, setGalleryForm] = useState({ title: '', category: '', date: '' });
  const [galleryErrors, setGalleryErrors] = useState<FormErrors>({});

  // Validation Functions
  const validatePlace = (): boolean => {
    const errors: FormErrors = {};
    if (!placeForm.name.trim()) errors.name = 'Place name is required';
    if (!placeForm.category.trim()) errors.category = 'Category is required';
    if (!placeForm.location.trim()) errors.location = 'Location is required';
    setPlaceErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateEvent = (): boolean => {
    const errors: FormErrors = {};
    if (!eventForm.name.trim()) errors.name = 'Event name is required';
    if (!eventForm.date) errors.date = 'Date is required';
    setEventErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateGallery = (): boolean => {
    const errors: FormErrors = {};
    if (!galleryForm.title.trim()) errors.title = 'Image title is required';
    if (!galleryForm.category.trim()) errors.category = 'Category is required';
    if (!galleryForm.date) errors.date = 'Date is required';
    setGalleryErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Form Handlers
  const handleAddPlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (validatePlace()) {
      setPlaces([...places, { id: places.length + 1, ...placeForm }]);
      setPlaceForm({ name: '', category: '', location: '' });
      setPlaceErrors({});
    }
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEvent()) {
      setEvents([...events, { id: events.length + 1, ...eventForm }]);
      setEventForm({ name: '', date: '', status: 'upcoming' });
      setEventErrors({});
    }
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateGallery()) {
      setGallery([...gallery, { id: gallery.length + 1, ...galleryForm }]);
      setGalleryForm({ title: '', category: '', date: '' });
      setGalleryErrors({});
    }
  };

  const handleDeletePlace = (id: number) => {
    setPlaces(places.filter((p) => p.id !== id));
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((e) => e.id !== id));
  };

  const handleDeleteGallery = (id: number) => {
    setGallery(gallery.filter((g) => g.id !== id));
  };

  return (
    <div className="flex h-screen bg-monsoon-50">
      {/* ===== SIDEBAR ===== */}
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-forest-900 text-white transition-all duration-300 flex flex-col shadow-xl`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-forest-800">
          <div className="flex items-center gap-3">
            <div className="text-3xl">🏔️</div>
            {sidebarOpen && <span className="font-black text-lg">OSAM Admin</span>}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: '📊' },
            { id: 'places', label: 'Places', icon: '📍' },
            { id: 'events', label: 'Events', icon: '🎪' },
            { id: 'gallery', label: 'Gallery', icon: '📸' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all duration-300 ${
                activeTab === item.id
                  ? 'bg-mint-500 text-forest-900'
                  : 'text-forest-100 hover:bg-forest-800'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Toggle & Logout */}
        <div className="p-4 border-t border-forest-800 space-y-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-forest-800 hover:bg-forest-700 rounded-lg transition-colors"
            title={sidebarOpen ? 'Collapse' : 'Expand'}
          >
            <span className="text-xl">{sidebarOpen ? '◀' : '▶'}</span>
            {sidebarOpen && <span className="text-sm font-bold">Collapse</span>}
          </button>
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-bold">
            <span className="text-xl">🚪</span>
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <h1 className="text-3xl font-black text-forest-800">
            {activeTab === 'dashboard' && '📊 Dashboard'}
            {activeTab === 'places' && '📍 Manage Places'}
            {activeTab === 'events' && '🎪 Manage Events'}
            {activeTab === 'gallery' && '📸 Manage Gallery'}
          </h1>
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition-colors">
              👤 Admin User
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-8">
          {/* ===== DASHBOARD TAB ===== */}
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Total Places', value: stats.totalPlaces, icon: '📍', color: 'from-blue-500' },
                  { label: 'Total Events', value: stats.totalEvents, icon: '🎪', color: 'from-green-500' },
                  { label: 'Gallery Images', value: stats.totalImages, icon: '📸', color: 'from-purple-500' },
                  { label: 'Total Visitors', value: stats.totalVisitors, icon: '👥', color: 'from-orange-500' },
                ].map((stat, idx) => (
                  <div key={idx} className={`bg-gradient-to-br ${stat.color} to-${stat.color}/60 text-white rounded-xl p-6 shadow-lg`}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-4xl">{stat.icon}</span>
                      <span className="text-sm bg-white/20 px-3 py-1 rounded-full">+12%</span>
                    </div>
                    <div className="text-4xl font-black mb-2">{stat.value}</div>
                    <div className="text-sm font-bold opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-forest-800 mb-4">⚡ Quick Actions</h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors">
                      + Add New Place
                    </button>
                    <button className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors">
                      + Create Event
                    </button>
                    <button className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg font-bold hover:bg-purple-600 transition-colors">
                      + Upload Image
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-forest-800 mb-4">📋 Recent Activity</h3>
                  <div className="space-y-3">
                    {[
                      { action: 'New event created', time: '2 hours ago', icon: '🎪' },
                      { action: '5 images uploaded', time: '4 hours ago', icon: '📸' },
                      { action: 'Place updated', time: '1 day ago', icon: '📍' },
                    ].map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <span className="text-2xl">{activity.icon}</span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-forest-800">{activity.action}</p>
                          <p className="text-xs text-monsoon-600">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== PLACES MANAGEMENT ===== */}
          {activeTab === 'places' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-forest-800 mb-4">Add New Place</h3>
                <form onSubmit={handleAddPlace} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Place Name *</label>
                    <input
                      type="text"
                      value={placeForm.name}
                      onChange={(e) => setPlaceForm({ ...placeForm, name: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        placeErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter place name"
                    />
                    {placeErrors.name && <p className="text-red-600 text-xs mt-1">{placeErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Category *</label>
                    <input
                      type="text"
                      value={placeForm.category}
                      onChange={(e) => setPlaceForm({ ...placeForm, category: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        placeErrors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="E.g., Trek, Religious, Nature"
                    />
                    {placeErrors.category && <p className="text-red-600 text-xs mt-1">{placeErrors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Location *</label>
                    <input
                      type="text"
                      value={placeForm.location}
                      onChange={(e) => setPlaceForm({ ...placeForm, location: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        placeErrors.location ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter location"
                    />
                    {placeErrors.location && <p className="text-red-600 text-xs mt-1">{placeErrors.location}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
                  >
                    + Add Place
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-forest-800">Places ({places.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {places.map((place) => (
                      <div key={place.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-forest-800">{place.name}</h4>
                            <p className="text-sm text-monsoon-600">
                              {place.category} • {place.location}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-yellow-500 text-white rounded font-bold text-sm hover:bg-yellow-600">
                              ✎ Edit
                            </button>
                            <button
                              onClick={() => handleDeletePlace(place.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded font-bold text-sm hover:bg-red-600"
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== EVENTS MANAGEMENT ===== */}
          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-forest-800 mb-4">Create Event</h3>
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Event Name *</label>
                    <input
                      type="text"
                      value={eventForm.name}
                      onChange={(e) => setEventForm({ ...eventForm, name: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        eventErrors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter event name"
                    />
                    {eventErrors.name && <p className="text-red-600 text-xs mt-1">{eventErrors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Date *</label>
                    <input
                      type="date"
                      value={eventForm.date}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        eventErrors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {eventErrors.date && <p className="text-red-600 text-xs mt-1">{eventErrors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Status</label>
                    <select
                      value={eventForm.status}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, status: e.target.value as any })
                      }
                      className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-forest-600"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
                  >
                    + Create Event
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-forest-800">Events ({events.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {events.map((event) => (
                      <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-forest-800">{event.name}</h4>
                            <p className="text-sm text-monsoon-600">📅 {event.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold text-white ${
                                event.status === 'upcoming'
                                  ? 'bg-blue-500'
                                  : event.status === 'ongoing'
                                    ? 'bg-green-500'
                                    : 'bg-gray-500'
                              }`}
                            >
                              {event.status.toUpperCase()}
                            </span>
                            <button className="px-3 py-1 bg-yellow-500 text-white rounded font-bold text-sm hover:bg-yellow-600">
                              ✎
                            </button>
                            <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded font-bold text-sm hover:bg-red-600"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===== GALLERY MANAGEMENT ===== */}
          {activeTab === 'gallery' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-forest-800 mb-4">Upload Image</h3>
                <form onSubmit={handleAddGallery} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Image Title *</label>
                    <input
                      type="text"
                      value={galleryForm.title}
                      onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        galleryErrors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter image title"
                    />
                    {galleryErrors.title && <p className="text-red-600 text-xs mt-1">{galleryErrors.title}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Category *</label>
                    <input
                      type="text"
                      value={galleryForm.category}
                      onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        galleryErrors.category ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="E.g., Monsoon, Temples"
                    />
                    {galleryErrors.category && <p className="text-red-600 text-xs mt-1">{galleryErrors.category}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Date *</label>
                    <input
                      type="date"
                      value={galleryForm.date}
                      onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                      className={`w-full px-3 py-2 border-2 rounded-lg focus:outline-none focus:border-forest-600 ${
                        galleryErrors.date ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {galleryErrors.date && <p className="text-red-600 text-xs mt-1">{galleryErrors.date}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-forest-800 mb-2">Upload File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-forest-600 transition-colors">
                      <p className="text-gray-600">📁 Click to upload or drag image</p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
                  >
                    + Upload Image
                  </button>
                </form>
              </div>

              {/* List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-forest-800">Gallery ({gallery.length})</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {gallery.map((image) => (
                      <div key={image.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-forest-800">{image.title}</h4>
                            <p className="text-sm text-monsoon-600">
                              {image.category} • 📅 {image.date}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-yellow-500 text-white rounded font-bold text-sm hover:bg-yellow-600">
                              ✎ Edit
                            </button>
                            <button
                              onClick={() => handleDeleteGallery(image.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded font-bold text-sm hover:bg-red-600"
                            >
                              🗑 Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
