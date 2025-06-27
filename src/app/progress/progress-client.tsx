'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfessionalReport from '@/components/professional-report';
import Link from 'next/link';
import { ProgressData } from '@/lib/progress-utils';
import { Calendar, TrendingUp, Users, Code, Trophy, Zap } from 'lucide-react';

interface ProgressClientProps {
  progressData: ProgressData;
}

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

const ActivityHeatmap = () => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">社区活跃度热力图</h3>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {['日', '一', '二', '三', '四', '五', '六'].map(day => (
          <div key={day} className="text-center text-xs text-gray-500 font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 49 }, (_, i) => {
          const intensity = Math.random();
          const colorClass = 
            intensity > 0.8 ? 'bg-green-600' :
            intensity > 0.6 ? 'bg-green-500' :
            intensity > 0.4 ? 'bg-green-400' :
            intensity > 0.2 ? 'bg-green-300' :
            intensity > 0.1 ? 'bg-green-200' : 'bg-gray-100 dark:bg-gray-800';
          
          return (
            <div
              key={i}
              className={`aspect-square rounded-sm ${colorClass} hover:scale-110 transition-transform cursor-pointer`}
              title={`${Math.round(intensity * 100)} 次活动`}
            />
          );
        })}
      </div>
      
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>最近 7 周</span>
        <div className="flex items-center gap-2">
          <span>少</span>
          <div className="flex gap-1">
            {['bg-gray-100 dark:bg-gray-800', 'bg-green-200', 'bg-green-400', 'bg-green-600'].map((color, i) => (
              <div key={i} className={`w-2 h-2 rounded-sm ${color}`} />
            ))}
          </div>
          <span>多</span>
        </div>
      </div>
    </Card>
  );
};

export default function ProgressClient({ progressData }: ProgressClientProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const statsCards = [
    {
      icon: Users,
      label: '注册用户',
      value: progressData.stats.users,
      color: 'bg-blue-500',
      description: '+23% 月增长'
    },
    {
      icon: Code,
      label: '技术文章',
      value: progressData.stats.articles,
      color: 'bg-green-500',
      description: '高质量内容'
    },
    {
      icon: Zap,
      label: '开源工具',
      value: progressData.stats.tools,
      color: 'bg-purple-500',
      description: '实用工具集'
    },
    {
      icon: Trophy,
      label: '黑客松',
      value: progressData.stats.hackathons,
      color: 'bg-orange-500',
      description: '成功举办'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              📊 社区进展
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              见证全球领先的 Human-AI 协同编程社区的成长历程
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>最后更新：{progressData.lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* 核心统计 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statsCards.map((stat, index) => (
            <div
              key={stat.label}
              className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* 标签页内容 */}
        <Tabs defaultValue="overview" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="details">详细报告</TabsTrigger>
            <TabsTrigger value="activity">活跃度</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                社区发展概览
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    <AnimatedCounter value={1247} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">总注册用户</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    <AnimatedCounter value={892} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">月活跃用户</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    <AnimatedCounter value={312} />
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">黑客松参与者</div>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">🎯 近期成就</h3>
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
                <h3 className="text-lg font-semibold mb-4">🚀 即将推出</h3>
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
          </TabsContent>

          <TabsContent value="details">
            <ProfessionalReport 
              content={progressData.content}
              lastUpdated={progressData.lastUpdated}
              stats={progressData.stats}
            />
          </TabsContent>

          <TabsContent value="activity">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityHeatmap />
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">📈 活跃度趋势</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">今日活跃</span>
                    <span className="font-bold text-green-600">89 人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">本周新增</span>
                    <span className="font-bold text-blue-600">23 人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">月度活跃</span>
                    <span className="font-bold text-purple-600">892 人</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">代码执行</span>
                    <span className="font-bold text-orange-600">2.1k 次</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* 行动号召 */}
        <div className={`text-center bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-12 text-white transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4">一起构建编程的未来</h2>
          <p className="text-xl mb-8 opacity-90">
            加入 VC101，与全球开发者一起探索 Human-AI 协同编程的无限可能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link href="/hackathon">
                立即参加黑客松
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <Link href="/playground">
                体验编程练习场
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}