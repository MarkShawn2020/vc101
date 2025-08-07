'use client';

import { useState } from 'react';
import { 
  MessageSquare,
  Users,
  ThumbsUp,
  Reply,
  TrendingUp,
  Flame,
  Clock,
  Filter,
  User,
  BarChart3,
  ArrowUpDown,
  Pin
} from 'lucide-react';
import PageHeader from '@/components/page-header';
import { EVALUATION_CRITERIA, CATEGORY_LABELS } from '@/types/vibe-tank';
import type { KnowledgeCategory } from '@/types/vibe-tank';

// Mock data for demonstration
const mockDiscussions = [
  {
    id: 'd1',
    knowledge_item: {
      id: 'k1',
      title: 'OpenAI发布GPT-5架构论文：多模态推理能力突破',
      category: 'llm_theory' as KnowledgeCategory,
      overall_score: 93
    },
    perspectives: [
      {
        user: { name: '张研究员', avatar: '👨‍🔬', role: '理论研究' },
        evaluation: {
          credibility_score: 95,
          innovation_score: 98,
          practical_value_score: 75,
          inspiration_score: 92,
          long_term_impact_score: 96
        },
        comment: '这是大模型架构的重大突破！多模态融合的新方法解决了长期存在的对齐问题。',
        perspective: '理论创新视角',
        likes: 12,
        created_at: '2小时前'
      },
      {
        user: { name: '李工程师', avatar: '👨‍💻', role: '产品实践' },
        evaluation: {
          credibility_score: 90,
          innovation_score: 85,
          practical_value_score: 60,
          inspiration_score: 80,
          long_term_impact_score: 88
        },
        comment: '创新确实令人印象深刻，但实际部署成本可能过高，短期内难以在产品中应用。',
        perspective: '工程实践视角',
        likes: 8,
        created_at: '1小时前'
      },
      {
        user: { name: '王产品', avatar: '👩‍💼', role: '商业分析' },
        evaluation: {
          credibility_score: 92,
          innovation_score: 90,
          practical_value_score: 95,
          inspiration_score: 88,
          long_term_impact_score: 94
        },
        comment: '虽然短期部署成本高，但这将成为未来AI产品的核心竞争力，值得提前布局。',
        perspective: '商业价值视角',
        likes: 15,
        created_at: '30分钟前'
      }
    ],
    discussion_count: 23,
    is_hot: true,
    is_pinned: true
  },
  {
    id: 'd2',
    knowledge_item: {
      id: 'k2',
      title: 'AutoGPT团队推出企业级Agent框架AgentOS',
      category: 'ai_agent' as KnowledgeCategory,
      overall_score: 88
    },
    perspectives: [
      {
        user: { name: '陈架构师', avatar: '🏗️', role: '系统架构' },
        evaluation: {
          credibility_score: 88,
          innovation_score: 75,
          practical_value_score: 95,
          inspiration_score: 82,
          long_term_impact_score: 85
        },
        comment: '终于有了production-ready的Agent框架！文档完善，易于集成。',
        perspective: '架构设计视角',
        likes: 20,
        created_at: '3小时前'
      },
      {
        user: { name: '赵分析师', avatar: '📊', role: '市场分析' },
        evaluation: {
          credibility_score: 85,
          innovation_score: 70,
          practical_value_score: 90,
          inspiration_score: 78,
          long_term_impact_score: 80
        },
        comment: '市场需要这样的框架，但竞争对手如LangChain已经占据先机。',
        perspective: '市场竞争视角',
        likes: 6,
        created_at: '2小时前'
      }
    ],
    discussion_count: 18,
    is_hot: true,
    is_pinned: false
  }
];

// Calculate perspective divergence
const calculateDivergence = (perspectives: any[]) => {
  if (perspectives.length < 2) return 0;
  
  const scores = perspectives.map(p => p.evaluation);
  const dimensions = ['credibility_score', 'innovation_score', 'practical_value_score', 'inspiration_score', 'long_term_impact_score'];
  
  let totalDivergence = 0;
  dimensions.forEach(dim => {
    const values = scores.map(s => s[dim]);
    const max = Math.max(...values);
    const min = Math.min(...values);
    totalDivergence += (max - min);
  });
  
  return Math.round(totalDivergence / dimensions.length);
};

export default function DiscussionsPage() {
  const [sortBy, setSortBy] = useState<'hot' | 'recent' | 'divergence'>('hot');
  const [filterCategory, setFilterCategory] = useState<KnowledgeCategory | 'all'>('all');

  const sortedDiscussions = [...mockDiscussions].sort((a, b) => {
    if (sortBy === 'hot') {
      return b.discussion_count - a.discussion_count;
    } else if (sortBy === 'divergence') {
      return calculateDivergence(b.perspectives) - calculateDivergence(a.perspectives);
    }
    return 0; // recent - already sorted by time
  });

  const filteredDiscussions = sortedDiscussions.filter(d => 
    filterCategory === 'all' || d.knowledge_item.category === filterCategory
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <PageHeader 
        title="观点碰撞区"
        description="团队成员从不同视角评估内容，促进多元观点的交流与碰撞"
        icon={<MessageSquare className="w-8 h-8" />}
      />

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex gap-2 flex-1">
          <button
            onClick={() => setSortBy('hot')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              sortBy === 'hot' ? 'bg-primary text-primary-foreground' : 'bg-card border hover:bg-muted'
            }`}
          >
            <Flame className="w-4 h-4" />
            热门讨论
          </button>
          <button
            onClick={() => setSortBy('divergence')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              sortBy === 'divergence' ? 'bg-primary text-primary-foreground' : 'bg-card border hover:bg-muted'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            观点分歧
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              sortBy === 'recent' ? 'bg-primary text-primary-foreground' : 'bg-card border hover:bg-muted'
            }`}
          >
            <Clock className="w-4 h-4" />
            最新评价
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              filterCategory === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card border hover:bg-muted'
            }`}
          >
            全部领域
          </button>
          {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilterCategory(key as KnowledgeCategory)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                filterCategory === key 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card border hover:bg-muted'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-6">
        {filteredDiscussions.map(discussion => {
          const divergence = calculateDivergence(discussion.perspectives);
          
          return (
            <div key={discussion.id} className="bg-card rounded-xl border overflow-hidden">
              {/* Discussion Header */}
              <div className="p-6 border-b">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {discussion.is_pinned && (
                        <Pin className="w-4 h-4 text-primary" />
                      )}
                      {discussion.is_hot && (
                        <span className="px-2 py-1 text-xs bg-red-500/10 text-red-500 rounded-full flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          热门
                        </span>
                      )}
                      <span className="px-2 py-1 text-xs bg-muted rounded-full">
                        {CATEGORY_LABELS[discussion.knowledge_item.category]}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {discussion.knowledge_item.title}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {discussion.knowledge_item.overall_score}
                    </div>
                    <div className="text-xs text-muted-foreground">综合评分</div>
                  </div>
                </div>

                {/* Stats Bar */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{discussion.perspectives.length} 个视角</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span>{discussion.discussion_count} 条讨论</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span>分歧度: {divergence}%</span>
                  </div>
                </div>
              </div>

              {/* Perspectives */}
              <div className="divide-y">
                {discussion.perspectives.map((perspective, idx) => (
                  <div key={idx} className="p-6 hover:bg-muted/30 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* User Avatar */}
                      <div className="text-3xl">{perspective.user.avatar}</div>
                      
                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{perspective.user.name}</span>
                          <span className="text-xs text-muted-foreground">{perspective.user.role}</span>
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                            {perspective.perspective}
                          </span>
                          <span className="text-xs text-muted-foreground ml-auto">
                            {perspective.created_at}
                          </span>
                        </div>
                        
                        <p className="mb-3">{perspective.comment}</p>
                        
                        {/* Evaluation Scores */}
                        <div className="flex gap-4 mb-3">
                          {Object.entries(EVALUATION_CRITERIA).map(([key, criteria]) => {
                            const scoreKey = `${key}_score`;
                            const score = perspective.evaluation[scoreKey];
                            
                            return (
                              <div key={key} className="flex items-center gap-1">
                                <span className="text-sm">{criteria.icon}</span>
                                <span className="text-sm font-medium">{score}</span>
                              </div>
                            );
                          })}
                        </div>
                        
                        {/* Actions */}
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{perspective.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
                            <Reply className="w-4 h-4" />
                            <span>回复</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View More */}
              <div className="p-4 bg-muted/30 text-center">
                <button className="text-sm text-primary hover:underline">
                  查看全部 {discussion.discussion_count} 条讨论 →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Divergence Analysis */}
      <div className="mt-12 p-6 bg-card rounded-xl border">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          观点分析
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-2xl font-bold text-primary">
              {Math.round(filteredDiscussions.reduce((acc, d) => 
                acc + calculateDivergence(d.perspectives), 0
              ) / filteredDiscussions.length) || 0}%
            </div>
            <div className="text-sm text-muted-foreground">平均分歧度</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {filteredDiscussions.reduce((acc, d) => 
                acc + d.perspectives.length, 0
              )}
            </div>
            <div className="text-sm text-muted-foreground">总评价数</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">
              {filteredDiscussions.filter(d => d.is_hot).length}
            </div>
            <div className="text-sm text-muted-foreground">热门话题</div>
          </div>
        </div>
      </div>
    </div>
  );
}