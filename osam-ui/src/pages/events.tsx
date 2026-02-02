import React from 'react';
import Layout from '../components/Layout';

export default function EventsPage() {
  return (
    <Layout pageTitle="Events">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded shadow">Event 1</div>
        <div className="p-4 bg-white rounded shadow">Event 2</div>
        <div className="p-4 bg-white rounded shadow">Event 3</div>
      </div>
    </Layout>
  );
}
