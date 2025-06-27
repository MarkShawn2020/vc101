import fs from 'fs';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

export interface ProgressData {
  content: string;
  lastUpdated: string;
  stats: {
    users: number;
    articles: number;
    tools: number;
    hackathons: number;
  };
}

export async function getProgressData(): Promise<ProgressData> {
  const progressPath = path.join(process.cwd(), 'src/data/progress.md');
  const fileContents = fs.readFileSync(progressPath, 'utf8');
  
  // 解析markdown为HTML
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html)
    .process(fileContents);
  
  const contentHtml = processedContent.toString();
  
  // 提取更新时间
  const lastUpdatedMatch = fileContents.match(/最后更新：(.+)/);
  const lastUpdated = lastUpdatedMatch ? lastUpdatedMatch[1] : new Date().toLocaleDateString('zh-CN');
  
  // 提取统计数据
  const stats = {
    users: extractNumber(fileContents, /注册用户数[^:]*:\s*([0-9,]+)/),
    articles: extractNumber(fileContents, /技术文章[^:]*:\s*([0-9,]+)/),
    tools: extractNumber(fileContents, /开源工具[^:]*:\s*([0-9,]+)/),
    hackathons: extractNumber(fileContents, /举办次数[^:]*:\s*([0-9,]+)/),
  };
  
  return {
    content: contentHtml,
    lastUpdated,
    stats,
  };
}

function extractNumber(content: string, regex: RegExp): number {
  const match = content.match(regex);
  if (match && match[1]) {
    return parseInt(match[1].replace(/,/g, ''), 10);
  }
  return 0;
}