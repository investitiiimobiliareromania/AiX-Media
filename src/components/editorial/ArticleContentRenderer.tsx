import React from 'react';
import Link from 'next/link';
import {
  parseArticleContentToBlocks,
  parseInlineSegments,
  EditorialBlock,
  InlineSegment,
} from '@/lib/article-normalizer';

interface ArticleContentRendererProps {
  content?: string | null;
  className?: string;
}

function FormattedInline({ text }: { text: string }) {
  const segments: InlineSegment[] = parseInlineSegments(text);

  return (
    <>
      {segments.map((seg, idx) => {
        if (seg.type === 'bold') {
          return (
            <strong key={idx} className="font-semibold text-white">
              {seg.text}
            </strong>
          );
        }
        if (seg.type === 'italic') {
          return (
            <em key={idx} className="italic text-neutral-100">
              {seg.text}
            </em>
          );
        }
        if (seg.type === 'link' && seg.href) {
          const isInternal = seg.href.startsWith('/');
          if (isInternal) {
            return (
              <Link
                key={idx}
                href={seg.href}
                className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors font-medium"
              >
                {seg.text}
              </Link>
            );
          }
          return (
            <a
              key={idx}
              href={seg.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 underline underline-offset-4 transition-colors font-medium"
            >
              {seg.text}
            </a>
          );
        }
        return <React.Fragment key={idx}>{seg.text}</React.Fragment>;
      })}
    </>
  );
}

export function ArticleContentRenderer({ content, className = '' }: ArticleContentRendererProps) {
  if (!content) return null;

  const blocks: EditorialBlock[] = parseArticleContentToBlocks(content);

  if (blocks.length === 0) return null;

  return (
    <div className={`article-body-content text-neutral-200 font-serif leading-relaxed ${className}`}>
      {blocks.map((block, idx) => {
        if (block.type === 'heading') {
          if (block.level === 2) {
            return (
              <h2
                key={idx}
                className="text-2xl sm:text-3xl font-bold font-serif text-white mt-10 mb-4 tracking-tight"
              >
                <FormattedInline text={block.text} />
              </h2>
            );
          }
          return (
            <h3
              key={idx}
              className="text-xl sm:text-2xl font-bold font-serif text-white mt-8 mb-3 tracking-tight"
            >
              <FormattedInline text={block.text} />
            </h3>
          );
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote
              key={idx}
              className="p-5 sm:p-6 rounded-2xl bg-neutral-900/90 border-l-4 border-amber-500 italic text-neutral-200 font-serif my-6 shadow-sm leading-relaxed"
            >
              <FormattedInline text={block.text} />
            </blockquote>
          );
        }

        if (block.type === 'list' && block.items && block.items.length > 0) {
          return (
            <ul
              key={idx}
              className="space-y-3 my-6 pl-5 font-serif text-base sm:text-lg text-neutral-200 list-disc list-outside leading-relaxed"
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="pl-1">
                  <FormattedInline text={item} />
                </li>
              ))}
            </ul>
          );
        }

        // Standard editorial paragraph
        return (
          <p
            key={idx}
            className="leading-[1.85] font-serif text-neutral-200 text-base sm:text-lg mb-6"
          >
            <FormattedInline text={block.text} />
          </p>
        );
      })}
    </div>
  );
}
