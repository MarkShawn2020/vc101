import Hero from "@/components/hero";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Image from "next/image";
import Link from "next/link";

// VC101 Landing Page Component
const LandingPage = () => (
  <div className="flex flex-col items-center justify-center py-8 sm:py-16 lg:py-20 text-center px-4 sm:px-6 lg:px-8">
    <div className="mb-6 sm:mb-8">
      {/*<Image src={'/logo.png'} alt={'logo'} width={480} height={480}/>*/}
    </div>
    <div className="max-w-4xl mx-auto w-full">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
        VC101
      </h1>
      {/*<h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-300">*/}
      {/*  Vibe Coding 101*/}
      {/*</h2>*/}
      <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-gray-600 dark:text-gray-400 leading-relaxed">
        Code with the Vibe, Build with the Future
      </p>
      <p className="text-base sm:text-lg mb-8 sm:mb-12 text-gray-500 dark:text-gray-500 max-w-2xl mx-auto leading-relaxed">
        全球领先的 Human-AI 协同编程社区，连接对 AI 编程充满热情的开发者，分享前沿工具、最佳实践和创新解决方案。
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16">
        <Button size="lg" className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 text-base sm:text-lg active:scale-95 transition-transform">
          💬 加入社群
        </Button>
      </div>
    </div>
    
    {/* 精选内容区域 */}
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
        <Link href="/insights" className="text-center p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[160px] flex flex-col justify-center active:scale-95">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💡</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">VC 洞见</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">最新的 AI 编程技巧、最佳实践和行业洞察</p>
        </Link>
        <Link href="/arsenal" className="text-center p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[160px] flex flex-col justify-center active:scale-95">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔧</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">VC 军火库</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">精选的 AI 编程工具、插件和脚本合集</p>
        </Link>
        <Link href="/quests" className="text-center p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[160px] flex flex-col justify-center active:scale-95 sm:col-span-2 lg:col-span-1">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏆</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">VC 任务</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">定期的黑客松活动和技术挑战赛</p>
        </Link>
      </div>
    </div>
    
    {/* 社区合作伙伴 */}
    <div className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h3 className="text-base sm:text-lg font-medium mb-4 sm:mb-6 text-gray-500 dark:text-gray-400">VC 伙伴</h3>
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 opacity-60">
        <div className="text-xs sm:text-sm font-medium px-2 py-1">WayToAGI</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">AI产品榜</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">火山</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">百度</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">腾讯</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">阿里</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">ShareAI</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">Grimo</div>
        <div className="text-xs sm:text-sm font-medium px-2 py-1">Neurora</div>
      </div>
    </div>
  </div>
);

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
    <LandingPage />
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
