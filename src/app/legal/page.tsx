import React from "react";
import { contactConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";

export const metadata = {
  title: "Legal Notice — AiX Media",
  description: "Official legal notices, operator identification, and regulatory disclaimers for the AiX Media platform.",
};

export default function LegalPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber font-sans">
      <h1 className="text-3xl font-black text-white border-b border-neutral-800 pb-4">Legal Notice</h1>
      
      <div className="bg-neutral-900/40 border border-neutral-800 rounded-xl p-6 my-6 font-mono text-xs text-neutral-400 space-y-2.5">
        <p className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">Operator Identification</p>
        <p><strong>Website Owner:</strong> {contactConfig.name}</p>
        <p><strong>Official URL:</strong> <a href={siteConfig.url} target="_blank" rel="noopener noreferrer" className="text-white hover:text-amber-400 underline">{siteConfig.url}</a></p>
        <p><strong>Location:</strong> {contactConfig.location}</p>
        <p><strong>Contact Email:</strong> <a href={`mailto:${contactConfig.email}`} className="text-white hover:text-amber-400 underline">{contactConfig.email}</a></p>
        <p><strong>Contact Telephone:</strong> <a href={`tel:${contactConfig.phone}`} className="text-white hover:text-amber-400 underline">{contactConfig.phoneDisplay}</a></p>
        <p className="text-[10px] text-neutral-500 pt-2 border-t border-neutral-800/80">
          * Note: AiX Media is a personal project operated by Cristian Văduva as an individual creator and editor. It is not registered as a commercial corporate body, company, or licensed financial entity.
        </p>
      </div>

      <h2 className="text-xl font-bold text-white mt-8">1. Website Purpose & Scope</h2>
      <p>
        AiX Media is a digital media and information platform dedicated to business news, capital market overviews, macroeconomic indicators, real estate updates, corporate reporting, and investment intelligence across Romania and the wider Central and Eastern European (CEE) region. The platform provides educational articles, podcast discussions, visual reports, and data compilations for informational and research purposes.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">2. Important Financial & Professional Advice Disclaimer</h2>
      <p className="text-amber-400 font-semibold">
        The information published on AiX Media does not constitute and should not under any circumstances be interpreted as:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-neutral-300">
        <li>Investment advice, recommendations, or financial consulting;</li>
        <li>Legal, tax, accounting, or audit recommendations;</li>
        <li>Personalized financial analysis or a solicitation to buy/sell securities or list assets.</li>
      </ul>
      <p>
        All content, including currency rates, stock valuations, financial ratios, historical reports, and economic benchmarks, is published for general educational and informational purposes. The owner of the website is not a licensed financial advisor, broker, dealer, or investment manager under the Financial Supervisory Authority (ASF) or any other regulatory body. Users are strongly urged to consult with a qualified, licensed financial advisor or professional before making any financial, business, or investment decisions.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">3. Sources & Data Accuracy</h2>
      <p>
        Financial and statistical figures rendered on this platform are extracted directly from official, publicly accessible sources, such as:
      </p>
      <ul className="list-disc pl-5 space-y-1 text-neutral-300">
        <li>The National Bank of Romania (Banca Națională a României — BNR) currency exchange feed;</li>
        <li>The Bucharest Stock Exchange (Bursa de Valori București — BVB) issuer pages and IRIS reporting service;</li>
        <li>Official public company reports, factsheets, and regulatory disclosures.</li>
      </ul>
      <p>
        While we verify the provenance of all numbers before publication, they represent historical disclosures and may be subject to delays or parsing errors. We display clear source attributions and reporting dates. We do not guarantee the completeness or accuracy of third-party datasets, and users should verify important metrics directly at the primary source.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">4. Intellectual Property</h2>
      <p>
        The proprietary layout, design tokens, visual identity, original articles, newsletters, graphics, and custom code of AiX Media are owned by Cristian Văduva. Reproduction, distribution, modification, or commercial exploitation of any proprietary material without explicit prior written authorization is strictly prohibited. Permitted use is limited to personal, non-commercial research.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">5. External Links Disclaimer</h2>
      <p>
        This website contains links to external, third-party sites (such as official BVB factsheets or company IR sites). These links are provided solely as a research convenience. The operator of AiX Media exerts no control over the content, security, privacy policies, or availability of these external platforms and assumes no responsibility or liability for their use.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">6. Website Availability</h2>
      <p>
        The operator reserves the right to modify, suspend, or discontinue any portion, feature, or database configuration on the website at any time without prior notice. The website is provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranty of any kind.
      </p>
    </section>
  );
}
