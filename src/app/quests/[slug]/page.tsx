import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { 
  ArrowLeft, Calendar, Clock, Users, Trophy, Target, 
  CheckCircle, AlertCircle, Play, Github, ExternalLink,
  Award, Star, Download, Heart, MessageCircle, Share2,
  UserPlus, Timer, Zap, Crown, Medal, Gift
} from "lucide-react";

// 模拟黑客松详情数据
const mockQuestDetail = {
  id: "1",
  title: "AI 编程工具创新挑战",
  slug: "ai-programming-tools-innovation",
  description: "设计和开发下一代 AI 编程辅助工具，让开发者与 AI 的协作更加高效",
  longDescription: `
## 挑战背景

随着 AI 技术的快速发展，开发者与 AI 的协作模式正在发生根本性变化。传统的编程工具已经无法满足现代 AI 辅助开发的需求。我们需要新一代的工具来桥接人类创意和 AI 能力。

## 挑战目标

本次挑战旨在：

1. **创新交互模式**：探索人机交互的新范式
2. **提升开发效率**：通过 AI 辅助显著提升编程效率
3. **降低学习门槛**：让更多人能够参与到 AI 编程中来
4. **构建生态系统**：创造可持续发展的工具生态

## 技术要求

- 支持至少一种主流 AI 模型（Claude、GPT、Gemini 等）
- 具备良好的用户体验和界面设计
- 代码开源，使用 MIT 或类似协议
- 提供完整的文档和使用指南

## 评审维度

项目将从以下维度进行评估：

- **创新性 (30%)**：解决方案的原创性和前瞻性
- **技术实现 (25%)**：代码质量和技术深度  
- **用户体验 (20%)**：界面设计和易用性
- **实用性 (15%)**：解决实际问题的能力
- **完整度 (10%)**：项目的完成度和文档质量
  `,
  theme: "AI × 开发者工具",
  coverImage: "/api/placeholder/800/400",
  
  registrationStart: "2024-02-01",
  registrationEnd: "2024-02-15",
  eventStart: "2024-02-16",
  eventEnd: "2024-02-18",
  submissionDeadline: "2024-02-18",
  resultsAnnouncement: "2024-02-25",
  
  status: "registration-open" as const,
  
  maxParticipants: 200,
  maxTeamSize: 4,
  minTeamSize: 1,
  currentParticipants: 67,
  
  requirements: [
    "具备基础的编程经验（任何语言）",
    "熟悉至少一种 AI 模型的 API 使用",
    "有团队协作经验（推荐但非必需）",
    "具备基本的 Git 版本控制知识"
  ],
  
  rules: [
    "团队规模：1-4 人",
    "开发时间：48 小时",
    "必须使用 AI 模型 API",
    "代码必须开源",
    "不得使用现有商业化产品的核心代码",
    "提交截止时间：2024年2月18日 23:59"
  ],
  
  judiciaCriteria: [
    "创新性：解决方案的原创性和前瞻性",
    "技术实现：代码质量、架构设计、技术难度",
    "用户体验：界面设计、交互体验、易用性",
    "实用性：解决实际问题的能力和市场潜力",
    "完整度：项目完成度、文档质量、演示效果"
  ],
  
  prizes: [
    {
      rank: 1,
      title: "冠军",
      value: "¥50,000",
      description: "现金奖励 + 创业孵化机会 + 技术导师指导"
    },
    {
      rank: 2,
      title: "亚军", 
      value: "¥20,000",
      description: "现金奖励 + 技术指导 + 社区认证"
    },
    {
      rank: 3,
      title: "季军",
      value: "¥10,000", 
      description: "现金奖励 + 社区认证 + 推广支持"
    },
    {
      rank: 4,
      title: "最佳创意奖",
      value: "¥5,000",
      description: "创意奖励 + 社区展示机会"
    },
    {
      rank: 5,
      title: "最受欢迎奖",
      value: "¥5,000",
      description: "人气奖励 + 社区推广支持"
    }
  ],
  
  sponsors: [
    { 
      name: "OpenAI", 
      tier: "platinum" as const, 
      logo: "🤖",
      contribution: "提供 API 额度支持"
    },
    { 
      name: "Anthropic", 
      tier: "gold" as const,
      logo: "🧠", 
      contribution: "技术专家评审"
    },
    { 
      name: "Google", 
      tier: "gold" as const,
      logo: "🔍",
      contribution: "云服务支持" 
    },
    {
      name: "GitHub",
      tier: "silver" as const,
      logo: "💻",
      contribution: "代码托管支持"
    }
  ],
  
  judges: [
    {
      name: "Dr. AI Research",
      avatar: "/api/placeholder/60/60",
      title: "AI 研究科学家",
      company: "OpenAI",
      bio: "专注于大语言模型和人机交互研究，发表过多篇顶级论文。"
    },
    {
      name: "Tech Founder",
      avatar: "/api/placeholder/60/60", 
      title: "创始人 & CTO",
      company: "AI Startup",
      bio: "连续创业者，在 AI 工具领域有丰富的产品经验。"
    },
    {
      name: "Dev Community Leader",
      avatar: "/api/placeholder/60/60",
      title: "开发者社区负责人", 
      company: "Tech Giant",
      bio: "资深开发者，活跃的开源贡献者和技术布道师。"
    }
  ],
  
  timeline: [
    { date: "2024-02-01", event: "报名开始", status: "completed" },
    { date: "2024-02-15", event: "报名截止", status: "upcoming" },
    { date: "2024-02-16", event: "比赛开始", status: "upcoming" },
    { date: "2024-02-18", event: "提交截止", status: "upcoming" },
    { date: "2024-02-19-24", event: "评审阶段", status: "upcoming" },
    { date: "2024-02-25", event: "结果公布", status: "upcoming" }
  ],
  
  featured: true,
  difficulty: "intermediate" as const,
  tags: ["AI", "开发工具", "创新", "编程"],
  submissionCount: 0
};

// 模拟参与者数据
const mockParticipants = [
  {
    id: "1",
    userName: "AI Developer",
    userAvatar: "/api/placeholder/40/40",
    teamName: "Code Wizards",
    joinedAt: "2024-02-03",
    skills: ["React", "Python", "AI"]
  },
  {
    id: "2", 
    userName: "Tech Innovator",
    userAvatar: "/api/placeholder/40/40",
    teamName: "Future Builders",
    joinedAt: "2024-02-05",
    skills: ["TypeScript", "Claude API", "UX"]
  },
  {
    id: "3",
    userName: "Open Source Hero", 
    userAvatar: "/api/placeholder/40/40",
    teamName: null,
    joinedAt: "2024-02-07",
    skills: ["Go", "Docker", "DevOps"]
  }
];

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function QuestDetailPage({ params }: Props) {
  const { slug } = await params;
  const quest = mockQuestDetail; // 实际应用中应该根据 slug 查询数据

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'registration-open':
        return <Badge className="bg-green-500">📝 报名中</Badge>;
      case 'in-progress':
        return <Badge className="bg-orange-500">⚡ 进行中</Badge>;
      case 'judging':
        return <Badge variant="outline" className="border-purple-500 text-purple-600">⚖️ 评审中</Badge>;
      case 'completed':
        return <Badge variant="outline" className="border-gray-500 text-gray-600">✅ 已结束</Badge>;
      default:
        return <Badge variant="outline">🗓️ 即将开始</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">🌱 初级</Badge>;
      case 'intermediate':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">🚀 中级</Badge>;
      case 'advanced':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">⭐ 高级</Badge>;
      default:
        return <Badge variant="secondary">🔥 专家</Badge>;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link href="/quests">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回任务列表
          </Button>
        </Link>
      </div>

      {/* 挑战头部 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          {/* 封面图片 */}
          <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-6 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🏆</div>
              <div className="text-xl font-semibold">{quest.theme}</div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            {getStatusBadge(quest.status)}
            {getDifficultyBadge(quest.difficulty)}
            {quest.featured && <Badge variant="outline">⭐ 精选</Badge>}
          </div>

          <h1 className="text-3xl font-bold mb-4">{quest.title}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            {quest.description}
          </p>

          {/* 关键信息 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{quest.currentParticipants}</div>
              <div className="text-sm text-gray-500">已报名</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">48h</div>
              <div className="text-sm text-gray-500">开发时间</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{quest.submissionCount}</div>
              <div className="text-sm text-gray-500">项目提交</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">¥85k</div>
              <div className="text-sm text-gray-500">总奖金</div>
            </div>
          </div>

          {/* 标签 */}
          <div className="flex flex-wrap gap-2">
            {quest.tags.map(tag => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* 右侧操作面板 */}
        <div className="space-y-4">
          {/* 报名/参与按钮 */}
          <Card className="p-4">
            {quest.status === 'registration-open' ? (
              <div>
                <h3 className="font-semibold mb-4 text-center">🚀 立即报名参与</h3>
                <Button className="w-full mb-3" size="lg">
                  <UserPlus className="h-4 w-4 mr-2" />
                  报名参与挑战
                </Button>
                <div className="text-center text-sm text-gray-500">
                  报名截止：{quest.registrationEnd}
                </div>
              </div>
            ) : quest.status === 'in-progress' ? (
              <div>
                <h3 className="font-semibold mb-4 text-center">⚡ 挑战进行中</h3>
                <Button className="w-full mb-3" size="lg">
                  <Zap className="h-4 w-4 mr-2" />
                  提交项目
                </Button>
                <div className="text-center text-sm text-gray-500">
                  截止时间：{quest.submissionDeadline}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <h3 className="font-semibold mb-2">挑战已结束</h3>
                <Button variant="outline" className="w-full">
                  查看获奖项目
                </Button>
              </div>
            )}
          </Card>

          {/* 时间轴 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">📅 时间安排</h3>
            <div className="space-y-3">
              {quest.timeline.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {item.status === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : item.status === 'current' ? (
                    <Timer className="h-4 w-4 text-blue-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-gray-400" />
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium">{item.event}</div>
                    <div className="text-xs text-gray-500">{item.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 奖品预览 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">🏆 奖品设置</h3>
            <div className="space-y-3">
              {quest.prizes.slice(0, 3).map(prize => (
                <div key={prize.rank} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {prize.rank === 1 && <Crown className="h-4 w-4 text-yellow-500" />}
                    {prize.rank === 2 && <Medal className="h-4 w-4 text-gray-400" />}
                    {prize.rank === 3 && <Award className="h-4 w-4 text-orange-500" />}
                    <span className="text-sm font-medium">{prize.title}</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{prize.value}</span>
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full mt-2">
                查看全部奖品
              </Button>
            </div>
          </Card>

          {/* 分享 */}
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 gap-2">
              <Share2 className="h-4 w-4" />
              分享
            </Button>
            <Button variant="outline" className="flex-1 gap-2">
              <Heart className="h-4 w-4" />
              收藏
            </Button>
          </div>
        </div>
      </div>

      {/* 详细内容标签页 */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">详情</TabsTrigger>
          <TabsTrigger value="rules">规则</TabsTrigger>
          <TabsTrigger value="prizes">奖品</TabsTrigger>
          <TabsTrigger value="judges">评委</TabsTrigger>
          <TabsTrigger value="participants">参与者</TabsTrigger>
          <TabsTrigger value="submissions">提交</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">📋 挑战详情</h2>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: quest.longDescription.replace(/\n/g, '<br>') }} />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">📋 参与要求</h3>
            <ul className="space-y-2">
              {quest.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">📜 比赛规则</h2>
            <div className="space-y-4">
              {quest.rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">⚖️ 评审标准</h3>
            <div className="space-y-4">
              {quest.judiciaCriteria.map((criteria, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Target className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <span>{criteria}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="prizes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quest.prizes.map(prize => (
              <Card key={prize.rank} className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="mb-3">
                  {prize.rank === 1 && <Crown className="h-8 w-8 text-yellow-500 mx-auto" />}
                  {prize.rank === 2 && <Medal className="h-8 w-8 text-gray-400 mx-auto" />}
                  {prize.rank === 3 && <Award className="h-8 w-8 text-orange-500 mx-auto" />}
                  {prize.rank > 3 && <Gift className="h-8 w-8 text-purple-500 mx-auto" />}
                </div>
                <h3 className="text-lg font-semibold mb-2">{prize.title}</h3>
                <div className="text-2xl font-bold text-green-600 mb-2">{prize.value}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {prize.description}
                </p>
              </Card>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">🤝 赞助商支持</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quest.sponsors.map(sponsor => (
                <div key={sponsor.name} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="text-2xl">{sponsor.logo}</div>
                  <div>
                    <div className="font-semibold">{sponsor.name}</div>
                    <div className="text-sm text-gray-500">{sponsor.contribution}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {sponsor.tier} 赞助商
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="judges" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quest.judges.map(judge => (
              <Card key={judge.name} className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {judge.name.charAt(0)}
                </div>
                <h3 className="font-semibold mb-1">{judge.name}</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{judge.title}</div>
                <div className="text-sm text-blue-600 mb-3">{judge.company}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {judge.bio}
                </p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="participants" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">参与者 ({quest.currentParticipants})</h2>
            <div className="text-sm text-gray-500">
              {quest.maxParticipants ? `${quest.currentParticipants}/${quest.maxParticipants}` : quest.currentParticipants} 人已报名
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockParticipants.map(participant => (
              <Card key={participant.id} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {participant.userName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{participant.userName}</div>
                    {participant.teamName && (
                      <div className="text-sm text-gray-500">团队：{participant.teamName}</div>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {participant.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  报名时间：{participant.joinedAt}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submissions" className="space-y-6">
          {quest.status === 'registration-open' || quest.status === 'upcoming' ? (
            <Card className="p-8 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold mb-2">项目提交尚未开始</h3>
              <p className="text-gray-600 dark:text-gray-400">
                比赛开始后，参与者的项目提交将在这里展示
              </p>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg font-semibold mb-2">项目提交中...</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                参与者正在努力开发中，敬请期待精彩的项目提交！
              </p>
              <div className="text-2xl font-bold text-orange-600">
                {quest.submissionCount} 个项目已提交
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}