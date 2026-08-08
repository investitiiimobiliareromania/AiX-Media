import React from 'react';

export const metadata = {
  title: 'Cookie Policy – AiX Media',
  description: 'Cookie policy describing the use of essential and optional cookies on AiX Media website.',
};

export default function CookiesPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber">
      <h1>Cookie Policy</h1>
      <p>Effective date: August 2026</p>
      <h2>1. What are cookies?</h2>
      <p>Cookies are small text files stored on your device that help the website remember information about your visit.</p>
      <h2>2. Types of cookies used</h2>
      <ul>
        <li><strong>Essential cookies</strong>: required for core website functionality (session, preferences).</li>
        <li><strong>Analytics cookies</strong>: used to collect usage statistics. These are only set after you accept all cookies.</li>
      </ul>
      <h2>3. Consent management</h2>
      <p>We use a cookie‑consent banner to obtain your permission. You can accept all cookies or reject non‑essential cookies. Your choice is stored in <code>localStorage</code> under the key <code>aix_cookie_consent</code>.</p>
      <h2>4. How to change your preferences</h2>
      <p>To change your consent, use the cookie‑consent banner that appears at the bottom of the page or clear the <code>aix_cookie_consent</code> entry in your browser’s local storage.</p>
      <h2>5. Contact</h2>
      <p>If you have questions, please contact us at <a href="mailto:cristianvaduva@duck.com" className="text-amber-400 hover:underline">cristianvaduva@duck.com</a>.</p>
    </section>
  );
}
