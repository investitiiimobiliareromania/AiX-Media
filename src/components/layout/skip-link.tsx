import Link from "next/link";

export function SkipLink() {
  return (
    <Link
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:outline-none"
    >
      Skip to main content
    </Link>
  );
}
