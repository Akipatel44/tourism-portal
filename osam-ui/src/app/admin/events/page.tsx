'use client';

import React, { useEffect, useState } from 'react';
import EventsService from '@/api/services/events';
import { Event } from '@/api/types/api';
import { ErrorMessage, Toast } from '@/components/ErrorMessage';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{message:string;variant:'success'|'error'}|null>(null);

  // Form state
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    date: '',
    time: '',
    location: '',
    image_url: '',
    status: 'upcoming',
  });

  const loadEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await EventsService.getEvents({ page:1, page_size:50 });
      setEvents(resp.results);
    } catch (err:any) {
      setError(err?.message || 'Failed to load events');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => { loadEvents(); }, []);

  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.date) return 'Date is required';
    if (!form.time) return 'Time is required';
    if (!form.location.trim()) return 'Location is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setIsLoading(true); setError(null);
    try {
      if (editing) {
        const updated = await EventsService.updateEvent(editing.id, form as any);
        setEvents(prev => prev.map(ev => ev.id === updated.id ? updated : ev));
        setToast({message:'Event updated', variant:'success'});
      } else {
        const created = await EventsService.createEvent(form as any);
        setEvents(prev => [created, ...prev]);
        setToast({message:'Event created', variant:'success'});
      }
      setEditing(null);
      setForm({name:'',description:'',date:'',time:'',location:'',image_url:'',status:'upcoming'});
    } catch (err:any) {
      setError(err?.message || 'Operation failed');
      setToast({message: err?.message || 'Operation failed', variant:'error'});
    } finally { setIsLoading(false); }
  };

  const handleEdit = (ev: Event) => {
    setEditing(ev);
    setForm({ name: ev.name, description: ev.description || '', date: ev.date, time: ev.time, location: ev.location, image_url: ev.image_url || '', status: (ev as any).status || 'upcoming' });
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this event?')) return;
    try { await EventsService.deleteEvent(id); setEvents(prev => prev.filter(e => e.id !== id)); setToast({message:'Event deleted', variant:'success'}); }
    catch (err:any) { setError(err?.message || 'Delete failed'); setToast({message: err?.message || 'Delete failed', variant:'error'}); }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Events</h1>

      {error && <ErrorMessage message={error} variant="error" onDismiss={() => setError(null)} />}
      {toast && <Toast variant={toast.variant === 'success' ? 'success' : 'error'} message={toast.message} onDismiss={() => setToast(null)} />}

      <section className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Event' : 'Create Event'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Event Name" className="p-2 border rounded" />
          <input value={form.date} onChange={e => setForm({...form, date: e.target.value})} type="date" className="p-2 border rounded" />
          <input value={form.time} onChange={e => setForm({...form, time: e.target.value})} type="time" className="p-2 border rounded" />
          <input value={form.location} onChange={e => setForm({...form, location: e.target.value})} placeholder="Location" className="p-2 border rounded" />
          <input value={form.image_url} onChange={e => setForm({...form, image_url: e.target.value})} placeholder="Image URL" className="p-2 border rounded" />
          <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} className="p-2 border rounded">
            <option value="upcoming">Upcoming</option>
            <option value="ongoing">Happening Now</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Description" className="p-2 border rounded md:col-span-2" />

          <div className="md:col-span-2 flex gap-2">
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={() => { setEditing(null); setForm({name:'',description:'',date:'',time:'',location:'',image_url:'',status:'upcoming'}); }} className="px-4 py-2 bg-gray-200 rounded">Reset</button>
          </div>
        </form>
      </section>

      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Events List</h2>
        {isLoading && <div className="text-sm text-gray-600">Loading...</div>}
        {!isLoading && events.length === 0 && <div className="text-sm text-gray-600">No events found.</div>}
        <div className="grid gap-4">
          {events.map(ev => (
            <div key={ev.id} className="flex items-center justify-between p-4 border rounded">
              <div>
                <div className="font-semibold">{ev.name}</div>
                <div className="text-sm text-gray-500">{ev.date} {ev.time} • {ev.location}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(ev)} className="px-3 py-1 bg-amber-400 rounded">Edit</button>
                <button onClick={() => handleDelete(ev.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
