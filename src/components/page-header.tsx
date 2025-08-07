import Link from 'next/link';
import { ChevronLeft, Home } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
  icon?: React.ReactNode;
}

export default function PageHeader({ 
  title, 
  description, 
  backHref = '/vibe-tank',
  backLabel = 'Vibe智库',
  icon
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {/* 返回链接 */}
      <Link 
        href={backHref}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ChevronLeft className="w-4 h-4" />
        {backLabel}
      </Link>
      
      {/* 页面标题 */}
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-primary">{icon}</div>}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      
      {/* 页面描述 */}
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
}