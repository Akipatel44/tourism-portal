import React from 'react';
import Layout from '../components/Layout';

export default function NaturePage() {
  return (
    <Layout pageTitle="Nature">
      <div className="space-y-4">
        <p>Trails, flora, and fauna around OSAM Hill & Chichod.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded shadow">Trail 1</div>
          <div className="p-4 bg-white rounded shadow">Trail 2</div>
        </div>
      </div>
    </Layout>
  );
}
