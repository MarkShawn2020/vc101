'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: '/vibe-tank', label: '智库', icon: '🧠' },
  { href: '/playground', label: '工坊', icon: '⚡' },
  { href: '/community', label: '社区', icon: '💬' },
  { href: '/ecosystem', label: '生态', icon: '🌐' },
  { href: '/pricing', label: '定价', icon: '💎' },
];

export default function MainNavigation() {
  const pathname = usePathname();
  
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname === href || pathname.startsWith(href + '/');
  };
  
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {navItems.map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className={`
              hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1
              ${isActive(item.href) ? 'text-primary font-medium' : ''}
            `}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </nav>
      
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-11 h-11">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" x2="21" y1="6" y2="6"/>
                <line x1="3" x2="21" y1="12" y2="12"/>
                <line x1="3" x2="21" y1="18" y2="18"/>
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {navItems.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link 
                  href={item.href} 
                  className={`
                    w-full flex items-center gap-2 min-h-[44px] py-3
                    ${isActive(item.href) ? 'text-primary font-medium' : ''}
                  `}
                >
                  {item.icon} {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}