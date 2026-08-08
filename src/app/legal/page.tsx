import React from 'react';

export const metadata = {
  title: 'Legal – AiX Media',
  description: 'Legal information and disclosures for AiX Media.',
};

export default function LegalPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber">
      <h1>Legal Information</h1>
      <p>Operator: Cristian Văduva</p>
      <p>Address: Bucharest, Romania</p>
      <p>Email: <a href="mailto:cristianvaduva@duck.com" className="text-amber-400 hover:underline">cristianvaduva@duck.com</a></p>
    </section>
  );
}
