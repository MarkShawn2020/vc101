import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import Link from "next/link";
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
                <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between items-stretch md:items-center py-4 px-5 md:py-3">
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
                    <Link 
                      href={"/"}
                      className="flex items-center gap-2 text-lg md:text-base font-semibold hover:opacity-70 transition-opacity"
                    >
                      {/*<Logo mode="png" className="h-8 w-auto" color="currentColor" />*/}
                      <span>VC101</span>
                    </Link>
                    
                    {/* 主导航菜单 */}
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                      <Link href="/insights" className="hover:text-primary transition-colors">
                        💡 VC 洞见
                      </Link>
                      <Link href="/arsenal" className="hover:text-primary transition-colors">
                        🔧 VC 军火库
                      </Link>
                      <Link href="/quests" className="hover:text-primary transition-colors">
                        🏆 VC 任务
                      </Link>
                      <Link href="/ecosystem" className="hover:text-primary transition-colors">
                        🌐 VC 伙伴
                      </Link>
                      <Link href="/resources" className="hover:text-primary transition-colors">
                        📚 VC 资源中心
                      </Link>
                    </nav>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex justify-center items-center">
                    {!hasEnvVars ? (
                      <EnvVarWarning />
                    ) : (
                      <div className="flex gap-4 items-center">
                        <HeaderAuth />
                      </div>
                    )}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col gap-8 md:gap-20 w-full max-w-5xl px-4 md:px-5">
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
