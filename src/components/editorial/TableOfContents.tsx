'use client';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  // Pure derivation of TOC headings from content during render
  const lines = content.split('\n');
  const headings: TOCItem[] = [];

  lines.forEach((line) => {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match && match[1] && match[2]) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      headings.push({ id, text, level });
    }
  });

  if (headings.length === 0) return null;

  return (
    <nav className="p-6 bg-muted/20 border border-border mb-12">
      <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-muted-foreground mb-4 pb-2 border-b border-border">
        Cuprins Articol
      </h3>
      <ul className="space-y-3 text-sm font-medium">
        {headings.map((item, idx) => (
          <li key={idx} style={{ paddingLeft: `${(item.level - 2) * 1}rem` }}>
            <a 
              href={`#${item.id}`} 
              className="text-foreground/80 hover:text-foreground hover:underline underline-offset-4 transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
