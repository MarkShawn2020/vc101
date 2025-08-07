'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Rocket,
  Trophy,
  Users,
  Code,
  Clock,
  Calendar,
  Gift,
  Star,
  Github,
  ExternalLink,
  Plus,
  Filter,
  Search,
  ChevronRight,
  Zap,
  Target,
  Award,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  Sparkles,
  Timer,
  DollarSign,
  Shield,
  BookOpen,
  Video,
  Download,
  Upload
} from 'lucide-react';

// 当前黑客松
const currentHackathon = {
  id: 'h1',
  title: 'AI Agent 创新挑战赛',
  description: '构建下一代智能Agent应用，推动AI自主化进程',
  status: 'active',
  startDate: '2025-01-04',
  endDate: '2025-01-10',
  totalPrize: '¥50,000',
  participants: 156,
  teams: 12,
  projects: 8,
  timeLeft: '3天14小时',
  sponsors: ['OpenAI', 'Anthropic', 'Google'],
  judges: [
    { name: '张教授', title: 'AI研究院院长', avatar: '👨‍🏫' },
    { name: '李总监', title: '技术VP', avatar: '👨‍💼' },
    { name: '王专家', title: '产品负责人', avatar: '👩‍💻' }
  ],
  prizes: [
    { place: '一等奖', amount: '¥20,000', perks: '导师指导 + 孵化机会' },
    { place: '二等奖', amount: '¥15,000', perks: '技术培训 + 资源支持' },
    { place: '三等奖', amount: '¥10,000', perks: '社区展示 + 认证证书' },
    { place: '优秀奖', amount: '¥5,000', perks: '专属徽章 + 社区权益' }
  ],
  tracks: [
    { name: '效率工具', icon: Zap, teams: 4 },
    { name: '创意应用', icon: Sparkles, teams: 3 },
    { name: '企业解决方案', icon: Shield, teams: 5 }
  ]
};

// 项目列表
const projects = [
  {
    id: 'p1',
    name: 'CodeAssist Pro',
    team: 'AI Innovators',
    description: '基于GPT-4的智能编程助手，支持多语言代码生成和调试',
    track: '效率工具',
    progress: 85,
    likes: 234,
    comments: 45,
    status: 'in_progress',
    techStack: ['Python', 'React', 'OpenAI API'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: 'p2',
    name: 'SmartScheduler',
    team: 'TimeMasters',
    description: 'AI驱动的智能日程管理系统，自动优化时间安排',
    track: '企业解决方案',
    progress: 70,
    likes: 189,
    comments: 32,
    status: 'in_progress',
    techStack: ['Node.js', 'Vue', 'Claude API'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example'
  },
  {
    id: 'p3',
    name: 'CreativeCanvas',
    team: 'ArtTech',
    description: '多模态AI创作平台，结合文本、图像和音频生成',
    track: '创意应用',
    progress: 60,
    likes: 312,
    comments: 67,
    status: 'in_progress',
    techStack: ['Python', 'Next.js', 'Stable Diffusion'],
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example'
  }
];

// 团队列表
const teams = [
  {
    id: 't1',
    name: 'AI Innovators',
    members: 4,
    leader: '张开发',
    recruiting: false,
    skills: ['Python', 'React', 'ML'],
    lookingFor: []
  },
  {
    id: 't2',
    name: 'Tech Wizards',
    members: 3,
    leader: '李架构',
    recruiting: true,
    skills: ['Node.js', 'Vue', 'Docker'],
    lookingFor: ['UI设计师', '产品经理']
  },
  {
    id: 't3',
    name: 'Future Builders',
    members: 2,
    leader: '王全栈',
    recruiting: true,
    skills: ['Go', 'React', 'K8s'],
    lookingFor: ['后端工程师', 'AI工程师']
  }
];

// 历史黑客松
const pastHackathons = [
  {
    id: 'ph1',
    title: 'LLM应用创新马拉松',
    date: '2024年12月',
    participants: 234,
    projects: 45,
    winner: 'ChatFlow团队',
    winnerProject: '智能客服系统'
  },
  {
    id: 'ph2',
    title: '多模态AI挑战赛',
    date: '2024年11月',
    participants: 189,
    projects: 38,
    winner: 'VisionAI团队',
    winnerProject: '实时翻译眼镜'
  }
];

// 资源和工具
const resources = [
  { name: 'API文档', icon: BookOpen, url: '#' },
  { name: '开发工具包', icon: Download, url: '#' },
  { name: '教程视频', icon: Video, url: '#' },
  { name: '代码模板', icon: Code, url: '#' }
];

export default function HackathonPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'teams' | 'resources'>('overview');
  const [filterTrack, setFilterTrack] = useState<string>('all');

  const filteredProjects = filterTrack === 'all' 
    ? projects 
    : projects.filter(p => p.track === filterTrack);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-green-500/10" />
        <div className="container mx-auto px-4 py-12 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Rocket className="w-5 h-5" />
              <span className="text-sm font-medium">正在进行</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              {currentHackathon.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              {currentHackathon.description}
            </p>
            
            {/* Countdown Timer */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-card rounded-lg border mb-8">
              <Timer className="w-5 h-5 text-orange-500" />
              <span className="text-lg font-semibold">距离截止还有：</span>
              <span className="text-2xl font-bold text-primary">{currentHackathon.timeLeft}</span>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-card rounded-lg p-4 border">
                <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentHackathon.totalPrize}</div>
                <div className="text-sm text-muted-foreground">总奖金</div>
              </div>
              <div className="bg-card rounded-lg p-4 border">
                <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentHackathon.participants}</div>
                <div className="text-sm text-muted-foreground">参与者</div>
              </div>
              <div className="bg-card rounded-lg p-4 border">
                <Code className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentHackathon.teams}</div>
                <div className="text-sm text-muted-foreground">团队</div>
              </div>
              <div className="bg-card rounded-lg p-4 border">
                <Rocket className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold">{currentHackathon.projects}</div>
                <div className="text-sm text-muted-foreground">项目</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-0 z-10 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-6 py-4">
            {[
              { id: 'overview', label: '总览', icon: Target },
              { id: 'projects', label: '项目', icon: Code },
              { id: 'teams', label: '团队', icon: Users },
              { id: 'resources', label: '资源', icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-12 gap-6">
              {/* Main Content */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                {/* Tracks */}
                <div className="bg-card rounded-xl border p-6">
                  <h2 className="text-xl font-bold mb-4">赛道分类</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentHackathon.tracks.map(track => (
                      <div key={track.name} className="p-4 rounded-lg border hover:border-primary transition-colors">
                        <track.icon className="w-8 h-8 text-primary mb-2" />
                        <h3 className="font-semibold mb-1">{track.name}</h3>
                        <p className="text-sm text-muted-foreground">{track.teams} 个团队参与</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prizes */}
                <div className="bg-card rounded-xl border p-6">
                  <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    奖项设置
                  </h2>
                  <div className="space-y-3">
                    {currentHackathon.prizes.map((prize, index) => (
                      <div key={prize.place} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl ${
                            index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🏅'}
                          </div>
                          <div>
                            <div className="font-semibold">{prize.place}</div>
                            <div className="text-sm text-muted-foreground">{prize.perks}</div>
                          </div>
                        </div>
                        <div className="text-xl font-bold text-primary">{prize.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Projects */}
                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">最新项目</h2>
                    <button 
                      onClick={() => setActiveTab('projects')}
                      className="text-sm text-primary hover:underline"
                    >
                      查看全部 →
                    </button>
                  </div>
                  <div className="space-y-4">
                    {projects.slice(0, 2).map(project => (
                      <div key={project.id} className="p-4 rounded-lg border hover:shadow-md transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{project.name}</h3>
                            <p className="text-sm text-muted-foreground">by {project.team}</p>
                          </div>
                          <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                            {project.track}
                          </span>
                        </div>
                        <p className="text-sm mb-3">{project.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 text-sm">
                            <span className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              {project.likes}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageSquare className="w-4 h-4" />
                              {project.comments}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <a href={project.githubUrl} className="p-1 hover:bg-muted rounded">
                              <Github className="w-4 h-4" />
                            </a>
                            <a href={project.demoUrl} className="p-1 hover:bg-muted rounded">
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        {/* Progress Bar */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-muted-foreground">完成度</span>
                            <span className="font-medium">{project.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-primary/60"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                {/* Judges */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    评审团
                  </h3>
                  <div className="space-y-3">
                    {currentHackathon.judges.map(judge => (
                      <div key={judge.name} className="flex items-center gap-3">
                        <span className="text-2xl">{judge.avatar}</span>
                        <div>
                          <div className="font-medium">{judge.name}</div>
                          <div className="text-xs text-muted-foreground">{judge.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sponsors */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold mb-4">赞助商</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentHackathon.sponsors.map(sponsor => (
                      <span key={sponsor} className="px-3 py-1 bg-muted rounded-lg text-sm">
                        {sponsor}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
                  <h3 className="font-bold mb-4">快速行动</h3>
                  <div className="space-y-2">
                    <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                      <Plus className="w-4 h-4" />
                      提交项目
                    </button>
                    <button className="w-full px-4 py-2 bg-card border rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
                      <Users className="w-4 h-4" />
                      加入团队
                    </button>
                    <button className="w-full px-4 py-2 bg-card border rounded-lg hover:bg-muted transition-colors flex items-center justify-center gap-2">
                      <Upload className="w-4 h-4" />
                      上传演示
                    </button>
                  </div>
                </div>

                {/* Past Hackathons */}
                <div className="bg-card rounded-xl border p-6">
                  <h3 className="font-bold mb-4">往期黑客松</h3>
                  <div className="space-y-3">
                    {pastHackathons.map(hackathon => (
                      <div key={hackathon.id} className="pb-3 border-b last:border-0">
                        <div className="font-medium text-sm">{hackathon.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {hackathon.date} • {hackathon.participants}人参与
                        </div>
                        <div className="text-xs mt-2">
                          🏆 <span className="font-medium">{hackathon.winner}</span>
                          <span className="text-muted-foreground"> - {hackathon.winnerProject}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div>
              {/* Filter Bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterTrack('all')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      filterTrack === 'all' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-card border hover:bg-muted'
                    }`}
                  >
                    全部项目
                  </button>
                  {currentHackathon.tracks.map(track => (
                    <button
                      key={track.name}
                      onClick={() => setFilterTrack(track.name)}
                      className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                        filterTrack === track.name 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-card border hover:bg-muted'
                      }`}
                    >
                      <track.icon className="w-4 h-4" />
                      {track.name}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="搜索项目..."
                    className="pl-10 pr-4 py-2 bg-card border rounded-lg"
                  />
                </div>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                  <div key={project.id} className="bg-card rounded-xl border p-6 hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">by {project.team}</p>
                      </div>
                      <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                        {project.track}
                      </span>
                    </div>
                    <p className="text-sm mb-4">{project.description}</p>
                    
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.techStack.map(tech => (
                        <span key={tech} className="px-2 py-1 text-xs bg-muted rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">完成度</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/60"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm">
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <Heart className="w-4 h-4" />
                          {project.likes}
                        </button>
                        <button className="flex items-center gap-1 hover:text-primary transition-colors">
                          <MessageSquare className="w-4 h-4" />
                          {project.comments}
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <a href={project.githubUrl} className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                        <a href={project.demoUrl} className="p-2 hover:bg-muted rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'teams' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">参赛团队</h2>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  创建团队
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teams.map(team => (
                  <div key={team.id} className="bg-card rounded-xl border p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{team.name}</h3>
                        <p className="text-sm text-muted-foreground">队长: {team.leader}</p>
                      </div>
                      {team.recruiting && (
                        <span className="px-2 py-1 text-xs bg-green-500/10 text-green-500 rounded-full">
                          招募中
                        </span>
                      )}
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground mb-2">技术栈</div>
                      <div className="flex flex-wrap gap-1">
                        {team.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 text-xs bg-muted rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {team.recruiting && team.lookingFor.length > 0 && (
                      <div className="mb-4">
                        <div className="text-sm text-muted-foreground mb-2">招募职位</div>
                        <div className="space-y-1">
                          {team.lookingFor.map(position => (
                            <div key={position} className="text-sm">
                              • {position}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4" />
                        <span>{team.members}/5 成员</span>
                      </div>
                      {team.recruiting && (
                        <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors">
                          申请加入
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4">开发资源</h2>
                <div className="space-y-3">
                  {resources.map(resource => (
                    <a
                      key={resource.name}
                      href={resource.url}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <resource.icon className="w-5 h-5 text-primary" />
                        <span className="font-medium">{resource.name}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </a>
                  ))}
                </div>
              </div>
              
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4">评审标准</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-medium">创新性 (30%)</div>
                      <div className="text-sm text-muted-foreground">技术创新和应用场景创新</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-medium">完成度 (25%)</div>
                      <div className="text-sm text-muted-foreground">功能完整性和产品成熟度</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-medium">技术难度 (25%)</div>
                      <div className="text-sm text-muted-foreground">技术实现的复杂性</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      4
                    </div>
                    <div>
                      <div className="font-medium">商业价值 (20%)</div>
                      <div className="text-sm text-muted-foreground">市场潜力和商业可行性</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl border p-6">
                <h2 className="text-xl font-bold mb-4">时间安排</h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium">报名阶段</div>
                      <div className="text-sm text-muted-foreground">1月1日 - 1月3日</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-medium">开发阶段</div>
                      <div className="text-sm text-muted-foreground">1月4日 - 1月9日</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">评审阶段</div>
                      <div className="text-sm text-muted-foreground">1月10日</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <div>
                      <div className="font-medium">颁奖典礼</div>
                      <div className="text-sm text-muted-foreground">1月11日</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl border border-primary/20 p-6">
                <h2 className="text-xl font-bold mb-4">需要帮助？</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  加入我们的Discord社区，获取技术支持和团队匹配
                </p>
                <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  加入Discord
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}