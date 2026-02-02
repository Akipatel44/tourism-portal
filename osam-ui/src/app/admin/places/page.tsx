'use client';

import React, { useEffect, useState } from 'react';
import PlacesService from '@/api/services/places';
import { Place } from '@/api/types/api';
import { ErrorMessage, Toast } from '@/components/ErrorMessage';

const ITEMS_PER_PAGE = 12;

export default function AdminPlacesPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{message:string;variant:'success'|'error'}|null>(null);

  // Form state for create/update
  const [editing, setEditing] = useState<Place | null>(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    location: '',
    description: '',
    image_url: '',
    is_featured: false,
  });

  const resetForm = () => {
    setEditing(null);
    setForm({ name: '', category: '', location: '', description: '', image_url: '', is_featured: false });
  };

  const loadPlaces = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const resp = await PlacesService.getPlaces({ page, page_size: ITEMS_PER_PAGE });
      setPlaces(resp.results);
      setTotalPages(resp.total_pages || 1);
    } catch (err: any) {
      setError(err?.message || 'Failed to load places');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces();
  }, [page]);

  // Basic validation
  const validate = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.category.trim()) return 'Category is required';
    if (!form.location.trim()) return 'Location is required';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      if (editing) {
        const updated = await PlacesService.updatePlace(editing.id, form);
        setToast({message: 'Place updated', variant: 'success'});
        // Update local list
        setPlaces((prev: Place[]) => prev.map((p: Place) => p.id === updated.id ? updated : p));
      } else {
        const created = await PlacesService.createPlace(form as any);
        setToast({message: 'Place created', variant: 'success'});
        // Prepend created
        setPlaces((prev: Place[]) => [created, ...prev]);
      }
      resetForm();
    } catch (err: any) {
      setError(err?.message || 'Operation failed');
      setToast({message: err?.message || 'Operation failed', variant: 'error'});
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (p: Place) => {
    setEditing(p);
    setForm({
      name: p.name,
      category: p.category,
      location: p.location,
      description: p.description || '',
      image_url: p.image_url || '',
      is_featured: p.is_featured || false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this place?')) return;
    try {
      await PlacesService.deletePlace(id);
      setPlaces((prev: Place[]) => prev.filter((p: Place) => p.id !== id));
      setToast({message: 'Place deleted', variant: 'success'});
    } catch (err: any) {
      setError(err?.message || 'Delete failed');
      setToast({message: err?.message || 'Delete failed', variant: 'error'});
    }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Places</h1>

      {error && <ErrorMessage message={error} variant="error" onDismiss={() => setError(null)} />}
      {toast && <Toast variant={toast.variant === 'success' ? 'success' : 'error'} message={toast.message} onDismiss={() => setToast(null)} />}

      {/* Form */}
      <section className="mb-8 bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">{editing ? 'Edit Place' : 'Create Place'}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={form.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, name: e.target.value})} placeholder="Name" className="p-2 border rounded" />
          <input value={form.category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, category: e.target.value})} placeholder="Category" className="p-2 border rounded" />
          <input value={form.location} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, location: e.target.value})} placeholder="Location" className="p-2 border rounded" />
          <input value={form.image_url} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, image_url: e.target.value})} placeholder="Image URL" className="p-2 border rounded" />
          <textarea value={form.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setForm({...form, description: e.target.value})} placeholder="Description" className="p-2 border rounded md:col-span-2" />

          <div className="flex items-center gap-2">
            <input id="featured" type="checkbox" checked={form.is_featured} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, is_featured: e.target.checked})} />
            <label htmlFor="featured">Featured</label>
          </div>

          <div className="md:col-span-2 flex gap-2">
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded">{editing ? 'Update' : 'Create'}</button>
            <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 rounded">Reset</button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Places List</h2>

        {isLoading && <div className="text-sm text-gray-600">Loading...</div>}

        {!isLoading && places.length === 0 && <div className="text-sm text-gray-600">No places found.</div>}

        <div className="grid gap-4">
          {places.map((p: Place) => (
            <div key={p.id} className="flex items-center justify-between p-4 border rounded">
              <div>
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-gray-500">{p.category} • {p.location}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-amber-400 rounded">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <button onClick={() => setPage((prev: number) => Math.max(1, prev-1))} disabled={page<=1} className="px-4 py-2 bg-gray-200 rounded">Previous</button>
          <div>Page {page} of {totalPages}</div>
          <button onClick={() => setPage((prev: number) => Math.min(totalPages, prev+1))} disabled={page>=totalPages} className="px-4 py-2 bg-gray-200 rounded">Next</button>
        </div>
      </section>
    </main>
  );
}
