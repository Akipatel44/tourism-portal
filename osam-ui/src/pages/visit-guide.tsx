import React from 'react';
import Layout from '../components/Layout';

export default function VisitGuidePage() {
  return (
    <Layout pageTitle="Visit Guide">
      <section className="space-y-4">
        <h2>Plan your trip</h2>
        <ul className="list-disc pl-6">
          <li>Best time to visit</li>
          <li>Getting there</li>
          <li>Local customs</li>
        </ul>
      </section>
    </Layout>
  );
}
