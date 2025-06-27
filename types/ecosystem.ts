export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  website: string;
  description: string;
  longDescription?: string;
  
  // 分类信息
  category: 'ai-model' | 'cloud-platform' | 'developer-tools' | 'infrastructure' | 'startup' | 'enterprise';
  subcategory?: string;
  
  // 基本信息
  founded: string;
  location: string;
  size: 'startup' | 'medium' | 'large' | 'giant';
  stage: 'seed' | 'series-a' | 'series-b' | 'series-c' | 'ipo' | 'public' | 'acquired';
  
  // 产品和服务
  products: Product[];
  primaryFocus: string[];
  technologies: string[];
  
  // 社交链接
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    blog?: string;
  };
  
  // 评价和指标
  rating: number;
  reviewCount: number;
  
  // 状态
  featured: boolean;
  verified: boolean;
  partnerLevel?: 'platinum' | 'gold' | 'silver' | 'bronze';
  
  // 时间戳
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  companyId: string;
  companyName: string;
  
  // 基本信息
  type: 'api' | 'platform' | 'tool' | 'service' | 'library' | 'framework';
  description: string;
  tagline: string;
  logo?: string;
  
  // 技术信息
  category: string;
  subcategory?: string;
  technologies: string[];
  pricing: 'free' | 'freemium' | 'paid' | 'enterprise' | 'custom';
  
  // API 相关（如果适用）
  apiType?: 'rest' | 'graphql' | 'websocket' | 'sdk';
  authentication?: 'api-key' | 'oauth' | 'bearer-token' | 'custom';
  rateLimit?: string;
  
  // 链接和文档
  website?: string;
  documentation?: string;
  apiDocs?: string;
  playground?: string;
  github?: string;
  
  // 特性和能力
  features: string[];
  capabilities: string[];
  useCases: string[];
  
  // 评价和统计
  rating: number;
  reviewCount: number;
  popularityScore: number;
  
  // 状态
  status: 'active' | 'beta' | 'deprecated' | 'discontinued';
  lastUpdated: string;
  
  // 集成信息
  integrations?: string[];
  sdks?: {
    language: string;
    link: string;
  }[];
  
  // 定价信息
  pricingDetails?: {
    tier: string;
    price: string;
    features: string[];
  }[];
}

export interface EcosystemCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  companyCount: number;
  productCount: number;
}

export interface CompanyReview {
  id: string;
  companyId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  createdAt: string;
  helpful: number;
}

export interface ProductComparison {
  id: string;
  name: string;
  products: Product[];
  criteria: {
    name: string;
    weight: number;
    scores: { [productId: string]: number };
  }[];
  createdAt: string;
  updatedAt: string;
}