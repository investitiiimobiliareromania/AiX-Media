export type EcosystemCategory =
  | "INTELLIGENCE"
  | "REAL_ESTATE_CAPITAL"
  | "PROTECTION_WELLNESS"
  | "AVIATION"
  | "CONSTRUCTION"
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
    id: "home-find",
    name: "HomeFind",
    url: "https://homefind.cristianvaduva.com",
    category: "REAL_ESTATE_CAPITAL",
    categoryLabel: "Real Estate",
    description: "Real estate discovery, property intelligence and transaction infrastructure.",
    isExternal: true,
  },
  {
    id: "insurance",
    name: "Insurance",
    url: "https://insurance.cristianvaduva.com",
    category: "PROTECTION_WELLNESS",
    categoryLabel: "Insurance Advisory",
    description: "Insurance advisory, risk analysis and strategic asset protection.",
    isExternal: true,
  },
  {
    id: "cv-finance",
    name: "CV Finance",
    url: "https://credite.cristianvaduva.com",
    category: "REAL_ESTATE_CAPITAL",
    categoryLabel: "Credit Advisory",
    description: "Credit advisory, mortgage financing options and financial optimization.",
    isExternal: true,
  },
  {
    id: "aix-media",
    name: "AiX Media",
    url: "https://aixmedia.cristianvaduva.com",
    category: "INTELLIGENCE",
    categoryLabel: "Intelligence Media",
    description: "Business, markets, macroeconomic indicators and financial intelligence media.",
    isExternal: false,
  },
  {
    id: "air",
    name: "AIR",
    url: "https://fly.cristianvaduva.com",
    category: "AVIATION",
    categoryLabel: "Aviation",
    description: "The flight and aviation platform in the Cristian Văduva ecosystem.",
    isExternal: true,
  },
  {
    id: "dubai",
    name: "DUBAI",
    url: "https://dubai.cristianvaduva.com",
    category: "REAL_ESTATE_CAPITAL",
    categoryLabel: "Dubai Real Estate",
    description: "Dubai real estate, prime residential properties and international investment platform.",
    isExternal: true,
  },
  {
    id: "constructions",
    name: "CONSTRUCTIONS by AiXLuxury",
    url: "https://constructions.cristianvaduva.com",
    category: "CONSTRUCTION",
    categoryLabel: "Construction & Developers",
    description: "Construction, developers and engineering solutions ecosystem platform.",
    isExternal: true,
  },
  {
    id: "aix-os",
    name: "AiX OS",
    url: "https://os.aixluxury.com",
    category: "INTELLIGENCE",
    categoryLabel: "Operating System",
    description: "AI, automation, intelligence and operational infrastructure.",
    isExternal: true,
  },
  {
    id: "subventii",
    name: "Subvenții",
    url: "https://subventii.ro",
    category: "BUSINESS_FUNDING",
    categoryLabel: "Grants & Subsidies",
    description: "Funding, grants, public programmes and business intelligence for Romania.",
    isExternal: true,
  },
  {
    id: "cristian-vaduva",
    name: "Cristian Văduva",
    url: "https://cristianvaduva.com",
    category: "PERSONAL",
    categoryLabel: "Advisory Network",
    description: "Personal brand, advisory, market intelligence and direct access to Cristian Văduva.",
    isExternal: true,
  },
];

export function getEcosystemCategorized(): Record<
  EcosystemCategory,
  { label: string; items: EcosystemNode[] }
> {
  return {
    REAL_ESTATE_CAPITAL: {
      label: "Real Estate & Capital",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "REAL_ESTATE_CAPITAL"),
    },
    PROTECTION_WELLNESS: {
      label: "Protection & Advisory",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "PROTECTION_WELLNESS"),
    },
    AVIATION: {
      label: "Aviation & Flight",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "AVIATION"),
    },
    CONSTRUCTION: {
      label: "Construction & Development",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "CONSTRUCTION"),
    },
    INTELLIGENCE: {
      label: "Intelligence & Systems",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "INTELLIGENCE"),
    },
    BUSINESS_FUNDING: {
      label: "Business Funding & Grants",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "BUSINESS_FUNDING"),
    },
    PERSONAL: {
      label: "Personal & Advisory",
      items: AIX_ECOSYSTEM_NODES.filter((n) => n.category === "PERSONAL"),
    },
  };
}

export function getContextualEcosystem(topicCategory?: string): EcosystemNode[] {
  if (!topicCategory) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["home-find", "insurance", "cv-finance", "aix-media", "air", "dubai", "constructions", "aix-os"].includes(n.id)
    );
  }

  const topic = topicCategory.toLowerCase();

  if (topic.includes("real-estate") || topic.includes("property") || topic.includes("imobiliar") || topic.includes("dubai")) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["home-find", "dubai", "constructions", "cv-finance", "cristian-vaduva"].includes(n.id)
    );
  }

  if (
    topic.includes("finance") ||
    topic.includes("credit") ||
    topic.includes("business") ||
    topic.includes("markets") ||
    topic.includes("investments") ||
    topic.includes("companies")
  ) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["cv-finance", "subventii", "aix-media", "aix-os", "cristian-vaduva"].includes(n.id)
    );
  }

  if (topic.includes("insurance") || topic.includes("asigurari") || topic.includes("health")) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["insurance", "cv-finance", "aix-media", "cristian-vaduva"].includes(n.id)
    );
  }

  if (topic.includes("aviation") || topic.includes("air") || topic.includes("flight")) {
    return AIX_ECOSYSTEM_NODES.filter((n) =>
      ["air", "aix-media", "cristian-vaduva"].includes(n.id)
    );
  }

  return AIX_ECOSYSTEM_NODES.filter((n) =>
    ["home-find", "insurance", "cv-finance", "aix-media", "air", "dubai", "constructions", "aix-os"].includes(n.id)
  );
}
