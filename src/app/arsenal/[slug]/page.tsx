'use client';

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  ArrowLeft, Download, Star, Github, ExternalLink, Verified, 
  Globe, Users, Calendar, Clock, Heart, Share2, Flag,
  Terminal, Code, FileText, Play, Copy, Check
} from "lucide-react";
import { useState } from "react";

// 模拟工具详情数据
const mockToolDetail = {
  id: "1",
  name: "Claude Code Enhanced",
  slug: "claude-code-enhanced",
  tagline: "增强版 Claude Code，支持更多自定义功能",
  description: "为 Claude Code 添加了历史记录管理、自定义提示词、批量操作等功能，让 AI 对話更高效。",
  longDescription: `
Claude Code Enhanced 是对官方 Claude Code 的增强版本，专为提升开发者的 AI 编程体验而设计。

## 主要特性

### 🗂️ 历史记录管理
- 自动保存所有对话历史
- 支持按项目、标签分类
- 快速搜索和检索历史记录
- 导出对话为 Markdown 格式

### 🎯 自定义提示词
- 预设常用提示词模板
- 支持自定义提示词库
- 一键切换不同编程语言模式
- 项目上下文自动注入

### ⚡ 批量操作
- 批量处理多个文件
- 自动化代码重构任务
- 批量生成文档和注释
- 项目级别的代码分析

### 🔧 高级配置
- 自定义 Claude 模型参数
- 可配置的输出格式
- 集成开发环境快捷键
- 插件系统支持

## 安装要求

- Node.js 16.0 或更高版本
- Claude API 密钥
- 支持的操作系统：Windows、macOS、Linux

## 快速开始

安装完成后，使用以下命令初始化：

\`\`\`bash
claude-enhanced init
claude-enhanced config set-key YOUR_API_KEY
claude-enhanced start
\`\`\`
  `,
  logo: "🤖",
  screenshots: [
    "/api/placeholder/800/450",
    "/api/placeholder/800/450", 
    "/api/placeholder/800/450"
  ],
  category: {
    id: "1",
    name: "CLI 工具",
    slug: "cli-tools", 
    icon: "⚡",
    description: "命令行增强工具"
  },
  supportedModels: [
    { id: "claude", name: "Claude", icon: "🤖", color: "blue" }
  ],
  author: {
    id: "1",
    name: "开发者张三",
    avatar: "/api/placeholder/60/60",
    github: "zhangsan",
    website: "https://zhangsan.dev"
  },
  tags: ["CLI", "历史管理", "效率工具", "自定义", "批量操作"],
  downloads: [
    { 
      type: "github" as const, 
      url: "https://github.com/zhangsan/claude-code-enhanced",
      version: "v2.1.0"
    },
    { 
      type: "npm" as const, 
      url: "https://npmjs.com/package/claude-code-enhanced", 
      command: "npm install -g claude-code-enhanced",
      version: "v2.1.0"
    },
    {
      type: "direct" as const,
      url: "https://releases.example.com/claude-code-enhanced-v2.1.0.zip",
      version: "v2.1.0"
    }
  ],
  
  // Statistics
  downloadCount: 1250,
  starCount: 89,
  rating: 4.8,
  reviewCount: 23,
  
  // Metadata
  version: "v2.1.0",
  license: "MIT",
  createdAt: "2023-12-01",
  updatedAt: "2024-01-15",
  featured: true,
  verified: true,
  status: "active" as const,
  
  // Additional info
  requirements: [
    "Node.js 16.0+",
    "Claude API Key",
    "Windows/macOS/Linux"
  ],
  changelog: `
## v2.1.0 (2024-01-15)
- 新增批量文件处理功能
- 优化历史记录搜索性能
- 修复 Windows 平台兼容性问题
- 添加自定义主题支持

## v2.0.5 (2024-01-10)
- 修复提示词模板保存问题
- 改进错误处理机制
- 更新依赖包版本

## v2.0.0 (2023-12-20)
- 重写核心架构
- 新增插件系统
- 支持多项目管理
- UI 界面全面升级
  `,
  documentation: "https://docs.example.com/claude-code-enhanced",
  demoUrl: "https://demo.example.com/claude-code-enhanced"
};

// 模拟用户评价
const mockReviews = [
  {
    id: "1",
    userId: "user1",
    userName: "李开发者",
    userAvatar: "/api/placeholder/40/40",
    rating: 5,
    comment: "太棒了！历史记录功能特别实用，再也不担心丢失重要的对话了。批量操作功能也很强大，大大提升了工作效率。",
    createdAt: "2024-01-10"
  },
  {
    id: "2", 
    userId: "user2",
    userName: "王程序员",
    userAvatar: "/api/placeholder/40/40",
    rating: 4,
    comment: "整体很不错，自定义提示词功能很有用。不过希望能添加更多的主题选择。",
    createdAt: "2024-01-08"
  },
  {
    id: "3",
    userId: "user3", 
    userName: "赵工程师",
    userAvatar: "/api/placeholder/40/40",
    rating: 5,
    comment: "作为 Claude Code 的深度用户，这个增强版本完全满足了我的需求。安装简单，功能强大，强烈推荐！",
    createdAt: "2024-01-05"
  }
];

// 相关工具推荐
const relatedTools = [
  {
    id: "2",
    name: "Gemini CLI Wrapper", 
    slug: "gemini-cli-wrapper",
    logo: "💎",
    rating: 4.6,
    downloadCount: 867
  },
  {
    id: "3",
    name: "AI Chat History Manager",
    slug: "ai-chat-history-manager", 
    logo: "💬",
    rating: 4.9,
    downloadCount: 2103
  }
];

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = mockToolDetail; // 实际应用中应该根据 slug 查询数据
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyCommand = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Link href="/arsenal">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            返回军火库
          </Button>
        </Link>
      </div>

      {/* 工具头部信息 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-4 mb-4">
            <div className="text-6xl">{tool.logo}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{tool.name}</h1>
                {tool.verified && (
                  <Verified className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-3">
                {tool.tagline}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>by {tool.author.name}</span>
                <span>版本 {tool.version}</span>
                <Badge variant="outline">
                  {tool.category.icon} {tool.category.name}
                </Badge>
                <Badge variant="secondary">
                  {tool.status === 'active' ? '✅ 活跃' : '⚠️ 停用'}
                </Badge>
              </div>
              
              {/* AI 模型支持 */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm text-gray-500">支持的 AI 模型：</span>
                {tool.supportedModels.map(model => (
                  <Badge key={model.id} variant="secondary">
                    {model.icon} {model.name}
                  </Badge>
                ))}
              </div>
              
              {/* 标签 */}
              <div className="flex flex-wrap gap-2">
                {tool.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧信息卡片 */}
        <div className="space-y-4">
          {/* 统计信息 */}
          <Card className="p-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{tool.downloadCount.toLocaleString()}</div>
                <div className="text-sm text-gray-500">总下载量</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">{tool.rating}</div>
                <div className="text-sm text-gray-500">平均评分</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{tool.starCount}</div>
                <div className="text-sm text-gray-500">Star 数</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{tool.reviewCount}</div>
                <div className="text-sm text-gray-500">用户评价</div>
              </div>
            </div>
          </Card>

          {/* 作者信息 */}
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                {tool.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold">{tool.author.name}</div>
                <div className="text-sm text-gray-500">开发者</div>
              </div>
            </div>
            <div className="flex gap-2">
              {tool.author.github && (
                <Button size="sm" variant="outline" asChild>
                  <a href={`https://github.com/${tool.author.github}`} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
              )}
              {tool.author.website && (
                <Button size="sm" variant="outline" asChild>
                  <a href={tool.author.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </Card>

          {/* 操作按钮 */}
          <div className="space-y-2">
            <Button className="w-full" size="lg">
              <Download className="h-4 w-4 mr-2" />
              下载工具
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <Heart className="h-4 w-4 mr-2" />
                收藏
              </Button>
              <Button variant="outline" className="flex-1">
                <Share2 className="h-4 w-4 mr-2" />
                分享
              </Button>
              <Button variant="outline">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 详细内容标签页 */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">概述</TabsTrigger>
          <TabsTrigger value="install">安装</TabsTrigger>
          <TabsTrigger value="screenshots">截图</TabsTrigger>
          <TabsTrigger value="reviews">评价</TabsTrigger>
          <TabsTrigger value="changelog">更新日志</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">📖 详细介绍</h2>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: tool.longDescription.replace(/\n/g, '<br>') }} />
            </div>
          </Card>

          {/* 系统要求 */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">💻 系统要求</h3>
            <ul className="space-y-2">
              {tool.requirements?.map((req, index) => (
                <li key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="install" className="space-y-6">
          {tool.downloads.map((download, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  {download.type === 'github' && <Github className="h-5 w-5" />}
                  {download.type === 'npm' && <Terminal className="h-5 w-5" />}
                  {download.type === 'direct' && <Download className="h-5 w-5" />}
                  {download.type === 'github' && 'GitHub 源码'}
                  {download.type === 'npm' && 'NPM 安装'}
                  {download.type === 'direct' && '直接下载'}
                </h3>
                {download.version && (
                  <Badge variant="secondary">{download.version}</Badge>
                )}
              </div>
              
              {download.command && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <code className="text-sm">{download.command}</code>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => copyCommand(download.command!)}
                    >
                      {copiedCommand === download.command ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
              
              <Button asChild>
                <a href={download.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  访问链接
                </a>
              </Button>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="screenshots" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tool.screenshots.map((screenshot, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center">
                  <div className="text-4xl">📸</div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">{tool.rating}</div>
              <div>
                <div className="flex items-center gap-1">
                  {renderStars(tool.rating)}
                </div>
                <div className="text-sm text-gray-500">
                  基于 {tool.reviewCount} 个评价
                </div>
              </div>
            </div>
            <Button>写评价</Button>
          </div>

          <div className="space-y-4">
            {mockReviews.map(review => (
              <Card key={review.id} className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {review.userName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.userName}</span>
                      <div className="flex items-center gap-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">{review.createdAt}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="changelog" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">📝 更新日志</h2>
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: tool.changelog.replace(/\n/g, '<br>') }} />
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 相关工具推荐 */}
      <div>
        <h2 className="text-2xl font-bold mb-6">🔗 相关工具</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relatedTools.map(related => (
            <Card key={related.id} className="p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{related.logo}</div>
                <div className="flex-1">
                  <Link href={`/arsenal/${related.slug}`}>
                    <h3 className="font-semibold hover:text-primary cursor-pointer">
                      {related.name}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      {related.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {related.downloadCount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}