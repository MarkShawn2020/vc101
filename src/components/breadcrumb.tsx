'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) return null;
  
  const breadcrumbs = [
    { name: 'VibeGenius', href: '/', icon: Home }
  ];
  
  // Build breadcrumb items based on path segments
  const pathMap: Record<string, string> = {
    'vibe-tank': 'Vibe智库',
    'daily': '每日精选',
    'discussions': '观点碰撞',
    'graph': '追溯地图',
    'knowledge': '知识库',
    'insights': '趋势洞察',
    'perspectives': '个人视角',
    'playground': '工坊',
    'community': '社区',
    'ecosystem': '生态',
    'pricing': '定价',
    'about': '关于',
  };
  
  let currentPath = '';
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const name = pathMap[segment] || segment;
    breadcrumbs.push({
      name,
      href: currentPath,
      icon: undefined
    });
  });
  
  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-10 text-sm">
          {breadcrumbs.map((item, index) => (
            <div key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
              )}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-foreground font-medium flex items-center gap-1">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}