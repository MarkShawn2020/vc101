'use client';

import { useState } from 'react';
import { 
  Database,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  ExternalLink,
  Star,
  MessageSquare,
  Eye,
  MoreVertical,
  Brain,
  Sparkles,
  BookOpen,
  Calendar,
  Tag,
  SortAsc,
  SortDesc
} from 'lucide-react';
import PageHeader from '@/components/page-header';
import { CATEGORY_LABELS, EVALUATION_CRITERIA } from '@/types/vibe-tank';
import type { KnowledgeItem, KnowledgeCategory } from '@/types/vibe-tank';

// Mock data
const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: 'k1',
    title: 'OpenAI发布GPT-5架构论文：多模态推理能力突破',
    summary: '最新论文详细介绍了GPT-5的架构创新，包括改进的注意力机制、更高效的参数共享策略。',
    category: 'llm_theory',
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
    view_count: 1247,
    is_featured: true,
    is_archived: false,
    created_at: '2025-01-06',
    updated_at: '2025-01-06'
  },
  {
    id: 'k2',
    title: 'AutoGPT团队推出企业级Agent框架AgentOS',
    summary: '新框架提供了完整的Agent开发、部署和管理解决方案。',
    category: 'ai_agent',
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
    view_count: 892,
    is_featured: false,
    is_archived: false,
    created_at: '2025-01-06',
    updated_at: '2025-01-06'
  },
  {
    id: 'k3',
    title: 'Anthropic推出订阅制API服务，月收入突破1亿美元',
    summary: '通过灵活的订阅模式和分层定价策略，Anthropic成功将Claude API商业化。',
    category: 'business_model',
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
    view_count: 2103,
    is_featured: true,
    is_archived: false,
    created_at: '2025-01-05',
    updated_at: '2025-01-06'
  }
];

const categoryIcons = {
  llm_theory: Brain,
  ai_agent: Sparkles,
  business_model: BookOpen
};

export default function KnowledgePage() {
  const [items, setItems] = useState(mockKnowledgeItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'score' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags
  const allTags = Array.from(new Set(items.flatMap(item => item.tags || [])));

  // Filter and sort items
  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => item.tags?.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    let comparison = 0;
    
    if (sortBy === 'date') {
      comparison = new Date(b.published_at || b.created_at).getTime() - 
                  new Date(a.published_at || a.created_at).getTime();
    } else if (sortBy === 'score') {
      comparison = (b.overall_score || 0) - (a.overall_score || 0);
    } else if (sortBy === 'views') {
      comparison = b.view_count - a.view_count;
    }
    
    return sortOrder === 'desc' ? comparison : -comparison;
  });

  const toggleSort = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <PageHeader 
        title="知识库"
        description="浏览、搜索和管理所有知识条目，构建团队的认知资产"
        icon={<Database className="w-8 h-8" />}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">{items.length}</div>
          <div className="text-sm text-muted-foreground">总条目数</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">
            {items.filter(i => i.is_featured).length}
          </div>
          <div className="text-sm text-muted-foreground">精选内容</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">
            {Math.round(items.reduce((acc, i) => acc + (i.overall_score || 0), 0) / items.length)}
          </div>
          <div className="text-sm text-muted-foreground">平均评分</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">
            {items.reduce((acc, i) => acc + i.view_count, 0)}
          </div>
          <div className="text-sm text-muted-foreground">总浏览量</div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4 mb-8">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索标题或内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-card border rounded-lg"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              showFilters ? 'bg-primary text-primary-foreground' : 'bg-card border hover:bg-muted'
            }`}
          >
            <Filter className="w-4 h-4" />
            筛选
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" />
            添加条目
          </button>
          <button className="px-4 py-2 bg-card border rounded-lg flex items-center gap-2 hover:bg-muted transition-colors">
            <Upload className="w-4 h-4" />
            导入
          </button>
          <button className="px-4 py-2 bg-card border rounded-lg flex items-center gap-2 hover:bg-muted transition-colors">
            <Download className="w-4 h-4" />
            导出
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-card rounded-lg border p-4 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">分类</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    selectedCategory === 'all' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted hover:bg-muted/80'
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
                      className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1 ${
                        selectedCategory === key 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">标签</label>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                    className={`px-2 py-1 text-xs rounded-full transition-colors ${
                      selectedTags.includes(tag) 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">排序</label>
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'score' | 'views')}
                  className="px-3 py-1 bg-background border rounded-lg"
                >
                  <option value="date">发布时间</option>
                  <option value="score">评分</option>
                  <option value="views">浏览量</option>
                </select>
                <button
                  onClick={toggleSort}
                  className="p-1 hover:bg-muted rounded-lg transition-colors"
                >
                  {sortOrder === 'desc' ? (
                    <SortDesc className="w-4 h-4" />
                  ) : (
                    <SortAsc className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Knowledge Items Grid */}
      <div className="grid gap-4">
        {sortedItems.map(item => {
          const Icon = categoryIcons[item.category];
          
          return (
            <div key={item.id} className="bg-card rounded-xl border p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {CATEGORY_LABELS[item.category]}
                    </span>
                    {item.is_featured && (
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    )}
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {item.author}
                    </span>
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">
                      {item.published_at}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1">
                      {item.title}
                      {item.url && <ExternalLink className="w-3 h-3 mt-1" />}
                    </a>
                  </h3>
                  
                  {item.summary && (
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {item.summary}
                    </p>
                  )}
                  
                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-muted rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Evaluation Scores */}
                  <div className="flex gap-4 text-sm">
                    {Object.entries(EVALUATION_CRITERIA).slice(0, 3).map(([key, criteria]) => {
                      const scoreKey = `${key}_score` as keyof KnowledgeItem;
                      const score = item[scoreKey] as number;
                      
                      return (
                        <div key={key} className="flex items-center gap-1">
                          <span>{criteria.icon}</span>
                          <span className="font-medium">{score}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{item.overall_score}</div>
                    <div className="text-xs text-muted-foreground">综合评分</div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{item.view_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      <span>12</span>
                    </div>
                  </div>
                  
                  <button className="p-1 hover:bg-muted rounded transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {sortedItems.length === 0 && (
        <div className="text-center py-16">
          <Database className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">没有找到相关内容</h3>
          <p className="text-muted-foreground">
            尝试调整筛选条件或搜索关键词
          </p>
        </div>
      )}
    </div>
  );
}