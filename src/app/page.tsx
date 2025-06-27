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


// VC101 Dashboard Component
const Dashboard = () => (
  <div className="flex flex-col gap-6 sm:gap-8 p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <h1 className="text-xl sm:text-2xl font-bold">欢迎回到 VC101</h1>
      <Button className="w-full sm:w-auto min-h-[44px] px-4 py-2 rounded-lg text-sm sm:text-base active:scale-95 transition-transform">
        📝 发布内容
      </Button>
    </div>
    
    {/* 快速导航 */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Link href="/insights" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">💡</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">VC 洞见</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">浏览最新的 AI 编程文章</p>
      </Link>
      <Link href="/arsenal" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">🔧</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">军火库</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">下载精选编程工具</p>
      </Link>
      <Link href="/quests" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">🏆</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">任务挑战</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">参加黑客松活动</p>
      </Link>
      <Link href="/ecosystem" className="border rounded-lg p-4 sm:p-6 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[120px] sm:min-h-[140px] flex flex-col justify-center active:scale-95">
        <div className="text-xl sm:text-2xl mb-2">🌐</div>
        <h3 className="font-semibold mb-2 text-sm sm:text-base">VC 伙伴</h3>
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">探索 AI 公司产品</p>
      </Link>
    </div>
    
    {/* 个人统计 */}
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">您的社区贡献</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">0</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">发布文章</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">0</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">分享工具</div>
        </div>
        <div className="text-center p-3 sm:p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <div className="text-xl sm:text-2xl font-bold text-green-600 mb-1">0</div>
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">参与活动</div>
        </div>
      </div>
    </div>
  </div>
);


const Index =async () => {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return user ? <Dashboard /> : (
    <>
    <ClientLandingPage />
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
