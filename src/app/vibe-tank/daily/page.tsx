'use client';

import { useState } from 'react';
import { 
  Calendar,
  Star,
  TrendingUp,
  ExternalLink,
  BookmarkPlus,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Brain,
  BookOpen
} from 'lucide-react';
import { EVALUATION_CRITERIA, CATEGORY_LABELS } from '@/types/vibe-tank';
import type { KnowledgeCategory } from '@/types/vibe-tank';

// Mock data for demonstration
const mockDailyPicks = [
  {
    id: '1',
    knowledge_item: {
      id: 'k1',
      title: 'OpenAI发布GPT-5架构论文：多模态推理能力突破',
      summary: '最新论文详细介绍了GPT-5的架构创新，包括改进的注意力机制、更高效的参数共享策略，以及在多模态理解方面的重大突破。',
      category: 'llm_theory' as KnowledgeCategory,
      author: 'OpenAI Research Team',
      published_at: '2025-01-06',
      url: 'https://example.com/gpt5-paper',
      credibility_score: 95,
      innovation_score: 98,
      practical_value_score: 85,
      inspiration_score: 92,
      long_term_impact_score: 96,
      overall_score: 93,
      tags: ['GPT-5', '多模态', '架构创新'],
      view_count: 1247
    },
    pick_reason: 'GPT-5架构的突破性创新将深刻影响整个大模型领域的发展方向',
    pick_date: '2025-01-06'
  },
  {
    id: '2',
    knowledge_item: {
      id: 'k2',
      title: 'AutoGPT团队推出企业级Agent框架AgentOS',
      summary: '新框架提供了完整的Agent开发、部署和管理解决方案，支持多Agent协作、任务编排和知识库集成。',
      category: 'ai_agent' as KnowledgeCategory,
      author: 'AutoGPT Team',
      published_at: '2025-01-06',
      url: 'https://example.com/agentos',
      credibility_score: 88,
      innovation_score: 85,
      practical_value_score: 95,
      inspiration_score: 82,
      long_term_impact_score: 88,
      overall_score: 88,
      tags: ['Agent', 'AutoGPT', '企业应用'],
      view_count: 892
    },
    pick_reason: '为企业级AI Agent应用提供了成熟的开发框架，具有很高的实践价值',
    pick_date: '2025-01-06'
  },
  {
    id: '3',
    knowledge_item: {
      id: 'k3',
      title: 'Anthropic推出订阅制API服务，月收入突破1亿美元',
      summary: '通过灵活的订阅模式和分层定价策略，Anthropic成功将Claude API商业化，为AI公司提供了新的商业模式参考。',
      category: 'business_model' as KnowledgeCategory,
      author: 'TechCrunch',
      published_at: '2025-01-05',
      url: 'https://example.com/anthropic-business',
      credibility_score: 92,
      innovation_score: 78,
      practical_value_score: 94,
      inspiration_score: 88,
      long_term_impact_score: 85,
      overall_score: 87,
      tags: ['商业模式', 'Anthropic', 'API经济'],
      view_count: 2103
    },
    pick_reason: '成功的AI商业化案例，为其他AI公司提供了可借鉴的盈利模式',
    pick_date: '2025-01-06'
  }
];

const categoryIcons = {
  llm_theory: Brain,
  ai_agent: Sparkles,
  business_model: BookOpen
};

export default function DailyPicksPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'all'>('all');

  const filteredPicks = mockDailyPicks.filter(pick => 
    selectedCategory === 'all' || pick.knowledge_item.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">每日精选</h1>
        </div>
        <p className="text-muted-foreground">
          AI自动筛选的高价值内容，帮助团队快速了解最重要的行业动态
        </p>
      </div>

      {/* Date Selector and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex items-center gap-2 bg-card rounded-lg border p-2">
          <button className="p-2 hover:bg-muted rounded">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="bg-transparent px-3 py-1 text-center focus:outline-none"
          />
          <button className="p-2 hover:bg-muted rounded">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border hover:bg-muted'
            }`}
          >
            全部
          </button>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
            const Icon = categoryIcons[key as KnowledgeCategory];
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as KnowledgeCategory)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                  selectedCategory === key 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border hover:bg-muted'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Daily Picks Grid */}
      <div className="grid gap-6">
        {filteredPicks.map((pick, index) => {
          const Icon = categoryIcons[pick.knowledge_item.category];
          
          return (
            <div key={pick.id} className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Pick Number and Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{CATEGORY_LABELS[pick.knowledge_item.category]}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-semibold">{pick.knowledge_item.overall_score}</span>
                  </div>
                </div>

                {/* Title and Summary */}
                <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
                  <a href={pick.knowledge_item.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2">
                    {pick.knowledge_item.title}
                    <ExternalLink className="w-4 h-4 mt-1 flex-shrink-0" />
                  </a>
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {pick.knowledge_item.summary}
                </p>

                {/* Pick Reason */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">精选理由</span>
                  </div>
                  <p className="text-sm">{pick.pick_reason}</p>
                </div>

                {/* Evaluation Scores */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {Object.entries(EVALUATION_CRITERIA).map(([key, criteria]) => {
                    const scoreKey = `${key}_score` as keyof typeof pick.knowledge_item;
                    const score = pick.knowledge_item[scoreKey] as number;
                    
                    return (
                      <div key={key} className="text-center">
                        <div className="text-2xl mb-1">{criteria.icon}</div>
                        <div className="text-xs text-muted-foreground mb-1">{criteria.label}</div>
                        <div className="font-semibold">{score}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Metadata and Actions */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{pick.knowledge_item.author}</span>
                    <span>{pick.knowledge_item.published_at}</span>
                    <span>{pick.knowledge_item.view_count} 次查看</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <BookmarkPlus className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tags */}
                {pick.knowledge_item.tags && pick.knowledge_item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {pick.knowledge_item.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-muted rounded-full">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredPicks.length === 0 && (
        <div className="text-center py-16">
          <Calendar className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">暂无精选内容</h3>
          <p className="text-muted-foreground">
            该日期暂无精选内容，请查看其他日期或等待AI更新
          </p>
        </div>
      )}

      {/* Stats Summary */}
      <div className="mt-12 p-6 bg-card rounded-xl border">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          今日概览
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-primary">{filteredPicks.length}</div>
            <div className="text-sm text-muted-foreground">精选内容</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(filteredPicks.reduce((acc, p) => acc + (p.knowledge_item.overall_score || 0), 0) / filteredPicks.length) || 0}
            </div>
            <div className="text-sm text-muted-foreground">平均评分</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {filteredPicks.reduce((acc, p) => acc + p.knowledge_item.view_count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">总浏览量</div>
          </div>
        </div>
      </div>
    </div>
  );
}