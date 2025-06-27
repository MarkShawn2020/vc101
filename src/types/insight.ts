export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio?: string;
  github?: string;
  twitter?: string;
  website?: string;
}

export interface InsightTag {
  id: string;
  name: string;
  color: string;
  slug: string;
}

export interface Insight {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: Author;
  tags: InsightTag[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featured: boolean;
  status: 'draft' | 'published';
}

export interface InsightListResponse {
  insights: Insight[];
  total: number;
  page: number;
  totalPages: number;
}