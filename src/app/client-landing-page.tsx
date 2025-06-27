"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Users, Code, Trophy, Zap, Calendar, TrendingUp } from "lucide-react";

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(value * progress));
      
      if (progress >= 1) {
        clearInterval(timer);
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [value, duration]);
  
  return <span>{count.toLocaleString()}</span>;
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color, description }: {
  icon: any;
  label: string;
  value: number;
  color: string;
  description: string;
}) => (
  <Card className="p-6 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</h3>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          <AnimatedCounter value={value} />
        </p>
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  </Card>
);

// WeChat Group Modal Component
const WeChatModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>
        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">加入 VC101 社群</h3>
          <Image 
            src="/wechat-group-qrcode.JPG" 
            alt="WeChat Group QR Code" 
            width={300} 
            height={300}
            className="mx-auto mb-4 rounded-lg"
          />
          <p className="text-gray-600 dark:text-gray-400">扫描二维码加入微信群</p>
        </div>
      </div>
    </div>
  );
};

// Client-side Landing Page Component
export const ClientLandingPage = () => {
  const [showWeChatModal, setShowWeChatModal] = useState(false);
  
  return (
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
        <Button 
          size="lg" 
          className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 text-base sm:text-lg active:scale-95 transition-transform"
          onClick={() => setShowWeChatModal(true)}
        >
          💬 加入社群
        </Button>
        <Button 
          size="lg" 
          variant="outline"
          className="w-full sm:w-auto min-h-[44px] px-6 sm:px-8 py-3 text-base sm:text-lg active:scale-95 transition-transform"
          asChild
        >
          <Link href="/report">📊 查看报告</Link>
        </Button>
      </div>
    </div>
    
    {/* 社区统计 */}
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          📊 社区概览
        </h2>
        <p className="text-gray-600 dark:text-gray-400">见证全球领先的 Human-AI 协同编程社区的成长历程</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          icon={Users}
          label="注册用户"
          value={1247}
          color="bg-blue-500"
          description="+23% 月增长"
        />
        <StatsCard
          icon={Code}
          label="技术文章"
          value={89}
          color="bg-green-500"
          description="高质量内容"
        />
        <StatsCard
          icon={Zap}
          label="开源工具"
          value={23}
          color="bg-purple-500"
          description="实用工具集"
        />
        <StatsCard
          icon={Trophy}
          label="黑客松"
          value={8}
          color="bg-orange-500"
          description="成功举办"
        />
      </div>
      
      {/* 最近成就 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            🎯 近期成就
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500">✅</Badge>
              <span className="text-sm">Monaco Editor 专业代码编辑器集成</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500">✅</Badge>
              <span className="text-sm">Judge0 在线代码执行系统</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-green-500">✅</Badge>
              <span className="text-sm">8种编程语言支持</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500">🔄</Badge>
              <span className="text-sm">AI助手集成开发中</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-600" />
            🚀 即将推出
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge variant="outline">Q3</Badge>
              <span className="text-sm">AI编程助手集成</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">Q3</Badge>
              <span className="text-sm">个性化学习路径</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">Q4</Badge>
              <span className="text-sm">实时协作编程</span>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">Q4</Badge>
              <span className="text-sm">移动端原生App</span>
            </div>
          </div>
        </Card>
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
        <Link href="/hackathon" className="text-center p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200 cursor-pointer min-h-[160px] flex flex-col justify-center active:scale-95 sm:col-span-2 lg:col-span-1">
          <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🏆</div>
          <h3 className="text-lg sm:text-xl font-semibold mb-2">VC 黑客松</h3>
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
    
    <WeChatModal isOpen={showWeChatModal} onClose={() => setShowWeChatModal(false)} />
  </div>
  );
};