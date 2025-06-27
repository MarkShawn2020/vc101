import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  User, Edit, Github, Globe, Twitter, Linkedin, MapPin, 
  Calendar, Award, Star, Download, Eye, MessageCircle,
  Heart, TrendingUp, Settings, Share2, Trophy, Target
} from "lucide-react";
import Link from "next/link";

// 模拟当前用户数据
const mockUserProfile = {
  id: "current-user",
  email: "user@example.com",
  username: "ai_developer",
  displayName: "AI 开发者",
  avatar: "/api/placeholder/120/120",
  bio: "热爱 AI 编程的全栈开发者，专注于提升开发效率的工具和方法。喜欢分享经验，探索新技术。",
  location: "北京，中国",
  website: "https://aidev.example.com",
  github: "ai-developer", 
  twitter: "ai_developer_cn",
  linkedin: "ai-developer",
  
  // 统计信息
  insightsCount: 12,
  toolsCount: 5,
  questsParticipated: 3,
  totalContributions: 20,
  
  // 社区等级
  level: 3,
  levelName: "活跃贡献者",
  totalPoints: 2450,
  
  // 时间戳
  joinedAt: "2023-10-15",
  lastActiveAt: "2024-01-15",
  updatedAt: "2024-01-10"
};

// 模拟用户贡献
const mockContributions = [
  {
    id: "1",
    type: "insight" as const,
    title: "Claude Code 使用技巧：提升 AI 编程效率的 10 个实用方法",
    slug: "claude-code-tips-ai-programming-efficiency",
    description: "深入探讨如何利用 Claude Code 提升日常编程工作效率",
    publishedAt: "2024-01-15",
    featured: true,
    stats: {
      views: 1420,
      likes: 89,
      comments: 23
    }
  },
  {
    id: "2", 
    type: "tool" as const,
    title: "Claude Code Enhanced",
    slug: "claude-code-enhanced",
    description: "增强版 Claude Code，支持更多自定义功能",
    publishedAt: "2024-01-10",
    featured: true,
    stats: {
      downloads: 1250,
      likes: 156,
      comments: 45
    }
  },
  {
    id: "3",
    type: "insight" as const,
    title: "Prompt Engineering 最佳实践指南",
    slug: "prompt-engineering-best-practices",
    description: "分享一些实用的 Prompt 设计技巧和经验",
    publishedAt: "2024-01-05",
    featured: false,
    stats: {
      views: 890,
      likes: 67,
      comments: 18
    }
  }
];

// 模拟用户收藏
const mockFavorites = [
  {
    id: "1",
    itemType: "insight" as const,
    itemId: "insight-1",
    itemTitle: "Gemini vs ChatGPT：AI 编程助手对比分析",
    itemSlug: "gemini-vs-chatgpt-comparison",
    itemAuthor: "李四",
    addedAt: "2024-01-12"
  },
  {
    id: "2",
    itemType: "tool" as const,
    itemId: "tool-2", 
    itemTitle: "AI Chat History Manager",
    itemSlug: "ai-chat-history-manager",
    itemAuthor: "王五",
    addedAt: "2024-01-08"
  },
  {
    id: "3",
    itemType: "insight" as const,
    itemId: "insight-3",
    itemTitle: "如何构建高效的 AI 工作流",
    itemSlug: "building-efficient-ai-workflows",
    itemAuthor: "赵六",
    addedAt: "2024-01-03"
  }
];

// 模拟徽章
const mockBadges = [
  {
    id: "1",
    name: "早期贡献者",
    description: "社区建立初期的积极参与者",
    icon: "🌟",
    color: "gold",
    earnedAt: "2023-10-20",
    rarity: "rare" as const
  },
  {
    id: "2",
    name: "工具专家",
    description: "发布了多个受欢迎的开发工具",
    icon: "🔧",
    color: "blue",
    earnedAt: "2023-12-15",
    rarity: "epic" as const
  },
  {
    id: "3",
    name: "知识分享者",
    description: "发布了 10+ 篇技术文章",
    icon: "📚",
    color: "green",
    earnedAt: "2024-01-05",
    rarity: "common" as const
  }
];

// 模拟统计数据
const mockStats = {
  totalViews: 3240,
  totalDownloads: 1850,
  totalLikes: 312,
  totalComments: 86,
  weeklyViews: 420,
  monthlyViews: 1680,
  growthRate: 15.8
};

export default function ProfilePage() {
  const user = mockUserProfile;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* 用户资料头部 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* 头像 */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {user.displayName.charAt(0)}
                </div>
              </div>
              
              {/* 基本信息 */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{user.displayName}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">@{user.username}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        等级 {user.level} - {user.levelName}
                      </Badge>
                      <Badge variant="outline">
                        {user.totalPoints} 积分
                      </Badge>
                    </div>
                  </div>
                  <Button className="gap-2">
                    <Edit className="h-4 w-4" />
                    编辑资料
                  </Button>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">{user.bio}</p>
                
                {/* 社交链接和位置 */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  {user.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>加入于 {user.joinedAt}</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-4">
                  {user.website && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={user.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {user.github && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {user.twitter && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {user.linkedin && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={`https://linkedin.com/in/${user.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 右侧统计和快捷操作 */}
        <div className="space-y-4">
          {/* 贡献统计 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">📊 贡献统计</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{user.insightsCount}</div>
                <div className="text-xs text-gray-500">发布文章</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{user.toolsCount}</div>
                <div className="text-xs text-gray-500">分享工具</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{user.questsParticipated}</div>
                <div className="text-xs text-gray-500">参与任务</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{user.totalContributions}</div>
                <div className="text-xs text-gray-500">总贡献</div>
              </div>
            </div>
          </Card>

          {/* 影响力数据 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">📈 影响力数据</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">总浏览量</span>
                <span className="font-semibold">{mockStats.totalViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">总下载量</span>
                <span className="font-semibold">{mockStats.totalDownloads.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">获得点赞</span>
                <span className="font-semibold">{mockStats.totalLikes}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">增长率</span>
                <div className="flex items-center gap-1 text-green-600">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-semibold">+{mockStats.growthRate}%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* 成就徽章预览 */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">🏆 最新徽章</h3>
            <div className="grid grid-cols-3 gap-2">
              {mockBadges.slice(0, 3).map(badge => (
                <div key={badge.id} className="text-center group cursor-pointer">
                  <div className="text-2xl mb-1">{badge.icon}</div>
                  <div className="text-xs text-gray-500 group-hover:text-primary transition-colors">
                    {badge.name}
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3">
              查看全部徽章
            </Button>
          </Card>
        </div>
      </div>

      {/* 详细内容标签页 */}
      <Tabs defaultValue="contributions" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="contributions">我的贡献</TabsTrigger>
          <TabsTrigger value="favorites">我的收藏</TabsTrigger>
          <TabsTrigger value="badges">徽章成就</TabsTrigger>
          <TabsTrigger value="settings">设置</TabsTrigger>
        </TabsList>

        <TabsContent value="contributions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">我的贡献</h2>
            <div className="flex gap-2">
              <select className="px-3 py-1 border rounded-md bg-background text-sm">
                <option value="all">全部类型</option>
                <option value="insight">文章</option>
                <option value="tool">工具</option>
                <option value="quest">任务</option>
              </select>
              <select className="px-3 py-1 border rounded-md bg-background text-sm">
                <option value="latest">最新发布</option>
                <option value="popular">最受欢迎</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {mockContributions.map(contribution => (
              <Card key={contribution.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {contribution.type === 'insight' && '📄 文章'}
                        {contribution.type === 'tool' && '🔧 工具'}
                      </Badge>
                      {contribution.featured && (
                        <Badge variant="outline" className="text-xs">
                          ⭐ 精选
                        </Badge>
                      )}
                    </div>
                    <Link href={`/${contribution.type === 'insight' ? 'insights' : 'arsenal'}/${contribution.slug}`}>
                      <h3 className="font-semibold hover:text-primary cursor-pointer mb-2">
                        {contribution.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {contribution.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{contribution.publishedAt}</span>
                      {contribution.stats?.views && (
                        <div className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          <span>{contribution.stats.views}</span>
                        </div>
                      )}
                      {contribution.stats?.downloads && (
                        <div className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          <span>{contribution.stats.downloads}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{contribution.stats?.likes || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{contribution.stats?.comments || 0}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      编辑
                    </Button>
                    <Button size="sm" variant="outline">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">我的收藏</h2>
            <select className="px-3 py-1 border rounded-md bg-background text-sm">
              <option value="all">全部类型</option>
              <option value="insight">文章</option>
              <option value="tool">工具</option>
              <option value="resource">资源</option>
            </select>
          </div>

          <div className="space-y-3">
            {mockFavorites.map(favorite => (
              <Card key={favorite.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">
                        {favorite.itemType === 'insight' && '📄'}
                        {favorite.itemType === 'tool' && '🔧'}
                        {favorite.itemType}
                      </Badge>
                    </div>
                    <Link href={`/${favorite.itemType === 'insight' ? 'insights' : 'arsenal'}/${favorite.itemSlug}`}>
                      <h3 className="font-semibold hover:text-primary cursor-pointer mb-1">
                        {favorite.itemTitle}
                      </h3>
                    </Link>
                    <div className="text-sm text-gray-500">
                      <span>by {favorite.itemAuthor}</span>
                      <span className="mx-2">•</span>
                      <span>收藏于 {favorite.addedAt}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    取消收藏
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <h2 className="text-xl font-semibold">徽章成就</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockBadges.map(badge => (
              <Card key={badge.id} className="p-4 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold mb-2">{badge.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {badge.description}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${
                      badge.rarity === 'epic' ? 'border-purple-500 text-purple-600' :
                      badge.rarity === 'rare' ? 'border-blue-500 text-blue-600' :
                      'border-gray-500 text-gray-600'
                    }`}
                  >
                    {badge.rarity}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  获得于 {badge.earnedAt}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <h2 className="text-xl font-semibold">账户设置</h2>
          
          <Card className="p-6">
            <h3 className="font-semibold mb-4">基本信息</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="displayName">显示名称</Label>
                  <Input id="displayName" defaultValue={user.displayName} />
                </div>
                <div>
                  <Label htmlFor="username">用户名</Label>
                  <Input id="username" defaultValue={user.username} />
                </div>
              </div>
              <div>
                <Label htmlFor="bio">个人简介</Label>
                <textarea 
                  id="bio"
                  className="w-full px-3 py-2 border rounded-md bg-background"
                  rows={3}
                  defaultValue={user.bio}
                />
              </div>
              <div>
                <Label htmlFor="location">所在地</Label>
                <Input id="location" defaultValue={user.location} />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">社交链接</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="website">个人网站</Label>
                <Input id="website" defaultValue={user.website} placeholder="https://" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="github">GitHub</Label>
                  <Input id="github" defaultValue={user.github} placeholder="username" />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" defaultValue={user.twitter} placeholder="username" />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input id="linkedin" defaultValue={user.linkedin} placeholder="username" />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex gap-4">
            <Button>保存更改</Button>
            <Button variant="outline">取消</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}