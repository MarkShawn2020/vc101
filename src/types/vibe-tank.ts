// Vibe Tank (Vibe智库) Type Definitions

export type KnowledgeCategory = 'llm_theory' | 'ai_agent' | 'business_model';
export type SourceType = 'rss' | 'api' | 'manual' | 'social' | 'academic';
export type RelationType = 'references' | 'extends' | 'contradicts' | 'implements' | 'inspired_by';
export type InteractionType = 'view' | 'bookmark' | 'share' | 'cite';

export interface KnowledgeSource {
  id: string;
  name: string;
  url?: string;
  type: SourceType;
  category?: KnowledgeCategory;
  is_active: boolean;
  last_fetched_at?: string;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  content?: string;
  summary?: string;
  url?: string;
  source_id?: string;
  source?: KnowledgeSource;
  category: KnowledgeCategory;
  tags?: string[];
  author?: string;
  published_at?: string;
  
  // AI evaluation scores (0-100)
  credibility_score?: number;
  innovation_score?: number;
  practical_value_score?: number;
  inspiration_score?: number;
  long_term_impact_score?: number;
  overall_score?: number;
  
  // Metadata
  view_count: number;
  is_featured: boolean;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  
  // Relations
  evaluations?: KnowledgeEvaluation[];
  discussions?: KnowledgeDiscussion[];
  relations?: KnowledgeRelation[];
}

export interface UserPerspective {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  
  // Weight for each evaluation dimension (0-100)
  credibility_weight: number;
  innovation_weight: number;
  practical_value_weight: number;
  inspiration_weight: number;
  long_term_impact_weight: number;
  
  // Focus areas
  preferred_categories?: KnowledgeCategory[];
  preferred_tags?: string[];
  
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeEvaluation {
  id: string;
  knowledge_item_id: string;
  user_id: string;
  perspective_id?: string;
  perspective?: UserPerspective;
  
  // User's evaluation scores (0-100)
  credibility_score?: number;
  innovation_score?: number;
  practical_value_score?: number;
  inspiration_score?: number;
  long_term_impact_score?: number;
  
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeDiscussion {
  id: string;
  knowledge_item_id: string;
  parent_id?: string;
  user_id: string;
  content: string;
  
  // Nested replies
  replies?: KnowledgeDiscussion[];
  
  // Metadata
  likes_count: number;
  is_pinned: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  
  // User info (joined from auth)
  user?: {
    id: string;
    email?: string;
    user_metadata?: {
      full_name?: string;
      avatar_url?: string;
    };
  };
}

export interface KnowledgeRelation {
  id: string;
  source_item_id: string;
  target_item_id: string;
  source_item?: KnowledgeItem;
  target_item?: KnowledgeItem;
  relation_type: RelationType;
  strength: number; // 0-100
  notes?: string;
  created_by?: string;
  created_at: string;
}

export interface DailyPick {
  id: string;
  knowledge_item_id: string;
  knowledge_item?: KnowledgeItem;
  pick_date: string;
  pick_reason?: string;
  curator_id?: string;
  created_at: string;
}

export interface KnowledgeInteraction {
  id: string;
  knowledge_item_id: string;
  user_id: string;
  interaction_type: InteractionType;
  created_at: string;
}

// View models for UI
export interface KnowledgeCardView {
  item: KnowledgeItem;
  userEvaluation?: KnowledgeEvaluation;
  discussionCount: number;
  bookmarked: boolean;
}

export interface DailyPicksView {
  date: string;
  picks: DailyPick[];
  totalItems: number;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  category: KnowledgeCategory;
  score: number;
  x?: number;
  y?: number;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  type: RelationType;
  strength: number;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeGraphNode[];
  edges: KnowledgeGraphEdge[];
}

// Filter and search params
export interface KnowledgeFilters {
  category?: KnowledgeCategory;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  minScore?: number;
  onlyFeatured?: boolean;
  searchQuery?: string;
}

export interface EvaluationCriteria {
  credibility: {
    label: string;
    description: string;
    icon: string;
  };
  innovation: {
    label: string;
    description: string;
    icon: string;
  };
  practical_value: {
    label: string;
    description: string;
    icon: string;
  };
  inspiration: {
    label: string;
    description: string;
    icon: string;
  };
  long_term_impact: {
    label: string;
    description: string;
    icon: string;
  };
}

// Constants
export const EVALUATION_CRITERIA: EvaluationCriteria = {
  credibility: {
    label: '可信度',
    description: '内容来源明确、可靠',
    icon: '🔍'
  },
  innovation: {
    label: '创新性',
    description: '提出新颖的理论或方法',
    icon: '💡'
  },
  practical_value: {
    label: '实践价值',
    description: '有真实案例或可实践的操作指南',
    icon: '⚡'
  },
  inspiration: {
    label: '启发性',
    description: '能够启发团队成员产生新想法或行动',
    icon: '🌟'
  },
  long_term_impact: {
    label: '长期影响',
    description: '在未来可能影响领域的演进',
    icon: '🚀'
  }
};

export const CATEGORY_LABELS: Record<KnowledgeCategory, string> = {
  llm_theory: '大模型理论',
  ai_agent: 'AI Agent产品',
  business_model: '商业模式'
};

export const RELATION_TYPE_LABELS: Record<RelationType, string> = {
  references: '引用',
  extends: '扩展',
  contradicts: '矛盾',
  implements: '实现',
  inspired_by: '灵感来源'
};