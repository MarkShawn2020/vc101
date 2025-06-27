export interface UserProfile {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
  
  // 统计信息
  insightsCount: number;
  toolsCount: number;
  questsParticipated: number;
  totalContributions: number;
  
  // 社区等级
  level: number;
  levelName: string;
  totalPoints: number;
  
  // 时间戳
  joinedAt: string;
  lastActiveAt: string;
  updatedAt: string;
}

export interface UserContribution {
  id: string;
  type: 'insight' | 'tool' | 'quest' | 'comment' | 'review';
  title: string;
  slug?: string;
  description?: string;
  publishedAt: string;
  featured: boolean;
  stats?: {
    views?: number;
    downloads?: number;
    likes?: number;
    comments?: number;
  };
}

export interface UserFavorite {
  id: string;
  userId: string;
  itemType: 'insight' | 'tool' | 'resource' | 'quest';
  itemId: string;
  itemTitle: string;
  itemSlug?: string;
  itemAuthor?: string;
  addedAt: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  type: 'published_insight' | 'published_tool' | 'joined_quest' | 'liked_content' | 'commented';
  title: string;
  description: string;
  createdAt: string;
  metadata?: {
    targetId?: string;
    targetType?: string;
    targetTitle?: string;
  };
}

export interface UserStats {
  totalViews: number;
  totalDownloads: number;
  totalLikes: number;
  totalComments: number;
  weeklyViews: number;
  monthlyViews: number;
  growthRate: number;
}

export interface UserBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}