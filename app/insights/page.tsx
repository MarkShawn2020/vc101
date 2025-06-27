import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { Search, Calendar, Clock, User, Tag } from "lucide-react";

// 模拟数据
const mockInsights = [
  {
    id: "1",
    title: "Claude Code 使用技巧：提升 AI 编程效率的 10 个实用方法",
    slug: "claude-code-tips-ai-programming-efficiency",
    excerpt: "深入探讨如何利用 Claude Code 提升日常编程工作效率，包含实际案例和最佳实践。",
    coverImage: "/api/placeholder/400/200",
    author: {
      id: "1",
      name: "张三",
      avatar: "/api/placeholder/40/40",
      github: "zhangsan"
    },
    tags: [
      { id: "1", name: "Claude", color: "blue", slug: "claude" },
      { id: "2", name: "编程技巧", color: "green", slug: "programming-tips" }
    ],
    publishedAt: "2024-01-15",
    readingTime: 8,
    featured: true
  },
  {
    id: "2", 
    title: "Gemini vs ChatGPT：AI 编程助手对比分析",
    slug: "gemini-vs-chatgpt-ai-programming-comparison",
    excerpt: "全方位对比分析主流 AI 编程助手的优势与劣势，帮助开发者选择最适合的工具。",
    coverImage: "/api/placeholder/400/200",
    author: {
      id: "2",
      name: "李四",
      avatar: "/api/placeholder/40/40",
      github: "lisi"
    },
    tags: [
      { id: "3", name: "Gemini", color: "purple", slug: "gemini" },
      { id: "4", name: "工具评测", color: "orange", slug: "tool-review" }
    ],
    publishedAt: "2024-01-12",
    readingTime: 12,
    featured: false
  },
  {
    id: "3",
    title: "Prompt Engineering 实战：构建高效的 AI 对话模式",
    slug: "prompt-engineering-effective-ai-conversations", 
    excerpt: "从零开始学习 Prompt Engineering，掌握与 AI 高效对话的核心技巧。",
    coverImage: "/api/placeholder/400/200",
    author: {
      id: "3",
      name: "王五",
      avatar: "/api/placeholder/40/40",
      github: "wangwu"
    },
    tags: [
      { id: "5", name: "Prompt技巧", color: "pink", slug: "prompt-tips" },
      { id: "6", name: "项目实战", color: "cyan", slug: "project-practice" }
    ],
    publishedAt: "2024-01-10",
    readingTime: 15,
    featured: true
  }
];

const mockTags = [
  { id: "1", name: "Claude", color: "blue", slug: "claude" },
  { id: "2", name: "编程技巧", color: "green", slug: "programming-tips" },
  { id: "3", name: "Gemini", color: "purple", slug: "gemini" },
  { id: "4", name: "工具评测", color: "orange", slug: "tool-review" },
  { id: "5", name: "Prompt技巧", color: "pink", slug: "prompt-tips" },
  { id: "6", name: "项目实战", color: "cyan", slug: "project-practice" }
];

export default function InsightsPage() {
  const featuredInsights = mockInsights.filter(insight => insight.featured);
  const recentInsights = mockInsights.filter(insight => !insight.featured);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">💡 Vibe 洞见</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          探索 AI 编程的前沿趋势，分享最佳实践与深度思考
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索文章..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="all">所有标签</option>
            {mockTags.map(tag => (
              <option key={tag.id} value={tag.slug}>{tag.name}</option>
            ))}
          </select>
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="latest">最新发布</option>
            <option value="popular">最受欢迎</option>
            <option value="reading-time">阅读时间</option>
          </select>
        </div>
      </div>

      {/* 标签快捷筛选 */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant="outline" className="cursor-pointer">全部</Badge>
        {mockTags.map(tag => (
          <Badge 
            key={tag.id}
            variant="outline" 
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
          >
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* 精选文章 */}
      {featuredInsights.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🌟 精选文章</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredInsights.map(insight => (
              <Card key={insight.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-4xl">💡</div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {insight.tags.map(tag => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/insights/${insight.slug}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                      {insight.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{insight.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{insight.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{insight.readingTime} 分钟</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 最新文章 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">📚 最新文章</h2>
        <div className="space-y-6">
          {recentInsights.map(insight => (
            <Card key={insight.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-48 aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="text-3xl">💡</div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {insight.tags.map(tag => (
                      <Badge key={tag.id} variant="secondary" className="text-xs">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                  <Link href={`/insights/${insight.slug}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                      {insight.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{insight.author.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{insight.publishedAt}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{insight.readingTime} 分钟</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 分页 */}
      <div className="flex justify-center items-center gap-2">
        <Button variant="outline" disabled>上一页</Button>
        <Badge variant="secondary">1</Badge>
        <Badge variant="outline">2</Badge>
        <Badge variant="outline">3</Badge>
        <Button variant="outline">下一页</Button>
      </div>
    </div>
  );
}