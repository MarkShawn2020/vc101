import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  Search, Download, Star, Github, ExternalLink, Verified, Clock, Users,
  Zap, Code, Terminal, Plug, Bot, Settings, Layers, Network,
  PlayCircle, Database, MessageSquare, Globe, Cpu, GitBranch
} from "lucide-react";

// MCP 服务器和现代 AI 工具的分类
const modernCategories = [
  { 
    id: "mcp-servers", 
    name: "MCP 服务器", 
    slug: "mcp-servers", 
    icon: "🔌", 
    description: "Model Context Protocol 服务器，为 AI 提供上下文能力",
    count: 2847
  },
  { 
    id: "function-toolkits", 
    name: "Function 工具包", 
    slug: "function-toolkits", 
    icon: "🛠️", 
    description: "可被 AI 调用的函数工具集合",
    count: 892
  },
  { 
    id: "ai-agents", 
    name: "AI 智能体", 
    slug: "ai-agents", 
    icon: "🤖", 
    description: "自主执行任务的 AI 智能体框架",
    count: 567
  },
  { 
    id: "cursor-extensions", 
    name: "Cursor 扩展", 
    slug: "cursor-extensions", 
    icon: "↗️", 
    description: "Cursor IDE 的增强插件和扩展",
    count: 234
  },
  { 
    id: "claude-tools", 
    name: "Claude 工具", 
    slug: "claude-tools", 
    icon: "🧠", 
    description: "专为 Claude 优化的工具和插件",
    count: 423
  },
  { 
    id: "prompt-tools", 
    name: "Prompt 工具", 
    slug: "prompt-tools", 
    icon: "💭", 
    description: "提示词工程和管理工具",
    count: 678
  }
];

// 模拟现代 AI 工具数据，包含 MCP 和 Function Call 支持
const modernTools = [
  {
    id: "mcp-filesystem",
    name: "文件系统 MCP 服务器",
    slug: "mcp-filesystem-server",
    tagline: "为 AI 提供安全的文件系统访问能力",
    description: "官方 MCP 服务器，允许 AI 安全地读取、写入和操作本地文件系统，支持权限控制和沙盒环境。",
    logo: "📁",
    category: modernCategories[0],
    supportedModels: [
      { id: "claude", name: "Claude", icon: "🧠", color: "blue" },
      { id: "cursor", name: "Cursor", icon: "↗️", color: "purple" }
    ],
    author: {
      id: "anthropic",
      name: "Anthropic",
      avatar: "/api/placeholder/40/40",
      github: "anthropic"
    },
    tags: ["MCP", "文件系统", "官方", "安全"],
    toolType: "mcp-server" as const,
    downloadCount: 15420,
    starCount: 892,
    rating: 4.9,
    reviewCount: 156,
    version: "v1.2.0",
    featured: true,
    verified: true,
    status: "active" as const,
    
    // MCP 特有属性
    mcpServer: {
      protocol: "stdio" as const,
      transport: "stdio",
      capabilities: [
        { type: "resources" as const, name: "文件读取", description: "读取指定路径的文件内容" },
        { type: "tools" as const, name: "文件操作", description: "创建、修改、删除文件" }
      ]
    },
    
    functionCalls: [
      {
        name: "read_file",
        description: "读取指定路径的文件内容",
        parameters: {
          type: "object",
          properties: {
            path: { type: "string", description: "文件路径" },
            encoding: { type: "string", enum: ["utf-8", "base64"], default: "utf-8" }
          },
          required: ["path"]
        },
        examples: ["read_file({\"path\": \"./src/main.py\"})"]  
      }
    ],
    
    integratesWithCursor: true,
    integratesWithClaude: true,
    supportsStreaming: true,
    
    downloads: [
      { 
        type: "npm" as const, 
        url: "https://npmjs.com/package/@modelcontextprotocol/server-filesystem",
        command: "npm install -g @modelcontextprotocol/server-filesystem"
      },
      { 
        type: "github" as const, 
        url: "https://github.com/modelcontextprotocol/servers"
      }
    ],
    
    screenshots: [],
    longDescription: "",
    license: "MIT",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20"
  },
  {
    id: "openai-functions-toolkit",
    name: "OpenAI Functions 工具包", 
    slug: "openai-functions-toolkit",
    tagline: "丰富的 Function Calling 工具集合",
    description: "包含 100+ 预定义函数的工具包，涵盖文件操作、网络请求、数据处理等常用场景，即插即用。",
    logo: "🧰",
    category: modernCategories[1],
    supportedModels: [
      { id: "chatgpt", name: "ChatGPT", icon: "🤖", color: "green" },
      { id: "claude", name: "Claude", icon: "🧠", color: "blue" }
    ],
    author: {
      id: "openai-community",
      name: "OpenAI Community",
      avatar: "/api/placeholder/40/40",
      github: "openai-community"
    },
    tags: ["Function Calling", "工具包", "实用函数", "即插即用"],
    toolType: "function-toolkit" as const,
    downloadCount: 12340,
    starCount: 723,
    rating: 4.8,
    reviewCount: 167,
    version: "v3.2.1",
    featured: true,
    verified: false,
    status: "active" as const,
    
    functionCalls: [
      {
        name: "web_search",
        description: "在网络上搜索信息",
        parameters: {
          type: "object", 
          properties: {
            query: { type: "string", description: "搜索查询" },
            num_results: { type: "integer", default: 5, description: "返回结果数量" }
          },
          required: ["query"]
        }
      }
    ],
    
    supportsStreaming: false,
    integratesWithCursor: false,
    integratesWithClaude: true,
    
    downloads: [
      { 
        type: "pip" as const,
        url: "https://pypi.org/project/openai-functions-toolkit/",
        command: "pip install openai-functions-toolkit"
      },
      { 
        type: "github" as const,
        url: "https://github.com/openai-community/functions-toolkit"
      }
    ],
    
    screenshots: [],
    longDescription: "",
    license: "Apache-2.0",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-15"
  },
  {
    id: "ai-agent-framework",
    name: "多模态 AI 智能体框架",
    slug: "multimodal-ai-agent-framework",
    tagline: "构建能处理文本、图像、音频的智能体",
    description: "完整的 AI 智能体开发框架，支持多模态输入、工具调用、长期记忆和任务规划。",
    logo: "🤖",
    category: modernCategories[2],
    supportedModels: [
      { id: "claude", name: "Claude", icon: "🧠", color: "blue" },
      { id: "chatgpt", name: "ChatGPT", icon: "🤖", color: "green" },
      { id: "gemini", name: "Gemini", icon: "💎", color: "purple" }
    ],
    author: {
      id: "ai-framework-team",
      name: "AI Framework Team",
      avatar: "/api/placeholder/40/40",
      github: "ai-framework-team"
    },
    tags: ["智能体", "多模态", "任务规划", "长期记忆"],
    toolType: "agent" as const,
    downloadCount: 8901,
    starCount: 1234,
    rating: 4.9,
    reviewCount: 234,
    version: "v2.0.0",
    featured: true,
    verified: true,
    status: "active" as const,
    
    functionCalls: [
      {
        name: "process_image",
        description: "处理和分析图像内容",
        parameters: {
          type: "object",
          properties: {
            image_url: { type: "string", description: "图像URL或base64编码" },
            task: { type: "string", enum: ["describe", "ocr", "analyze"], description: "处理任务类型" }
          },
          required: ["image_url", "task"]
        }
      }
    ],
    
    supportsStreaming: true,
    contextLength: 128000,
    
    downloads: [
      { 
        type: "pip" as const,
        url: "https://pypi.org/project/multimodal-ai-agent/",
        command: "pip install multimodal-ai-agent"
      },
      { 
        type: "docker" as const,
        url: "https://hub.docker.com/r/ai-framework/multimodal-agent",
        command: "docker pull ai-framework/multimodal-agent"
      }
    ],
    
    screenshots: [],
    longDescription: "",
    license: "MIT",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-20"
  },
  {
    id: "cursor-ai-extension",
    name: "Cursor AI 增强扩展",
    slug: "cursor-ai-enhancement",
    tagline: "为 Cursor 添加更多 AI 能力",
    description: "扩展 Cursor IDE 的 AI 功能，增加自定义模型支持、高级代码分析、智能重构等功能。",
    logo: "↗️",
    category: modernCategories[3],
    supportedModels: [
      { id: "cursor", name: "Cursor", icon: "↗️", color: "purple" },
      { id: "claude", name: "Claude", icon: "🧠", color: "blue" }
    ],
    author: {
      id: "cursor-community",
      name: "Cursor Community",
      avatar: "/api/placeholder/40/40",
      github: "cursor-community"
    },
    tags: ["Cursor", "IDE扩展", "代码分析", "智能重构"],
    toolType: "extension" as const,
    downloadCount: 5678,
    starCount: 423,
    rating: 4.6,
    reviewCount: 89,
    version: "v1.4.2",
    featured: false,
    verified: true,
    status: "active" as const,
    
    integratesWithCursor: true,
    integratesWithClaude: true,
    integratesWithVSCode: false,
    
    downloads: [
      { 
        type: "direct" as const,
        url: "https://cursor-extensions.com/ai-enhancement"
      },
      { 
        type: "github" as const,
        url: "https://github.com/cursor-community/ai-enhancement"
      }
    ],
    
    screenshots: [],
    longDescription: "",
    license: "GPL-3.0",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-25"
  }
];

const getToolTypeIcon = (toolType: string) => {
  switch (toolType) {
    case 'mcp-server': return <Plug className="h-4 w-4" />;
    case 'function-toolkit': return <Settings className="h-4 w-4" />;
    case 'agent': return <Bot className="h-4 w-4" />;
    case 'extension': return <Layers className="h-4 w-4" />;
    case 'plugin': return <Zap className="h-4 w-4" />;
    case 'cli': return <Terminal className="h-4 w-4" />;
    case 'api': return <Network className="h-4 w-4" />;
    default: return <Code className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'active':
      return <Badge className="bg-green-500">✅ 活跃</Badge>;
    case 'beta':
      return <Badge className="bg-orange-500">🧪 测试版</Badge>;
    case 'deprecated':
      return <Badge variant="outline" className="border-red-500 text-red-600">⚠️ 已弃用</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

export default function ArsenalPage() {
  const featuredTools = modernTools.filter(tool => tool.featured);
  const recentTools = modernTools.filter(tool => !tool.featured);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🔧 VC 军火库</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          精选的 AI 编程工具，MCP 服务器，Function 工具包和智能体框架
        </p>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">2.8k</div>
          <div className="text-sm text-gray-500">MCP 服务器</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">892</div>
          <div className="text-sm text-gray-500">Function 工具</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">567</div>
          <div className="text-sm text-gray-500">AI 智能体</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">1.2k</div>
          <div className="text-sm text-gray-500">扩展插件</div>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索 MCP 服务器、Function 工具包、AI 智能体..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="all">所有类型</option>
            <option value="mcp-server">MCP 服务器</option>
            <option value="function-toolkit">Function 工具包</option>
            <option value="agent">AI 智能体</option>
            <option value="extension">IDE 扩展</option>
          </select>
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="all">支持模型</option>
            <option value="claude">Claude</option>
            <option value="chatgpt">ChatGPT</option>
            <option value="cursor">Cursor</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>
      </div>

      {/* 分类浏览 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">🗂️ 按类型浏览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modernCategories.map(category => (
            <Card key={category.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {category.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{category.count.toLocaleString()} 个工具</span>
                <Badge variant="outline" className="text-xs">
                  浏览全部
                </Badge>
              </div>
            </Card>
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
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          {getToolTypeIcon(tool.toolType)}
                          <span>{tool.version}</span>
                        </div>
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
                  
                  {/* 特殊能力标签 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.mcpServer && (
                      <Badge className="bg-blue-500 text-xs">
                        <Plug className="h-3 w-3 mr-1" />
                        MCP
                      </Badge>
                    )}
                    {tool.functionCalls && (
                      <Badge className="bg-green-500 text-xs">
                        <Settings className="h-3 w-3 mr-1" />
                        Functions
                      </Badge>
                    )}
                    {tool.supportsStreaming && (
                      <Badge className="bg-purple-500 text-xs">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        流式
                      </Badge>
                    )}
                    {tool.integratesWithCursor && (
                      <Badge className="bg-orange-500 text-xs">
                        ↗️ Cursor
                      </Badge>
                    )}
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

      {/* 主要内容标签页 */}
      <Tabs defaultValue="featured" className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="featured">🌟 精选工具</TabsTrigger>
          <TabsTrigger value="mcp">🔌 MCP 服务器</TabsTrigger>
          <TabsTrigger value="functions">🛠️ Function 工具</TabsTrigger>
          <TabsTrigger value="agents">🤖 AI 智能体</TabsTrigger>
        </TabsList>

        <TabsContent value="mcp" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modernTools.filter(tool => tool.toolType === 'mcp-server').map(tool => (
              <Card key={tool.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{tool.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{tool.name}</h3>
                      {tool.verified && <Verified className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {tool.description}
                    </p>
                    
                    {/* MCP 能力展示 */}
                    {tool.mcpServer && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">🔌 MCP 能力</h4>
                        <div className="flex flex-wrap gap-1">
                          {tool.mcpServer.capabilities.map(cap => (
                            <Badge key={cap.name} variant="outline" className="text-xs">
                              {cap.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Function 展示 */}
                    {tool.functionCalls && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">⚡ 可用函数</h4>
                        <div className="space-y-1">
                          {tool.functionCalls.slice(0, 2).map(func => (
                            <div key={func.name} className="text-xs text-gray-500 font-mono">
                              {func.name}()
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {tool.downloadCount.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {tool.rating}
                        </span>
                      </div>
                      <Button size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        安装
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="functions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modernTools.filter(tool => tool.toolType === 'function-toolkit').map(tool => (
              <Card key={tool.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{tool.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{tool.name}</h3>
                      {tool.verified && <Verified className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {tool.description}
                    </p>
                    
                    {/* Function 调用示例 */}
                    {tool.functionCalls && (
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">🛠️ 函数示例</h4>
                        <div className="space-y-2">
                          {tool.functionCalls.slice(0, 2).map(func => (
                            <div key={func.name} className="bg-gray-50 dark:bg-gray-800 p-2 rounded text-xs">
                              <div className="font-mono text-blue-600 dark:text-blue-400">
                                {func.name}
                              </div>
                              <div className="text-gray-600 dark:text-gray-400 mt-1">
                                {func.description}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {tool.downloadCount.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {tool.rating}
                        </span>
                      </div>
                      <Button size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        安装
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agents" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modernTools.filter(tool => tool.toolType === 'agent').map(tool => (
              <Card key={tool.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{tool.logo}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{tool.name}</h3>
                      {tool.verified && <Verified className="h-4 w-4 text-blue-500" />}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                      {tool.description}
                    </p>
                    
                    {/* 智能体特性 */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">🤖 智能体能力</h4>
                      <div className="flex flex-wrap gap-1">
                        {tool.supportsStreaming && (
                          <Badge className="bg-purple-500 text-xs">
                            <PlayCircle className="h-3 w-3 mr-1" />
                            流式响应
                          </Badge>
                        )}
                        {tool.contextLength && (
                          <Badge className="bg-blue-500 text-xs">
                            <Database className="h-3 w-3 mr-1" />
                            {tool.contextLength.toLocaleString()} tokens
                          </Badge>
                        )}
                        {tool.functionCalls && (
                          <Badge className="bg-green-500 text-xs">
                            <Settings className="h-3 w-3 mr-1" />
                            工具调用
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Download className="h-3 w-3" />
                          {tool.downloadCount.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {tool.rating}
                        </span>
                      </div>
                      <Button size="sm">
                        <Download className="h-3 w-3 mr-1" />
                        部署
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="featured">
          {/* 这里保持原有的精选工具内容 */}
        </TabsContent>
      </Tabs>

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