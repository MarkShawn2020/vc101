#!/bin/bash

# 字体下载脚本
echo "正在下载 PDF 生成所需的中文字体..."

# 创建字体目录
mkdir -p fonts

# 下载 Source Han Serif SC
echo "下载 Source Han Serif SC..."
curl -L -o "fonts/SourceHanSerifSC-Regular.otf" "https://raw.githubusercontent.com/adobe-fonts/source-han-serif/release/OTF/SimplifiedChinese/SourceHanSerifSC-Regular.otf"

if [ $? -eq 0 ]; then
    echo "✅ Source Han Serif SC 下载完成"
else
    echo "❌ Source Han Serif SC 下载失败"
fi

# 检查是否有 PingFang 字体 (macOS)
if [ -f "/System/Library/Fonts/PingFang.ttc" ]; then
    echo "复制 PingFang 字体..."
    cp "/System/Library/Fonts/PingFang.ttc" "fonts/"
    echo "✅ PingFang 字体复制完成"
fi

# 检查下载的字体
echo ""
echo "已下载的字体:"
ls -la fonts/

echo ""
echo "字体下载完成！现在可以正常生成包含中文的 PDF 了。"