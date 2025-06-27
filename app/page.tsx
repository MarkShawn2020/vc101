import Hero from "@/components/hero";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Image from "next/image";

// VC101 Landing Page Component
const LandingPage = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="mb-8">
      {/*<Image src={'/logo.png'} alt={'logo'} width={480} height={480}/>*/}
    </div>
    <div className="max-w-4xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        VC101
      </h1>
      {/*<h2 className="text-2xl md:text-3xl font-semibold mb-4 text-gray-700 dark:text-gray-300">*/}
      {/*  Vibe Coding 101*/}
      {/*</h2>*/}
      <p className="text-xl md:text-2xl mb-8 text-gray-600 dark:text-gray-400">
        Code with the Vibe, Build with the Future
      </p>
      <p className="text-lg mb-12 text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
        全球领先的 Human-AI 协同编程社区，连接对 AI 编程充满热情的开发者，分享前沿工具、最佳实践和创新解决方案。
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <Button size="lg" className="px-8 py-3 text-lg">
          💬 加入社群
        </Button>
        <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
          🚀 探索工具
        </Button>
      </div>
    </div>
    
    {/* 精选内容区域 */}
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-4xl mb-4">💡</div>
        <h3 className="text-xl font-semibold mb-2">Vibe 洞见</h3>
        <p className="text-gray-600 dark:text-gray-400">最新的 AI 编程技巧、最佳实践和行业洞察</p>
      </div>
      <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-4xl mb-4">🔧</div>
        <h3 className="text-xl font-semibold mb-2">Vibe 军火库</h3>
        <p className="text-gray-600 dark:text-gray-400">精选的 AI 编程工具、插件和脚本合集</p>
      </div>
      <div className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="text-4xl mb-4">🏆</div>
        <h3 className="text-xl font-semibold mb-2">Vibe 任务</h3>
        <p className="text-gray-600 dark:text-gray-400">定期的黑客松活动和技术挑战赛</p>
      </div>
    </div>
    
    {/* 社区合作伙伴 */}
    <div className="w-full max-w-4xl mx-auto text-center">
      <h3 className="text-lg font-medium mb-6 text-gray-500 dark:text-gray-400">生态伙伴</h3>
      <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
        <div className="text-sm font-medium">百度</div>
        <div className="text-sm font-medium">火山引擎</div>
        <div className="text-sm font-medium">AI产品榜</div>
        <div className="text-sm font-medium">WayToAGI</div>
        <div className="text-sm font-medium">ShareAI</div>
        <div className="text-sm font-medium">Grimo</div>
        <div className="text-sm font-medium">Neurora</div>
      </div>
    </div>
  </div>
);

// VC101 Dashboard Component
const Dashboard = () => (
  <div className="flex flex-col gap-8 p-8">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">欢迎回到 VC101</h1>
      <Button className="px-4 py-2 rounded-lg">
        📝 发布内容
      </Button>
    </div>
    
    {/* 快速导航 */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-2xl mb-2">💡</div>
        <h3 className="font-semibold mb-2">Vibe 洞见</h3>
        <p className="text-gray-600 text-sm">浏览最新的 AI 编程文章</p>
      </div>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-2xl mb-2">🔧</div>
        <h3 className="font-semibold mb-2">军火库</h3>
        <p className="text-gray-600 text-sm">下载精选编程工具</p>
      </div>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-2xl mb-2">🏆</div>
        <h3 className="font-semibold mb-2">任务挑战</h3>
        <p className="text-gray-600 text-sm">参加黑客松活动</p>
      </div>
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <div className="text-2xl mb-2">🌐</div>
        <h3 className="font-semibold mb-2">生态伙伴</h3>
        <p className="text-gray-600 text-sm">探索 AI 公司产品</p>
      </div>
    </div>
    
    {/* 个人统计 */}
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">您的社区贡献</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">0</div>
          <div className="text-sm text-gray-600">发布文章</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">0</div>
          <div className="text-sm text-gray-600">分享工具</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">0</div>
          <div className="text-sm text-gray-600">参与活动</div>
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
