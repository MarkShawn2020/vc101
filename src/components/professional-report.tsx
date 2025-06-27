"use client";

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Calendar, TrendingUp, Users, Trophy, Clock, Loader2 } from 'lucide-react';
import { getVersionedFilename } from '@/lib/version';
import '@/styles/professional-report.css';

interface ProfessionalReportProps {
  content: string;
  lastUpdated: string;
  stats: {
    users: number;
    articles: number;
    tools: number;
    hackathons: number;
  };
}

export default function ProfessionalReport({ content, lastUpdated, stats }: ProfessionalReportProps) {
  const [downloading, setDownloading] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleDownload = async (format: 'html' | 'latex' | 'pdf') => {
    setDownloading(true);
    try {
      const filename = getVersionedFilename('VC101_Progress_Report', format);
      
      if (format === 'pdf') {
        await generatePandocPDF(filename);
      } else if (format === 'latex') {
        await generateLaTeX(filename);
      } else if (format === 'html') {
        // 创建完整的HTML文档
        const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VC101 社区进展报告</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f8fafc;
        }
        .report-header {
            text-align: center;
            margin-bottom: 60px;
            padding: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }
        .report-title {
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 16px;
            letter-spacing: -0.02em;
        }
        .report-subtitle {
            font-size: 1.2em;
            opacity: 0.9;
            margin-bottom: 24px;
        }
        .report-meta {
            display: flex;
            justify-content: center;
            gap: 32px;
            flex-wrap: wrap;
        }
        .meta-item {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px 16px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
        }
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 24px;
            margin: 40px 0;
        }
        .stat-card {
            background: white;
            padding: 32px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
        }
        .stat-number {
            font-size: 3em;
            font-weight: 700;
            margin-bottom: 8px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .stat-label {
            color: #64748b;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 0.9em;
        }
        .content-section {
            background: white;
            padding: 48px;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            border: 1px solid #e2e8f0;
            margin: 40px 0;
        }
        .content-section h1 {
            color: #1e293b;
            font-size: 2.5em;
            margin-bottom: 24px;
            padding-bottom: 16px;
            border-bottom: 3px solid #667eea;
        }
        .content-section h2 {
            color: #334155;
            font-size: 2em;
            margin: 40px 0 20px 0;
            position: relative;
        }
        .content-section h2::before {
            content: '';
            position: absolute;
            left: -20px;
            top: 50%;
            transform: translateY(-50%);
            width: 4px;
            height: 24px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 2px;
        }
        .content-section h3 {
            color: #475569;
            font-size: 1.5em;
            margin: 32px 0 16px 0;
        }
        .content-section p {
            margin-bottom: 16px;
            color: #64748b;
        }
        .content-section ul, .content-section ol {
            margin: 16px 0;
            padding-left: 24px;
        }
        .content-section li {
            margin-bottom: 8px;
            color: #64748b;
        }
        .content-section blockquote {
            border-left: 4px solid #667eea;
            padding-left: 24px;
            margin: 24px 0;
            font-style: italic;
            color: #64748b;
            background: #f8fafc;
            padding: 16px 24px;
            border-radius: 0 8px 8px 0;
        }
        .content-section code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.9em;
            color: #e11d48;
        }
        .content-section pre {
            background: #1e293b;
            color: #e2e8f0;
            padding: 24px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 24px 0;
        }
        .content-section pre code {
            background: none;
            color: inherit;
            padding: 0;
        }
        .footer {
            text-align: center;
            margin-top: 60px;
            padding: 40px;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }
        @media print {
            body { background: white; }
            .report-header { break-inside: avoid; }
            .stat-card { break-inside: avoid; }
            .content-section { break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="report-header">
        <h1 class="report-title">VC101 社区进展报告</h1>
        <p class="report-subtitle">全球领先的 Human-AI 协同编程社区发展报告</p>
        <div class="report-meta">
            <div class="meta-item">
                <span>📅</span>
                <span>更新时间：${lastUpdated}</span>
            </div>
            <div class="meta-item">
                <span>📊</span>
                <span>版本：v${require('../../package.json').version}</span>
            </div>
            <div class="meta-item">
                <span>🌐</span>
                <span>VC101.com</span>
            </div>
        </div>
    </div>

    <div class="stats-grid">
        <div class="stat-card">
            <div class="stat-number">${stats.users.toLocaleString()}</div>
            <div class="stat-label">注册用户</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.articles}</div>
            <div class="stat-label">技术文章</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.tools}</div>
            <div class="stat-label">开源工具</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${stats.hackathons}</div>
            <div class="stat-label">黑客松</div>
        </div>
    </div>

    <div class="content-section">
        ${content}
    </div>

    <div class="footer">
        <p><strong>VC101 - Code with the Vibe, Build with the Future</strong></p>
        <p>© 2025 VC101 Community. All rights reserved.</p>
        <p>🌐 <a href="https://vc101.com">vc101.com</a> | 📧 contact@vc101.com</p>
    </div>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      
    } catch (error) {
      console.error('下载失败:', error);
    } finally {
      setDownloading(false);
    }
  };

  // 将HTML内容转换为LaTeX格式
  const convertHtmlToLatex = (htmlContent: string): string => {
    // 创建临时div来解析HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    let latexContent = '';
    
    const processNode = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) {
        return (node.textContent || '').trim();
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();
        const childContent = Array.from(element.childNodes).map(processNode).join('');
        
        switch (tagName) {
          case 'h1':
            return `\\section{${childContent}}\n\n`;
          case 'h2':
            return `\\subsection{${childContent}}\n\n`;
          case 'h3':
            return `\\subsubsection{${childContent}}\n\n`;
          case 'p':
            return `${childContent}\n\n`;
          case 'strong':
          case 'b':
            return `\\textbf{${childContent}}`;
          case 'em':
          case 'i':
            return `\\textit{${childContent}}`;
          case 'code':
            return `\\texttt{${childContent}}`;
          case 'ul':
            return `\\begin{itemize}\n${childContent}\\end{itemize}\n\n`;
          case 'ol':
            return `\\begin{enumerate}\n${childContent}\\end{enumerate}\n\n`;
          case 'li':
            return `\\item ${childContent}\n`;
          case 'blockquote':
            return `\\begin{quote}\n${childContent}\n\\end{quote}\n\n`;
          case 'pre':
            return `\\begin{verbatim}\n${childContent}\n\\end{verbatim}\n\n`;
          default:
            return childContent;
        }
      }
      
      return '';
    };
    
    latexContent = processNode(tempDiv);
    
    // 清理特殊字符
    latexContent = latexContent
      .replace(/&/g, '\\&')
      .replace(/%/g, '\\%')
      .replace(/\$/g, '\\$')
      .replace(/#/g, '\\#')
      .replace(/_/g, '\\_')
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      .replace(/\^/g, '\\textasciicircum{}')
      .replace(/~/g, '\\textasciitilde{}');
    
    return latexContent;
  };

  // 生成LaTeX文档
  const generateLaTeX = async (filename: string) => {
    try {
      const latexContent = convertHtmlToLatex(content);
      
      const latexDocument = `\\documentclass[12pt,a4paper]{article}

% 中文支持
\\usepackage{ctex}
\\usepackage[UTF8]{ctex}

% 页面设置
\\usepackage[top=2.5cm, bottom=2.5cm, left=3cm, right=3cm]{geometry}
\\usepackage{setspace}
\\onehalfspacing

% 字体和颜色
\\usepackage{xcolor}
\\usepackage{fontspec}
\\setmainfont{Times New Roman}
\\setCJKmainfont{SimSun}

% 图表和表格
\\usepackage{graphicx}
\\usepackage{booktabs}
\\usepackage{longtable}
\\usepackage{array}

% 代码高亮
\\usepackage{listings}
\\usepackage{fancyvrb}

% 链接
\\usepackage{hyperref}
\\hypersetup{
    colorlinks=true,
    linkcolor=blue,
    urlcolor=blue,
    citecolor=blue
}

% 标题格式
\\usepackage{titlesec}
\\titleformat{\\section}{\\Large\\bfseries\\color{blue}}{\\thesection}{1em}{}
\\titleformat{\\subsection}{\\large\\bfseries\\color{gray}}{\\thesubsection}{1em}{}

% 页眉页脚
\\usepackage{fancyhdr}
\\pagestyle{fancy}
\\fancyhf{}
\\fancyhead[L]{VC101 社区进展报告}
\\fancyhead[R]{v${require('../../package.json').version}}
\\fancyfoot[C]{\\thepage}
\\fancyfoot[L]{VC101 - Code with the Vibe, Build with the Future}
\\fancyfoot[R]{${lastUpdated}}

% 文档开始
\\begin{document}

% 标题页
\\begin{titlepage}
    \\centering
    \\vspace*{2cm}
    
    {\\Huge\\bfseries\\color{blue} VC101 社区进展报告}
    
    \\vspace{1cm}
    
    {\\Large 全球领先的 Human-AI 协同编程社区发展报告}
    
    \\vspace{2cm}
    
    \\begin{tabular}{ll}
        \\textbf{更新时间:} & ${lastUpdated} \\\\[0.5cm]
        \\textbf{版本:} & v${require('../../package.json').version} \\\\[0.5cm]
        \\textbf{官方网站:} & \\href{https://vc101.com}{vc101.com} \\\\
    \\end{tabular}
    
    \\vfill
    
    {\\large VC101 Community}
    
    \\vspace{1cm}
    
    {\\today}
\\end{titlepage}

% 目录
\\tableofcontents
\\newpage

% 社区统计概览
\\section{社区统计概览}

\\begin{center}
\\begin{tabular}{|l|c|l|}
\\hline
\\textbf{指标} & \\textbf{数量} & \\textbf{说明} \\\\
\\hline
注册用户 & ${stats.users.toLocaleString()} & +23\\% 月增长 \\\\
\\hline
技术文章 & ${stats.articles} & 高质量内容 \\\\
\\hline
开源工具 & ${stats.tools} & 实用工具集 \\\\
\\hline
黑客松 & ${stats.hackathons} & 成功举办 \\\\
\\hline
\\end{tabular}
\\end{center}

\\section{详细发展报告}

${latexContent}

% 结尾
\\vfill
\\begin{center}
\\rule{0.8\\textwidth}{0.4pt}

\\textbf{VC101 - Code with the Vibe, Build with the Future}

© 2025 VC101 Community. All rights reserved.

\\href{mailto:contact@vc101.com}{contact@vc101.com} | \\href{https://vc101.com}{vc101.com}
\\end{center}

\\end{document}`;

      // 下载LaTeX源文件
      const blob = new Blob([latexDocument], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename.replace('.tex', '') + '.tex';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('LaTeX生成失败:', error);
      throw error;
    }
  };

  // 使用Pandoc生成PDF
  const generatePandocPDF = async (filename: string) => {
    try {
      // 将HTML内容转换为纯文本markdown
      const markdownContent = convertHtmlToMarkdown(content);
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: markdownContent,
          title: 'VC101 社区进展报告',
          author: 'VC101 Community',
          lastUpdated,
          version: require('../../package.json').version,
          stats,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'PDF generation failed');
      }

      // 下载PDF文件
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Pandoc PDF生成失败:', error);
      throw error;
    }
  };

  // 将HTML内容转换为Markdown格式
  const convertHtmlToMarkdown = (htmlContent: string): string => {
    // 创建临时div来解析HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    
    let markdownContent = '';
    
    const processNode = (node: Node): string => {
      if (node.nodeType === Node.TEXT_NODE) {
        return (node.textContent || '').trim();
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as Element;
        const tagName = element.tagName.toLowerCase();
        const childContent = Array.from(element.childNodes).map(processNode).join('');
        
        switch (tagName) {
          case 'h1':
            return `\n# ${childContent}\n\n`;
          case 'h2':
            return `\n## ${childContent}\n\n`;
          case 'h3':
            return `\n### ${childContent}\n\n`;
          case 'p':
            return `${childContent}\n\n`;
          case 'strong':
          case 'b':
            return `**${childContent}**`;
          case 'em':
          case 'i':
            return `*${childContent}*`;
          case 'code':
            return `\`${childContent}\``;
          case 'ul':
            return `\n${childContent}\n`;
          case 'ol':
            return `\n${childContent}\n`;
          case 'li':
            return `- ${childContent}\n`;
          case 'blockquote':
            return `\n> ${childContent}\n\n`;
          case 'pre':
            return `\n\`\`\`\n${childContent}\n\`\`\`\n\n`;
          case 'br':
            return '\n';
          default:
            return childContent;
        }
      }
      
      return '';
    };
    
    markdownContent = processNode(tempDiv);
    
    // 清理多余的空行
    markdownContent = markdownContent
      .replace(/\n\n\n+/g, '\n\n')
      .replace(/^\n+/, '')
      .replace(/\n+$/, '');
    
    return markdownContent;
  };

  return (
    <div className="space-y-8">
      {/* 报告头部 */}
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 text-white p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">VC101 社区进展报告</h1>
            <p className="text-xl opacity-90 mb-6">全球领先的 Human-AI 协同编程社区发展报告</p>
            
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Calendar className="h-4 w-4" />
                <span>更新时间：{lastUpdated}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <FileText className="h-4 w-4" />
                <span>版本：v{require('../../package.json').version}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <TrendingUp className="h-4 w-4" />
                <span>官方报告</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 关键指标面板 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">
            {stats.users.toLocaleString()}
          </div>
          <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            注册用户
          </div>
          <Badge variant="secondary" className="mt-2">+23% 增长</Badge>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <FileText className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {stats.articles}
          </div>
          <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            技术文章
          </div>
          <Badge variant="secondary" className="mt-2">高质量</Badge>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-full">
              <Trophy className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {stats.tools}
          </div>
          <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            开源工具
          </div>
          <Badge variant="secondary" className="mt-2">实用性强</Badge>
        </Card>

        <Card className="p-6 text-center hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-full">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-600 mb-2">
            {stats.hackathons}
          </div>
          <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">
            黑客松
          </div>
          <Badge variant="secondary" className="mt-2">成功举办</Badge>
        </Card>
      </div>

      {/* 下载操作栏 */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">导出报告</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              下载完整的社区进展报告，支持多种专业格式
            </p>
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button
              onClick={() => handleDownload('pdf')}
              disabled={downloading}
              className="gap-2"
            >
              {downloading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  生成中...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  下载 PDF
                </>
              )}
            </Button>
            <Button
              onClick={() => handleDownload('latex')}
              disabled={downloading}
              variant="outline"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              LaTeX 源码
            </Button>
            <Button
              onClick={() => handleDownload('html')}
              disabled={downloading}
              variant="outline"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              HTML 格式
            </Button>
          </div>
        </div>
      </Card>

      {/* PDF 生成说明 */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Download className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 text-blue-800 dark:text-blue-200">📄 专业PDF生成</h3>
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
              我们使用 <strong>Pandoc + Eisvogel</strong> 模板生成专业级PDF报告：
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-blue-700 dark:text-blue-300">
                  <strong>完美中文支持：</strong>使用 XeLaTeX 引擎，完美渲染中文字符
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-blue-700 dark:text-blue-300">
                  <strong>专业排版：</strong>基于LaTeX的学术级文档排版系统
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-blue-700 dark:text-blue-300">
                  <strong>可选中文字：</strong>生成的PDF支持文字选择和复制
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span className="text-blue-700 dark:text-blue-300">
                  <strong>LaTeX源码：</strong>如需自定义，可下载LaTeX源码进行编辑
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Separator className="my-8" />

      {/* 专业级报告内容 */}
      <Card className="overflow-hidden">
        <div ref={reportRef} className="bg-white dark:bg-gray-900">
          <div className="professional-report-content">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </Card>

      {/* 报告尾注 */}
      <Card className="p-8 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-4">报告说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <strong>数据来源：</strong>
              <br />社区真实统计数据，每日更新
            </div>
            <div>
              <strong>报告周期：</strong>
              <br />实时更新，版本追踪
            </div>
            <div>
              <strong>联系我们：</strong>
              <br />contact@vc101.com
            </div>
          </div>
          <Separator className="my-6" />
          <p className="text-xs text-gray-500">
            © 2025 VC101 Community. All rights reserved. | 
            本报告由 VC101 社区自动生成，数据截至 {lastUpdated}
          </p>
        </div>
      </Card>
    </div>
  );
}