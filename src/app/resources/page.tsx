import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  Search, ExternalLink, Star, BookOpen, Play, FileText,
  Code, Zap, Bookmark, Eye, Calendar, User, Plus,
  GraduationCap, Book, Video, Headphones, Github,
  Award, Clock, Target, TrendingUp
} from "lucide-react";

// 模拟分类数据
const resourceCategories = [
  {
    id: "documentation",
    name: "官方文档",
    slug: "documentation",
    description: "AI 模型和工具的官方文档",
    icon: "📚",
    color: "blue",
    resourceCount: 24
  },
  {
    id: "tutorials",
    name: "优质教程",
    slug: "tutorials", 
    description: "step-by-step 学习指南",
    icon: "🎓",
    color: "green",
    resourceCount: 38
  },
  {
    id: "prompts",
    name: "Prompt 合集",
    slug: "prompts",
    description: "精选提示词模板和技巧",
    icon: "💡",
    color: "yellow",
    resourceCount: 156
  },
  {
    id: "papers",
    name: "学术论文",
    slug: "papers",
    description: "AI 领域的前沿研究",
    icon: "📄",
    color: "purple",
    resourceCount: 67
  },
  {
    id: "libraries",
    name: "开源库",
    slug: "libraries",
    description: "有用的代码库和框架",
    icon: "📦",
    color: "orange",
    resourceCount: 89
  },
  {
    id: "tools",
    name: "实用工具",
    slug: "tools",
    description: "提升效率的在线工具",
    icon: "🔧",
    color: "cyan",
    resourceCount: 45
  },
  {
    id: "videos",
    name: "视频课程",
    slug: "videos", 
    description: "视频教程和讲座",
    icon: "🎬",
    color: "red",
    resourceCount: 31
  },
  {
    id: "communities",
    name: "社区论坛",
    slug: "communities",
    description: "交流讨论的社区平台",
    icon: "👥",
    color: "pink",
    resourceCount: 18
  }
];

// 模拟资源数据
const mockResources = [
  {
    id: "1",
    title: "OpenAI API 官方文档",
    description: "OpenAI 提供的完整 API 使用指南，包含详细的参数说明和示例代码",
    url: "https://platform.openai.com/docs",
    type: "documentation" as const,
    category: resourceCategories[0],
    tags: ["OpenAI", "API", "GPT", "官方"],
    language: "英文",
    difficulty: "intermediate" as const,
    author: "OpenAI Team",
    source: "OpenAI",
    rating: 4.9,
    reviewCount: 234,
    viewCount: 12456,
    bookmarkCount: 3421,
    featured: true,
    verified: true,
    official: true,
    free: true,
    publishedAt: "2023-03-01",
    lastUpdated: "2024-01-15",
    addedAt: "2023-10-15"
  },
  {
    id: "2",
    title: "Claude API 快速入门指南",
    description: "从零开始学习如何使用 Claude API，包含实际项目案例",
    url: "https://docs.anthropic.com/claude/quickstart",
    type: "tutorial" as const,
    category: resourceCategories[1],
    tags: ["Claude", "API", "教程", "入门"],
    language: "英文",
    difficulty: "beginner" as const,
    estimatedTime: "30 分钟",
    author: "Anthropic Team",
    source: "Anthropic",
    rating: 4.8,
    reviewCount: 167,
    viewCount: 8934,
    bookmarkCount: 2156,
    featured: true,
    verified: true,
    official: true,
    free: true,
    publishedAt: "2023-07-20",
    lastUpdated: "2024-01-10",
    addedAt: "2023-11-01"
  },
  {
    id: "3",
    title: "AI 编程提示词大全",
    description: "收集了 200+ 个实用的 AI 编程提示词模板，涵盖各种开发场景",
    url: "https://github.com/ai-prompts/programming",
    type: "template" as const,
    category: resourceCategories[2], 
    tags: ["Prompt", "编程", "模板", "GitHub"],
    language: "中英文",
    difficulty: "beginner" as const,
    author: "AI Prompts Community",
    source: "GitHub",
    rating: 4.7,
    reviewCount: 89,
    viewCount: 15623,
    bookmarkCount: 4567,
    featured: true,
    verified: true,
    official: false,
    free: true,
    publishedAt: "2023-09-15",
    lastUpdated: "2024-01-12",
    addedAt: "2023-12-01"
  },
  {
    id: "4",
    title: "Attention Is All You Need",
    description: "Transformer 架构的原始论文，现代大语言模型的基础",
    url: "https://arxiv.org/abs/1706.03762",
    type: "paper" as const,
    category: resourceCategories[3],
    tags: ["Transformer", "注意力机制", "论文", "深度学习"],
    language: "英文",
    difficulty: "expert" as const,
    estimatedTime: "2 小时",
    author: "Vaswani et al.",
    source: "arXiv",
    rating: 4.9,
    reviewCount: 456,
    viewCount: 23456,
    bookmarkCount: 7890,
    featured: true,
    verified: true,
    official: false,
    free: true,
    publishedAt: "2017-06-12",
    lastUpdated: "2017-06-12",
    addedAt: "2023-10-20"
  },
  {
    id: "5",
    title: "LangChain 开发框架",
    description: "用于构建 LLM 应用的 Python 框架，简化 AI 应用开发流程",
    url: "https://github.com/langchain-ai/langchain",
    type: "library" as const,
    category: resourceCategories[4],
    tags: ["LangChain", "Python", "LLM", "框架"],
    language: "英文",
    difficulty: "intermediate" as const,
    author: "LangChain Team",
    source: "GitHub",
    rating: 4.6,
    reviewCount: 234,
    viewCount: 34567,
    bookmarkCount: 8901,
    featured: false,
    verified: true,
    official: true,
    free: true,
    publishedAt: "2022-10-01",
    lastUpdated: "2024-01-14",
    addedAt: "2023-11-15"
  },
  {
    id: "6",
    title: "AI 编程实战：从入门到精通",
    description: "B站热门视频课程，通过实际项目学习 AI 编程技巧",
    url: "https://www.bilibili.com/video/BV1234567890",
    type: "video" as const,
    category: resourceCategories[6],
    tags: ["视频教程", "实战", "B站", "中文"],
    language: "中文",
    difficulty: "intermediate" as const,
    estimatedTime: "8 小时",
    author: "AI编程导师",
    source: "Bilibili",
    rating: 4.8,
    reviewCount: 567,
    viewCount: 45678,
    bookmarkCount: 3456,
    featured: false,
    verified: false,
    official: false,
    free: true,
    publishedAt: "2023-12-01",
    lastUpdated: "2023-12-01",
    addedAt: "2023-12-05"
  }
];

// 模拟精选资源合集
const featuredCollections = [
  {
    id: "1",
    name: "AI 编程新手村",
    description: "从零开始学习 AI 编程的完整路径",
    resourceCount: 12,
    viewCount: 8934,
    bookmarkCount: 1234,
    createdBy: {
      userName: "AI导师",
      userAvatar: "/api/placeholder/40/40"
    }
  },
  {
    id: "2", 
    name: "Prompt Engineering 精选",
    description: "提升 AI 对话质量的最佳实践",
    resourceCount: 25,
    viewCount: 15678,
    bookmarkCount: 2345,
    createdBy: {
      userName: "Prompt专家",
      userAvatar: "/api/placeholder/40/40"
    }
  },
  {
    id: "3",
    name: "开源 AI 工具箱",
    description: "最实用的开源 AI 工具和库",
    resourceCount: 18,
    viewCount: 12345,
    bookmarkCount: 1876,
    createdBy: {
      userName: "开源爱好者",
      userAvatar: "/api/placeholder/40/40"
    }
  }
];

export default function ResourcesPage() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'documentation': return <BookOpen className="h-4 w-4" />;
      case 'tutorial': return <GraduationCap className="h-4 w-4" />;
      case 'paper': return <FileText className="h-4 w-4" />;
      case 'library': return <Code className="h-4 w-4" />;
      case 'video': return <Play className="h-4 w-4" />;
      case 'tool': return <Zap className="h-4 w-4" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">🌱 入门</Badge>;
      case 'intermediate':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">🚀 进阶</Badge>;
      case 'advanced':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800">⭐ 高级</Badge>;
      case 'expert':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">🔥 专家</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">📚 资源枢纽</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          精心策划的 AI 编程学习资源，助你掌握前沿技术
        </p>
      </div>

      {/* 资源统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">468</div>
          <div className="text-sm text-gray-500">精选资源</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">8</div>
          <div className="text-sm text-gray-500">资源分类</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">156k</div>
          <div className="text-sm text-gray-500">总浏览量</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">3.2k</div>
          <div className="text-sm text-gray-500">社区贡献</div>
        </Card>
      </div>

      {/* 搜索和操作 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索资源..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="all">所有分类</option>
            {resourceCategories.map(category => (
              <option key={category.id} value={category.slug}>{category.name}</option>
            ))}
          </select>
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="all">所有类型</option>
            <option value="documentation">文档</option>
            <option value="tutorial">教程</option>
            <option value="video">视频</option>
            <option value="paper">论文</option>
            <option value="library">开源库</option>
          </select>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            提交资源
          </Button>
        </div>
      </div>

      {/* 分类浏览 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">🗂️ 按分类浏览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resourceCategories.map(category => (
            <Card key={category.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {category.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{category.resourceCount} 个资源</span>
                <Badge variant="outline" className="text-xs">
                  {category.color}
                </Badge>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 主要内容标签页 */}
      <Tabs defaultValue="featured" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="featured">精选资源</TabsTrigger>
          <TabsTrigger value="collections">热门合集</TabsTrigger>
          <TabsTrigger value="latest">最新添加</TabsTrigger>
          <TabsTrigger value="trending">本周热门</TabsTrigger>
        </TabsList>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockResources.filter(r => r.featured).map(resource => (
              <Card key={resource.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="secondary" className="text-xs">
                        {resource.type}
                      </Badge>
                      {resource.featured && <Badge variant="outline" className="text-xs">⭐ 精选</Badge>}
                      {resource.official && <Badge variant="outline" className="text-xs text-blue-600">官方</Badge>}
                    </div>
                    {getDifficultyBadge(resource.difficulty)}
                  </div>
                  
                  <h3 className="font-semibold mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {resource.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{resource.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  {/* 统计信息 */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{resource.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{resource.viewCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark className="h-3 w-3" />
                        <span>{resource.bookmarkCount}</span>
                      </div>
                    </div>
                    {resource.estimatedTime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{resource.estimatedTime}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* 作者和来源 */}
                  <div className="text-xs text-gray-500 mb-4">
                    <div>来源：{resource.source}</div>
                    {resource.author && <div>作者：{resource.author}</div>}
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        访问资源
                      </a>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCollections.map(collection => (
              <Card key={collection.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">📂</div>
                  <h3 className="font-semibold mb-2">{collection.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {collection.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-3 gap-4 text-center mb-4">
                  <div>
                    <div className="text-lg font-bold text-blue-600">{collection.resourceCount}</div>
                    <div className="text-xs text-gray-500">资源</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{collection.viewCount.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">浏览</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-600">{collection.bookmarkCount}</div>
                    <div className="text-xs text-gray-500">收藏</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {collection.createdBy.userName.charAt(0)}
                    </div>
                    <span className="text-sm text-gray-500">{collection.createdBy.userName}</span>
                  </div>
                  <Button size="sm" variant="outline">
                    查看合集
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="latest" className="space-y-4">
          <div className="space-y-4">
            {mockResources.slice(3).map(resource => (
              <Card key={resource.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(resource.type)}
                      <Badge variant="secondary" className="text-xs">
                        {resource.category.name}
                      </Badge>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>添加于 {resource.addedAt}</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          <span>{resource.rating}</span>
                        </div>
                        <span>{resource.language}</span>
                        {getDifficultyBadge(resource.difficulty)}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" asChild>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer">
                        访问
                      </a>
                    </Button>
                    <Button size="sm" variant="outline">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" className="space-y-4">
          <div className="space-y-4">
            {mockResources.slice(0, 4).map((resource, index) => (
              <Card key={resource.id} className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{resource.title}</h3>
                      <Badge variant="outline" className="text-xs">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        热门
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {resource.description.slice(0, 100)}...
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{resource.viewCount.toLocaleString()} 浏览</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bookmark className="h-3 w-3" />
                        <span>{resource.bookmarkCount} 收藏</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        <span>{resource.rating} 评分</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      访问资源
                    </a>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* 贡献邀请 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">帮助社区发现更多优质资源</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          如果你发现了优质的 AI 编程资源，欢迎分享给社区。我们会仔细审核并展示高质量的内容。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <Plus className="h-5 w-5" />
            提交新资源
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Award className="h-5 w-5" />
            成为资源管理员
          </Button>
        </div>
      </Card>
    </div>
  );
}