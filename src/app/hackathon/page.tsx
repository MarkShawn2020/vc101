import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { 
  Calendar, Clock, Users, Trophy, Target, Zap, 
  ArrowRight, Star, Code, Lightbulb, Award,
  Play, ExternalLink, Github
} from "lucide-react";

// 模拟黑客松数据
const mockQuests = [
  {
    id: "1",
    title: "AI 编程工具创新挑战",
    slug: "ai-programming-tools-innovation",
    description: "设计和开发下一代 AI 编程辅助工具，让开发者与 AI 的协作更加高效",
    theme: "AI × 开发者工具",
    coverImage: "/api/placeholder/600/300",
    
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
    
    prizes: [
      { rank: 1, title: "冠军", value: "¥50,000", description: "现金奖励 + 创业孵化机会" },
      { rank: 2, title: "亚军", value: "¥20,000", description: "现金奖励 + 技术指导" },
      { rank: 3, title: "季军", value: "¥10,000", description: "现金奖励 + 社区认证" }
    ],
    
    submissionCount: 0,
    featured: true,
    difficulty: "intermediate" as const,
    tags: ["AI", "开发工具", "创新", "编程"],
    
    sponsors: [
      { name: "OpenAI", tier: "platinum" as const },
      { name: "Anthropic", tier: "gold" as const },
      { name: "Google", tier: "gold" as const }
    ]
  },
  {
    id: "2",
    title: "Prompt Engineering 创意大赛",
    slug: "prompt-engineering-creative-contest",
    description: "探索 Prompt Engineering 的创意应用，打造令人惊艳的 AI 交互体验",
    theme: "创意 × Prompt 设计",
    coverImage: "/api/placeholder/600/300",
    
    registrationStart: "2024-01-15",
    registrationEnd: "2024-01-30",
    eventStart: "2024-02-01",
    eventEnd: "2024-02-03",
    submissionDeadline: "2024-02-03",
    resultsAnnouncement: "2024-02-10",
    
    status: "in-progress" as const,
    
    maxParticipants: 150,
    maxTeamSize: 3,
    minTeamSize: 1,
    currentParticipants: 89,
    
    prizes: [
      { rank: 1, title: "最佳创意奖", value: "¥30,000", description: "现金奖励 + 专家指导" },
      { rank: 2, title: "最佳技术奖", value: "¥15,000", description: "现金奖励 + 技术资源" },
      { rank: 3, title: "最佳应用奖", value: "¥8,000", description: "现金奖励 + 推广支持" }
    ],
    
    submissionCount: 23,
    featured: true,
    difficulty: "beginner" as const,
    tags: ["Prompt", "创意", "AI应用", "设计"],
    
    sponsors: [
      { name: "Claude", tier: "platinum" as const },
      { name: "Gemini", tier: "gold" as const }
    ]
  },
  {
    id: "3",
    title: "开源 AI 工具马拉松",
    slug: "open-source-ai-tools-marathon",
    description: "已结束的黑客松：构建开源 AI 工具生态，让更多开发者受益",
    theme: "开源 × AI 生态",
    coverImage: "/api/placeholder/600/300",
    
    registrationStart: "2023-12-01",
    registrationEnd: "2023-12-15",
    eventStart: "2023-12-16",
    eventEnd: "2023-12-18",
    submissionDeadline: "2023-12-18",
    resultsAnnouncement: "2023-12-25",
    
    status: "completed" as const,
    
    maxParticipants: 180,
    maxTeamSize: 5,
    minTeamSize: 2,
    currentParticipants: 156,
    
    prizes: [
      { rank: 1, title: "最佳开源项目", value: "¥40,000", description: "现金奖励 + 开源基金会支持" },
      { rank: 2, title: "最受欢迎项目", value: "¥20,000", description: "现金奖励 + 社区推广" },
      { rank: 3, title: "最具潜力项目", value: "¥12,000", description: "现金奖励 + 孵化支持" }
    ],
    
    submissionCount: 47,
    featured: false,
    difficulty: "advanced" as const,
    tags: ["开源", "AI工具", "生态建设", "协作"],
    
    sponsors: [
      { name: "GitHub", tier: "platinum" as const },
      { name: "Microsoft", tier: "gold" as const }
    ],
    
    // 获奖项目
    winners: [
      {
        rank: 1,
        teamName: "AI Tools United",
        projectName: "Universal AI CLI",
        description: "统一多个 AI 模型的命令行工具",
        demoUrl: "https://demo.example.com",
        codeUrl: "https://github.com/example/universal-ai-cli"
      },
      {
        rank: 2,
        teamName: "Code Wizards",
        projectName: "Smart Prompt Library",
        description: "智能提示词管理和分享平台",
        demoUrl: "https://demo2.example.com",
        codeUrl: "https://github.com/example/smart-prompt-lib"
      }
    ]
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'upcoming':
      return <Badge variant="outline" className="border-blue-500 text-blue-600">🗓️ 即将开始</Badge>;
    case 'registration-open':
      return <Badge variant="default" className="bg-green-500">📝 报名中</Badge>;
    case 'in-progress':
      return <Badge variant="default" className="bg-orange-500">⚡ 进行中</Badge>;
    case 'judging':
      return <Badge variant="outline" className="border-purple-500 text-purple-600">⚖️ 评审中</Badge>;
    case 'completed':
      return <Badge variant="outline" className="border-gray-500 text-gray-600">✅ 已结束</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
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
    case 'expert':
      return <Badge variant="secondary" className="bg-red-100 text-red-800">🔥 专家</Badge>;
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default function QuestsPage() {
  const activeQuests = mockQuests.filter(quest => 
    ['registration-open', 'in-progress', 'judging'].includes(quest.status)
  );
  const upcomingQuests = mockQuests.filter(quest => false); // No upcoming status in current data
  const completedQuests = mockQuests.filter(quest => quest.status === 'completed');

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">💻 VC 黑客松</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          参与技术挑战，展示你的 AI 编程技能，与社区精英一起创造未来
        </p>
      </div>

      {/* Playground 快速入口 */}
      <div className="mb-12">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 p-8 border-2 border-dashed border-green-300 dark:border-green-700">
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold mb-4">编程练习场 (Playground)</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              想要热身一下？进入我们的编程练习场，体验专业级的在线代码编辑器，
              解决算法题目，为黑客松做好准备！
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="gap-2" asChild>
                <Link href="/playground">
                  <Code className="h-5 w-5" />
                  进入 Playground
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="h-5 w-5" />
                观看演示
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              ✨ 支持 Python、Java、C++、JavaScript 等多种语言
            </div>
          </div>
        </Card>
      </div>

      {/* 快速统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">3</div>
          <div className="text-sm text-gray-500">进行中任务</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">312</div>
          <div className="text-sm text-gray-500">总参与人数</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">70</div>
          <div className="text-sm text-gray-500">项目提交</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">¥128k</div>
          <div className="text-sm text-gray-500">总奖金池</div>
        </Card>
      </div>

      {/* 活跃任务 */}
      {activeQuests.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🔥 活跃任务</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeQuests.map(quest => (
              <Card key={quest.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏆</div>
                    <div className="text-sm font-medium">{quest.theme}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(quest.status)}
                        {getDifficultyBadge(quest.difficulty)}
                        {quest.featured && <Badge variant="outline">⭐ 精选</Badge>}
                      </div>
                      <Link href={`/hackathon/${quest.slug}`}>
                        <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                          {quest.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {quest.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* 时间信息 */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1 text-gray-500 mb-1">
                        <Calendar className="h-4 w-4" />
                        <span>活动时间</span>
                      </div>
                      <div className="font-medium">{quest.eventStart} - {quest.eventEnd}</div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-gray-500 mb-1">
                        <Clock className="h-4 w-4" />
                        <span>截止时间</span>
                      </div>
                      <div className="font-medium">{quest.submissionDeadline}</div>
                    </div>
                  </div>
                  
                  {/* 参与和奖励信息 */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <div className="flex items-center gap-1 text-gray-500 mb-1">
                        <Users className="h-4 w-4" />
                        <span>参与人数</span>
                      </div>
                      <div className="font-medium">
                        {quest.currentParticipants} / {quest.maxParticipants || '∞'}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 text-gray-500 mb-1">
                        <Trophy className="h-4 w-4" />
                        <span>冠军奖励</span>
                      </div>
                      <div className="font-medium text-yellow-600">
                        {quest.prizes[0]?.value}
                      </div>
                    </div>
                  </div>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {quest.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {quest.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{quest.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  {/* 赞助商 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">赞助商：</span>
                      <div className="flex gap-1">
                        {quest.sponsors.slice(0, 3).map(sponsor => (
                          <Badge key={sponsor.name} variant="secondary" className="text-xs">
                            {sponsor.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button className="gap-2">
                      {quest.status === 'registration-open' ? '立即报名' : '查看详情'}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 即将开始 */}
      {upcomingQuests.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🗓️ 即将开始</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingQuests.map(quest => (
              <Card key={quest.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  {getStatusBadge(quest.status)}
                  {getDifficultyBadge(quest.difficulty)}
                </div>
                <Link href={`/quests/${quest.slug}`}>
                  <h3 className="font-semibold mb-2 hover:text-primary cursor-pointer">
                    {quest.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {quest.description.slice(0, 100)}...
                </p>
                <div className="text-sm text-gray-500">
                  报名开始：{quest.registrationStart}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 往期精彩 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">🎖️ 往期精彩</h2>
        <div className="space-y-6">
          {completedQuests.map(quest => (
            <Card key={quest.id} className="p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-48 aspect-video bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex items-center justify-center">
                  <div className="text-3xl">🏆</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {getStatusBadge(quest.status)}
                    {getDifficultyBadge(quest.difficulty)}
                    <Badge variant="outline" className="text-xs">
                      {quest.submissionCount} 个项目
                    </Badge>
                  </div>
                  <Link href={`/quests/${quest.slug}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                      {quest.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {quest.description}
                  </p>
                  
                  {/* 获奖项目预览 */}
                  {(quest as any).winners && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">🏅 获奖项目</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {(quest as any).winners.slice(0, 2).map((winner: any) => (
                          <div key={winner.rank} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="secondary" className="text-xs">
                                #{winner.rank} {winner.teamName}
                              </Badge>
                            </div>
                            <div className="font-medium text-sm">{winner.projectName}</div>
                            <p className="text-xs text-gray-500 mb-2">{winner.description}</p>
                            <div className="flex gap-2">
                              {winner.demoUrl && (
                                <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
                                  <a href={winner.demoUrl} target="_blank" rel="noopener noreferrer">
                                    <Play className="h-3 w-3 mr-1" />
                                    Demo
                                  </a>
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="h-6 px-2 text-xs" asChild>
                                <a href={winner.codeUrl} target="_blank" rel="noopener noreferrer">
                                  <Github className="h-3 w-3 mr-1" />
                                  代码
                                </a>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      举办时间：{quest.eventStart} - {quest.eventEnd}
                    </div>
                    <Button variant="outline" className="gap-2" asChild>
                      <Link href={`/hackathon/${quest.slug}`}>
                        查看回顾
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA 区域 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">准备好迎接挑战了吗？</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          加入 VC101 社区，参与激动人心的技术挑战，与全球开发者一起推动 AI 编程的边界。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <Target className="h-5 w-5" />
            参与下一个挑战
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Lightbulb className="h-5 w-5" />
            提议新挑战
          </Button>
        </div>
      </Card>
    </div>
  );
}