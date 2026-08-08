import React from 'react';

export const metadata = {
  title: 'GDPR – AiX Media',
  description: 'GDPR compliance information for AiX Media.',
};

export default function GdprPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber">
      <h1>GDPR Information</h1>
      <p>Effective date: August 2026</p>
      <p>We process personal data in compliance with the EU General Data Protection Regulation (GDPR). You have the right to access, rectify, erase, and restrict processing of your data.</p>
      {/* Additional GDPR details */}
    </section>
  );
}
