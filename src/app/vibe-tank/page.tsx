import Link from 'next/link';
import { 
  Brain, 
  Sparkles, 
  Users, 
  Network, 
  BookOpen, 
  TrendingUp,
  Settings,
  Database,
  Calendar,
  MessageSquare
} from 'lucide-react';

export const metadata = {
  title: '知识库 - AI增强型知识组织引擎 | VibeGenius',
  description: '团队协作的AI知识管理平台，追踪大模型理论、AI Agent产品和商业模式的前沿动态',
};

export default function VibeTankPage() {
  const features = [
    {
      title: '每日精选',
      description: 'AI自动筛选的高价值内容推荐',
      icon: Calendar,
      href: '/vibe-tank/daily',
      color: 'from-blue-500 to-blue-600',
      stats: '今日10篇'
    },
    {
      title: '观点碰撞区',
      description: '团队成员多视角讨论与交流',
      icon: MessageSquare,
      href: '/vibe-tank/discussions',
      color: 'from-purple-500 to-purple-600',
      stats: '156条讨论'
    },
    {
      title: '追溯地图',
      description: '知识演进的可视化图谱',
      icon: Network,
      href: '/vibe-tank/graph',
      color: 'from-green-500 to-green-600',
      stats: '89个节点'
    },
    {
      title: '知识库',
      description: '全部知识条目的检索与管理',
      icon: Database,
      href: '/vibe-tank/knowledge',
      color: 'from-orange-500 to-orange-600',
      stats: '1,247条'
    },
    {
      title: '个人视角',
      description: '定制化的评估维度与推荐设置',
      icon: Settings,
      href: '/vibe-tank/perspectives',
      color: 'from-pink-500 to-pink-600',
      stats: '3个视角'
    },
    {
      title: '趋势洞察',
      description: '领域发展趋势与数据分析',
      icon: TrendingUp,
      href: '/vibe-tank/insights',
      color: 'from-indigo-500 to-indigo-600',
      stats: '实时更新'
    }
  ];

  const categories = [
    {
      name: '大模型理论',
      key: 'llm_theory',
      icon: Brain,
      description: 'LLM研究成果与技术突破'
    },
    {
      name: 'AI Agent产品',
      key: 'ai_agent',
      icon: Sparkles,
      description: '智能代理的实践案例'
    },
    {
      name: '商业模式',
      key: 'business_model',
      icon: BookOpen,
      description: '成功的AI商业化路径'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">AI增强型知识组织引擎</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              知识库
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              打造能自动辅助内容收集、筛选、评估并长期沉淀的知识管理平台
            </p>
            
            <div className="flex gap-4 justify-center">
              <Link 
                href="/vibe-tank/daily"
                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                查看今日精选
              </Link>
              <Link 
                href="/vibe-tank/knowledge"
                className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
              >
                <Database className="w-5 h-5" />
                浏览知识库
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="bg-card rounded-xl p-6 border">
            <div className="text-3xl font-bold text-primary">10</div>
            <div className="text-sm text-muted-foreground mt-1">团队成员</div>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <div className="text-3xl font-bold text-primary">5</div>
            <div className="text-sm text-muted-foreground mt-1">评估维度</div>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <div className="text-3xl font-bold text-primary">3</div>
            <div className="text-sm text-muted-foreground mt-1">核心领域</div>
          </div>
          <div className="bg-card rounded-xl p-6 border">
            <div className="text-3xl font-bold text-primary">∞</div>
            <div className="text-sm text-muted-foreground mt-1">知识沉淀</div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">核心追踪领域</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => (
            <div key={category.key} className="bg-card rounded-xl p-6 border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
              </div>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">功能模块</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <Link 
              key={feature.href}
              href={feature.href}
              className="group relative bg-card rounded-xl p-6 border hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
              
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color} shadow-lg`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {feature.stats}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-card rounded-2xl p-8 border">
          <h2 className="text-2xl font-bold mb-6 text-center">我们的使命</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🎯</span> 提升效率
              </h3>
              <p className="text-muted-foreground text-sm">
                通过AI自动化处理海量信息，让团队专注于高价值的分析与决策
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🧠</span> 培养判断力
              </h3>
              <p className="text-muted-foreground text-sm">
                多维度评估体系帮助团队形成系统化的信息判断能力
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">💡</span> 认知多样性
              </h3>
              <p className="text-muted-foreground text-sm">
                个性化视角设置促进不同观点的碰撞与融合
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">📚</span> 知识沉淀
              </h3>
              <p className="text-muted-foreground text-sm">
                构建可追溯的知识图谱，形成团队独有的认知资产
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}