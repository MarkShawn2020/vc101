'use client';

import { useState, useEffect } from 'react';
import { List, ChevronRight, ChevronDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { extractTocItems, type TocItem } from '@/lib/markdown-utils';

interface TableOfContentsProps {
  content: string;
  className?: string;
}

export default function TableOfContents({ content, className = '' }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const items = extractTocItems(content);
    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Observer for highlighting active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -80% 0px' }
    );

    // Observe all headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (tocItems.length === 0) return null;

  return (
    <Card className={`p-4 ${className}`}>
      <div 
        className="flex items-center gap-2 cursor-pointer mb-3"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <List className="h-4 w-4 text-blue-600" />
        <h3 className="font-semibold text-sm">目录</h3>
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-gray-400" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400" />
        )}
      </div>
      
      {!isCollapsed && (
        <nav className="space-y-1">
          {tocItems.map((item, index) => (
            <button
              key={index}
              onClick={() => scrollToHeading(item.id)}
              className={`
                block w-full text-left py-1 px-2 text-sm rounded transition-colors
                ${item.level === 1 ? 'font-semibold' : ''}
                ${item.level === 2 ? 'ml-3' : ''}
                ${item.level === 3 ? 'ml-6' : ''}
                ${item.level === 4 ? 'ml-9' : ''}
                ${item.level >= 5 ? 'ml-12' : ''}
                ${activeId === item.id 
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
              `}
            >
              {item.text}
            </button>
          ))}
        </nav>
      )}
    </Card>
  );
}