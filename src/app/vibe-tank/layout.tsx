'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Brain, 
  Calendar, 
  MessageSquare, 
  Network, 
  Database, 
  Settings,
  TrendingUp,
  Home,
  ChevronRight
} from 'lucide-react';

const navigation = [
  { name: '概览', href: '/vibe-tank', icon: Home },
  { name: '每日精选', href: '/vibe-tank/daily', icon: Calendar },
  { name: '观点碰撞', href: '/vibe-tank/discussions', icon: MessageSquare },
  { name: '追溯地图', href: '/vibe-tank/graph', icon: Network },
  { name: '知识库', href: '/vibe-tank/knowledge', icon: Database },
  { name: '趋势洞察', href: '/vibe-tank/insights', icon: TrendingUp },
  { name: '个人视角', href: '/vibe-tank/perspectives', icon: Settings },
];

export default function VibeTankLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      {/* Top Navigation Bar */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Logo */}
            <Link href="/vibe-tank" className="flex items-center gap-2 mr-8">
              <Brain className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg">Vibe智库</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-1 flex-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href || 
                               (item.href !== '/vibe-tank' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                      ${isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden md:inline">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Back to main site */}
            <Link 
              href="/"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              返回主站
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}