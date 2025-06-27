"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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
    
    <WeChatModal isOpen={showWeChatModal} onClose={() => setShowWeChatModal(false)} />
  </div>
  );
};