"use client";

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Download, FileText, Calendar, TrendingUp, Users, Trophy, Clock, Loader2 } from 'lucide-react';
import { getVersionedFilename } from '@/lib/version';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  const handleDownload = async (format: 'html' | 'pdf') => {
    setDownloading(true);
    try {
      const filename = getVersionedFilename('VC101_Progress_Report', format);
      
      if (format === 'pdf') {
        await generatePDF(filename);
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

  const generatePDF = async (filename: string) => {
    if (!reportRef.current) return;

    // 创建用于PDF的特殊容器
    const pdfContainer = document.createElement('div');
    pdfContainer.style.position = 'absolute';
    pdfContainer.style.top = '-9999px';
    pdfContainer.style.left = '-9999px';
    pdfContainer.style.width = '210mm'; // A4宽度
    pdfContainer.style.backgroundColor = 'white';
    pdfContainer.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif';
    pdfContainer.style.fontSize = '14px';
    pdfContainer.style.lineHeight = '1.6';
    pdfContainer.style.color = '#333333';
    
    pdfContainer.innerHTML = `
      <div style="padding: 40px;">
        <!-- PDF Header -->
        <div style="text-align: center; margin-bottom: 40px; padding: 40px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px;">
          <h1 style="font-size: 42px; font-weight: 700; margin-bottom: 16px; letter-spacing: -0.02em;">VC101 社区进展报告</h1>
          <p style="font-size: 18px; opacity: 0.9; margin-bottom: 24px;">全球领先的 Human-AI 协同编程社区发展报告</p>
          <div style="display: flex; justify-content: center; gap: 32px; flex-wrap: wrap;">
            <div style="background: rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 8px;">
              📅 更新时间：${lastUpdated}
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 8px;">
              📊 版本：v${require('../../package.json').version}
            </div>
            <div style="background: rgba(255, 255, 255, 0.1); padding: 8px 16px; border-radius: 8px;">
              🌐 VC101.com
            </div>
          </div>
        </div>

        <!-- Stats Grid -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; margin: 40px 0;">
          <div style="text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
            <div style="font-size: 48px; font-weight: 700; margin-bottom: 8px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${stats.users.toLocaleString()}</div>
            <div style="color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; font-size: 14px;">注册用户</div>
          </div>
          <div style="text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
            <div style="font-size: 48px; font-weight: 700; margin-bottom: 8px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${stats.articles}</div>
            <div style="color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; font-size: 14px;">技术文章</div>
          </div>
          <div style="text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
            <div style="font-size: 48px; font-weight: 700; margin-bottom: 8px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${stats.tools}</div>
            <div style="color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; font-size: 14px;">开源工具</div>
          </div>
          <div style="text-align: center; padding: 32px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0;">
            <div style="font-size: 48px; font-weight: 700; margin-bottom: 8px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${stats.hackathons}</div>
            <div style="color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em; font-size: 14px;">黑客松</div>
          </div>
        </div>

        <!-- Content -->
        <div style="background: white; padding: 48px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #e2e8f0; margin: 40px 0;">
          <div style="
            max-width: none;
            line-height: 1.7;
          ">
            ${content.replace(/class="[^"]*"/g, '').replace(/<img[^>]*>/g, '')}
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 60px; padding: 40px; background: white; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
          <p style="font-weight: 700; font-size: 18px; margin-bottom: 8px;">VC101 - Code with the Vibe, Build with the Future</p>
          <p style="margin-bottom: 8px;">© 2025 VC101 Community. All rights reserved.</p>
          <p style="color: #64748b;">🌐 vc101.com | 📧 contact@vc101.com</p>
        </div>
      </div>
    `;

    document.body.appendChild(pdfContainer);

    try {
      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 794, // A4 width in pixels at 96 DPI
        windowWidth: 794,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // 添加第一页
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // 如果内容超过一页，添加更多页面
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(filename);
    } finally {
      document.body.removeChild(pdfContainer);
    }
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
              下载完整的社区进展报告，支持PDF和HTML格式
            </p>
          </div>
          <div className="flex gap-3">
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
              onClick={() => handleDownload('html')}
              disabled={downloading}
              variant="outline"
              className="gap-2"
            >
              <FileText className="h-4 w-4" />
              下载 HTML
            </Button>
          </div>
        </div>
      </Card>

      <Separator className="my-8" />

      {/* 专业级报告内容 */}
      <Card className="overflow-hidden">
        <div ref={reportRef} className="p-12 bg-white dark:bg-gray-900">
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-gray-900 dark:prose-headings:text-white
              prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8 prose-h1:pb-4 prose-h1:border-b-2 prose-h1:border-blue-200
              prose-h2:text-2xl prose-h2:font-semibold prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-gray-800 dark:prose-h2:text-gray-200
              prose-h3:text-xl prose-h3:font-medium prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7 prose-p:mb-4
              prose-ul:my-6 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:text-red-600 dark:prose-code:text-red-400
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-6 prose-pre:rounded-lg prose-pre:overflow-x-auto
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 dark:prose-strong:text-white
              prose-table:border-collapse prose-table:w-full
              prose-th:border prose-th:border-gray-300 prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:p-3 prose-th:text-left
              prose-td:border prose-td:border-gray-300 prose-td:p-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
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