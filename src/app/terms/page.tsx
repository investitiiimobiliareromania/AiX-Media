import React from "react";
import { contactConfig } from "@/config/contact";

export const metadata = {
  title: "Terms of Use — AiX Media",
  description: "Official Terms of Use governing access to and usage of the AiX Media terminal and media platform.",
};

export default function TermsPage() {
  return (
    <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 prose prose-invert prose-amber font-sans">
      <h1 className="text-3xl font-black text-white border-b border-neutral-800 pb-4">Terms of Use</h1>
      <p className="text-xs font-mono text-neutral-500">Effective Date: August 8, 2026</p>

      <p className="lead text-neutral-300">
        Welcome to AiX Media. These Terms of Use (&quot;Terms&quot;) govern your access to and use of our website, including its subpages, company database, terminal widgets, and RSS or newsletter distributions (collectively, the &quot;Platform&quot;).
      </p>

      <h2 className="text-xl font-bold text-white mt-8">1. Acceptance of Terms</h2>
      <p>
        By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our Privacy Policy, Cookie Policy, and GDPR disclosures. If you do not agree to these Terms, you must immediately discontinue your use of the Platform.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">2. Website Purpose</h2>
      <p>
        AiX Media is a personal digital media, analysis, and research project created and edited by Cristian Văduva. The Platform serves as an informational channel covering CEE corporate profiles, capital markets trends, utility sectors, economic statistics, and related financial news. It is not a commercial enterprise or a registered financial agency.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">3. Eligibility and Lawful Use</h2>
      <p>
        You must use this Platform in compliance with all applicable local, national, and international laws and regulations. You agree not to use the Platform for any fraudulent or malicious activity, including attempting to breach our security frameworks or scrape database details using automated crawlers without prior authorization.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">4. Informational Nature of Content</h2>
      <p>
        All articles, newsletters, audio recordings, podcast transcripts, visual reports, timelines, and dataset values are provided for general educational, illustrative, and informational purposes only. The information does not constitute personalized advisory services or financial due diligence.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">5. Financial & Investment Disclaimer</h2>
      <p className="text-amber-400 font-semibold">
        No content on this Platform constitutes investment, financial, tax, legal, or accounting advice.
      </p>
      <p>
        The operator is not a licensed financial investment consultant or broker. Financial markets, stock values, interest rates, and commodity prices involve significant risk. Past performance is not indicative of future results. You are solely responsible for conducting your own research and due diligence and verifying any data before committing to any transactions or investments.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">6. Market Data & Indexes Disclaimer</h2>
      <p>
        All stock prices, market capitalizations, valuation ratios (P/E, P/B), dividend yields, interest benchmarks (ROBOR, IRCC), and index levels (BET, BET-TR) displayed on this Platform are static, historical, and indicative. They are not updated in real-time. Do not make trading decisions based on these figures. If you require real-time market data, please consult a licensed broker or the official exchange infrastructure directly.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">7. Accuracy, Provenance, and Timeliness</h2>
      <p>
        We strive to ensure that all numbers are sourced directly from authoritative public archives (such as BNR XML feeds or BVB disclosures) and that reporting periods (e.g. FY 2025) are clearly stated. However, we do not warrant that the Platform is free of typographical errors, omissions, or delays.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">8. Third-Party Sources</h2>
      <p>
        Some data points and corporate events represent disclosures from third-party issuers. We present these in good faith as reported by the respective companies. The operator is not responsible for auditing or verifying the accuracy of third-party public corporate sheets.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">9. Intellectual Property</h2>
      <p>
        The Platform design, customized widgets, graphics, brand tokens, and original written journalism are the sole intellectual property of Cristian Văduva. You are granted a limited, personal, non-exclusive, non-transferable, and revocable license to access the content for private, non-commercial review. Any unauthorized commercial reuse, reproduction, or republication of our material is strictly prohibited.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">10. User Conduct & Submitted Information</h2>
      <p>
        When using our contact form or subscribing to our newsletters, you agree to submit only truthful, accurate, and non-infringing information. You are prohibited from submitting any harmful software, spam, or promotional material through the Platform form endpoints.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">11. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by applicable law, the operator shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of or inability to use the Platform, or your reliance on any financial or market information displayed herein.
      </p>
      <p className="italic text-neutral-400">
        &quot;Nothing in these Terms excludes or limits liability to the extent such exclusion or limitation is prohibited by applicable law.&quot;
      </p>

      <h2 className="text-xl font-bold text-white mt-8">12. No Guarantee of Results</h2>
      <p>
        The operator provides no guarantee of website uptime, data freshness, or that form transmissions will be completed successfully. You use the Platform at your own risk.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">13. Privacy & Cookies</h2>
      <p>
        Your privacy is paramount. Please review our Privacy Policy and Cookie Policy to understand how we collect, handle, and store user-submitted information and utilize client-side preferences.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">14. Changes to Terms</h2>
      <p>
        We reserve the right to amend these Terms at any time. Any changes will be posted on this page with an updated effective date. Continued use of the Platform following any modifications constitutes acceptance of the revised Terms.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">15. Applicable Law and Jurisdiction</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the laws of Romania. Any disputes arising out of or in connection with the use of this Platform shall be subject to the exclusive jurisdiction of the competent courts in Bucharest, Romania.
      </p>

      <h2 className="text-xl font-bold text-white mt-8">16. Contact Information</h2>
      <p>
        If you have any questions regarding these Terms, please contact us at:
      </p>
      <p className="font-mono text-xs text-neutral-400">
        Owner: {contactConfig.name}<br />
        Email: {contactConfig.email}<br />
        Telephone: {contactConfig.phoneDisplay}
      </p>
    </section>
  );
}
