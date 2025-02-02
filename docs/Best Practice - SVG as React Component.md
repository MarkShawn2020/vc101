# Next.js 中将 SVG 作为 React 组件使用的最佳实践

## 1. 安装依赖

```bash
pnpm add -D @svgr/webpack
```

## 2. 配置 Next.js

在 `next.config.js` 中添加以下配置：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ['@svgr/webpack'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

module.exports = nextConfig
```

## 3. TypeScript 支持

1. 创建 `types/svg.d.ts`：

```typescript
declare module '*.svg' {
  import { FunctionComponent, SVGProps } from 'react'
  const content: FunctionComponent<SVGProps<SVGSVGElement>>
  export default content
}
```

2. 在 `tsconfig.json` 中包含类型声明：

```json
{
  "include": ["next-env.d.ts", "types/*.d.ts", ".next/types/**/*.ts", "**/*.ts", "**/*.tsx"]
}
```

## 4. 使用示例

```tsx
// 直接导入 SVG 作为组件
import LogoSvg from '@/public/logo.svg'

// 使用组件
const MyComponent = () => (
  <LogoSvg
    className="h-8 w-auto"
    fill="currentColor"  // 支持动态颜色
  />
)
```

## 5. 高级用法：支持双模式的 Logo 组件

创建一个支持 SVG/Image 双模式的 Logo 组件：

```tsx
'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import LogoSvg from '@/public/logo.svg'

interface LogoProps {
  mode?: 'svg' | 'image'
  className?: string
  color?: string
  size?: number
}

export default function Logo({ mode = 'svg', className = '', color, size = 32 }: LogoProps) {
  const { theme } = useTheme()

  if (mode === 'svg') {
    // SVG mode - can change color dynamically
    return (
      <LogoSvg
        className={className}
        width={size}
        height={size}
        fill={color || 'currentColor'}
      />
    )
  }

  // Image mode - theme-based image
  return (
    <Image
      src={theme === 'dark' ? '/logo_dark.png' : '/logo_light.png'}
      alt="Logo"
      width={size}
      height={size}
      className={className}
    />
  )
}
```

## 优势

1. **类型安全**：完整的 TypeScript 支持
2. **灵活性**：
   - SVG 模式支持动态颜色
   - Image 模式支持主题切换
3. **开发体验**：SVG 可以直接作为组件导入使用
4. **性能**：SVG 代码会在构建时优化

## 注意事项

1. SVG 文件应放在 `public` 目录下
2. 使用 SVG 组件时记得添加 `fill` 属性以支持颜色修改
3. 如果组件中使用了 hooks（如 `useTheme`），需要添加 `'use client'` 指令
