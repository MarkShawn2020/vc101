import Hero from "@/components/hero";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Image from "next/image";
import Link from "next/link";
import { ClientLandingPage } from "./client-landing-page";
import VibeGeniusHome from "./vibegenius-home";


// VibeGenius Dashboard Component
const Dashboard = () => (
  <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">欢迎回到 VibeGenius</h1>
        <p className="text-muted-foreground text-sm mt-1">智能知识管理，创造卓越未来</p>
      </div>
      <Button className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-lg text-sm sm:text-base active:scale-95 transition-transform">
        🧠 创建知识
      </Button>
    </div>
    
    {/* 快速导航 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Link href="/vibe-tank" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">🧠</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">Vibe智库</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">AI驱动的知识管理中心</p>
      </Link>
      <Link href="/insights" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">💡</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">深度洞察</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">前沿研究与趋势分析</p>
      </Link>
      <Link href="/playground" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">⚡</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">创作工坊</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">AI编程实验室</p>
      </Link>
      <Link href="/vibe-tank/discussions" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">💬</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">社区空间</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">协作创新与交流</p>
      </Link>
    </div>
    
    {/* 个人统计 */}
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">您的知识贡献</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-6">
        <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">0</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">知识条目</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">0</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">深度评估</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">0</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">观点讨论</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-orange-600 mb-1">0</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">知识连接</div>
        </div>
      </div>
    </div>
  </div>
);


const Index = async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return user ? <Dashboard /> : (
    <>
    <VibeGeniusHome />
    </>
  )
}

export default async function Home() {


  return (
    <main className="flex-1 w-full">
        
        {hasEnvVars ? <Index/> : (
          <>
          <h2 className="font-medium text-lg md:text-xl mb-2 md:mb-4">Get Started</h2>
          <ConnectSupabaseSteps />
          </>
          )}
      
    </main>
  );
}
