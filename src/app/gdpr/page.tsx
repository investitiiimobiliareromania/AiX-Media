import React from "react";
import Link from "next/link";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "GDPR Compliance — AiX Media",
  description: "Official GDPR Information Page describing user rights and data controller policies for European visitors.",
};

export default function GdprPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber font-sans space-y-6">
      <h1 className="text-3xl font-black text-white border-b border-neutral-800 pb-4">GDPR Compliance &amp; Rights</h1>
      <p className="text-xs font-mono text-neutral-500">Last Updated: August 8, 2026</p>

      <p className="lead text-neutral-300">
        This page details the specific measures, legal bases, and procedures implemented on AiX Media to safeguard your personal data in accordance with the General Data Protection Regulation (GDPR) (Regulation EU 2016/679).
      </p>

      <h2 className="text-xl font-bold text-white mt-8">1. Who is the Data Controller?</h2>
      <p>
        The Data Controller responsible for the processing of personal data on this website is:
      </p>
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 font-mono text-xs text-neutral-400 space-y-2">
        <p><strong>Identity:</strong> {contactConfig.name}</p>
        <p><strong>Role:</strong> Site Owner &amp; Lead Editor</p>
        <p><strong>Physical Location:</strong> {contactConfig.location}</p>
        <p><strong>Direct Email:</strong> <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a></p>
        <p><strong>Telephone:</strong> <a href={`tel:${contactConfig.phone}`} className="text-amber-400 hover:underline">{contactConfig.phoneDisplay}</a></p>
      </div>

      <h2 className="text-xl font-bold text-white mt-8">2. Summary of Personal Data Processing</h2>
      <p>
        We collect only the bare minimum of data necessary. Our processing activities consist of:
      </p>
      <ul className="list-disc pl-5 text-neutral-300">
        <li>
          <strong>Contact Inquiries:</strong> Processing your name, email/phone, and message context to answer your requests. The legal basis is your explicit consent (Art. 6(1)(a) GDPR).
        </li>
        <li>
          <strong>Platform Security:</strong> Temporary processing of visitor IP addresses in server memory for rate-limiting, bot prevention, and anti-spam measures. The legal basis is our legitimate interest in protecting the platform (Art. 6(1)(f) GDPR).
        </li>
      </ul>

      <h2 className="text-xl font-bold text-white mt-8">3. Direct Data Subject Rights</h2>
      <p>Under Chapter III of the GDPR, you possess the following rights regarding your personal data:</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded bg-neutral-900/40 border border-neutral-800 space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Access &amp; Rectification</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            You have the right to request a confirmation and a copy of any personal data we process, and request immediate corrections to inaccurate or incomplete fields.
          </p>
        </div>
        <div className="p-4 rounded bg-neutral-900/40 border border-neutral-800 space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Erasure (&quot;Forgotten&quot;)</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            You can request the erasure of your personal details when the data is no longer needed, or if you choose to withdraw your consent.
          </p>
        </div>
        <div className="p-4 rounded bg-neutral-900/40 border border-neutral-800 space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Restriction &amp; Objection</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            You can object to processing on grounds of legitimate interests, or request the restriction of processing while data accuracy is verified.
          </p>
        </div>
        <div className="p-4 rounded bg-neutral-900/40 border border-neutral-800 space-y-2">
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">Consent Withdrawal</h3>
          <p className="text-xs text-neutral-400 leading-relaxed">
            You can withdraw your consent for contact responses at any time. The withdrawal does not affect the lawfulness of processing before the withdrawal.
          </p>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mt-8">4. How to Submit a GDPR Request</h2>
      <p>
        To submit an official request (for access, erasure, correction, or portability), please send a clear email containing your inquiry to the controller at <a href={`mailto:${contactConfig.email}`} className="text-amber-400 hover:underline">{contactConfig.email}</a>.
      </p>
      <p>
        Requests are processed free of charge. We will respond within the legal timeframe of 30 days from receipt of the request.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">5. Right to File a Complaint</h2>
      <p>
        If you believe that the processing of your personal data violates the GDPR framework, you have the right to lodge a formal complaint with the competent supervisory authority:
      </p>
      <div className="bg-neutral-950 p-4 rounded border border-neutral-900 font-mono text-xs text-neutral-500">
        <p className="font-bold text-neutral-300">Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP)</p>
        <p>Address: B-dul G-ral. Gheorghe Magheru 28-30, Sector 1, cod poștal 010336, București, România</p>
        <p>Email: <a href="mailto:anspdcp@dataprotection.ro" className="hover:text-amber-400 underline">anspdcp@dataprotection.ro</a></p>
        <p>Website: <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 underline">https://www.dataprotection.ro</a></p>
      </div>

      <h2 className="text-xl font-bold text-white mt-8">6. Data Security and Zero Database Persistence</h2>
      <p>
        We take technical security seriously. All form submissions are routed over secure SSL connections and immediately sent to our encrypted Telegram webhook. Because we do not write data to any SQL or NoSQL database server, your data is not stored on the hosting server, eliminating the risk of database leaks.
      </p>

      <div className="pt-6 border-t border-neutral-800 flex gap-4 text-xs font-mono">
        <Link href="/privacy" className="text-amber-400 hover:underline">
          Read Privacy Policy &rarr;
        </Link>
        <span className="text-neutral-700">|</span>
        <Link href="/cookies" className="text-amber-400 hover:underline">
          Read Cookie Policy &rarr;
        </Link>
      </div>
    </section>
  );
}
