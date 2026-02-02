import React from 'react';
import Layout from '../components/Layout';

// Admin is hidden from default nav; this page should be protected in a real app.
export default function AdminPage() {
  return (
    <Layout pageTitle="Admin" isAdmin>
      <div className="p-4 bg-white rounded shadow">Admin dashboard (protected)</div>
    </Layout>
  );
}
