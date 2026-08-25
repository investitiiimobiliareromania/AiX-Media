import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "@/components/common/json-ld";
import { siteConfig } from "@/config/site";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  const allItems: BreadcrumbItem[] = [
    { label: "AiX Media", href: "/" },
    ...items,
  ];

  const breadcrumbListSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href
        ? item.href.startsWith("http")
          ? item.href
          : `${siteConfig.url}${item.href}`
        : `${siteConfig.url}`,
    })),
  };

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-1.5 text-xs font-mono text-neutral-400 overflow-x-auto no-scrollbar py-1 ${className}`}
    >
      <JsonLd data={breadcrumbListSchema} />

      <ol className="flex items-center space-x-1.5">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center space-x-1.5 shrink-0">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-neutral-600 shrink-0" aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span
                  className="text-neutral-200 font-medium truncate max-w-[200px] sm:max-w-[320px]"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  {isFirst && <Home className="w-3 h-3 text-amber-500/80" aria-hidden="true" />}
                  <span>{item.label}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
