import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';
import { randomUUID } from 'crypto';

interface PDFRequestBody {
  content: string;
  title: string;
  author: string;
  lastUpdated: string;
  version: string;
  stats: {
    users: number;
    articles: number;
    tools: number;
    hackathons: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: PDFRequestBody = await request.json();
    const { content, title, author, lastUpdated, version, stats } = body;

    // 创建临时目录
    const tempId = randomUUID();
    const tempDir = join(tmpdir(), `vc101-pdf-${tempId}`);
    await fs.mkdir(tempDir, { recursive: true });

    // 生成markdown内容，包含YAML front matter
    const markdownContent = `---
title: "${title}"
author: ["${author}"]
date: "${lastUpdated}"
subject: "VC101 社区发展报告"
keywords: [VC101, 社区, 进展, 报告]
lang: "zh"
titlepage: true
titlepage-color: "426EEA"
titlepage-text-color: "FFFFFF"
titlepage-rule-color: "FFFFFF"
titlepage-rule-height: 2
toc-own-page: true
header-left: "VC101 社区进展报告"
header-right: "v${version}"
footer-left: "VC101 - Code with the Vibe, Build with the Future"
footer-center: ""
footer-right: "${lastUpdated}"
listings: true
code-block-font-size: "\\\\small"
mainfont: "Times New Roman"
CJKmainfont: "Source Han Serif SC"
monofont: "Source Code Pro"
...

# 社区统计概览

| 指标 | 数量 | 说明 |
|------|------|------|
| 注册用户 | ${stats.users.toLocaleString()} | +23% 月增长 |
| 技术文章 | ${stats.articles} | 高质量内容 |
| 开源工具 | ${stats.tools} | 实用工具集 |
| 黑客松 | ${stats.hackathons} | 成功举办 |

# 详细发展报告

${content}

---

**联系我们**

- 邮箱：contact@vc101.com
- 网站：[vc101.com](https://vc101.com)
- 微信群：扫描官网二维码加入

© 2025 VC101 Community. All rights reserved.
`;

    const markdownFile = join(tempDir, 'document.md');
    const pdfFile = join(tempDir, 'document.pdf');
    
    await fs.writeFile(markdownFile, markdownContent, 'utf8');

    // 获取Eisvogel模板路径和字体路径
    const templatePath = join(process.cwd(), '3rd-parties/pandoc-latex-template/template-multi-file/eisvogel.latex');
    const fontPath = join(process.cwd(), 'fonts');
    
    // 设置字体路径环境变量
    process.env.OSFONTDIR = fontPath;

    // 使用pandoc生成PDF - 设置更长的超时时间
    const pandocCommand = `pandoc "${markdownFile}" -o "${pdfFile}" --from markdown --template "${templatePath}" --pdf-engine=xelatex --listings -V fontpath="${fontPath}"`;

    await new Promise<void>((resolve, reject) => {
      exec(pandocCommand, { 
        cwd: tempDir,
        timeout: 60000, // 60秒超时
        maxBuffer: 1024 * 1024 * 10 // 10MB buffer
      }, (error, stdout, stderr) => {
        if (error) {
          console.error('Pandoc execution error:', error);
          console.error('Stdout:', stdout);
          console.error('Stderr:', stderr);
          reject(new Error(`PDF generation failed: ${error.message}. Stderr: ${stderr}`));
          return;
        }
        console.log('Pandoc success. Stdout:', stdout);
        if (stderr) {
          console.warn('Pandoc warnings:', stderr);
        }
        resolve();
      });
    });

    // 检查PDF文件是否生成成功
    try {
      await fs.access(pdfFile);
    } catch {
      throw new Error('PDF file was not generated successfully');
    }

    // 读取生成的PDF文件
    const pdfBuffer = await fs.readFile(pdfFile);

    // 清理临时文件
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (cleanupError) {
      console.warn('Failed to cleanup temp directory:', cleanupError);
    }

    // 返回PDF文件
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="VC101_Progress_Report_v${version}.pdf"`,
        'Content-Length': pdfBuffer.length.toString(),
      },
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { 
        error: 'PDF generation failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      },
      { status: 500 }
    );
  }
}