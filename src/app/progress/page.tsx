'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Metric {
  label: string;
  value: number;
  target: number;
  icon: string;
  color: string;
  unit?: string;
}

interface Milestone {
  title: string;
  date: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: string;
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

const ProgressBar = ({ value, max, color }: { value: number; max: number; color: string }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out ${color}`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

const PulseEffect = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {children}
    <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-400" />
  </div>
);

export default function ProgressPage() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const metrics: Metric[] = [
    { label: '社区成员', value: 12, target: 1000, icon: '👥', color: 'bg-blue-500', unit: '人' },
    { label: '发布文章', value: 3, target: 100, icon: '📝', color: 'bg-green-500', unit: '篇' },
    { label: '分享工具', value: 5, target: 50, icon: '🔧', color: 'bg-purple-500', unit: '个' },
    { label: '完成任务', value: 2, target: 25, icon: '🏆', color: 'bg-orange-500', unit: '项' },
    { label: '代码贡献', value: 8, target: 500, icon: '💻', color: 'bg-cyan-500', unit: '次' },
    { label: 'AI 对话', value: 156, target: 5000, icon: '🤖', color: 'bg-pink-500', unit: '条' }
  ];

  const milestones: Milestone[] = [
    {
      title: 'VC101 社区成立',
      date: '2025-06-27',
      description: '全球领先的 Human-AI 协同编程社区正式启动',
      status: 'completed',
      icon: '🚀'
    },
    {
      title: '社区基础建设',
      date: '2025-07',
      description: '完善社区架构，搭建核心功能模块',
      status: 'in-progress',
      icon: '🏗️'
    },
    {
      title: 'AI 工具库上线',
      date: '2025-08',
      description: '推出精选 AI 编程工具库，助力开发者效率提升',
      status: 'upcoming',
      icon: '🛠️'
    },
    {
      title: '达成千人社区',
      date: '2025-09',
      description: '社区成员突破 1000 人，形成活跃的编程生态',
      status: 'upcoming',
      icon: '🎯'
    },
    {
      title: 'hackathon 大赛',
      date: '2025-10',
      description: '首届 VC101 黑客松大赛，推动创新项目孵化',
      status: 'upcoming',
      icon: '🏁'
    },
    {
      title: '企业合作计划',
      date: '2025-12',
      description: '与头部 AI 公司建立深度合作关系',
      status: 'upcoming',
      icon: '🤝'
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-6">
              VC101 社区进展
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              见证全球领先的 Human-AI 协同编程社区的成长历程，一起构建编程的未来
            </p>
          </div>
        </div>

        {/* 核心指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {metrics.map((metric, index) => (
            <Card key={metric.label} className={`p-6 transform transition-all duration-700 hover:scale-105 hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{metric.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">{metric.label}</h3>
                    <p className="text-sm text-gray-500">{metric.unit}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {Math.round((metric.value / metric.target) * 100)}%
                </Badge>
              </div>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    <AnimatedCounter value={metric.value} />
                  </span>
                  <span className="text-sm text-gray-500">
                    目标: {metric.target.toLocaleString()}
                  </span>
                </div>
                <ProgressBar value={metric.value} max={metric.target} color={metric.color} />
              </div>
            </Card>
          ))}
        </div>

        {/* 里程碑时间线 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            发展里程碑
          </h2>
          
          <div className="relative">
            {/* 时间线 */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-0.5 w-0.5 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} transform transition-all duration-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{ transitionDelay: `${index * 200}ms` }}>
                  
                  {/* 时间线节点 */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                    {milestone.status === 'in-progress' ? (
                      <PulseEffect>
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-4 border-white dark:border-gray-900"></div>
                      </PulseEffect>
                    ) : (
                      <div className={`w-4 h-4 rounded-full border-4 border-white dark:border-gray-900 ${
                        milestone.status === 'completed' ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    )}
                  </div>
                  
                  {/* 内容卡片 */}
                  <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <Card className={`p-6 hover:shadow-lg transition-all duration-300 ${
                      milestone.status === 'completed' ? 'border-green-200 bg-green-50 dark:bg-green-900/10' :
                      milestone.status === 'in-progress' ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/10' :
                      'border-gray-200 bg-gray-50 dark:bg-gray-900/10'
                    }`}>
                      <div className="flex items-start gap-4">
                        <div className="text-2xl">{milestone.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{milestone.title}</h3>
                            <Badge variant={
                              milestone.status === 'completed' ? 'default' :
                              milestone.status === 'in-progress' ? 'destructive' : 'secondary'
                            } className="text-xs">
                              {milestone.status === 'completed' ? '已完成' :
                               milestone.status === 'in-progress' ? '进行中' : '即将开始'}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {milestone.description}
                          </p>
                          <p className="text-xs text-gray-500">{milestone.date}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 活跃度热力图 */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            社区活跃度
          </h2>
          
          <Card className="p-8">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {['日', '一', '二', '三', '四', '五', '六'].map(day => (
                <div key={day} className="text-center text-sm text-gray-500 font-medium">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-2">
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
            
            <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
              <span>最近 7 周的社区活跃度</span>
              <div className="flex items-center gap-2">
                <span>少</span>
                <div className="flex gap-1">
                  {['bg-gray-100 dark:bg-gray-800', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600'].map((color, i) => (
                    <div key={i} className={`w-3 h-3 rounded-sm ${color}`} />
                  ))}
                </div>
                <span>多</span>
              </div>
            </div>
          </Card>
        </div>

        {/* 号召行动 */}
        <div className={`text-center bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-12 text-white transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4">一起构建编程的未来</h2>
          <p className="text-xl mb-8 opacity-90">
            加入 VC101，与全球开发者一起探索 Human-AI 协同编程的无限可能
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              立即加入社区
            </button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}