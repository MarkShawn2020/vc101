import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Card} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";
import {
  ArrowRight, BookOpen, Code, Command, ExternalLink, Search, Star,
  Terminal, Settings, Users, Zap, Play, FileText, Wrench,
  GitBranch, Database, Globe, Shield, Lightbulb, Heart,
  ChevronRight, Copy, CheckCircle, AlertCircle, Info
} from "lucide-react";

// Claude Code 资源分类
const claudeCodeCategories = [
    {
        id: "workflows",
        name: "工作流指南",
        slug: "workflows",
        description: "Claude Code 原生资源的紧密耦合集合，用于特定项目",
        icon: "🧠",
        resourceCount: 8,
        color: "blue"
    },
    {
        id: "tooling",
        name: "工具集",
        slug: "tooling",
        description: "构建在 Claude Code 之上的应用程序和工具",
        icon: "🧰",
        resourceCount: 15,
        color: "green"
    },
    {
        id: "hooks",
        name: "钩子系统",
        slug: "hooks",
        description: "Claude Code 生命周期中激活命令和脚本的全新API",
        icon: "🪝",
        resourceCount: 4,
        color: "purple"
    },
    {
        id: "slash-commands",
        name: "斜杠命令",
        slug: "slash-commands",
        description: "扩展和自定义 Claude Code 功能的命令集合",
        icon: "🔪",
        resourceCount: 35,
        color: "orange"
    },
    {
        id: "claude-md",
        name: "CLAUDE.md 文件",
        slug: "claude-md",
        description: "包含重要指导原则和项目特定信息的配置文件",
        icon: "📂",
        resourceCount: 20,
        color: "teal"
    },
    {
        id: "official",
        name: "官方文档",
        slug: "official",
        description: "Anthropic 提供的官方文档和资源",
        icon: "🏛️",
        resourceCount: 3,
        color: "indigo"
    }
];

// 精选资源数据
const featuredResources = [
    {
        id: "claudelog",
        name: "ClaudeLog",
        category: "workflows",
        author: "InventorBlack",
        description: "全面的知识库，详细介绍高级机制，包括 CLAUDE.md 最佳实践、plan mode、ultrathink、sub-agents 等",
        url: "https://claudelog.com",
        type: "Knowledge Base",
        rating: 4.9,
        featured: true,
        tags: ["最佳实践", "高级技巧", "机制", "指南"]
    },
    {
        id: "awesome-commands",
        name: "Slash-commands megalist",
        category: "slash-commands",
        author: "wcygan",
        description: "包含88个斜杠命令的惊人列表，涵盖代理编排、代码审查、项目管理、安全、文档等",
        url: "https://github.com/wcygan/dotfiles/tree/main/claude/commands",
        type: "Command Collection",
        rating: 4.8,
        featured: true,
        tags: ["命令集合", "代理编排", "项目管理", "代码审查"]
    },
    {
        id: "claude-squad",
        name: "Claude Squad",
        category: "tooling",
        author: "smtg-ai",
        description: "管理多个 Claude Code 代理的终端应用，允许在不同工作空间中同时处理多个任务",
        url: "https://github.com/smtg-ai/claude-squad",
        type: "Application",
        rating: 4.7,
        featured: true,
        tags: ["多代理", "工作空间", "并行处理", "终端"]
    },
    {
        id: "tdd-guard",
        name: "TDD Guard",
        category: "hooks",
        author: "Nizar Selander",
        description: "基于钩子的系统，实时监控文件操作并阻止违反 TDD 原则的更改",
        url: "https://github.com/nizos/tdd-guard",
        type: "Development Tool",
        rating: 4.6,
        featured: true,
        tags: ["TDD", "实时监控", "开发原则", "质量控制"]
    },
    {
        id: "metabase-claude",
        name: "Metabase CLAUDE.md",
        category: "claude-md",
        author: "metabase",
        description: "详细的 Clojure/ClojureScript REPL 驱动开发工作流程，强调增量开发和测试",
        url: "https://github.com/metabase/metabase/blob/master/CLAUDE.md",
        type: "Configuration",
        rating: 4.8,
        featured: true,
        tags: ["Clojure", "REPL", "增量开发", "测试"]
    },
    {
        id: "official-docs",
        name: "Anthropic 官方文档",
        category: "official",
        author: "Anthropic",
        description: "Claude Code 的官方文档，包括安装说明、使用指南、API 参考和教程",
        url: "https://docs.anthropic.com/en/docs/claude-code",
        type: "Documentation",
        rating: 5.0,
        featured: true,
        tags: ["官方", "完整文档", "API", "教程"]
    }
];

// 斜杠命令子分类
const slashCommandCategories = [
    {name: "版本控制 & Git", count: 8},
    {name: "代码分析 & 测试", count: 6},
    {name: "上下文加载 & 预设", count: 7},
    {name: "文档 & 变更日志", count: 4},
    {name: "CI / 部署", count: 2},
    {name: "项目 & 任务管理", count: 5},
    {name: "其他", count: 3}
];

export default function ClaudeCodePage() {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8">
            {/* 页面标题 */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">🤖 Claude Code 专栏</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                    探索 Claude Code 的精选资源、工具、命令和最佳实践，提升你的 AI 辅助编程工作流程
                </p>
            </div>

            {/* 统计数据 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">85+</div>
                    <div className="text-sm text-gray-500">精选资源</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">35+</div>
                    <div className="text-sm text-gray-500">斜杠命令</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">20+</div>
                    <div className="text-sm text-gray-500">CLAUDE.md</div>
                </Card>
                <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-orange-600">15+</div>
                    <div className="text-sm text-gray-500">专业工具</div>
                </Card>
            </div>

            {/* 快速搜索 */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                    <Input
                        placeholder="搜索 Claude Code 资源、命令或工具..."
                        className="pl-10"
                    />
                </div>
                <div className="flex gap-2">
                    <select className="px-3 py-2 border rounded-md bg-background">
                        <option value="all">所有分类</option>
                        {claudeCodeCategories.map(category => (
                            <option key={category.id} value={category.slug}>{category.name}</option>
                        ))}
                    </select>
                    <select className="px-3 py-2 border rounded-md bg-background">
                        <option value="all">所有类型</option>
                        <option value="command">命令</option>
                        <option value="tool">工具</option>
                        <option value="guide">指南</option>
                        <option value="config">配置</option>
                    </select>
                </div>
            </div>

            {/* 主要内容区域 */}
            <Tabs defaultValue="learn" className="mb-8">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="learn" className="text-xs">📚 学习入门</TabsTrigger>
                    <TabsTrigger value="commands" className="text-xs">🔪 斜杠命令</TabsTrigger>
                    <TabsTrigger value="mcp" className="text-xs">🔌 MCP</TabsTrigger>
                    <TabsTrigger value="hooks" className="text-xs">🪝 钩子</TabsTrigger>
                    <TabsTrigger value="config" className="text-xs">⚙️ 配置</TabsTrigger>
                    <TabsTrigger value="community" className="text-xs">👥 社区</TabsTrigger>
                </TabsList>

                <TabsContent value="learn" className="space-y-8">
                    {/* 快速入门 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🚀 快速入门</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                                        <Play className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">安装与启动</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    学习如何安装 Claude Code 并开始你的第一个编程对话。
                                </p>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4 font-mono text-sm">
                                    npm install -g @anthropic-ai/claude-code<br/>
                                    claude
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    查看完整指南
                                </Button>
                            </Card>

                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                                        <Terminal className="h-5 w-5 text-green-600 dark:text-green-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">基础命令</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    掌握日常开发中最常用的 Claude Code 命令和工作流程。
                                </p>
                                <div className="space-y-2 mb-4">
                                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono">
                                        /help
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono">
                                        /clear
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded text-sm font-mono">
                                        claude -c
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    学习更多命令
                                </Button>
                            </Card>

                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
                                        <Lightbulb className="h-5 w-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">最佳实践</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    了解如何有效地与 Claude Code 协作，提高编程效率。
                                </p>
                                <div className="space-y-2 mb-4 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                        <span>具体描述需求</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                        <span>分步骤执行</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-green-500"/>
                                        <span>让 Claude 先探索</span>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    查看技巧大全
                                </Button>
                            </Card>
                        </div>
                    </div>

                    {/* 常用工作流程 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">📝 常用工作流程</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                {
                                    title: "理解新代码库",
                                    icon: <Search className="h-5 w-5"/>,
                                    color: "blue",
                                    description: "快速了解项目结构、架构模式和关键组件",
                                    steps: ["获取项目概览", "分析架构模式", "理解数据模型", "追踪执行流程"]
                                },
                                {
                                    title: "高效修复 Bug",
                                    icon: <Shield className="h-5 w-5"/>,
                                    color: "red",
                                    description: "系统化地定位、分析和修复代码中的问题",
                                    steps: ["分享错误信息", "定位问题源头", "分析根本原因", "实施解决方案"]
                                },
                                {
                                    title: "Git 工作流程",
                                    icon: <GitBranch className="h-5 w-5"/>,
                                    color: "green",
                                    description: "使用自然语言进行版本控制和代码管理",
                                    steps: ["检查文件状态", "创建提交信息", "管理分支", "处理合并冲突"]
                                },
                                {
                                    title: "代码重构优化",
                                    icon: <Wrench className="h-5 w-5"/>,
                                    color: "purple",
                                    description: "改进代码结构、性能和可维护性",
                                    steps: ["分析现有代码", "设计重构方案", "逐步实施改进", "验证功能完整性"]
                                }
                            ].map((workflow, index) => (
                                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`bg-${workflow.color}-100 dark:bg-${workflow.color}-900 p-2 rounded`}>
                                            {workflow.icon}
                                        </div>
                                        <h3 className="text-lg font-semibold">{workflow.title}</h3>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                        {workflow.description}
                                    </p>
                                    <div className="space-y-2 mb-4">
                                        {workflow.steps.map((step, stepIndex) => (
                                            <div key={stepIndex} className="flex items-center gap-2 text-sm">
                                                <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium">
                                                    {stepIndex + 1}
                                                </div>
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Button size="sm" variant="outline" className="w-full">
                                        查看详细步骤
                                    </Button>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 交互式教程 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🎯 交互式教程</h2>
                        <Card className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded">
                                            <Code className="h-5 w-5 text-orange-600 dark:text-orange-400"/>
                                        </div>
                                        <h3 className="text-lg font-semibold">初级教程</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500"/>
                                            第一次对话
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500"/>
                                            文件读取与编辑
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500"/>
                                            基础 Git 操作
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                                            <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                                        </div>
                                        <h3 className="text-lg font-semibold">中级教程</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-orange-500"/>
                                            项目配置优化
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-orange-500"/>
                                            自定义命令
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <AlertCircle className="h-4 w-4 text-orange-500"/>
                                            工作流自动化
                                        </li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-red-100 dark:bg-red-900 p-2 rounded">
                                            <Zap className="h-5 w-5 text-red-600 dark:text-red-400"/>
                                        </div>
                                        <h3 className="text-lg font-semibold">高级教程</h3>
                                    </div>
                                    <ul className="space-y-2 text-sm">
                                        <li className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-blue-500"/>
                                            MCP 集成
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-blue-500"/>
                                            Hooks 编程
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <Info className="h-4 w-4 text-blue-500"/>
                                            企业部署
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-center">
                                <Button>
                                    <Play className="h-4 w-4 mr-2"/>
                                    开始交互式学习
                                </Button>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="commands" className="space-y-8">
                    {/* 斜杠命令分类 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔪 斜杠命令分类</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {slashCommandCategories.map((category, index) => (
                                <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="font-semibold mb-1">{category.name}</h3>
                                            <span className="text-sm text-gray-500">{category.count} 个命令</span>
                                        </div>
                                        <Command className="h-5 w-5 text-gray-400"/>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 热门命令 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔥 热门命令</h2>
                        <div className="space-y-4">
                            {[
                                {name: "/commit", desc: "使用传统提交格式创建 git 提交，配合表情符号", author: "evmts"},
                                {
                                    name: "/create-pr",
                                    desc: "简化拉取请求创建流程，处理整个工作流程",
                                    author: "toyamarinyon"
                                },
                                {name: "/tdd", desc: "使用测试驱动开发原则指导开发", author: "zscott"},
                                {name: "/context-prime", desc: "为 Claude 提供全面的项目理解预设", author: "elizaOS"},
                                {name: "/fix-issue", desc: "通过分析 GitHub 问题并实施解决方案", author: "metabase"}
                            ].map((command, index) => (
                                <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded font-mono text-sm">
                                                {command.name}
                                            </div>
                                            <div>
                                                <div className="font-medium">{command.desc}</div>
                                                <div className="text-sm text-gray-500">by {command.author}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline">
                                                查看详情
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <ExternalLink className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* 命令创建指南 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">📝 创建自定义命令</h2>
                        <Card className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">命令结构</h3>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                        <pre className="text-sm">{`# Claude Command: 命令名

命令描述和用法说明...

## Usage
\`\`\`
/命令名 [参数]
\`\`\`

## What This Command Does
1. 功能描述
2. 执行步骤
3. 输出结果
`}</pre>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">最佳实践</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                                            <div>
                                                <div className="font-medium">清晰的命令名称</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    使用描述性的动词和名词组合
                                                </div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                                            <div>
                                                <div className="font-medium">详细的文档</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    包含用法示例和参数说明
                                                </div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                                            <div>
                                                <div className="font-medium">错误处理</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    考虑边界情况和异常处理
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    <Button className="w-full mt-6">
                                        <Code className="h-4 w-4 mr-2"/>
                                        创建新命令
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="mcp" className="space-y-8">
                    {/* MCP 简介 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔌 Model Context Protocol (MCP)</h2>
                        <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                            <div className="flex items-start gap-4">
                                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                                    <Database className="h-6 w-6 text-blue-600 dark:text-blue-400"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">什么是 MCP？</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Model Context Protocol (MCP) 是一个开放协议，让 Claude Code 能够访问外部工具和数据源。
                                        通过 MCP，你可以连接数据库、API、文件系统等，极大扩展 Claude 的能力。
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">数据库集成</Badge>
                                        <Badge variant="secondary">API 连接</Badge>
                                        <Badge variant="secondary">文件系统访问</Badge>
                                        <Badge variant="secondary">实时数据</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* MCP 服务器类型 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🏗️ MCP 服务器类型</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                                        <Terminal className="h-5 w-5 text-green-600 dark:text-green-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">Stdio 服务器</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    本地命令行程序，通过标准输入输出通信
                                </p>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4 font-mono text-sm">
                                    claude mcp add my-server \<br/>
                                    &nbsp;&nbsp;-- /path/to/server
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    了解配置
                                </Button>
                            </Card>

                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                                        <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">SSE 服务器</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    Server-Sent Events，支持实时数据流
                                </p>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4 font-mono text-sm">
                                    claude mcp add --transport sse \<br/>
                                    &nbsp;&nbsp;sse-server https://api.example.com
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    了解配置
                                </Button>
                            </Card>

                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
                                        <Zap className="h-5 w-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">HTTP 服务器</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    标准 HTTP 协议，支持流式传输
                                </p>
                                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-4 font-mono text-sm">
                                    claude mcp add --transport http \<br/>
                                    &nbsp;&nbsp;http-server https://api.example.com
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    了解配置
                                </Button>
                            </Card>
                        </div>
                    </div>

                    {/* 常用 MCP 服务器 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">⭐ 常用 MCP 服务器</h2>
                        <div className="space-y-4">
                            {[
                                {
                                    name: "PostgreSQL MCP",
                                    description: "连接 PostgreSQL 数据库，进行查询和架构检查",
                                    category: "数据库",
                                    setup: "claude mcp add postgres-server /path/to/postgres-mcp-server --connection-string \"postgresql://...\""
                                },
                                {
                                    name: "GitHub MCP",
                                    description: "访问 GitHub 仓库、问题、拉取请求等",
                                    category: "版本控制",
                                    setup: "claude mcp add --transport sse github-server https://api.github.com/mcp"
                                },
                                {
                                    name: "File System MCP",
                                    description: "安全地访问和操作文件系统",
                                    category: "文件系统",
                                    setup: "claude mcp add filesystem-server -- node filesystem-server.js"
                                },
                                {
                                    name: "Memory MCP",
                                    description: "持久化存储对话历史和项目知识",
                                    category: "存储",
                                    setup: "claude mcp add memory-server -- node memory-server.js"
                                }
                            ].map((server, index) => (
                                <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-semibold">{server.name}</h3>
                                                <Badge variant="outline" className="text-xs">
                                                    {server.category}
                                                </Badge>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm">
                                                {server.description}
                                            </p>
                                            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs">
                                                {server.setup}
                                            </div>
                                        </div>
                                        <div className="flex gap-2 ml-4">
                                            <Button size="sm" variant="outline">
                                                <Copy className="h-4 w-4"/>
                                            </Button>
                                            <Button size="sm" variant="outline">
                                                <ExternalLink className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* MCP 管理命令 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔧 管理命令</h2>
                        <Card className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">基本操作</h3>
                                    <div className="space-y-3">
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">claude mcp list</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">查看所有配置的服务器</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">claude mcp get &lt;name&gt;</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">获取特定服务器详情</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">claude mcp remove &lt;name&gt;</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">删除服务器配置</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">高级功能</h3>
                                    <div className="space-y-3">
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">/mcp</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">交互式 MCP 管理</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">@server:resource</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">引用 MCP 资源</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">/mcp__server__command</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">执行 MCP 提示命令</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="hooks" className="space-y-8">
                    {/* Hooks 简介 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🪝 Claude Code Hooks</h2>
                        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                            <div className="flex items-start gap-4">
                                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                                    <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">生命周期自动化</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Hooks 让你能够在 Claude Code 的关键生命周期事件中自动执行命令，
                                        实现工作流自动化、代码质量检查、通知系统等功能。
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">工作流自动化</Badge>
                                        <Badge variant="secondary">代码质量检查</Badge>
                                        <Badge variant="secondary">实时通知</Badge>
                                        <Badge variant="secondary">自定义逻辑</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Hook 事件类型 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">⚡ Hook 事件类型</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    name: "PreToolUse",
                                    description: "工具调用前执行",
                                    icon: <Play className="h-5 w-5"/>,
                                    color: "blue",
                                    useCases: ["权限检查", "参数验证", "预处理"]
                                },
                                {
                                    name: "PostToolUse", 
                                    description: "工具调用后执行",
                                    icon: <CheckCircle className="h-5 w-5"/>,
                                    color: "green",
                                    useCases: ["结果处理", "质量检查", "清理工作"]
                                },
                                {
                                    name: "UserPromptSubmit",
                                    description: "用户提交提示时",
                                    icon: <FileText className="h-5 w-5"/>,
                                    color: "orange",
                                    useCases: ["输入验证", "上下文注入", "预处理"]
                                },
                                {
                                    name: "Notification",
                                    description: "通知发送时执行", 
                                    icon: <AlertCircle className="h-5 w-5"/>,
                                    color: "yellow",
                                    useCases: ["日志记录", "外部通知", "监控"]
                                },
                                {
                                    name: "Stop",
                                    description: "会话结束时执行",
                                    icon: <Settings className="h-5 w-5"/>,
                                    color: "red",
                                    useCases: ["清理资源", "报告生成", "后续处理"]
                                },
                                {
                                    name: "SubagentStop",
                                    description: "子代理停止时执行",
                                    icon: <Users className="h-5 w-5"/>,
                                    color: "purple",
                                    useCases: ["任务汇总", "状态更新", "链式处理"]
                                }
                            ].map((hookType, index) => (
                                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`bg-${hookType.color}-100 dark:bg-${hookType.color}-900 p-2 rounded`}>
                                            {hookType.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold">{hookType.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {hookType.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">常见用途：</div>
                                        <ul className="space-y-1">
                                            {hookType.useCases.map((useCase, useCaseIndex) => (
                                                <li key={useCaseIndex} className="flex items-center gap-2 text-sm">
                                                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                                                    <span>{useCase}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Hook 配置示例 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">⚙️ 配置示例</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">代码格式化 Hook</h3>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                                    <pre className="text-sm overflow-x-auto">{`{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "prettier --write \\"\${file}\\"",
        "timeout": 30
      }]
    }]
  }
}`}</pre>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    在文件写入或编辑后自动运行 Prettier 格式化代码
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Git 自动提交 Hook</h3>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                                    <pre className="text-sm overflow-x-auto">{`{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command", 
        "command": "$CLAUDE_PROJECT_DIR/.hooks/auto-commit.sh"
      }]
    }]
  }
}`}</pre>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    会话结束时自动创建 Git 提交保存更改
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">测试运行 Hook</h3>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                                    <pre className="text-sm overflow-x-auto">{`{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write.*\\.test\\.",
      "hooks": [{
        "type": "command",
        "command": "npm test -- --testPathPattern=\\"\${file}\\""
      }]
    }]
  }
}`}</pre>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    写入测试文件后自动运行相关测试
                                </p>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">安全检查 Hook</h3>
                                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
                                    <pre className="text-sm overflow-x-auto">{`{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.hooks/security-check.py"
      }]
    }]
  }
}`}</pre>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    执行 Bash 命令前进行安全性检查
                                </p>
                            </Card>
                        </div>
                    </div>

                    {/* Hook 调试与管理 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔧 调试与管理</h2>
                        <Card className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">调试命令</h3>
                                    <div className="space-y-3">
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">claude --debug</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">启用详细的 Hook 执行日志</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">/hooks</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">查看和管理已配置的 Hooks</div>
                                        </div>
                                        <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded">
                                            <div className="font-mono text-sm mb-1">Ctrl+R</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">查看 Hook 执行进度</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">最佳实践</h3>
                                    <ul className="space-y-3">
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                                            <div>
                                                <div className="font-medium">安全的脚本路径</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    使用 $CLAUDE_PROJECT_DIR 引用项目脚本
                                                </div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                                            <div>
                                                <div className="font-medium">输入验证</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    总是验证和清理输入数据
                                                </div>
                                            </div>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5"/>
                                            <div>
                                                <div className="font-medium">错误处理</div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    使用适当的退出码控制执行流程
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="config" className="space-y-8">
                    {/* 配置概览 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">⚙️ Claude Code 配置</h2>
                        <Card className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
                            <div className="flex items-start gap-4">
                                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                                    <Settings className="h-6 w-6 text-green-600 dark:text-green-400"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">个性化你的 Claude Code</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        通过配置文件、环境变量和项目特定设置来定制 Claude Code 的行为，
                                        让它更好地适应你的开发工作流程。
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">settings.json</Badge>
                                        <Badge variant="secondary">CLAUDE.md</Badge>
                                        <Badge variant="secondary">环境变量</Badge>
                                        <Badge variant="secondary">项目配置</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* 配置文件类型 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">📁 配置文件类型</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                                        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">settings.json</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    全局和项目级别的配置文件，控制 Claude Code 的行为
                                </p>
                                <div className="space-y-2 mb-4 text-sm">
                                    <div>📍 <code>~/.claude/settings.json</code> - 全局配置</div>
                                    <div>📍 <code>.claude/settings.json</code> - 项目配置</div>
                                    <div>📍 <code>.claude/settings.local.json</code> - 本地配置</div>
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    查看配置选项
                                </Button>
                            </Card>

                            <Card className="p-6 hover:shadow-lg transition-shadow">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded">
                                        <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">CLAUDE.md</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    项目特定的指导文件，为 Claude 提供上下文和指导原则
                                </p>
                                <div className="space-y-2 mb-4 text-sm">
                                    <div>📍 项目根目录的 <code>CLAUDE.md</code></div>
                                    <div>📍 包含项目概述和开发指南</div>
                                    <div>📍 定义编码规范和最佳实践</div>
                                </div>
                                <Button size="sm" variant="outline" className="w-full">
                                    查看示例模板
                                </Button>
                            </Card>
                        </div>
                    </div>

                    {/* 常用配置选项 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🔧 常用配置选项</h2>
                        <div className="space-y-6">
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">基础设置</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="font-mono text-sm mb-2">modelName</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">选择使用的 Claude 模型</div>
                                        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs font-mono">
                                            "claude-3-5-sonnet-20241022"
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="font-mono text-sm mb-2">autoCompact</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">自动压缩对话历史</div>
                                        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs font-mono">
                                            true
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="font-mono text-sm mb-2">maxTokens</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">最大令牌数限制</div>
                                        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs font-mono">
                                            200000
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="font-mono text-sm mb-2">temperature</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">响应创造性控制</div>
                                        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs font-mono">
                                            0.7
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h3 className="text-lg font-semibold mb-4">工具与权限</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="font-mono text-sm mb-2">allowedTools</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">允许使用的工具列表</div>
                                        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs font-mono">
                                            ["Read", "Write", "Edit", "Bash"]
                                        </div>
                                    </div>
                                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                        <div className="font-mono text-sm mb-2">bashSafety</div>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Bash 命令安全级别</div>
                                        <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs font-mono">
                                            "strict"
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* CLAUDE.md 模板 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">📝 CLAUDE.md 模板</h2>
                        <Card className="p-6">
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold mb-2">项目指导文件模板</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    一个完整的 CLAUDE.md 文件模板，帮助你为项目提供清晰的指导
                                </p>
                            </div>
                            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
                                <pre className="text-sm">{`# CLAUDE.md

这个文件为 Claude Code 提供关于此项目的重要指导信息。

## 项目概述

简要描述项目的目的、主要功能和技术栈。

## 开发指南

### 代码规范
- 使用 TypeScript 严格模式
- 遵循 ESLint 配置
- 使用 Prettier 格式化代码

### 文件结构
\`\`\`
src/
  components/     # React 组件
  hooks/         # 自定义 Hooks
  utils/         # 工具函数
  types/         # TypeScript 类型定义
\`\`\`

### 开发命令
\`\`\`bash
npm run dev     # 启动开发服务器
npm run build   # 构建生产版本
npm run test    # 运行测试
\`\`\`

## 重要注意事项

- 提交前务必运行测试
- 新功能需要添加相应的测试用例
- API 更改需要更新文档
`}</pre>
                            </div>
                            <div className="mt-4 flex gap-2">
                                <Button size="sm">
                                    <Copy className="h-4 w-4 mr-2"/>
                                    复制模板
                                </Button>
                                <Button size="sm" variant="outline">
                                    查看更多示例
                                </Button>
                            </div>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="community" className="space-y-8">
                    {/* 社区概览 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">👥 Claude Code 社区</h2>
                        <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                            <div className="flex items-start gap-4">
                                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                                    <Heart className="h-6 w-6 text-orange-600 dark:text-orange-400"/>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2">加入活跃的开发者社区</h3>
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        Claude Code 拥有一个充满活力的开发者社区，分享最佳实践、工具、
                                        模板和创新的使用方法。一起探索 AI 辅助编程的无限可能。
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">开源贡献</Badge>
                                        <Badge variant="secondary">知识分享</Badge>
                                        <Badge variant="secondary">工具开发</Badge>
                                        <Badge variant="secondary">社区支持</Badge>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* 完整资源库 */}
                    <div>
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 text-center">
                            <div className="text-4xl mb-4">📚</div>
                            <h2 className="text-2xl font-bold mb-4">Awesome Claude Code</h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                                探索社区维护的完整资源集合，包含 85+ 个精选资源、工具、命令和最佳实践指南。
                            </p>
                            <Button size="lg" asChild>
                                <Link href="/claude-code/resources">
                                    <BookOpen className="h-5 w-5 mr-2"/>
                                    浏览完整资源库
                                    <ArrowRight className="h-5 w-5 ml-2"/>
                                </Link>
                            </Button>
                        </Card>
                    </div>

                    {/* 社区项目分类 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🏆 社区项目分类</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {claudeCodeCategories.map(category => (
                                <Link key={category.id} href="/claude-code/resources">
                                    <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
                                        <div className="text-4xl mb-4">{category.icon}</div>
                                        <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            {category.description}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-gray-500">{category.resourceCount} 资源</span>
                                            <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors"/>
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 贡献和参与 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">🚀 参与社区</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded">
                                        <Code className="h-5 w-5 text-green-600 dark:text-green-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">贡献资源</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    分享你创建的斜杠命令、工具、配置文件或工作流程
                                </p>
                                <ul className="space-y-2 mb-4 text-sm">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400"/>
                                        <span>提交新的斜杠命令</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400"/>
                                        <span>分享 CLAUDE.md 模板</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400"/>
                                        <span>开发社区工具</span>
                                    </li>
                                </ul>
                                <Button size="sm" className="w-full">
                                    <ExternalLink className="h-4 w-4 mr-2"/>
                                    提交贡献
                                </Button>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded">
                                        <Users className="h-5 w-5 text-blue-600 dark:text-blue-400"/>
                                    </div>
                                    <h3 className="text-lg font-semibold">社区支持</h3>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                                    在社区平台上获取帮助、分享经验和讨论最佳实践
                                </p>
                                <ul className="space-y-2 mb-4 text-sm">
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400"/>
                                        <span>Discord 社区频道</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400"/>
                                        <span>GitHub 讨论区</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-gray-400"/>
                                        <span>社区论坛</span>
                                    </li>
                                </ul>
                                <Button size="sm" variant="outline" className="w-full">
                                    <Globe className="h-4 w-4 mr-2"/>
                                    加入讨论
                                </Button>
                            </Card>
                        </div>
                    </div>

                    {/* 最新动态 */}
                    <div>
                        <h2 className="text-2xl font-bold mb-6">📢 社区动态</h2>
                        <Card className="p-6">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">Claude Code 社区工具大赛开始</div>
                                        <div className="text-sm text-gray-500 mb-2">
                                            征集创新的 Claude Code 工具和集成，获胜者将获得官方认证
                                        </div>
                                        <div className="text-xs text-gray-400">2 天前</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">新增 15 个社区斜杠命令</div>
                                        <div className="text-sm text-gray-500 mb-2">
                                            涵盖 CI/CD、测试自动化、代码质量检查等多个领域
                                        </div>
                                        <div className="text-xs text-gray-400">1 周前</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <div>
                                        <div className="font-medium">ClaudeLog 知识库更新</div>
                                        <div className="text-sm text-gray-500 mb-2">
                                            新增企业级部署指南和高级配置最佳实践
                                        </div>
                                        <div className="text-xs text-gray-400">2 周前</div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>

            {/* 贡献邀请 */}
            <Card
                className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">为 Claude Code 社区贡献</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                    发现了有用的 Claude Code 资源？创建了创新的工具或命令？欢迎与社区分享你的贡献。
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="gap-2">
                        <Code className="h-5 w-5"/>
                        提交资源
                    </Button>
                    <Button size="lg" variant="outline" className="gap-2">
                        <BookOpen className="h-5 w-5"/>
                        查看贡献指南
                    </Button>
                </div>
            </Card>
        </div>
    );
}