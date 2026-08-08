import React from "react";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Privacy Policy — AiX Media",
  description: "Official Privacy Policy describing data processing, security, and GDPR user rights on AiX Media.",
};

export default function PrivacyPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber font-sans">
      <h1 className="text-3xl font-black text-white border-b border-neutral-800 pb-4">Privacy Policy</h1>
      <p className="text-xs font-mono text-neutral-500">Effective Date: August 8, 2026</p>

      <p className="lead text-neutral-300">
        This Privacy Policy explains how Cristian Văduva (&quot;we&quot;, &quot;us&quot;, or &quot;the operator&quot;) processes and protects the personal data of visitors (&quot;users&quot; or &quot;you&quot;) of the AiX Media platform, in compliance with the General Data Protection Regulation (GDPR) (EU Regulation 2016/679).
      </p>

      <h2 className="text-xl font-bold text-white mt-8">1. Data Controller</h2>
      <p>
        The sole data controller of this Platform is the website owner and operator:
      </p>
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-4 font-mono text-xs text-neutral-400">
        <p><strong>Name:</strong> {contactConfig.name}</p>
        <p><strong>Location:</strong> {contactConfig.location}</p>
        <p><strong>Contact Email:</strong> <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a></p>
        <p><strong>Contact Telephone:</strong> <a href={`tel:${contactConfig.phone}`} className="text-amber-400 hover:underline">{contactConfig.phoneDisplay}</a></p>
      </div>

      <h2 className="text-xl font-bold text-white mt-8">2. Personal Data We Collect</h2>
      <p>
        We value data minimization. We only collect the minimal amount of personal information necessary to deliver services and ensure platform security.
      </p>
      
      <h3 className="text-lg font-bold text-white mt-6">A. Information You Submit via the Contact Form</h3>
      <p>When you fill out and submit the contact form on our website, we collect:</p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li><strong>Name / Identifier</strong> (to address you);</li>
        <li><strong>Contact Info</strong> (email address or phone number, to reply to your inquiry);</li>
        <li><strong>Message Details</strong> (the text content of your request);</li>
        <li><strong>Context Metadata</strong> (the specific page and call-to-action button where you submitted the request).</li>
      </ul>

      <h3 className="text-lg font-bold text-white mt-6">B. Technical & Connection Data</h3>
      <p>To prevent spam, honeypot bots, and distributed denial-of-service (DDoS) abuse, our server automatically checks:</p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li><strong>IP Address</strong> (used strictly for server rate-limiting and temporary blacklisting);</li>
        <li><strong>Browser &amp; Device details</strong> (User-Agent string, to ensure layouts render correctly);</li>
        <li><strong>Consent Preferences</strong> (stored client-side in your browser storage).</li>
      </ul>

      <h3 className="text-lg font-bold text-white mt-6">C. What We Do NOT Collect</h3>
      <p>
        We do not collect sensitive data such as National Identification Numbers (CNP), physical home addresses, banking credentials, credit card details, physical locations, or special categories of personal data.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">3. Purposes and Legal Bases of Processing</h2>
      <table className="min-w-full text-xs font-mono text-neutral-400 border border-neutral-800 my-4 divide-y divide-neutral-800">
        <thead>
          <tr className="bg-neutral-900/60 text-white font-bold">
            <th className="px-4 py-2 text-left border border-neutral-800">Data Category</th>
            <th className="px-4 py-2 text-left border border-neutral-800">Purpose</th>
            <th className="px-4 py-2 text-left border border-neutral-800">GDPR Legal Basis</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-900">
          <tr>
            <td className="px-4 py-3 border border-neutral-800 text-white">Contact Form inputs</td>
            <td className="px-4 py-3 border border-neutral-800">Responding to user-initiated queries and contact requests.</td>
            <td className="px-4 py-3 border border-neutral-800 text-amber-400">Consent (Art. 6(1)(a)) &amp; Pre-contractual steps (Art. 6(1)(b))</td>
          </tr>
          <tr>
            <td className="px-4 py-3 border border-neutral-800 text-white">IP Addresses</td>
            <td className="px-4 py-3 border border-neutral-800">Form rate limiting, DDoS defense, honeypot checks, and security monitoring.</td>
            <td className="px-4 py-3 border border-neutral-800 text-amber-400">Legitimate Interest (Art. 6(1)(f))</td>
          </tr>
          <tr>
            <td className="px-4 py-3 border border-neutral-800 text-white">Cookie Consent state</td>
            <td className="px-4 py-3 border border-neutral-800">Storing visitor cookies and local storage preference.</td>
            <td className="px-4 py-3 border border-neutral-800 text-amber-400">Legal Obligation (Art. 6(1)(c))</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-bold text-white mt-8">4. Detailed Contact Form Processing & Routing</h2>
      <p>
        When you press the submit button on the contact form, the data is not written to a local database. Instead:
      </p>
      <ol className="list-decimal pl-5 space-y-2 text-neutral-300">
        <li>The client browser makes a secure HTTPS POST request to our API endpoint (`/api/contact`);</li>
        <li>The server-side endpoint sanitizes the input text and verifies the sender IP against an in-memory rate-limiter;</li>
        <li>If valid, the endpoint uses an encrypted webhook protocol to transmit the sanitized lead data to the operator’s secure Telegram Bot channel (delivered via Telegram Group Inc. servers);</li>
        <li>No database logs, storage records, or backups containing your contact input are persisted on the website hosting server.</li>
      </ol>

      <h2 className="text-xl font-bold text-white mt-8">5. Data Retention</h2>
      <p>
        We do not retain information indefinitely. Personal data submitted via form queries is only stored within the active communication thread for the period required to fully address your inquiry or resolve technical issues, after which the conversation logs are archived or deleted. IP addresses used in the rate-limiting filter are held in server memory for a maximum duration of 1 minute.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">6. Data Subject Rights (GDPR)</h2>
      <p>As a data subject in the European Union, you have the following rights under the GDPR:</p>
      <ul className="list-disc pl-5 space-y-1 text-neutral-300">
        <li><strong>Right of Access</strong> (to obtain confirmation of processing and copies of your data);</li>
        <li><strong>Right to Rectification</strong> (to request updates to inaccurate or incomplete information);</li>
        <li><strong>Right to Erasure (&quot;Right to be Forgotten&quot;)</strong> (to request deletion of personal records);</li>
        <li><strong>Right to Restriction of Processing</strong> (to suspend processing under specific conditions);</li>
        <li><strong>Right to Object</strong> (to object to processing based on legitimate interests);</li>
        <li><strong>Right to Data Portability</strong> (to request transfer of data to another controller);</li>
        <li><strong>Right to Withdraw Consent</strong> (applicable if processing is based on your consent);</li>
        <li><strong>Right to Complaint</strong> (to file a complaint with the National Supervisory Authority for Personal Data Processing — ANSPDCP in Romania, at `anspdcp@dataprotection.ro`).</li>
      </ul>
      <p>
        To exercise any of these rights, please email us directly at <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a>.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">7. International Data Transfers</h2>
      <p>
        Contact alerts are routed via the Telegram Bot API framework. Depending on Telegram’s network load balancing, the encrypted messages may transit secure data centers located both within the EEA and internationally. These transmissions are encrypted in transit via TLS protocol.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">8. Security Measures</h2>
      <p>
        We implement rigorous technical security controls. All communication is encrypted via HTTPS (SSL). Environment secrets (such as API keys and Telegram credentials) are strictly protected server-side and never exposed to the client browser.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">9. Updates to this Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.
      </p>
    </section>
  );
}
