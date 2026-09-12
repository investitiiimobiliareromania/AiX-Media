import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.economedia.ro https://economedia.ro https://images.unsplash.com https://cristianvaduva.com https://i.ytimg.com https://img.youtube.com https://*.supabase.co",
  "font-src 'self' data:",
  "connect-src 'self' https://curs.bnr.ro https://*.supabase.co wss://*.supabase.co https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://youtube.com",
  "media-src 'self' https://stream.aixmedia.ro blob: data:",
].join("; ");

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
      ]
    : []),
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
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
  },
  {
    key: "Content-Security-Policy",
    value: contentSecurityPolicy,
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
