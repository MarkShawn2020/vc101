import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "VC101 - Vibe Coding 101",
  description: "Code with the Vibe, Build with the Future - 全球领先的 Human-AI 协同编程社区",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" />
      </head>
      <body className="bg-background text-foreground" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col gap-8 md:gap-20 items-center">
              <nav className="w-full flex justify-center border-b border-b-foreground/10">
                <div className="w-full max-w-5xl flex justify-between items-center py-3 px-4 sm:px-5">
                  <div className="flex items-center gap-4 sm:gap-6">
                    <Link 
                      href={"/"}
                      className="flex items-center gap-2 text-lg sm:text-base font-semibold hover:opacity-70 transition-opacity"
                    >
                      {/*<Logo mode="png" className="h-8 w-auto" color="currentColor" />*/}
                      <span>VC101</span>
                    </Link>
                    
                    {/* 桌面端导航菜单 */}
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                      <Link href="/insights" className="hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1">
                        💡 VC 洞见
                      </Link>
                      <Link href="/arsenal" className="hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1">
                        🔧 VC 军火库
                      </Link>
                      <Link href="/quests" className="hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1">
                        🏆 VC 任务
                      </Link>
                      <Link href="/hackathon" className="hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1">
                        💻 VC 黑客松
                      </Link>
                      <Link href="/ecosystem" className="hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1">
                        🌐 VC 伙伴
                      </Link>
                      <Link href="/resources" className="hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1">
                        📚 VC 资源中心
                      </Link>
                      <Link href="/progress" className="hover:text-primary transition-colors min-h-[44px] flex items-center px-2 py-1">
                        📊 社区进展
                      </Link>
                    </nav>
                    
                    {/* 移动端导航菜单 */}
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
                          <DropdownMenuItem asChild>
                            <Link href="/insights" className="w-full flex items-center gap-2 min-h-[44px] py-3">
                              💡 VC 洞见
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/arsenal" className="w-full flex items-center gap-2 min-h-[44px] py-3">
                              🔧 VC 军火库
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/quests" className="w-full flex items-center gap-2 min-h-[44px] py-3">
                              🏆 VC 任务
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/hackathon" className="w-full flex items-center gap-2 min-h-[44px] py-3">
                              💻 VC 黑客松
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/ecosystem" className="w-full flex items-center gap-2 min-h-[44px] py-3">
                              🌐 VC 伙伴
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/resources" className="w-full flex items-center gap-2 min-h-[44px] py-3">
                              📚 VC 资源中心
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/progress" className="w-full flex items-center gap-2 min-h-[44px] py-3">
                              📊 社区进展
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4">
                    {!hasEnvVars ? (
                      <EnvVarWarning />
                    ) : (
                      <HeaderAuth />
                    )}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-8 md:gap-20 w-full max-w-5xl px-4 sm:px-5">
                {children}
              </div>

              <footer className="w-full flex flex-col md:flex-row items-center justify-center border-t mx-auto text-center text-xs gap-4 md:gap-8 py-8 md:py-16 px-4">
                <p>
                  Powered by{" "}
                  <a
                    href="https://github.com/markshawn2020"
                    target="_blank"
                    className="font-bold hover:underline"
                    rel="noreferrer"
                  >
                    VC101 Community
                  </a>
                </p>
                <ThemeSwitcher />
              </footer>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
