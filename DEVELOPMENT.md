# VC101 开发指南

## 快速开始

### 标准克隆
```bash
git clone --recursive https://github.com/your-username/vc101.git
cd vc101
```

### 快速克隆（推荐新手）
如果想要更快的克隆速度，可以使用浅克隆：

```bash
# 浅克隆主仓库和子模块
git clone --recursive --depth 1 https://github.com/your-username/vc101.git
cd vc101

# 如果需要完整历史，后续可以解除深度限制
git fetch --unshallow
git submodule foreach git fetch --unshallow
```

### 字体安装
```bash
# 下载PDF生成所需的中文字体
./download-fonts.sh
```

## 项目结构

- `src/` - Next.js 应用源码
- `3rd-parties/` - 第三方库（子模块）
  - `pandoc-latex-template/` - Eisvogel LaTeX 模板
- `fonts/` - PDF 生成所需字体
- `Dockerfile.pandoc` - 包含 Pandoc 的 Docker 镜像

## PDF 生成

项目使用 **Pandoc + Eisvogel** 模板生成专业PDF：

1. 用户点击"下载PDF"
2. 前端调用 `/api/generate-pdf`
3. 后端使用 Pandoc + XeLaTeX 生成PDF
4. 返回高质量的可选中文字PDF

## 部署

### Docker 部署
```bash
# 构建包含 Pandoc 的镜像
docker build -f Dockerfile.pandoc -t vc101-pandoc .

# 运行
docker run -p 3000:3000 vc101-pandoc
```

## Git 仓库优化

当前 `.git` 目录约 131MB，主要包含：
- Eisvogel 模板的完整历史（128MB）
- 项目本身的历史（3MB）

这不会显著影响 push/pull 速度，因为 Git 只传输差异内容。

如果需要清理本地仓库大小：
```bash
# 注意：这会丢失子模块的历史
git submodule deinit 3rd-parties/pandoc-latex-template
rm -rf .git/modules/3rd-parties
# 然后重新初始化为浅克隆
git submodule update --init --depth 1
```