export type EcosystemCategory =
  | "INTELLIGENCE"
  | "REAL_ESTATE_CAPITAL"
  | "PROTECTION_WELLNESS"
  | "BUSINESS_FUNDING"
  | "PERSONAL";

export interface EcosystemNode {
  id: string;
  name: string;
  url: string;
  category: EcosystemCategory;
  categoryLabel: string;
  description: string;
  isExternal: boolean;
  accent?: string;
}

export const AIX_ECOSYSTEM_NODES: EcosystemNode[] = [
  {
    id: "aix-os",
    name: "AiX OS",
    url: "https://os.cristianvaduva.com",
    category: "INTELLIGENCE",
    categoryLabel: "Intelligence",
    description: "AI, automation, intelligence and operational infrastructure.",
    isExternal: true,
  },
  {
    id: "market-pulse",
    name: "Market Pulse",
    url: "https://cristianvaduva.com/market-pulse",
    category: "INTELLIGENCE",
    categoryLabel: "Intelligence",
    description: "Analize macroeconomice, cotații oficiale BNR și sinteze din piața de capital.",
    isExternal: true,
  },
  {
    id: "home-find",
    name: "Home Find",
    url: "https://homefind.cristianvaduva.com",
    category: "REAL_ESTATE_CAPITAL",
    categoryLabel: "Real Estate & Capital",
    description: "Real estate discovery, property intelligence and transaction infrastructure.",
    isExternal: true,
  },
  {
    id: "aix-luxury",
    name: "AiXLuxury",
    url: "https://aixluxury.com",
    category: "REAL_ESTATE_CAPITAL",
    categoryLabel: "Real Estate & Capital",
    description: "Luxury real estate, private opportunities and UHNW investment intelligence.",
    isExternal: true,
  },
  {
    id: "credite",
    name: "Credite",
    url: "https://credite.cristianvaduva.com",
    category: "REAL_ESTATE_CAPITAL",
    categoryLabel: "Real Estate & Capital",
    description: "Credit advisory, financing options and structured lending solutions.",
    isExternal: true,
  },
  {
    id: "insurance",
    name: "Insurance",
    url: "https://insurance.cristianvaduva.com",
    category: "PROTECTION_WELLNESS",
    categoryLabel: "Protection & Wellness",
    description: "Insurance advisory and strategic asset protection.",
    isExternal: true,
  },
  {
    id: "health",
    name: "Health",
    url: "https://health.cristianvaduva.com",
    category: "PROTECTION_WELLNESS",
    categoryLabel: "Protection & Wellness",
    description: "Digital health intelligence, personalized protocols and wellness technology.",
    isExternal: true,
  },
  {
    id: "subventii",
    name: "Subvenții",
    url: "https://subventii.cristianvaduva.com",
    category: "BUSINESS_FUNDING",
    categoryLabel: "Business Funding",
    description: "Funding, grants, public programmes and business intelligence for Romania.",
    isExternal: true,
  },
  {
    id: "cristian-vaduva",
    name: "Cristian Văduva",
    url: "https://cristianvaduva.com",
    category: "PERSONAL",
    categoryLabel: "Personal",
    description: "Personal brand, advisory, market intelligence and direct access to Cristian Văduva.",
    isExternal: true,
  },
];

export function getEcosystemCategorized(): Record<
  EcosystemCategory,
  { label: string; items: EcosystemNode[] }
> {
  return {
    INTELLIGENCE: {
      label: "Intelligence",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "INTELLIGENCE"),
    },
    REAL_ESTATE_CAPITAL: {
      label: "Real Estate & Capital",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "REAL_ESTATE_CAPITAL"),
    },
    PROTECTION_WELLNESS: {
      label: "Protection & Wellness",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "PROTECTION_WELLNESS"),
    },
    BUSINESS_FUNDING: {
      label: "Business Funding",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "BUSINESS_FUNDING"),
    },
    PERSONAL: {
      label: "Personal",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "PERSONAL"),
    },
  };
}

export function getContextualEcosystem(topicCategory?: string): EcosystemNode[] {
  if (!topicCategory) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["aix-os", "market-pulse", "cristian-vaduva"].includes(n.id)
    );
  }

  const topic = topicCategory.toLowerCase();

  if (topic.includes("real-estate") || topic.includes("property") || topic.includes("imobiliar")) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["home-find", "aix-luxury", "cristian-vaduva", "market-pulse"].includes(n.id)
    );
  }

  if (
    topic.includes("finance") ||
    topic.includes("business") ||
    topic.includes("markets") ||
    topic.includes("investments") ||
    topic.includes("companies")
  ) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["aix-os", "credite", "subventii", "market-pulse"].includes(n.id)
    );
  }

  if (topic.includes("insurance") || topic.includes("asigurari") || topic.includes("health")) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["insurance", "health", "aix-os", "cristian-vaduva"].includes(n.id)
    );
  }

  return AIX_ECOSYSTEM_NODES.filter((n) =>
    ["aix-os", "market-pulse", "cristian-vaduva"].includes(n.id)
  );
}
