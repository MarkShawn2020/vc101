'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar,
  Star,
  TrendingUp,
  ExternalLink,
  BookmarkPlus,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Brain,
  BookOpen,
  Users,
  Database,
  Award,
  Zap,
  Clock,
  Eye,
  ThumbsUp,
  ArrowUp,
  Flame,
  Hash,
  GitBranch,
  Activity,
  Target,
  Trophy,
  Code,
  Rocket,
  AlertCircle,
  BarChart3,
  Network
} from 'lucide-react';
import { EVALUATION_CRITERIA, CATEGORY_LABELS } from '@/types/vibe-tank';
import type { KnowledgeCategory } from '@/types/vibe-tank';
import { createClient } from '@/utils/supabase/client';

// Mock data
const mockDailyPicks = [
  {
    id: '1',
    knowledge_item: {
      id: 'k1',
      title: 'OpenAI发布GPT-5架构论文',
      summary: '多模态推理能力的重大突破，统一架构处理视觉、语音和文本',
      category: 'llm_theory' as KnowledgeCategory,
      author: 'OpenAI',
      published_at: '3小时前',
      overall_score: 93,
      tags: ['GPT-5', '多模态'],
      view_count: 1247,
      discussion_count: 89,
      likes_count: 456
    },
    pick_reason: 'GPT-5架构创新将深刻影响大模型发展方向'
  },
  {
    id: '2',
    knowledge_item: {
      id: 'k2',
      title: 'AutoGPT推出企业级Agent框架',
      summary: '完整的Agent开发、部署和管理解决方案',
      category: 'ai_agent' as KnowledgeCategory,
      author: 'AutoGPT',
      published_at: '5小时前',
      overall_score: 88,
      tags: ['Agent', '企业'],
      view_count: 892,
      discussion_count: 67,
      likes_count: 234
    },
    pick_reason: '解决了生产环境部署的关键痛点'
  }
];

// 热门讨论
const hotDiscussions = [
  {
    id: 'd1',
    title: 'Claude 3.5 vs GPT-4：编程能力对比',
    participants: 23,
    messages: 145,
    lastActive: '10分钟前',
    heat: 95
  },
  {
    id: 'd2',
    title: 'Agent框架选型：LangChain还是AutoGPT？',
    participants: 18,
    messages: 89,
    lastActive: '25分钟前',
    heat: 78
  },
  {
    id: 'd3',
    title: 'RAG优化最佳实践讨论',
    participants: 15,
    messages: 67,
    lastActive: '1小时前',
    heat: 65
  }
];

// 实时动态
const realtimeActivities = [
  { id: 1, user: '张研究员', action: '发表观点', target: 'GPT-5架构论文', time: '刚刚' },
  { id: 2, user: '李工程师', action: '收藏', target: 'Agent开发指南', time: '2分钟前' },
  { id: 3, user: '王产品', action: '评价', target: 'Claude商业模式', time: '5分钟前' },
  { id: 4, user: '陈架构师', action: '分享', target: 'LLM优化技巧', time: '8分钟前' }
];

// 热门标签
const trendingTags = [
  { name: 'GPT-5', count: 234, trend: 'up' },
  { name: 'Agent开发', count: 189, trend: 'up' },
  { name: '多模态', count: 156, trend: 'stable' },
  { name: 'RAG优化', count: 142, trend: 'down' },
  { name: 'Prompt工程', count: 128, trend: 'up' },
  { name: 'LangChain', count: 115, trend: 'stable' }
];

// 黑客松预览
const hackathonPreview = {
  current: {
    title: 'AI Agent 创新挑战赛',
    teams: 12,
    projects: 8,
    deadline: '还剩3天',
    prize: '¥50,000'
  },
  upcoming: {
    title: 'LLM应用开发马拉松',
    startDate: '1月15日',
    registered: 45
  }
};

const categoryIcons = {
  llm_theory: Brain,
  ai_agent: Sparkles,
  business_model: BookOpen
};

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'picks' | 'hot' | 'latest'>('picks');
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const filteredPicks = selectedCategory === 'all' 
    ? mockDailyPicks 
    : mockDailyPicks.filter(pick => pick.knowledge_item.category === selectedCategory);

  return (
    <div className="min-h-screen">
      {/* Compact Hero with Quick Stats */}
      <section className="bg-gradient-to-br from-background via-background to-primary/5 py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                  <Calendar className="w-4 h-4" />
                  {new Date().toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' })}
                </div>
                <h1 className="text-2xl font-bold">今日精选</h1>
              </div>
              {/* Quick Stats Bar */}
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="font-medium">2,847</span>
                  <span className="text-muted-foreground">在线</span>
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="font-medium">156</span>
                  <span className="text-muted-foreground">热议</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">89</span>
                  <span className="text-muted-foreground">今日新增</span>
                </div>
              </div>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => setActiveTab('picks')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeTab === 'picks' ? 'bg-background shadow-sm' : 'hover:text-foreground'
                }`}
              >
                精选
              </button>
              <button
                onClick={() => setActiveTab('hot')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeTab === 'hot' ? 'bg-background shadow-sm' : 'hover:text-foreground'
                }`}
              >
                热门
              </button>
              <button
                onClick={() => setActiveTab('latest')}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  activeTab === 'latest' ? 'bg-background shadow-sm' : 'hover:text-foreground'
                }`}
              >
                最新
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                selectedCategory === 'all' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card border hover:bg-muted'
              }`}
            >
              全部
            </button>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
              const Icon = categoryIcons[key as KnowledgeCategory];
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as KnowledgeCategory)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
                    selectedCategory === key 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border hover:bg-muted'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Main Content */}
            <div className="col-span-12 lg:col-span-8">
              {/* Daily Picks Compact Cards */}
              <div className="space-y-4 mb-6">
                {filteredPicks.map((pick, index) => {
                  const Icon = categoryIcons[pick.knowledge_item.category];
                  return (
                    <article key={pick.id} className="bg-card rounded-lg border p-4 hover:shadow-lg transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 text-xs">
                            <span className="px-2 py-0.5 rounded-full bg-muted flex items-center gap-1">
                              <Icon className="w-3 h-3" />
                              {CATEGORY_LABELS[pick.knowledge_item.category]}
                            </span>
                            <span className="text-muted-foreground">{pick.knowledge_item.author}</span>
                            <span className="text-muted-foreground">·</span>
                            <span className="text-muted-foreground">{pick.knowledge_item.published_at}</span>
                          </div>
                          <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {pick.knowledge_item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                            {pick.knowledge_item.summary}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs">
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                {pick.knowledge_item.likes_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                {pick.knowledge_item.discussion_count}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {pick.knowledge_item.view_count}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-primary">
                                <Star className="w-3.5 h-3.5 fill-current" />
                                <span className="font-semibold text-sm">{pick.knowledge_item.overall_score}</span>
                              </div>
                              <BookmarkPlus className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Hot Discussions */}
              <div className="bg-card rounded-lg border p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Flame className="w-4 h-4 text-orange-500" />
                    热门讨论
                  </h2>
                  <Link href="/vibe-tank/discussions" className="text-sm text-primary hover:underline">
                    查看全部 →
                  </Link>
                </div>
                <div className="space-y-3">
                  {hotDiscussions.map(discussion => (
                    <div key={discussion.id} className="flex items-center justify-between py-2 hover:bg-muted/50 -mx-2 px-2 rounded transition-colors">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium line-clamp-1 mb-1">{discussion.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {discussion.participants}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3 h-3" />
                            {discussion.messages}
                          </span>
                          <span>{discussion.lastActive}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                            style={{ width: `${discussion.heat}%` }}
                          />
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Knowledge Graph Preview */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold flex items-center gap-2">
                    <Network className="w-4 h-4 text-primary" />
                    知识图谱
                  </h2>
                  <Link href="/vibe-tank/graph" className="text-sm text-primary hover:underline">
                    探索完整图谱 →
                  </Link>
                </div>
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <GitBranch className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-sm">89个知识节点 • 234条关联</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-4">
              {/* Hackathon Card */}
              <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg border p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Rocket className="w-4 h-4 text-purple-500" />
                    黑客松
                  </h3>
                  <Link href="/hackathon" className="text-sm text-primary hover:underline">
                    参与 →
                  </Link>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{hackathonPreview.current.title}</span>
                      <span className="text-xs px-2 py-0.5 bg-red-500/10 text-red-500 rounded-full">
                        {hackathonPreview.current.deadline}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{hackathonPreview.current.teams} 团队</span>
                      <span>{hackathonPreview.current.projects} 项目</span>
                      <span className="font-semibold text-primary">{hackathonPreview.current.prize}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="text-xs text-muted-foreground mb-1">即将开始</div>
                    <div className="text-sm font-medium">{hackathonPreview.upcoming.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {hackathonPreview.upcoming.startDate} • {hackathonPreview.upcoming.registered}人已报名
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-time Activities */}
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  实时动态
                </h3>
                <div className="space-y-2">
                  {realtimeActivities.map(activity => (
                    <div key={activity.id} className="flex items-start gap-2 text-xs">
                      <Clock className="w-3 h-3 text-muted-foreground mt-0.5" />
                      <div className="flex-1">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-muted-foreground"> {activity.action} </span>
                        <span className="text-primary">{activity.target}</span>
                        <div className="text-muted-foreground">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trending Tags */}
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-primary" />
                  热门标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map(tag => (
                    <button
                      key={tag.name}
                      className="px-2.5 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      #{tag.name}
                      <span className="text-muted-foreground">({tag.count})</span>
                      {tag.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-500" />}
                      {tag.trend === 'down' && <ArrowUp className="w-3 h-3 text-red-500 rotate-180" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-card rounded-lg border p-3 text-center">
                  <Users className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-lg font-bold">52.3K</div>
                  <div className="text-xs text-muted-foreground">用户</div>
                </div>
                <div className="bg-card rounded-lg border p-3 text-center">
                  <Database className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-lg font-bold">15.6K</div>
                  <div className="text-xs text-muted-foreground">知识</div>
                </div>
                <div className="bg-card rounded-lg border p-3 text-center">
                  <MessageSquare className="w-5 h-5 text-primary mx-auto mb-1" />
                  <div className="text-lg font-bold">89.2K</div>
                  <div className="text-xs text-muted-foreground">讨论</div>
                </div>
                <div className="bg-card rounded-lg border p-3 text-center">
                  <TrendingUp className="w-5 h-5 text-green-500 mx-auto mb-1" />
                  <div className="text-lg font-bold">+23%</div>
                  <div className="text-xs text-muted-foreground">增长</div>
                </div>
              </div>

              {/* Top Contributors Mini */}
              <div className="bg-card rounded-lg border p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  今日贡献榜
                </h3>
                <div className="space-y-2">
                  {['张研究员', '李工程师', '王产品'].map((name, i) => (
                    <div key={name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${
                          i === 0 ? 'text-yellow-500' : i === 1 ? 'text-gray-400' : 'text-orange-600'
                        }`}>#{i + 1}</span>
                        <span className="text-sm">{name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{156 - i * 28} 贡献</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
              加载更多内容
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section - Compact */}
      {!user && (
        <section className="py-8 bg-gradient-to-r from-primary/10 to-primary/5 border-t">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl font-bold mb-2">加入VibeGenius社区</h2>
            <p className="text-sm text-muted-foreground mb-4">
              解锁个性化推荐、参与讨论、贡献知识
            </p>
            <div className="flex gap-3 justify-center">
              <Link 
                href="/signup"
                className="px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
              >
                免费注册
              </Link>
              <Link 
                href="/signin"
                className="px-5 py-2 bg-card border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
              >
                登录
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}