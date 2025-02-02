import Hero from "@/components/hero";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/connect-supabase-steps";
import SignUpUserSteps from "@/components/tutorial/sign-up-user-steps";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";

// Landing Page Component
const LandingPage = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <Logo mode="svg" className="w-[180px] h-auto" color="currentColor" />
    <h1 className="text-4xl font-bold m-4">Where Code Meets Magic</h1>
  </div>
);

// Dashboard Component
const Dashboard = () => (
  <div className="flex flex-col gap-8 p-8">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">我的工作台</h1>
      <Button className="px-4 py-2 rounded-lg">
        新建项目
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* 这里可以放置项目卡片或其他内容 */}
      <div className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
        <h3 className="font-semibold mb-2">示例项目</h3>
        <p className="text-gray-600">开始创建您的第一个项目</p>
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
    <h2 className="font-medium text-lg md:text-xl mb-2 md:mb-4">Get Started</h2>
<SignUpUserSteps />
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
