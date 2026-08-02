import { useTranslations } from "next-intl";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { CONTACT } from "@/config/contact";

const footerLinks = {
  ecosystem: [
    { key: "generali", href: "/generali" },
    { key: "realEstate", href: "/real-estate" },
    { key: "aixLuxury", href: "/aixluxury" },
    { key: "aixOs", href: "/aixos" },
    { key: "homeFind", href: "/home-find" },
    { key: "ecosystemAix", href: "/ecosistem" },
  ],
  servicesPersonal: [
    { key: "lifeInsurance", href: "/servicii/life-insurance" },
    { key: "individualHealth", href: "/servicii/health-insurance-individual" },
    { key: "homeInsurance", href: "/servicii/home-insurance" },
    { key: "travelIndividual", href: "/servicii/travel-insurance-individual" },
    { key: "casco", href: "/servicii/casco-insurance" },
    { key: "rca", href: "/servicii/rca-insurance" },
  ],
  servicesBusiness: [
    { key: "sme", href: "/servicii/imm-insurance" },
    { key: "generalLiability", href: "/servicii/business-general-liability" },
    { key: "cyberRisk", href: "/servicii/business-cyber-insurance" },
    { key: "dol", href: "/servicii/business-directors-liability" },
    { key: "cargo", href: "/servicii/business-cargo-insurance" },
    { key: "construction", href: "/servicii/business-construction-insurance" },
  ],
  tools: [
    { key: "riskSimulator", href: "/risk-simulator" },
    { key: "commandWall", href: "/personal-dashboard" },
    { key: "luxuryGarage", href: "/luxury-garage" },
    { key: "clientJourney", href: "/client-journey" },
    { key: "trustCenter", href: "/trust-center" },
    { key: "smartForms", href: "/smart-forms" },
    { key: "missionControl", href: "/mission-control" },
    { key: "wealthPassport", href: "/wealth-passport" },
    { key: "lifeSimulator", href: "/simulator" },
    { key: "financialTwin", href: "/financial-twin" },
    { key: "familyPlanner", href: "/family-planner" },
    { key: "reAnalyzer", href: "/investitii-imobiliare/analyzer" },
    { key: "luxuryAssets", href: "/luxury-assets" },
    { key: "emergencyCenter", href: "/urgente" },
  ],
  company: [
    { key: "aixAcademy", href: "/academy" },
    { key: "advisor", href: "/advisor" },
    { key: "coverageGap", href: "/gap-analyzer" },
    { key: "protectionMap", href: "/harta-protectiei" },
    { key: "quickOffer", href: "/oferta-rapida" },
    { key: "aixInsights", href: "/insights" },
    { key: "premiumResources", href: "/resurse" },
    { key: "aboutMe", href: "/despre-mine" },
    { key: "contact", href: "/contact" },
  ],
  legal: [
    { key: "terms", href: "/termeni-si-conditii" },
    { key: "privacy", href: "/politica-de-confidentialitate" },
    { key: "cookies", href: "/politica-cookie" },
  ],
};

export function Footer() {
  const t = useTranslations();
  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                Cristian Văduva<span className="text-blue-500">.</span>
              </span>
            </Link>
            <p className="text-white/60 max-w-sm mb-8 leading-relaxed">{t('footer.description')}</p>
            <div className="flex items-center gap-4 text-white/60 mb-8">
              <a href={CONTACT.social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaLinkedin size={20} />
              </a>
              <a href={CONTACT.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaInstagram size={20} />
              </a>
              <a href={CONTACT.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaFacebook size={20} />
              </a>
              <a href={CONTACT.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10">
                <FaYoutube size={20} />
              </a>
            </div>
            <div className="space-y-3 text-sm text-white/80 font-medium bg-white/5 p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">📞</div>
                <a href={CONTACT.phone.href} className="hover:text-white transition-colors">{CONTACT.phone.display}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">💬</div>
                <a href={CONTACT.whatsapp.href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{CONTACT.whatsapp.display}</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">✉️</div>
                <a href={CONTACT.email.href} className="hover:text-white transition-colors">{CONTACT.email.display}</a>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Ecosistem</h3>
            <ul className="space-y-4">
              {footerLinks.ecosystem.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {t(`footer.links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Asigurări pentru Persoane Fizice</h3>
            <ul className="space-y-4">
              {footerLinks.servicesPersonal.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {t(`footer.links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Asigurări pentru Companii</h3>
            <ul className="space-y-4">
              {footerLinks.servicesBusiness.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {t(`footer.links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Unelte Noi</h3>
            <ul className="space-y-4">
              {footerLinks.tools.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {t(`footer.links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6 text-white tracking-wide">Informații</h3>
            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                    {t(`footer.links.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-sm text-center md:text-left font-medium">
            &copy; {new Date().getFullYear()} Cristian Văduva. Toate drepturile rezervate. Powered by cristianvaduva.com
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40 font-medium">
            {footerLinks.legal.map((link) => (
              <Link key={link.key} href={link.href} className="hover:text-white transition-colors">
                {t(`footer.links.${link.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
