'use client';

import React, { useState } from 'react';
import GalleryService from '@/api/services/gallery';
import { ErrorMessage, Toast } from '@/components/ErrorMessage';

export default function AdminGalleryPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Nature');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{message:string;variant:'success'|'error'}|null>(null);

  const validate = () => {
    if (!file) return 'Please choose an image file';
    if (!title.trim()) return 'Title is required';
    if (!category.trim()) return 'Category is required';
    return null;
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (v) { setError(v); return; }
    setIsLoading(true); setError(null);
    try {
      // Upload file
      const uploadResp = await GalleryService.uploadImage(file as File);
      // Create gallery item
      const payload = {
        image_url: uploadResp.url,
        title,
        category,
        description,
        is_featured: false,
      };
      await GalleryService.createGalleryItem(payload as any);
      setToast({message:'Image uploaded and gallery item created', variant:'success'});
      // reset
      setFile(null); setTitle(''); setCategory('Nature'); setDescription('');
    } catch (err:any) {
      setError(err?.message || 'Upload failed');
      setToast({message: err?.message || 'Upload failed', variant:'error'});
    } finally { setIsLoading(false); }
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin - Gallery Upload</h1>

      {error && <ErrorMessage message={error} variant="error" onDismiss={() => setError(null)} />}
      {toast && <Toast variant={toast.variant === 'success' ? 'success' : 'error'} message={toast.message} onDismiss={() => setToast(null)} />}

      <section className="bg-white p-6 rounded shadow max-w-2xl">
        <form onSubmit={handleUpload} className="grid gap-4">
          <label className="flex flex-col">
            <span className="text-sm font-medium mb-2">Image File</span>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} />
          </label>

          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="p-2 border rounded" />

          <select value={category} onChange={e => setCategory(e.target.value)} className="p-2 border rounded">
            <option>Nature</option>
            <option>Architecture</option>
            <option>Portrait</option>
            <option>Abstract</option>
            <option>Wildlife</option>
            <option>Urban</option>
            <option>Landscape</option>
          </select>

          <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description (optional)" className="p-2 border rounded" />

          <div className="flex gap-2">
            <button type="submit" disabled={isLoading} className="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
            <button type="button" onClick={() => { setFile(null); setTitle(''); setCategory('Nature'); setDescription(''); }} className="px-4 py-2 bg-gray-200 rounded">Reset</button>
          </div>
        </form>
      </section>
    </main>
  );
}
