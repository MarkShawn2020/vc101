# Neurora企业级模板

<div align="center">
  <img src="./public/logo.png" alt="Neurora Logo" width="120" height="120" />
</div>

<h1 align="center">Next.js + Supabase Boilerplate</h1>

<p align="center">
  基于 Next.js 14 App Router + Supabase + Shadcn/UI 的企业级项目模板
</p>

<p align="center">
  <a href="#特性"><strong>特性</strong></a> ·
  <a href="#最佳实践"><strong>最佳实践</strong></a> ·
  <a href="#本地开发"><strong>本地开发</strong></a> ·
  <a href="#项目结构"><strong>项目结构</strong></a>
</p>

## 特性

- 🚀 [Next.js 14](https://nextjs.org) App Router
  - Server Components
  - Client Components
  - Server Actions
  - Middleware
- 🔐 [Supabase](https://supabase.com) 集成
  - 认证 & 授权
    - 基于 Middleware 的 Session 管理
    - 智能首页：根据登录状态自动切换内容
  - 数据库
  - Edge Functions
- 🎨 现代化 UI/UX
  - [Tailwind CSS](https://tailwindcss.com)
  - [Shadcn/UI](https://ui.shadcn.com/)
  - 响应式设计
  - 暗色模式
  - 双模式 Logo 组件
    - SVG 模式：支持动态颜色
    - Image 模式：支持主题切换
- 🛠️ 开发体验
  - TypeScript
  - ESLint
  - Prettier
  - Husky
  - Commitlint

## 最佳实践

我们整理了一系列最佳实践文档：

- [SVG 作为 React 组件使用](./docs/Best%20Practice%20-%20SVG%20as%20React%20Component.md)
- [动态 Favicon 生成](./docs/Best%20Practice%20-%20Dynamic%20Favicon.md)
- [智能首页实现](./docs/Best%20Practice%20-%20Smart%20Homepage.md)
- [认证最佳实践](./docs/Best%20Practice%20-%20Authentication.md)
- 更多文档正在编写中...

## 本地开发

1. 克隆项目
```bash
git clone https://github.com/markshawn2020/boilerplate_next-supabase.git
cd boilerplate_next-supabase
```

2. 安装依赖
```bash
pnpm install
```

3. 复制环境变量
```bash
cp .env.example .env.local
```

4. 启动开发服务器
```bash
pnpm dev
```

## 项目结构

```
.
├── app/                # Next.js App Router
├── components/         # React 组件
├── docs/              # 项目文档
├── lib/               # 工具函数
├── public/            # 静态资源
└── types/             # TypeScript 类型定义
```

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License © 2025 [Neurora](https://github.com/markshawn2020)
