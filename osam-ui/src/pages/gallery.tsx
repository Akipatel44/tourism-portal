import React from 'react';
import Layout from '../components/Layout';

export default function GalleryPage() {
  return (
    <Layout pageTitle="Gallery">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-36 bg-gray-200 rounded" />
        ))}
      </div>
    </Layout>
  );
}
