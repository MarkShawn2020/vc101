import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import Logo from "@/components/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import VersionBadge from "@/components/version-badge";
import MainNavigation from "@/components/main-navigation";
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
  title: "VibeGenius - Where Intelligence Connects",
  description: "AI增强型智能知识平台 - 打造人机协同的知识管理新纪元，让每个人都能与AI一起创造卓越",
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
                      <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                        VibeGenius
                      </span>
                    </Link>
                    
                    {/* Navigation Component */}
                    <MainNavigation />
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-4">
                    <VersionBadge />
                    {!hasEnvVars ? (
                      <EnvVarWarning />
                    ) : (
                      <HeaderAuth />
                    )}
                  </div>
                </div>
              </nav>
              <div className="flex flex-col w-full">
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
