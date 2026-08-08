import React from "react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Cookie Policy — AiX Media",
  description: "Official Cookie Policy detailing the essential cookies and local storage keys used on the AiX Media platform.",
};

export default function CookiesPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber font-sans">
      <h1 className="text-3xl font-black text-white border-b border-neutral-800 pb-4">Cookie Policy</h1>
      <p className="text-xs font-mono text-neutral-500">Effective Date: August 8, 2026</p>

      <p className="lead text-neutral-300">
        This Cookie Policy describes how AiX Media uses cookies and similar storage technologies (such as HTML5 Local Storage) on our Platform.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">1. What are Cookies and Local Storage?</h2>
      <p>
        Cookies are small text files stored on your computer or mobile device by your browser when you visit a website. They are widely used to make websites work, remember user preferences, and provide analytical data.
      </p>
      <p>
        HTML5 Local Storage is a similar web storage technology that allows sites to store key-value data directly in the browser. Unlike cookies, local storage data is not transmitted to the server with every HTTP request and remains until explicitly deleted.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">2. Our Minimal Storage Approach</h2>
      <p className="font-semibold text-amber-400">
        AiX Media does not use third-party advertising, profiling, or tracking cookies (such as Meta Pixel or Google Analytics tracking scripts).
      </p>
      <p>
        We only implement the absolute minimum client-side storage keys required to run the Platform, remember your chosen language, and record your cookie consent choice.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">3. Storage Keys Used on the Platform</h2>
      <p>The following are the only storage technologies utilized on this website:</p>

      <table className="min-w-full text-xs font-mono text-neutral-400 border border-neutral-800 my-4 divide-y divide-neutral-800">
        <thead>
          <tr className="bg-neutral-900/60 text-white font-bold">
            <th className="px-4 py-2 text-left border border-neutral-800">Storage Key</th>
            <th className="px-4 py-2 text-left border border-neutral-800">Type</th>
            <th className="px-4 py-2 text-left border border-neutral-800">Duration</th>
            <th className="px-4 py-2 text-left border border-neutral-800">Purpose</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-900">
          <tr>
            <td className="px-4 py-3 border border-neutral-800 text-white">`NEXT_LOCALE`</td>
            <td className="px-4 py-3 border border-neutral-800">HTTP Cookie</td>
            <td className="px-4 py-3 border border-neutral-800">30 Days</td>
            <td className="px-4 py-3 border border-neutral-800">Stores the user&apos;s selected locale (e.g. &quot;ro&quot; or &quot;en&quot;) to automatically load pages in the preferred language.</td>
          </tr>
          <tr>
            <td className="px-4 py-3 border border-neutral-800 text-white">`aix_cookie_consent`</td>
            <td className="px-4 py-3 border border-neutral-800">Local Storage</td>
            <td className="px-4 py-3 border border-neutral-800">Persistent (until cleared)</td>
            <td className="px-4 py-3 border border-neutral-800">Stores the user&apos;s cookie consent preference (value: &quot;all&quot; or &quot;none&quot;) to avoid displaying the banner on future visits.</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-bold text-white mt-8">4. How Consent Works</h2>
      <p>
        When you first access our Platform, a Cookie Consent Banner appears at the bottom of the screen:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-neutral-300">
        <li>Clicking <strong>&quot;Accept all&quot;</strong> stores `&apos;all&apos;` in `aix_cookie_consent` local storage.</li>
        <li>Clicking <strong>&quot;Reject non-essential&quot;</strong> stores `&apos;none&apos;` in `aix_cookie_consent` local storage.</li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-8">5. Managing and Revoking Your Choice</h2>
      <p>
        You can revoke your consent or modify your storage preferences at any time. Because your consent state is stored entirely client-side, you can clear it by:
      </p>
      <ol className="list-decimal pl-5 space-y-1 text-neutral-300">
        <li>Opening your browser developer tools (Inspect element) and navigating to the <strong>&quot;Application&quot;</strong> or <strong>&quot;Storage&quot;</strong> tab;</li>
        <li>Selecting <strong>&quot;Local Storage&quot;</strong> and clearing the value of `aix_cookie_consent`;</li>
        <li>Or clearing cookies in your browser settings to delete the `NEXT_LOCALE` cookie.</li>
      </ol>
      <p>Once cleared, reloading the page will prompt the consent banner to appear again, allowing you to choose a different setting.</p>

      <h2 className="text-xl font-bold text-white mt-8">6. Contact Us</h2>
      <p>For any queries about our Cookie Policy, please contact the operator at:</p>
      <p className="font-mono text-xs text-neutral-400">
        Owner: {contactConfig.name}<br />
        Email: {contactConfig.email}<br />
        Telephone: {contactConfig.phoneDisplay}
      </p>
    </section>
  );
}
