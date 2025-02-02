# 动态 Favicon 生成最佳实践

本项目提供了一个便捷的脚本来从 SVG 生成 favicon.ico 文件。这个脚本特别适合处理使用 `currentColor` 的 SVG 文件，允许你指定具体的颜色值。

## 特性

- 支持从任何 SVG 文件生成 favicon.ico
- 自动处理 `currentColor` 替换
- 生成多尺寸图标 (16x16, 32x32, 48x48)
- 自动清理临时文件

## 前置条件

- ImageMagick
  ```bash
  brew install imagemagick
  ```

## 使用方法

脚本位于 `scripts/generate-favicon.sh`，使用方法如下：

```bash
# 基本用法
./scripts/generate-favicon.sh -i path/to/logo.svg

# 自定义颜色（十六进制格式）
./scripts/generate-favicon.sh -i path/to/logo.svg -c "#FF0000"
```

### 参数说明

- `-i`: 输入 SVG 文件路径（必需）
- `-c`: 颜色值，十六进制格式（可选，默认：#333333）
- `-h`: 显示帮助信息

### 输出

- 生成的 favicon 将保存为 `public/favicon.ico`
- 过程中会创建临时文件 `public/favicon.temp.svg`，但会在完成后自动删除

## 最佳实践

1. **颜色选择**
   - 对于浅色主题，建议使用深色值（如 #333333）
   - 对于深色主题，建议使用浅色值（如 #FFFFFF）
   - 如果需要支持双主题，建议生成两个版本的 favicon

2. **SVG 准备**
   - 确保 SVG 使用 `currentColor` 作为填充色
   - SVG 应该是单色的，避免使用渐变或多色
   - 建议使用简单、清晰的图标设计，因为 favicon 尺寸较小

3. **版本控制**
   - 建议将生成的 favicon.ico 加入版本控制
   - 生成脚本的临时文件已被添加到 .gitignore

## 故障排除

1. 如果遇到权限问题：
   ```bash
   chmod +x scripts/generate-favicon.sh
   ```

2. 如果输出图标太模糊：
   - 确保输入的 SVG 足够清晰
   - 可以尝试调整 ImageMagick 的密度参数（当前使用 300）

3. 如果颜色不正确：
   - 检查 SVG 是否正确使用了 `currentColor`
   - 确保颜色值包含 # 前缀
