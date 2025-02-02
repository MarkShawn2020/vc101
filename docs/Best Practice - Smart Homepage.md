# 智能首页最佳实践

在企业级应用中，首页通常需要根据用户的登录状态显示不同的内容：
- 未登录用户看到营销页面（Landing Page）
- 已登录用户直接进入工作台（Dashboard）

本文介绍如何在 Next.js 应用中实现这一功能。

## 实现方案

### 1. 基于服务端组件的状态检测

```tsx
// app/page.tsx
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="flex-1 w-full">
      {user ? <Dashboard /> : <LandingPage />}
    </main>
  );
}
```

### 2. 保持 URL 一致性

不同于传统的重定向方案，我们选择在同一个 URL 下根据状态渲染不同内容，这样做的好处是：

- 提升 SEO 效果
- 改善用户体验
- 减少页面跳转
- 便于分享和收藏

### 3. 组件分离

将 Landing Page 和 Dashboard 分别封装为独立组件：

```tsx
// Landing Page Component
const LandingPage = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <Logo mode="svg" className="w-[180px] h-auto" color="currentColor" />
    <h1 className="text-4xl font-bold m-4">Where Code Meets Magic</h1>
  </div>
);

// Dashboard Component
const Dashboard = () => (
  <div className="flex flex-col gap-8 p-8">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">我的工作台</h1>
      <Button className="px-4 py-2 rounded-lg">
        新建项目
      </Button>
    </div>
    {/* 工作台内容 */}
  </div>
);
```

## 性能考虑

1. **服务端渲染**：
   - 使用 Server Components 确保首屏渲染性能
   - 减少客户端 JavaScript 体积

2. **状态管理**：
   - 利用 Supabase 的 Session 管理
   - 避免不必要的客户端状态

3. **资源加载**：
   - 组件代码分割
   - 按需加载各个视图的资源

## 安全性

1. **认证检查**：
   - 在服务端进行用户状态验证
   - 使用 Middleware 确保 Session 有效性

2. **权限控制**：
   - 精确控制未登录用户可访问的内容
   - 防止敏感信息泄露

## 最佳实践

1. **代码组织**：
   - 将不同视图组件放在合适的目录结构中
   - 使用清晰的命名约定

2. **类型安全**：
   - 为所有组件和数据结构定义 TypeScript 类型
   - 确保类型推导的准确性

3. **错误处理**：
   - 优雅处理加载和错误状态
   - 提供用户友好的错误提示

## 注意事项

1. 确保 SEO 相关的元数据在两种状态下都正确设置
2. 考虑添加适当的加载状态提示
3. 为不同设备优化响应式布局
4. 注意处理边缘情况，如 Session 过期

## 相关文档

- [Next.js App Router](https://nextjs.org/docs/app)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [认证最佳实践](./Best%20Practice%20-%20Authentication.md)
