'use client';

import Link from 'next/link';
import { 
  Users,
  MessageSquare,
  Trophy,
  Calendar,
  TrendingUp,
  Star,
  Heart,
  Globe,
  Zap,
  Award,
  GitBranch,
  BookOpen,
  Code,
  Sparkles,
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

export default function CommunityPage() {
  const communityStats = [
    { label: '活跃成员', value: '50,000+', icon: Users },
    { label: '每日讨论', value: '1,000+', icon: MessageSquare },
    { label: '开源项目', value: '200+', icon: GitBranch },
    { label: '知识分享', value: '10,000+', icon: BookOpen }
  ];

  const featuredMembers = [
    {
      name: '张研究员',
      role: 'AI研究专家',
      contributions: 156,
      badge: '🏆 Top Contributor',
      avatar: '👨‍🔬'
    },
    {
      name: '李工程师',
      role: '全栈开发者',
      contributions: 128,
      badge: '⭐ Rising Star',
      avatar: '👨‍💻'
    },
    {
      name: '王产品',
      role: '产品经理',
      contributions: 95,
      badge: '💡 Innovation Leader',
      avatar: '👩‍💼'
    },
    {
      name: '陈架构师',
      role: '系统架构师',
      contributions: 87,
      badge: '🏗️ Architecture Expert',
      avatar: '🏗️'
    }
  ];

  const upcomingEvents = [
    {
      title: 'AI知识管理黑客松',
      date: '2025年2月15日',
      type: 'hackathon',
      participants: 500,
      prize: '¥50,000'
    },
    {
      title: '智能推荐系统工作坊',
      date: '2025年2月8日',
      type: 'workshop',
      participants: 200,
      level: '进阶'
    },
    {
      title: 'VibeGenius产品发布会',
      date: '2025年2月1日',
      type: 'launch',
      participants: 1000,
      special: '新功能首发'
    }
  ];

  const hotTopics = [
    { title: 'GPT-5架构深度解析', replies: 234, views: 5670, hot: true },
    { title: 'Agent框架最佳实践', replies: 189, views: 4321, hot: true },
    { title: '知识图谱可视化技术', replies: 156, views: 3890, hot: false },
    { title: 'AI评估算法优化', replies: 142, views: 3456, hot: false }
  ];

  const communityProjects = [
    {
      name: 'VibeGenius SDK',
      description: 'Python/JS SDK for VibeGenius API',
      stars: 1234,
      language: 'Python',
      contributors: 45
    },
    {
      name: 'Knowledge Graph Viz',
      description: '开源知识图谱可视化工具',
      stars: 890,
      language: 'TypeScript',
      contributors: 28
    },
    {
      name: 'AI Evaluator',
      description: '多维度内容评估引擎',
      stars: 567,
      language: 'Go',
      contributors: 19
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">全球智能知识社区</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              VibeGenius
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {' '}Community
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              连接全球创新者，分享知识，协作创新，共同推动智能知识管理的未来
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/vibe-tank/discussions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                <MessageSquare className="w-5 h-5" />
                加入讨论
              </Link>
              <Link 
                href="/hackathon"
                className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all font-medium"
              >
                <Trophy className="w-5 h-5" />
                参加活动
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-12 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {communityStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            
            {/* Left Column - Discussions */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Hot Topics */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  热门讨论
                </h2>
                <div className="space-y-4">
                  {hotTopics.map((topic, index) => (
                    <div key={index} className="flex items-start justify-between p-4 hover:bg-muted/30 rounded-lg transition-colors cursor-pointer">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium hover:text-primary transition-colors">
                            {topic.title}
                          </h3>
                          {topic.hot && (
                            <span className="px-2 py-0.5 text-xs bg-red-500/10 text-red-500 rounded-full">
                              🔥 热门
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{topic.replies} 回复</span>
                          <span>{topic.views} 浏览</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <Link 
                  href="/vibe-tank/discussions"
                  className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all mt-4"
                >
                  查看全部讨论
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Community Projects */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-primary" />
                  社区项目
                </h2>
                <div className="space-y-4">
                  {communityProjects.map((project) => (
                    <div key={project.name} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{project.name}</h3>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                        </div>
                        <span className="px-2 py-1 text-xs bg-muted rounded">
                          {project.language}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {project.stars}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {project.contributors}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  href="https://github.com/vibegenius"
                  className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all mt-4"
                >
                  探索更多项目
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column - Events & Members */}
            <div className="space-y-8">
              
              {/* Upcoming Events */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  即将举行
                </h2>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-sm">{event.title}</h3>
                        {event.type === 'hackathon' && (
                          <Trophy className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{event.date}</p>
                      <div className="flex items-center gap-3 text-xs">
                        {event.participants && (
                          <span>{event.participants}人</span>
                        )}
                        {event.prize && (
                          <span className="text-green-600">{event.prize}</span>
                        )}
                        {event.level && (
                          <span className="px-2 py-0.5 bg-muted rounded">{event.level}</span>
                        )}
                        {event.special && (
                          <span className="text-primary">{event.special}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/events"
                  className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all mt-4 text-sm"
                >
                  查看全部活动
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Featured Members */}
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  杰出贡献者
                </h2>
                <div className="space-y-3">
                  {featuredMembers.map((member) => (
                    <div key={member.name} className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded-lg transition-colors">
                      <div className="text-2xl">{member.avatar}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">{member.contributions} 贡献</div>
                        <div className="text-xs text-primary">{member.badge}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  href="/leaderboard"
                  className="inline-flex items-center gap-1 text-primary hover:gap-2 transition-all mt-4 text-sm"
                >
                  查看排行榜
                  <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Join CTA */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-xl p-6 text-center">
                <Sparkles className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">成为社区一员</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  加入全球最活跃的智能知识社区
                </p>
                <Link 
                  href="/signup"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all text-sm font-medium"
                >
                  立即加入
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">社区准则</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border">
                <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">友善互助</h3>
                <p className="text-sm text-muted-foreground">
                  保持友善，互相帮助，共同成长
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border">
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">知识共享</h3>
                <p className="text-sm text-muted-foreground">
                  分享知识，开源协作，推动创新
                </p>
              </div>
              <div className="bg-card rounded-xl p-6 border">
                <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">多元包容</h3>
                <p className="text-sm text-muted-foreground">
                  尊重差异，包容多元，全球视野
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}