import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, Download, Star, Github, ExternalLink, Verified, Clock, Users } from "lucide-react";

// 模拟数据
const mockCategories = [
  { id: "1", name: "CLI 工具", slug: "cli-tools", icon: "⚡", description: "命令行增强工具" },
  { id: "2", name: "编辑器插件", slug: "editor-plugins", icon: "🔧", description: "IDE 编辑器扩展" },
  { id: "3", name: "对话历史", slug: "chat-history", icon: "💬", description: "对话记录管理" },
  { id: "4", name: "代码生成", slug: "code-generation", icon: "🤖", description: "自动化代码生成" },
  { id: "5", name: "效率提升", slug: "productivity", icon: "🚀", description: "开发效率工具" },
  { id: "6", name: "API 工具", slug: "api-tools", icon: "🔗", description: "API 集成工具" }
];

const mockAIModels = [
  { id: "claude", name: "Claude", icon: "🤖", color: "blue" },
  { id: "gemini", name: "Gemini", icon: "💎", color: "purple" },
  { id: "chatgpt", name: "ChatGPT", icon: "🧠", color: "green" },
  { id: "copilot", name: "Copilot", icon: "👨‍💻", color: "orange" }
];

const mockTools = [
  {
    id: "1",
    name: "Claude Code Enhanced",
    slug: "claude-code-enhanced",
    tagline: "增强版 Claude Code，支持更多自定义功能",
    description: "为 Claude Code 添加了历史记录管理、自定义提示词、批量操作等功能，让 AI 对話更高效。",
    logo: "🤖",
    category: mockCategories[0],
    supportedModels: [mockAIModels[0]],
    author: {
      id: "1",
      name: "开发者张三",
      avatar: "/api/placeholder/40/40",
      github: "zhangsan"
    },
    tags: ["CLI", "历史管理", "效率工具"],
    downloadCount: 1250,
    starCount: 89,
    rating: 4.8,
    reviewCount: 23,
    version: "v2.1.0",
    featured: true,
    verified: true,
    status: "active" as const,
    downloads: [
      { type: "github" as const, url: "https://github.com/zhangsan/claude-code-enhanced" },
      { type: "npm" as const, url: "https://npmjs.com/package/claude-code-enhanced", command: "npm install -g claude-code-enhanced" }
    ]
  },
  {
    id: "2",
    name: "Gemini CLI Wrapper",
    slug: "gemini-cli-wrapper",
    tagline: "优雅的 Gemini API 命令行封装工具",
    description: "提供直观的命令行界面来使用 Gemini API，支持流式输出、文件上传、对话历史等功能。",
    logo: "💎",
    category: mockCategories[0],
    supportedModels: [mockAIModels[1]],
    author: {
      id: "2",
      name: "李四",
      avatar: "/api/placeholder/40/40",
      github: "lisi"
    },
    tags: ["CLI", "Gemini", "API封装"],
    downloadCount: 867,
    starCount: 65,
    rating: 4.6,
    reviewCount: 18,
    version: "v1.5.2",
    featured: false,
    verified: true,
    status: "active" as const,
    downloads: [
      { type: "github" as const, url: "https://github.com/lisi/gemini-cli-wrapper" },
      { type: "npm" as const, url: "https://npmjs.com/package/gemini-cli", command: "npm install -g gemini-cli" }
    ]
  },
  {
    id: "3",
    name: "AI Chat History Manager",
    slug: "ai-chat-history-manager",
    tagline: "跨平台 AI 对话历史统一管理工具",
    description: "支持 Claude、ChatGPT、Gemini 等多平台对话历史的导出、搜索、分类和备份。",
    logo: "💬",
    category: mockCategories[2],
    supportedModels: mockAIModels,
    author: {
      id: "3",
      name: "王五",
      avatar: "/api/placeholder/40/40",
      github: "wangwu"
    },
    tags: ["历史管理", "跨平台", "数据备份"],
    downloadCount: 2103,
    starCount: 156,
    rating: 4.9,
    reviewCount: 47,
    version: "v3.0.1",
    featured: true,
    verified: true,
    status: "active" as const,
    downloads: [
      { type: "github" as const, url: "https://github.com/wangwu/ai-chat-history" },
      { type: "direct" as const, url: "https://releases.example.com/ai-chat-history-v3.0.1.zip" }
    ]
  },
  {
    id: "4",
    name: "VSCode AI Assistant Plus",
    slug: "vscode-ai-assistant-plus",
    tagline: "VSCode 中的全能 AI 编程助手",
    description: "集成多个 AI 模型的 VSCode 插件，提供代码补全、重构建议、文档生成等功能。",
    logo: "🔧",
    category: mockCategories[1],
    supportedModels: [mockAIModels[0], mockAIModels[1], mockAIModels[2]],
    author: {
      id: "4",
      name: "赵六",
      avatar: "/api/placeholder/40/40",
      github: "zhaoliu"
    },
    tags: ["VSCode", "插件", "代码补全"],
    downloadCount: 5420,
    starCount: 312,
    rating: 4.7,
    reviewCount: 89,
    version: "v1.8.5",
    featured: true,
    verified: true,
    status: "active" as const,
    downloads: [
      { type: "vscode-extension" as const, url: "https://marketplace.visualstudio.com/items?itemName=zhaoliu.ai-assistant-plus" },
      { type: "github" as const, url: "https://github.com/zhaoliu/vscode-ai-assistant-plus" }
    ]
  },
  {
    id: "5",
    name: "Prompt Templates Library",
    slug: "prompt-templates-library",
    tagline: "精选 AI 提示词模板库",
    description: "收集整理了各种场景下的高质量提示词模板，支持自定义分类和快速搜索。",
    logo: "📝",
    category: mockCategories[4],
    supportedModels: mockAIModels,
    author: {
      id: "5",
      name: "孙七",
      avatar: "/api/placeholder/40/40",
      github: "sunqi"
    },
    tags: ["提示词", "模板", "生产力"],
    downloadCount: 945,
    starCount: 78,
    rating: 4.5,
    reviewCount: 31,
    version: "v2.3.0",
    featured: false,
    verified: false,
    status: "active" as const,
    downloads: [
      { type: "github" as const, url: "https://github.com/sunqi/prompt-templates" },
      { type: "direct" as const, url: "https://cdn.example.com/prompt-templates-v2.3.0.json" }
    ]
  }
];

export default function ArsenalPage() {
  const featuredTools = mockTools.filter(tool => tool.featured);
  const recentTools = mockTools.filter(tool => !tool.featured);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🔧 Vibe 军火库</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          精选的 AI 编程工具合集，提升你的开发效率
        </p>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="搜索工具..."
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select className="px-3 py-2 border rounded-md bg-background">
              <option value="all">所有分类</option>
              {mockCategories.map(category => (
                <option key={category.id} value={category.slug}>{category.name}</option>
              ))}
            </select>
            <select className="px-3 py-2 border rounded-md bg-background">
              <option value="all">所有 AI 模型</option>
              {mockAIModels.map(model => (
                <option key={model.id} value={model.id}>{model.name}</option>
              ))}
            </select>
            <select className="px-3 py-2 border rounded-md bg-background">
              <option value="latest">最新发布</option>
              <option value="popular">最受欢迎</option>
              <option value="rating">评分最高</option>
              <option value="downloads">下载最多</option>
            </select>
          </div>
        </div>

        {/* 分类快捷筛选 */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="outline" className="cursor-pointer">全部分类</Badge>
          {mockCategories.map(category => (
            <Badge 
              key={category.id}
              variant="outline" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {category.icon} {category.name}
            </Badge>
          ))}
        </div>

        {/* AI 模型筛选 */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="cursor-pointer">所有模型</Badge>
          {mockAIModels.map(model => (
            <Badge 
              key={model.id}
              variant="secondary" 
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
            >
              {model.icon} {model.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* 精选工具 */}
      {featuredTools.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">⭐ 精选工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map(tool => (
              <Card key={tool.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{tool.logo}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <Link href={`/arsenal/${tool.slug}`}>
                            <h3 className="font-semibold hover:text-primary cursor-pointer">
                              {tool.name}
                            </h3>
                          </Link>
                          {tool.verified && (
                            <Verified className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{tool.version}</p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {tool.tagline}
                  </p>
                  
                  {/* AI 模型支持 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.supportedModels.map(model => (
                      <Badge key={model.id} variant="secondary" className="text-xs">
                        {model.icon} {model.name}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* 统计信息 */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Download className="h-4 w-4" />
                        <span>{tool.downloadCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4" />
                        <span>{tool.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      下载
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* 所有工具 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">🛠️ 所有工具</h2>
        <div className="space-y-4">
          {recentTools.map(tool => (
            <Card key={tool.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{tool.logo}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Link href={`/arsenal/${tool.slug}`}>
                        <h3 className="text-xl font-semibold hover:text-primary cursor-pointer">
                          {tool.name}
                        </h3>
                      </Link>
                      {tool.verified && (
                        <Verified className="h-4 w-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>by {tool.author.name}</span>
                      <span>{tool.version}</span>
                      <Badge variant="outline" className="text-xs">
                        {tool.category.icon} {tool.category.name}
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  {/* AI 模型支持 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.supportedModels.map(model => (
                      <Badge key={model.id} variant="secondary" className="text-xs">
                        {model.icon} {model.name}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* 标签 */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  {/* 统计信息 */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{tool.downloadCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{tool.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{tool.reviewCount}</span>
                    </div>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      下载
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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