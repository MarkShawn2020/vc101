'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Brain, 
  Sparkles, 
  Users, 
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Check,
  Star,
  Globe,
  Zap,
  Shield,
  Database,
  LineChart,
  BookOpen,
  Code,
  MessageSquare,
  Award,
  Rocket
} from 'lucide-react';

export default function VibeGeniusHome() {
  const [activeTab, setActiveTab] = useState('individual');

  // 产品特性
  const features = [
    {
      icon: Brain,
      title: 'AI知识引擎',
      description: '智能评估、个性化推荐、深度学习',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: '协同创新',
      description: '团队视角、观点碰撞、集体智慧',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: LineChart,
      title: '知识图谱',
      description: '可视化追踪、演进脉络、关系网络',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Zap,
      title: '实时同步',
      description: '即时更新、多端同步、离线支持',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // 定价方案
  const pricingPlans = {
    individual: [
      {
        name: 'Free',
        price: '¥0',
        period: '/月',
        description: '个人探索版',
        features: [
          '基础AI评估功能',
          '每月100条知识条目',
          '公共知识库访问',
          '基础搜索功能',
          '社区支持'
        ],
        cta: '免费开始',
        highlighted: false
      },
      {
        name: 'Pro',
        price: '¥199',
        period: '/月',
        description: '专业创作者',
        features: [
          '高级AI全功能',
          '无限知识条目',
          '个性化推荐引擎',
          '知识图谱可视化',
          '优先支持',
          'API访问(1万次/月)'
        ],
        cta: '立即升级',
        highlighted: true
      }
    ],
    team: [
      {
        name: 'Team',
        price: '¥699',
        period: '/月/5人',
        description: '团队协作版',
        features: [
          'Pro版全部功能',
          '私有团队空间',
          '协作工作流',
          '团队分析仪表板',
          '权限管理',
          'API访问(10万次/月)'
        ],
        cta: '开始试用',
        highlighted: true
      },
      {
        name: 'Enterprise',
        price: '定制',
        period: '',
        description: '企业定制版',
        features: [
          '私有化部署',
          '专属AI模型训练',
          '无限API调用',
          'SSO单点登录',
          '专属客户成功经理',
          'SLA服务保障'
        ],
        cta: '联系销售',
        highlighted: false
      }
    ]
  };

  // 成功案例数据
  const successMetrics = [
    { label: '活跃用户', value: '50,000+', icon: Users },
    { label: '知识条目', value: '1M+', icon: Database },
    { label: '团队客户', value: '500+', icon: Award },
    { label: 'API调用/天', value: '10M+', icon: Zap }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI增强型智能知识平台</span>
            </div>
            
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                VibeGenius
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
              Where Intelligence Connects
            </p>
            
            {/* Description */}
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              打造人机协同的知识管理新纪元。通过AI驱动的智能评估、个性化推荐和协作创新，
              让每个人都能与AI一起创造卓越。
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/vibe-tank"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-medium"
              >
                <Brain className="w-5 h-5" />
                进入Vibe智库
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link 
                href="#demo"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all font-medium"
              >
                <Star className="w-5 h-5" />
                预约演示
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span className="text-sm">企业级安全</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span className="text-sm">全球服务</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span className="text-sm">行业领先</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              核心能力
            </h2>
            <p className="text-lg text-muted-foreground">
              四大支柱，构建智能知识管理体系
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="bg-card rounded-xl p-6 border hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} p-2.5 mb-4`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              产品矩阵
            </h2>
            <p className="text-lg text-muted-foreground">
              完整的智能知识管理解决方案
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Knowledge Hub */}
            <div className="bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">Knowledge Hub</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  AI驱动的知识管理中心
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>Vibe智库 - 智能评估系统</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>深度洞察与研究报告</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>数据分析与趋势预测</span>
                  </li>
                </ul>
                <Link 
                  href="/vibe-tank"
                  className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all"
                >
                  探索智库
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Creation Studio */}
            <div className="bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Code className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">Creation Studio</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  创新工具与开发环境
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>AI编程实验室</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>工具与框架库</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>在线开发环境</span>
                  </li>
                </ul>
                <Link 
                  href="/playground"
                  className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all"
                >
                  开始创作
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Community Space */}
            <div className="bg-card rounded-xl border overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-bold">Community Space</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  协作创新社区
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>观点碰撞区</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>创新挑战赛</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    <span>团队协作空间</span>
                  </li>
                </ul>
                <Link 
                  href="/vibe-tank/discussions"
                  className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all"
                >
                  加入社区
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              选择适合的方案
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              从个人到企业，满足不同规模的需求
            </p>
            
            {/* Tab Switcher */}
            <div className="inline-flex items-center gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setActiveTab('individual')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'individual' 
                    ? 'bg-background shadow-sm' 
                    : 'hover:text-foreground'
                }`}
              >
                个人版
              </button>
              <button
                onClick={() => setActiveTab('team')}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeTab === 'team' 
                    ? 'bg-background shadow-sm' 
                    : 'hover:text-foreground'
                }`}
              >
                团队/企业版
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans[activeTab].map((plan) => (
              <div 
                key={plan.name}
                className={`bg-card rounded-xl p-8 ${
                  plan.highlighted 
                    ? 'border-2 border-primary shadow-xl scale-105' 
                    : 'border'
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full mb-4">
                    <Star className="w-3 h-3" />
                    推荐
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              值得信赖的选择
            </h2>
            <p className="text-lg text-muted-foreground">
              数据见证成长，创新引领未来
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {successMetrics.map((metric) => (
              <div key={metric.label} className="text-center">
                <metric.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            开启智能知识管理新纪元
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            加入VibeGenius，与全球创新者一起，用AI重新定义知识的力量
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-medium"
            >
              <Rocket className="w-5 h-5" />
              免费开始
            </Link>
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-card border rounded-lg hover:bg-muted transition-all font-medium"
            >
              了解更多
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}