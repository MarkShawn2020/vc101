export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  resourceCount: number;
}

export interface Resource {
  id: string;
  title: string;
  slug: string;
  description: string;
  url: string;
  type: 'documentation' | 'tutorial' | 'course' | 'book' | 'paper' | 'tool' | 'library' | 'template' | 'video' | 'podcast';
  
  // 分类信息
  category: ResourceCategory;
  tags: string[];
  
  // 内容信息
  language: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedTime?: string; // 阅读/学习时间
  
  // 作者信息
  author?: string;
  authorUrl?: string;
  source: string; // 来源网站/平台
  
  // 评价和统计
  rating: number;
  reviewCount: number;
  viewCount: number;
  bookmarkCount: number;
  
  // 质量指标
  featured: boolean;
  verified: boolean; // 由社区验证的高质量资源
  official: boolean; // 官方资源
  free: boolean;
  
  // 时间信息
  publishedAt?: string;
  lastUpdated?: string;
  addedAt: string;
  
  // 提交信息
  submittedBy: {
    userId: string;
    userName: string;
    userAvatar: string;
  };
  
  // 状态
  status: 'pending' | 'approved' | 'rejected' | 'archived';
  
  // 额外元数据
  metadata?: {
    prerequisites?: string[];
    learningOutcomes?: string[];
    relatedResources?: string[];
    screenshots?: string[];
  };
}

export interface ResourceCollection {
  id: string;
  name: string;
  slug: string;
  description: string;
  coverImage?: string;
  
  // 收集信息
  resources: Resource[];
  resourceCount: number;
  
  // 创建者信息
  createdBy: {
    userId: string;
    userName: string;
    userAvatar: string;
  };
  
  // 统计信息
  viewCount: number;
  bookmarkCount: number;
  
  // 状态
  featured: boolean;
  public: boolean;
  
  // 时间戳
  createdAt: string;
  updatedAt: string;
}

export interface ResourceReview {
  id: string;
  resourceId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  helpful: number;
  createdAt: string;
}

export interface ResourceBookmark {
  id: string;
  userId: string;
  resourceId: string;
  collectionId?: string;
  addedAt: string;
  notes?: string;
}

export interface ResourceSubmission {
  id: string;
  title: string;
  description: string;
  url: string;
  type: Resource['type'];
  categoryId: string;
  tags: string[];
  
  // 提交者信息
  submittedBy: {
    userId: string;
    userName: string;
    userAvatar: string;
    email: string;
  };
  
  // 审核信息
  status: 'pending' | 'approved' | 'rejected';
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNotes?: string;
  
  // 时间戳
  submittedAt: string;
}