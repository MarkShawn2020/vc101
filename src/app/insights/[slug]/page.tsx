import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import MarkdownRenderer from "@/components/markdown-renderer";
import TableOfContents from "@/components/table-of-contents";
import Link from "next/link";
import { Calendar, Clock, User, Github, Twitter, Globe, ArrowLeft, Share2, Bookmark, ThumbsUp, MessageCircle } from "lucide-react";

// 模拟文章详情数据
const mockInsightDetail = {
  id: "1",
  title: "Claude Code 使用技巧：提升 AI 编程效率的 10 个实用方法",
  slug: "claude-code-tips-ai-programming-efficiency",
  excerpt: "深入探讨如何利用 Claude Code 提升日常编程工作效率，包含实际案例和最佳实践。",
  content: `# Claude Code 使用技巧：提升 AI 编程效率的 10 个实用方法

> 💡 **提示**：本文将通过实际案例和最佳实践，帮助你充分发挥 Claude Code 的潜力，显著提升编程效率。

## 目录

在 AI 编程工具快速发展的今天，Claude Code 作为一款强大的 AI 编程助手，为开发者提供了前所未有的编程体验。本文将分享 10 个实用技巧，帮助你充分发挥 Claude Code 的潜力。

## 1. 精确的问题描述 🎯

与 Claude Code 交互时，问题描述的精确性直接影响回答质量。

### ✅ 好的示例：

\`\`\`text
我需要在 React 项目中实现一个支持拖拽排序的任务列表组件，
使用 TypeScript，并且要支持添加、删除、编辑任务功能。
\`\`\`

### ❌ 避免模糊描述：

\`\`\`text
帮我做个任务列表
\`\`\`

## 2. 利用上下文信息 🔄

Claude Code 具有强大的上下文理解能力，可以记住之前的对话内容。

\`\`\`typescript
// 第一次请求
function calculateTotal(items: Item[]) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// 后续请求：基于上面的函数
// "请为这个函数添加税收计算功能"
\`\`\`

## 3. 代码审查和优化 🔍

让 Claude Code 帮你审查代码，发现潜在问题：

\`\`\`javascript
// 原始代码 - 需要优化
function processUserData(users) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    if (users[i].active == true) {
      result.push({
        id: users[i].id,
        name: users[i].name.toUpperCase(),
        email: users[i].email
      });
    }
  }
  return result;
}
\`\`\`

\`\`\`javascript
// Claude Code 优化后的版本 ✨
const processUserData = (users) => 
  users
    .filter(user => user.active)
    .map(({ id, name, email }) => ({
      id,
      name: name.toUpperCase(),
      email
    }));
\`\`\`

## 4. 生成测试用例 🧪

Claude Code 可以帮你生成全面的测试用例：

\`\`\`typescript
describe('calculateTotal', () => {
  it('should return 0 for empty array', () => {
    expect(calculateTotal([])).toBe(0);
  });
  
  it('should calculate sum correctly', () => {
    const items = [
      { price: 10 },
      { price: 20 },
      { price: 30 }
    ];
    expect(calculateTotal(items)).toBe(60);
  });
  
  it('should handle negative prices', () => {
    const items = [{ price: -5 }, { price: 15 }];
    expect(calculateTotal(items)).toBe(10);
  });
});
\`\`\`

## 5. 文档生成 📚

让 Claude Code 为你的代码生成专业的文档：

\`\`\`typescript
/**
 * 计算购物车中所有商品的总价
 * @param items - 商品数组，每个商品需包含 price 属性
 * @returns 总价（数字），如果数组为空则返回 0
 * @throws {TypeError} 当 items 不是数组时抛出错误
 * @example
 * const total = calculateTotal([
 *   { price: 10 },
 *   { price: 20 }
 * ]); // returns 30
 * 
 * @example
 * const emptyTotal = calculateTotal([]); // returns 0
 */
function calculateTotal(items: Item[]): number {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }
  return items.reduce((sum, item) => sum + item.price, 0);
}
\`\`\`

## 6. 代码重构 🛠️

Claude Code 擅长代码重构，帮你改善代码结构：

### 重构前：复杂的条件判断

\`\`\`typescript
function getUserStatus(user) {
  if (user.isActive && user.subscription && user.subscription.status === 'active' && user.subscription.expiresAt > new Date()) {
    return 'premium';
  } else if (user.isActive && (!user.subscription || user.subscription.status !== 'active')) {
    return 'free';
  } else {
    return 'inactive';
  }
}
\`\`\`

### 重构后：清晰的逻辑结构

\`\`\`typescript
function getUserStatus(user) {
  if (!user.isActive) return 'inactive';
  
  const hasActiveSubscription = 
    user.subscription?.status === 'active' && 
    user.subscription?.expiresAt > new Date();
    
  return hasActiveSubscription ? 'premium' : 'free';
}
\`\`\`

## 7. 学习新技术 🚀

使用 Claude Code 快速学习新的库和框架：

\`\`\`typescript
// 学习 Zustand 状态管理
import { create } from 'zustand';

interface CounterState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useCounter = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));
\`\`\`

## 8. 错误调试 🐛

Claude Code 可以帮你分析和修复错误：

| 步骤 | 操作 | 说明 |
|------|------|------|
| 1 | 检查数据结构 | 确认数据格式是否正确 |
| 2 | 添加防御性编程 | 增加错误处理机制 |
| 3 | 使用可选链操作符 | 避免访问undefined属性 |

**错误信息**：\`Cannot read property 'name' of undefined\`

**解决方案**：
\`\`\`typescript
// 使用可选链和空值合并
const userName = user?.name ?? 'Unknown User';

// 或者使用条件检查
const userName = user && user.name ? user.name : 'Unknown User';
\`\`\`

## 9. 性能优化建议 ⚡

询问 Claude Code 关于性能优化的建议：

### 优化前

\`\`\`typescript
const expensiveCalculation = (data) => {
  return data.map(item => 
    item.values.reduce((sum, val) => sum + val, 0)
  );
};
\`\`\`

### 优化后：使用 useMemo

\`\`\`typescript
import { useMemo } from 'react';

const ExpensiveComponent = ({ data }) => {
  const calculations = useMemo(() => 
    data.map(item => 
      item.values.reduce((sum, val) => sum + val, 0)
    ), [data] // 只有当 data 改变时才重新计算
  );
  
  return (
    <div>
      {calculations.map((calc, index) => (
        <div key={index}>结果: {calc}</div>
      ))}
    </div>
  );
};
\`\`\`

## 10. 最佳实践总结 📋

- [x] **保持对话连续性**：充分利用 Claude Code 的上下文记忆
- [x] **提供具体场景**：详细描述你的使用场景和需求  
- [x] **迭代改进**：基于 Claude Code 的建议逐步完善代码
- [x] **学会提问**：问对问题比得到答案更重要
- [x] **代码审查**：让 Claude Code 帮你进行代码审查
- [ ] **持续学习**：关注 AI 工具的最新功能和用法

## 进阶技巧 🎓

### 使用 Emoji 和表情符号
在与 Claude Code 交流时，适当使用表情符号可以让对话更生动：:smile: :rocket: :bulb:

### 创建工作流
建立标准化的开发工作流，比如：代码生成 → 测试编写 → 代码审查 → 文档生成

## 结语

Claude Code 不仅仅是一个代码生成工具，更是你的编程伙伴。通过掌握这些技巧，你可以显著提升编程效率，写出更高质量的代码。

> ⚡ **记住**：最好的 AI 工具是那些能够增强人类能力，而不是替代人类思考的工具。Claude Code 正是这样的工具。

---

*希望这些技巧对你有所帮助！如果你有其他使用 Claude Code 的心得，欢迎在评论区分享。* 💬
  `,
  coverImage: "/api/placeholder/800/400",
  author: {
    id: "1",
    name: "张三",
    avatar: "/api/placeholder/60/60",
    bio: "全栈开发者，AI 编程爱好者，专注于提升开发效率的工具和方法。",
    github: "zhangsan",
    twitter: "zhangsan_dev",
    website: "https://zhangsan.dev"
  },
  tags: [
    { id: "1", name: "Claude", color: "blue", slug: "claude" },
    { id: "2", name: "编程技巧", color: "green", slug: "programming-tips" },
    { id: "7", name: "最佳实践", color: "yellow", slug: "best-practices" }
  ],
  publishedAt: "2024-01-15",
  updatedAt: "2024-01-15",
  readingTime: 8,
  featured: true,
  status: 'published' as const
};

// 模拟相关文章
const relatedInsights = [
  {
    id: "2",
    title: "Gemini vs ChatGPT：AI 编程助手对比分析",
    slug: "gemini-vs-chatgpt-ai-programming-comparison",
    author: { name: "李四" },
    readingTime: 12
  },
  {
    id: "3", 
    title: "Prompt Engineering 实战：构建高效的 AI 对话模式",
    slug: "prompt-engineering-effective-ai-conversations",
    author: { name: "王五" },
    readingTime: 15
  }
];

interface Props {
  params: {
    slug: string;
  };
}

export default function InsightDetailPage({ params }: Props) {
  const insight = mockInsightDetail; // 实际应用中应该根据 slug 查询数据

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* 主要内容 */}
        <div className="flex-1 max-w-4xl">
          {/* 返回按钮 */}
          <div className="mb-6">
            <Link href="/insights">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                返回文章列表
              </Button>
            </Link>
          </div>

          {/* 文章头部 */}
          <article className="mb-12">
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {insight.tags.map(tag => (
                  <Badge key={tag.id} variant="secondary">
                    {tag.name}
                  </Badge>
                ))}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {insight.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
                {insight.excerpt}
              </p>

              {/* 作者信息和文章信息 */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {insight.author.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{insight.author.name}</div>
                    <div className="text-sm text-gray-500 flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {insight.publishedAt}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {insight.readingTime} 分钟阅读
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* 操作按钮 */}
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    分享
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Bookmark className="h-4 w-4" />
                    收藏
                  </Button>
                </div>
              </div>
            </div>

            {/* 封面图片 */}
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg mb-8 flex items-center justify-center">
              <div className="text-6xl">💡</div>
            </div>

            {/* 文章内容 */}
            <MarkdownRenderer content={insight.content} />
          </article>

          {/* 作者详细信息 */}
          <Card className="p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {insight.author.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{insight.author.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{insight.author.bio}</p>
                <div className="flex items-center gap-4">
                  {insight.author.github && (
                    <a href={`https://github.com/${insight.author.github}`} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {insight.author.twitter && (
                    <a href={`https://twitter.com/${insight.author.twitter}`}
                       target="_blank"
                       rel="noopener noreferrer" 
                       className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </a>
                  )}
                  {insight.author.website && (
                    <a href={insight.author.website}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex items-center gap-2 text-sm text-gray-500 hover:text-primary">
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* 互动区域 */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <Button variant="outline" className="gap-2">
              <ThumbsUp className="h-4 w-4" />
              点赞 (42)
            </Button>
            <Button variant="outline" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              评论 (8)
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              分享
            </Button>
          </div>

          {/* 相关文章推荐 */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">📖 相关文章</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedInsights.map(related => (
                <Card key={related.id} className="p-4 hover:shadow-lg transition-shadow">
                  <Link href={`/insights/${related.slug}`}>
                    <h3 className="font-semibold mb-2 hover:text-primary cursor-pointer line-clamp-2">
                      {related.title}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{related.author.name}</span>
                    <span>{related.readingTime} 分钟</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 评论区占位符 */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">💬 评论区</h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 mb-4">评论功能正在开发中...</p>
              <p className="text-sm text-gray-400">
                期待与社区成员交流？欢迎加入我们的微信群！
              </p>
            </div>
          </div>
        </div>

        {/* 侧边栏 - 目录 */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-8">
            <TableOfContents content={insight.content} />
          </div>
        </div>
      </div>
    </div>
  );
}