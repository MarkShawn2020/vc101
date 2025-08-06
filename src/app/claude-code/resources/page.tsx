import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MarkdownRenderer from "@/components/markdown-renderer";
import Link from "next/link";
import { promises as fs } from 'fs';
import path from 'path';
import { 
  Search, ExternalLink, Star, Users, Calendar,
  Building, Cpu, Cloud, Code, Zap, Globe,
  TrendingUp, Award, Verified, ArrowRight,
  BookOpen, Terminal, Settings, FileText,
  Lightbulb, Wrench, Command, Home
} from "lucide-react";

async function getAwesomeClaudeCodeContent() {
  try {
    const filePath = path.join(process.cwd(), 'external', 'awesome-claude-code', 'README.md');
    const content = await fs.readFile(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading awesome-claude-code README:', error);
    return null;
  }
}

export default async function ClaudeCodeResourcesPage() {
  const readmeContent = await getAwesomeClaudeCodeContent();

  if (!readmeContent) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🤖 Claude Code 资源</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            抱歉，无法加载资源内容。请稍后再试。
          </p>
          <Button asChild>
            <Link href="/claude-code">
              <Home className="h-4 w-4 mr-2" />
              返回主页
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 面包屑导航 */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/claude-code" className="hover:text-primary">Claude Code</Link>
        <span>/</span>
        <span>资源库</span>
      </div>

      {/* 页面标题 */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">📚 Awesome Claude Code</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          精选的 Claude Code 资源集合，包括斜杠命令、CLAUDE.md 文件、CLI 工具和其他增强工作流程的资源
        </p>
      </div>

      {/* 快速导航 */}
      <Card className="p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">📂 快速导航</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
          <a href="#workflows--knowledge-guides-" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            🧠 工作流指南
          </a>
          <a href="#tooling-" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            🧰 工具集
          </a>
          <a href="#hooks-" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            🪝 钩子系统
          </a>
          <a href="#slash-commands-" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            🔪 斜杠命令
          </a>
          <a href="#claudemd-files-" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            📂 CLAUDE.md
          </a>
          <a href="#official-documentation-" className="flex items-center gap-2 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
            🏛️ 官方文档
          </a>
        </div>
      </Card>

      {/* 搜索功能提示 */}
      <Card className="p-4 mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-3">
          <Search className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <div>
            <div className="font-medium text-blue-900 dark:text-blue-100">提示</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">
              使用浏览器搜索功能 (Ctrl+F 或 Cmd+F) 快速查找特定的资源、工具或命令
            </div>
          </div>
        </div>
      </Card>

      {/* 主要内容区域 */}
      <Card className="p-8">
        <MarkdownRenderer content={readmeContent} />
      </Card>

      {/* 底部操作 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Button asChild>
          <Link href="/claude-code">
            <Home className="h-4 w-4 mr-2" />
            返回 Claude Code 主页
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <a 
            href="https://github.com/awesome-claude-code/awesome-claude-code" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            在 GitHub 上查看
          </a>
        </Button>
      </div>
    </div>
  );
}