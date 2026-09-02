import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.economedia.ro",
      },
      {
        protocol: "https",
        hostname: "economedia.ro",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cristianvaduva.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/podcast/:path*",
        destination: "/tv",
        permanent: false,
      },
      {
        source: "/podcasts/:path*",
        destination: "/tv",
        permanent: false,
      },
      {
        source: "/insurance/ghid-asigurare-patrimoniu-locuinte-pad-facultativa",
        destination: "/insurance",
        permanent: false,
      },
      {
        source: "/insurance/asigurare-patrimoniu-locuinte-pad-facultativa",
        destination: "/insurance",
        permanent: false,
      },
      {
        source: "/insurance/corporate-risk-management-protectia-activelor-imobiliare",
        destination: "/insurance",
        permanent: false,
      },
      {
        source: "/credits/ghid-credit-ipotecar-ircc-dobanda-fixa-variabila",
        destination: "/credits",
        permanent: false,
      },
      {
        source: "/credits/credit-ipotecar-ircc-dobanda-fixa-variabila",
        destination: "/credits",
        permanent: false,
      },
      {
        source: "/credits/refinantare-ipotecara-optimizare-cost-capital-grad-indatorare",
        destination: "/credits",
        permanent: false,
      },
      {
        source: "/news/ghid-asigurare-patrimoniu-locuinte-pad-facultativa",
        destination: "/insurance",
        permanent: false,
      },
      {
        source: "/news/asigurare-patrimoniu-locuinte-pad-facultativa",
        destination: "/insurance",
        permanent: false,
      },
      {
        source: "/news/corporate-risk-management-protectia-activelor-imobiliare",
        destination: "/insurance",
        permanent: false,
      },
      {
        source: "/news/ghid-credit-ipotecar-ircc-dobanda-fixa-variabila",
        destination: "/credits",
        permanent: false,
      },
      {
        source: "/news/credit-ipotecar-ircc-dobanda-fixa-variabila",
        destination: "/credits",
        permanent: false,
      },
      {
        source: "/news/refinantare-ipotecara-optimizare-cost-capital-grad-indatorare",
        destination: "/credits",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
