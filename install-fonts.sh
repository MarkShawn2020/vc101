#!/bin/bash

# 创建字体目录
mkdir -p /usr/share/fonts/truetype/custom

# 复制项目字体到系统字体目录
cp fonts/*.otf /usr/share/fonts/truetype/custom/ 2>/dev/null || true
cp fonts/*.ttf /usr/share/fonts/truetype/custom/ 2>/dev/null || true
cp fonts/*.ttc /usr/share/fonts/truetype/custom/ 2>/dev/null || true

# 更新字体缓存
fc-cache -fv

# 验证字体安装
echo "已安装的中文字体："
fc-list :lang=zh | head -5