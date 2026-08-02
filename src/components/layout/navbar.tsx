"use client";



import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, Shield, Car, Briefcase, Building2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";


import { motion, AnimatePresence } from "framer-motion";

const megaMenuData = [
  {
    title: "Asigurări Personale",
    icon: <Shield className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurare Locuință", href: "/servicii/home-insurance" },
      { name: "Asigurare Viață", href: "/servicii/life-insurance" },
      { name: "Asigurare Sănătate", href: "/servicii/health-insurance" },
      { name: "Asigurare Accidente", href: "/servicii/accident-insurance" },
    ]
  },
  {
    title: "Auto & Călătorii",
    icon: <Car className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurare RCA", href: "/servicii/rca-insurance" },
      { name: "Asigurare CASCO", href: "/servicii/casco-insurance" },
      { name: "Asigurare Flote Auto", href: "/servicii/fleet-insurance" },
      { name: "Asistență Rutieră", href: "/servicii/roadside-assistance" },
      { name: "Travel Individual", href: "/servicii/travel-insurance-individual" },
      { name: "Travel Familie", href: "/servicii/travel-insurance-family" },
      { name: "Travel Business", href: "/servicii/travel-business-insurance" },
      { name: "Travel Multi-Trip", href: "/servicii/travel-insurance-annual" },
    ]
  },
  {
    title: "Business & Răspunderi",
    icon: <Briefcase className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurări IMM", href: "/servicii/imm-insurance" },
      { name: "Clădiri Comerciale", href: "/servicii/business-building-insurance" },
      { name: "Bunuri Business", href: "/servicii/business-goods-insurance" },
      { name: "Răspundere Generală", href: "/servicii/business-general-liability" },
      { name: "Răspundere Profesională", href: "/servicii/business-professional-liability" },
      { name: "Răspunderea Managerilor (D&O)", href: "/servicii/business-directors-liability" },
      { name: "Malpraxis Medical", href: "/servicii/business-malpractice-insurance" },
    ]
  },
  {
    title: "Corporate & Speciale",
    icon: <Building2 className="w-5 h-5 mb-2 text-blue-600" />,
    items: [
      { name: "Asigurare Cyber Risk", href: "/servicii/business-cyber-insurance" },
      { name: "Asigurare Cargo (Marfă)", href: "/servicii/business-cargo-insurance" },
      { name: "Asigurare Șantier (CAR)", href: "/servicii/business-construction-insurance" },
      { name: "Asigurare Echipamente", href: "/servicii/business-equipment-insurance" },
      { name: "Business Interruption", href: "/servicii/business-interruption-insurance" },
      { name: "Sănătate Corporate", href: "/servicii/health-insurance-corporate" },
    ]
  }
];

const ecosystemMenuData = [
  {
    title: "Platformă & Core",
    items: [
      { name: "Centru Urgențe", href: "/urgente" },
    ],
  },
  {
    title: "AiX Intelligence",
    items: [
      { name: "Mission Control", href: "/mission-control" },
      { name: "Risk Simulator", href: "/risk-simulator" },
      { name: "Life Simulator", href: "/simulator" },
      { name: "Financial Twin", href: "/financial-twin" },
    ],
  },
  {
    title: "AiX Tools",
    items: [
      { name: "Luxury Garage", href: "/luxury-garage" },
      { name: "Client Journey", href: "/client-journey" },
      { name: "Smart Forms", href: "/smart-forms" },
      { name: "Wealth Passport", href: "/wealth-passport" },
      { name: "RE Analyzer", href: "/investitii-imobiliare/analyzer" },
    ],
  },
  {
    title: "Resurse & Consultanță",
    items: [
      { name: "AiX Academy", href: "/academy" },
      { name: "Recomandă-mi Asigurarea Potrivită", href: "/advisor" },
      { name: "Coverage Gap", href: "/gap-analyzer" },
    ],
  },
];

// Credits menu links (dropdown similar to mega menu but single column)
const creditsMenuLinks = [
  { name: "Credit Ipotecar", href: "/credite/credit-ipotecar" },
  { name: "Noua Casă", href: "/credite/credit-noua-casa" },
  { name: "Refinanțare", href: "/credite/credit-refinantare" },
  { name: "Credit de Nevoi Personale", href: "/credite/credit-nevoi-personale" },
  { name: "Credit pentru Investiții Imobiliare", href: "/credite/credit-investitii-imobiliare" },
  { name: "Credit pentru Firme", href: "/credite/credit-persoane-juridice" },
  { name: "Consolidare Credite", href: "/credite/consolidare-credite" },
  { name: "Compară Bănci", href: "/credite/compara-banci" },
  { name: "De ce să lucrezi cu un Broker de Credite", href: "/credite/de-ce-broker" },
  { name: "Procesul de Aprobare", href: "/credite/proces-aprobare" },
  { name: "Documente Necesare", href: "/credite/documente-necesare" },
  { name: "Întrebări Frecvente", href: "/credite/faq" },
  { name: "Contact Broker Credite", href: "/credite/contact-broker-credite" },
  { name: "Credit pentru Construcții", href: "/credite/credit-constructii" },
  { name: "Credit Verde", href: "/credite/credit-verde" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [activeMobileMegaMenu, setActiveMobileMegaMenu] = React.useState<number | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);


  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicks outside the mobile menu and Escape key to close menu
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!isMobileMenuOpen) return;
      const target = e.target as Node;
      if (buttonRef.current && buttonRef.current.contains(target)) return;
      if (menuRef.current && menuRef.current.contains(target)) return;
      setIsMobileMenuOpen(false);
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);


  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b",
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-border/50 shadow-sm py-3"
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start justify-center gap-0.5 relative z-50">
            <Link href="/" className="font-heading font-bold text-xl tracking-tight leading-none text-foreground flex items-center hover:text-foreground transition-colors">
              <Home className="w-5 h-5 mr-1" />
              Insurance
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Credits Dropdown */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-4">
                Credite
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-border/50 shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-4 group-hover:translate-y-0 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* 🏠 Locuință */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">🏠 Locuință</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Credit Ipotecar",
                        "Noua Casă",
                        "Refinanțare",
                        "Credit pentru Construcții",
                        "Credit Verde"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* 💼 Investiții & Business */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">💼 Investiții & Business</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Credit pentru Investiții Imobiliare",
                        "Credit pentru Firme",
                        "Consolidare Credite"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* 📊 Informații utile */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">📊 Informații utile</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Compară Bănci",
                        "De ce să lucrezi cu un Broker de Credite"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* ❓ Suport */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">❓ Suport</h4>
                    <ul className="space-y-1">
                      {creditsMenuLinks.filter(i => [
                        "Întrebări Frecvente",
                        "Contact Broker Credite"
                      ].includes(i.name)).map((item, i) => (
                        <li key={i}>
                          <Link href={item.href} className="block text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Mega Menu Trigger */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-4">
                Asigurări
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white border border-border/50 shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-4 group-hover:translate-y-0 p-8">
                <div className="grid grid-cols-4 gap-8">
                  {megaMenuData.map((col, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex flex-col items-start mb-4 pb-4 border-b border-border/50">
                        {col.icon}
                        <h4 className="font-bold text-foreground text-sm tracking-tight">{col.title}</h4>
                      </div>
                      <ul className="space-y-3">
                        {col.items.map((item, j) => (
                          <li key={j}>
                            <Link href={item.href} className="text-sm text-muted-foreground hover:text-blue-600 transition-colors block">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                {typeof window !== 'undefined' && (
                <div className="mt-8 pt-6 border-t border-border/50 flex justify-between items-center bg-muted/30 -mx-8 -mb-8 p-6 rounded-b-3xl">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">Nu ești sigur ce să alegi?</span> Încearcă noul Recomandă-mi Asigurarea Potrivită.
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 rounded-full" asChild>
                    <Link href="/advisor">Deschide Recomandă-mi Asigurarea Potrivită</Link>
                  </Button>
                </div>
              )}
              </div>
            </div>

            

            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-4">
                Ecosistem AiX
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[900px] bg-white border border-border/50 shadow-2xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-4 group-hover:translate-y-0 p-8 z-50">
                <div className="grid grid-cols-4 gap-8">
                  {ecosystemMenuData.map((col, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex flex-col items-start mb-4 pb-4 border-b border-border/50">
                        <h4 className="font-bold text-foreground text-sm tracking-tight">{col.title}</h4>
                      </div>
                      <ul className="space-y-3">
                        {col.items.map((item, j) => (
                          <li key={j}>
                            <Link href={item.href} className="text-sm text-muted-foreground hover:text-blue-600 transition-colors block">
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="rounded-full border-border hover:bg-muted" asChild>
              <Link href="/gap-analyzer">Gap Analyzer</Link>
            </Button>
            <Button variant="outline" className="rounded-full border-border hover:bg-muted" asChild>
              <Link href="/calculatoare">Calculatoare</Link>
            </Button>
            <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 font-semibold shadow-xl" asChild>
              <Link href="/oferta-rapida">Ofertă Rapidă</Link>
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            aria-label="Toggle mobile navigation menu"
            className="md:hidden flex items-center justify-center w-12 h-12 p-2 text-foreground bg-transparent relative z-60 cursor-pointer"
            ref={buttonRef}
            onClick={(e) => { e.stopPropagation(); setIsMobileMenuOpen(prev => !prev); }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {/* Outside click and Escape handling */}
          
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-0 left-0 right-0 bottom-0 bg-white z-40 overflow-y-auto pt-24 pb-24 px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              {/* Credits Mobile Accordion */}
              <div className="flex flex-col border-b border-border/50">
                <button
                  className="text-2xl font-bold p-2 text-left flex justify-between items-center"
                  onClick={() => setActiveMobileMegaMenu(activeMobileMegaMenu === 3 ? null : 3)}
                >
                  Credite
                  <ChevronDown className={cn("w-6 h-6 transition-transform", activeMobileMegaMenu === 3 ? "rotate-180" : "")} />
                </button>
                {activeMobileMegaMenu === 3 && (
                  <div className="pl-4 pb-4 flex flex-col gap-3">
                    {creditsMenuLinks.map((item, i) => (
                      <Link key={i} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground py-1 pl-7">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Asigurări Mobile Accordion */}
              <div className="flex flex-col border-b border-border/50">
                <button
                  className="text-2xl font-bold p-2 text-left flex justify-between items-center"
                  onClick={() => setActiveMobileMegaMenu(activeMobileMegaMenu === 1 ? null : 1)}
                >
                  Asigurări
                  <ChevronDown className={cn("w-6 h-6 transition-transform", activeMobileMegaMenu === 1 ? "rotate-180" : "")} />
                </button>
                {activeMobileMegaMenu === 1 && (
                  <div className="pl-4 pb-4 flex flex-col gap-6">
                    {megaMenuData.map((col, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <h4 className="font-bold text-blue-600 flex items-center gap-2 mt-2">{col.icon} {col.title}</h4>
                        {col.items.map((item, j) => (
                          <Link key={j} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-base text-muted-foreground py-1 pl-7">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Ecosistem AiX Mobile Accordion */}
              <div className="flex flex-col border-b border-border/50">
                <button
                  className="text-2xl font-bold p-2 text-left flex justify-between items-center"
                  onClick={() => setActiveMobileMegaMenu(activeMobileMegaMenu === 2 ? null : 2)}
                >
                  Ecosistem AiX
                  <ChevronDown className={cn("w-6 h-6 transition-transform", activeMobileMegaMenu === 2 ? "rotate-180" : "")} />
                </button>
                {activeMobileMegaMenu === 2 && (
                  <div className="pl-4 pb-4 flex flex-col gap-6 bg-slate-50/50 p-4 rounded-2xl">
                    {ecosystemMenuData.map((col, i) => (
                      <div key={i} className="flex flex-col gap-2">
                        <h4 className="font-bold text-xs text-slate-400 uppercase tracking-widest mt-2">{col.title}</h4>
                        {col.items.map((item, j) => (
                          <Link key={j} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="text-base text-slate-800 py-1 font-semibold">
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* De Ce Asigurări Link */}
              <Link href="/de-ce-asigurari" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold p-2 border-b border-border/50">
                De Ce Asigurări
              </Link>

              {/* Real Estate Link */}
              <Link href="/real-estate" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold p-2 border-b border-border/50">
                Real Estate
              </Link>

              {/* Despre Mine Link */}
              <Link href="/despre-mine" onClick={() => setIsMobileMenuOpen(false)} className="text-2xl font-bold p-2 border-b border-border/50">
                Despre Mine
              </Link>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 mt-8">
                <Button variant="outline" className="w-full h-14 text-lg justify-center rounded-full border-blue-500 text-blue-600 font-medium" asChild>
                  <Link href="/oferta-rapida" onClick={() => setIsMobileMenuOpen(false)}>Ofertă Rapidă</Link>
                </Button>
                <Button className="w-full h-14 text-lg justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg" asChild>
                  <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Solicită Consultanță</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
