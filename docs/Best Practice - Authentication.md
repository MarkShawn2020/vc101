# 认证最佳实践

本文档介绍在 Next.js + Supabase 项目中实现认证功能的最佳实践。

## 核心原则

1. **安全性优先**
   - 使用 HTTPS
   - 实施适当的密码策略
   - 保护用户数据

2. **用户体验**
   - 清晰的错误提示
   - 平滑的状态转换
   - 直观的界面设计

3. **可维护性**
   - 模块化的代码结构
   - 清晰的类型定义
   - 完善的文档

## 实现方案

### 1. Session 管理

使用 Middleware 处理 Session：

```typescript
// middleware.ts
import { createClient } from "@/utils/supabase/middleware";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request);

  // 刷新 session
  await supabase.auth.getSession();

  return response;
}
```

### 2. 认证组件

实现一个通用的认证头部组件：

```typescript
// components/header-auth.tsx
export default async function HeaderAuth() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      <form action={signOutAction}>
        <Button type="submit" size="sm">
          Logout
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex items-center gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/sign-in">Login</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
}
```

### 3. 受保护路由

使用 Server Components 保护路由：

```typescript
// app/protected/layout.tsx
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/sign-in');
  }

  return children;
}
```

## 最佳实践

### 1. 错误处理

- 使用统一的错误消息格式
- 提供清晰的用户反馈
- 记录详细的错误日志

### 2. 表单验证

- 客户端预验证
- 服务端二次验证
- 适当的错误提示

### 3. 状态管理

- 使用 Server Components 减少客户端状态
- 适当使用缓存提升性能
- 处理边缘情况

### 4. UI/UX 设计

- 清晰的视觉反馈
- 一致的设计语言
- 响应式适配

## 安全建议

1. **密码安全**
   - 强制密码复杂度要求
   - 实施密码重置流程
   - 防止暴力破解

2. **Session 安全**
   - 适当的过期时间
   - 安全的 cookie 设置
   - 定期刷新 token

3. **API 安全**
   - 限制请求频率
   - 验证所有输入
   - 使用 HTTPS

## 测试策略

1. **单元测试**
   - 测试认证逻辑
   - 测试表单验证
   - 测试错误处理

2. **集成测试**
   - 测试认证流程
   - 测试受保护路由
   - 测试边缘情况

3. **E2E 测试**
   - 测试完整用户流程
   - 测试跨浏览器兼容性
   - 测试响应式设计

## 部署注意事项

1. 确保环境变量正确配置
2. 启用适当的安全头部
3. 配置错误页面
4. 监控认证相关指标

## 相关资源

- [Supabase Auth 文档](https://supabase.com/docs/guides/auth)
- [Next.js 中间件](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Web 认证最佳实践](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
