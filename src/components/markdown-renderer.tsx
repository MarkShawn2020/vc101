'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkEmoji from 'remark-emoji';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { useMemo } from 'react';
import { createSlug } from '@/lib/markdown-utils';

// Import our custom highlight.js styles
import '@/styles/highlight.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  // Pre-process content to generate consistent heading IDs
  const { processedContent, headingIds } = useMemo(() => {
    const usedSlugs = new Map<string, number>();
    const ids = new Map<string, string>();
    
    // Extract all headings from content to pre-generate IDs
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    let match;
    const headings: Array<{ level: number; text: string; line: number }> = [];
    
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: match[1].length,
        text: match[2].trim(),
        line: match.index
      });
    }
    
    // Generate consistent IDs for all headings
    headings.forEach((heading) => {
      const baseSlug = createSlug(heading.text);
      let finalId;
      
      if (usedSlugs.has(baseSlug)) {
        const count = usedSlugs.get(baseSlug)! + 1;
        usedSlugs.set(baseSlug, count);
        finalId = `${baseSlug}-${count}`;
      } else {
        usedSlugs.set(baseSlug, 0);
        finalId = baseSlug;
      }
      
      ids.set(heading.text, finalId);
    });
    
    return {
      processedContent: content,
      headingIds: ids
    };
  }, [content]);
  
  // Helper function to get pre-generated heading ID
  const getHeadingId = (children: React.ReactNode): string => {
    if (typeof children === 'string') {
      return headingIds.get(children.trim()) || createSlug(children);
    }
    return '';
  };

  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[
          remarkGfm,        // GitHub Flavored Markdown (tables, strikethrough, etc.)
          remarkBreaks,     // Line breaks
          remarkEmoji,      // Emoji support :smile:
        ]}
        rehypePlugins={[
          rehypeRaw,        // Allow HTML in markdown
          rehypeSanitize,   // Sanitize HTML for security
          rehypeHighlight   // Syntax highlighting
        ]}
        components={{
          // Custom heading renderer with anchor links
          h1: ({ children, ...props }) => {
            const id = getHeadingId(children);
            return (
              <h1 id={id} className="group relative" {...props}>
                {children}
                {id && (
                  <a 
                    href={`#${id}`} 
                    className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700"
                    aria-label="Link to heading"
                  >
                    #
                  </a>
                )}
              </h1>
            );
          },
          h2: ({ children, ...props }) => {
            const id = getHeadingId(children);
            return (
              <h2 id={id} className="group relative" {...props}>
                {children}
                {id && (
                  <a 
                    href={`#${id}`} 
                    className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700"
                    aria-label="Link to heading"
                  >
                    #
                  </a>
                )}
              </h2>
            );
          },
          h3: ({ children, ...props }) => {
            const id = getHeadingId(children);
            return (
              <h3 id={id} className="group relative" {...props}>
                {children}
                {id && (
                  <a 
                    href={`#${id}`} 
                    className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700"
                    aria-label="Link to heading"
                  >
                    #
                  </a>
                )}
              </h3>
            );
          },
          h4: ({ children, ...props }) => {
            const id = getHeadingId(children);
            return (
              <h4 id={id} className="group relative" {...props}>
                {children}
                {id && (
                  <a 
                    href={`#${id}`} 
                    className="absolute -left-6 top-0 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 hover:text-blue-700"
                    aria-label="Link to heading"
                  >
                    #
                  </a>
                )}
              </h4>
            );
          },
          
          // Enhanced code blocks
          code: ({ inline, className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            
            if (!inline && language) {
              return (
                <div className="relative">
                  {/* Language label */}
                  <div className="absolute top-2 right-2 text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {language}
                  </div>
                  <code className={className} {...props}>
                    {children}
                  </code>
                </div>
              );
            }
            
            return (
              <code 
                className={`${className} bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm`} 
                {...props}
              >
                {children}
              </code>
            );
          },
          
          // Enhanced pre blocks
          pre: ({ children, ...props }) => (
            <pre 
              className="relative overflow-x-auto bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4" 
              {...props}
            >
              {children}
            </pre>
          ),
          
          // Enhanced blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote 
              className="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 pl-4 py-2 my-4 italic" 
              {...props}
            >
              {children}
            </blockquote>
          ),
          
          // Enhanced tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table 
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg" 
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          
          th: ({ children, ...props }) => (
            <th 
              className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider" 
              {...props}
            >
              {children}
            </th>
          ),
          
          td: ({ children, ...props }) => (
            <td 
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100 border-t border-gray-200 dark:border-gray-700" 
              {...props}
            >
              {children}
            </td>
          ),
          
          // Enhanced links
          a: ({ href, children, ...props }) => (
            <a 
              href={href}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline underline-offset-2 transition-colors"
              target={href?.startsWith('http') ? '_blank' : undefined}
              rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              {...props}
            >
              {children}
              {href?.startsWith('http') && (
                <span className="inline-block ml-1 text-xs">↗</span>
              )}
            </a>
          ),
          
          // Enhanced lists
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside space-y-2 my-4" {...props}>
              {children}
            </ul>
          ),
          
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside space-y-2 my-4" {...props}>
              {children}
            </ol>
          ),
          
          // Enhanced images
          img: ({ src, alt, ...props }) => (
            <div className="my-6">
              <img 
                src={src} 
                alt={alt}
                className="max-w-full h-auto rounded-lg shadow-md mx-auto"
                loading="lazy"
                {...props}
              />
              {alt && (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2 italic">
                  {alt}
                </p>
              )}
            </div>
          ),
          
          li: ({ children, ...props }) => (
            <li className="leading-relaxed" {...props}>
              {children}
            </li>
          ),
          
          // Task lists (GitHub style)
          input: ({ type, checked, ...props }) => {
            if (type === 'checkbox') {
              return (
                <input 
                  type="checkbox" 
                  checked={checked}
                  disabled
                  className="mr-2 accent-blue-500"
                  readOnly
                  {...props}
                />
              );
            }
            return <input type={type} {...props} />;
          },
          
          // Horizontal rule
          hr: ({ ...props }) => (
            <hr className="my-8 border-gray-300 dark:border-gray-600" {...props} />
          ),
          
          // Paragraphs
          p: ({ children, ...props }) => (
            <p className="leading-relaxed my-4" {...props}>
              {children}
            </p>
          ),
        }}
      >
        {processedContent}
      </ReactMarkdown>
    </div>
  );
}