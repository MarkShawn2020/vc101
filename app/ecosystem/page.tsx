import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Link from "next/link";
import { 
  Search, ExternalLink, Star, Users, Calendar,
  Building, Cpu, Cloud, Code, Zap, Globe,
  TrendingUp, Award, Verified, ArrowRight
} from "lucide-react";

// 模拟分类数据
const ecosystemCategories = [
  {
    id: "ai-model",
    name: "AI 模型公司",
    slug: "ai-model",
    description: "专注于大语言模型和AI核心技术的公司",
    icon: "🤖",
    companyCount: 8,
    productCount: 15
  },
  {
    id: "cloud-platform",
    name: "云平台服务",
    slug: "cloud-platform", 
    description: "提供云计算和AI基础设施的平台",
    icon: "☁️",
    companyCount: 6,
    productCount: 12
  },
  {
    id: "developer-tools",
    name: "开发者工具",
    slug: "developer-tools",
    description: "专注于开发者工具和编程辅助的公司", 
    icon: "🔧",
    companyCount: 12,
    productCount: 25
  },
  {
    id: "infrastructure",
    name: "基础设施",
    slug: "infrastructure",
    description: "提供AI训练和部署基础设施的公司",
    icon: "🏗️",
    companyCount: 5,
    productCount: 8
  }
];

// 模拟公司数据
const mockCompanies = [
  {
    id: "openai",
    name: "OpenAI",
    slug: "openai",
    logo: "🤖",
    website: "https://openai.com",
    description: "领先的人工智能研究公司，开发了 GPT 系列和 ChatGPT",
    category: "ai-model" as const,
    founded: "2015",
    location: "San Francisco, CA",
    size: "large" as const,
    stage: "private" as const,
    primaryFocus: ["大语言模型", "对话AI", "AI安全"],
    rating: 4.8,
    reviewCount: 156,
    featured: true,
    verified: true,
    partnerLevel: "platinum" as const,
    products: [
      { name: "GPT-4", type: "api" as const, pricing: "paid" as const },
      { name: "ChatGPT", type: "platform" as const, pricing: "freemium" as const },
      { name: "DALL-E", type: "api" as const, pricing: "paid" as const }
    ]
  },
  {
    id: "anthropic",
    name: "Anthropic",
    slug: "anthropic",
    logo: "🧠",
    website: "https://anthropic.com",
    description: "AI 安全研究公司，开发了 Claude 系列模型",
    category: "ai-model" as const,
    founded: "2021",
    location: "San Francisco, CA", 
    size: "medium" as const,
    stage: "series-c" as const,
    primaryFocus: ["AI安全", "可解释AI", "人类反馈学习"],
    rating: 4.9,
    reviewCount: 89,
    featured: true,
    verified: true,
    partnerLevel: "platinum" as const,
    products: [
      { name: "Claude", type: "api" as const, pricing: "paid" as const },
      { name: "Claude.ai", type: "platform" as const, pricing: "freemium" as const }
    ]
  },
  {
    id: "google-ai",
    name: "Google AI",
    slug: "google-ai",
    logo: "🔍",
    website: "https://ai.google",
    description: "Google 的人工智能研究部门，开发 Gemini 和 Bard",
    category: "ai-model" as const,
    founded: "2017",
    location: "Mountain View, CA",
    size: "giant" as const,
    stage: "public" as const,
    primaryFocus: ["多模态AI", "搜索集成", "企业AI"],
    rating: 4.6,
    reviewCount: 234,
    featured: true,
    verified: true,
    partnerLevel: "gold" as const,
    products: [
      { name: "Gemini", type: "api" as const, pricing: "freemium" as const },
      { name: "Bard", type: "platform" as const, pricing: "free" as const },
      { name: "Vertex AI", type: "platform" as const, pricing: "paid" as const }
    ]
  },
  {
    id: "github",
    name: "GitHub",
    slug: "github", 
    logo: "💻",
    website: "https://github.com",
    description: "全球最大的代码托管平台，开发了 Copilot AI 编程助手",
    category: "developer-tools" as const,
    founded: "2008",
    location: "San Francisco, CA",
    size: "large" as const,
    stage: "acquired" as const,
    primaryFocus: ["代码托管", "AI编程", "开发者协作"],
    rating: 4.7,
    reviewCount: 312,
    featured: true,
    verified: true,
    partnerLevel: "gold" as const,
    products: [
      { name: "GitHub Copilot", type: "tool" as const, pricing: "paid" as const },
      { name: "GitHub Actions", type: "platform" as const, pricing: "freemium" as const },
      { name: "GitHub API", type: "api" as const, pricing: "freemium" as const }
    ]
  },
  {
    id: "vercel",
    name: "Vercel",
    slug: "vercel",
    logo: "▲",
    website: "https://vercel.com",
    description: "现代 Web 开发平台，专注于前端部署和边缘计算",
    category: "cloud-platform" as const,
    founded: "2015",
    location: "San Francisco, CA",
    size: "medium" as const,
    stage: "series-c" as const,
    primaryFocus: ["前端部署", "边缘计算", "开发者体验"],
    rating: 4.5,
    reviewCount: 178,
    featured: false,
    verified: true,
    partnerLevel: "silver" as const,
    products: [
      { name: "Vercel Platform", type: "platform" as const, pricing: "freemium" as const },
      { name: "Edge Functions", type: "service" as const, pricing: "paid" as const },
      { name: "Vercel AI SDK", type: "library" as const, pricing: "free" as const }
    ]
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    slug: "huggingface",
    logo: "🤗",
    website: "https://huggingface.co",
    description: "开源AI社区平台，提供模型托管和训练服务",
    category: "ai-model" as const,
    founded: "2016", 
    location: "New York, NY",
    size: "medium" as const,
    stage: "series-c" as const,
    primaryFocus: ["开源AI", "模型中心", "社区协作"],
    rating: 4.8,
    reviewCount: 145,
    featured: true,
    verified: true,
    partnerLevel: "gold" as const,
    products: [
      { name: "Model Hub", type: "platform" as const, pricing: "freemium" as const },
      { name: "Transformers", type: "library" as const, pricing: "free" as const },
      { name: "Inference API", type: "api" as const, pricing: "paid" as const }
    ]
  }
];

// 模拟产品数据
const mockProducts = [
  {
    id: "gpt-4",
    name: "GPT-4",
    companyName: "OpenAI",
    type: "api" as const,
    description: "最先进的大语言模型，支持文本和图像理解",
    category: "Language Model",
    pricing: "paid" as const,
    rating: 4.8,
    reviewCount: 892,
    status: "active" as const,
    features: ["多模态理解", "128K上下文", "高质量生成", "函数调用"],
    website: "https://openai.com/gpt-4"
  },
  {
    id: "claude-3",
    name: "Claude 3",
    companyName: "Anthropic", 
    type: "api" as const,
    description: "安全可靠的AI助手，擅长复杂推理和长文档处理",
    category: "Language Model",
    pricing: "paid" as const,
    rating: 4.9,
    reviewCount: 567,
    status: "active" as const,
    features: ["200K上下文", "安全对齐", "代码理解", "文档分析"],
    website: "https://anthropic.com/claude"
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    companyName: "Google AI",
    type: "api" as const,
    description: "Google 的多模态AI模型，集成搜索和推理能力",
    category: "Language Model", 
    pricing: "freemium" as const,
    rating: 4.6,
    reviewCount: 423,
    status: "active" as const,
    features: ["多模态", "搜索集成", "实时信息", "快速响应"],
    website: "https://ai.google.dev/gemini-api"
  },
  {
    id: "github-copilot",
    name: "GitHub Copilot",
    companyName: "GitHub",
    type: "tool" as const,
    description: "AI 驱动的代码补全和编程助手",
    category: "Code Assistant",
    pricing: "paid" as const,
    rating: 4.7,
    reviewCount: 1234,
    status: "active" as const,
    features: ["代码补全", "多语言支持", "IDE集成", "聊天助手"],
    website: "https://github.com/copilot"
  }
];

export default function EcosystemPage() {
  const featuredCompanies = mockCompanies.filter(company => company.featured);
  const featuredProducts = mockProducts.slice(0, 4);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      {/* 页面标题 */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">🌐 生态伙伴</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          探索 AI 编程生态系统，发现推动技术创新的公司和产品
        </p>
      </div>

      {/* 生态系统统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">31</div>
          <div className="text-sm text-gray-500">合作公司</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">60</div>
          <div className="text-sm text-gray-500">产品/API</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">4</div>
          <div className="text-sm text-gray-500">主要分类</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">98%</div>
          <div className="text-sm text-gray-500">可用性</div>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索公司或产品..."
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="all">所有分类</option>
            {ecosystemCategories.map(category => (
              <option key={category.id} value={category.slug}>{category.name}</option>
            ))}
          </select>
          <select className="px-3 py-2 border rounded-md bg-background">
            <option value="all">所有规模</option>
            <option value="startup">初创公司</option>
            <option value="medium">中型公司</option>
            <option value="large">大型公司</option>
            <option value="giant">科技巨头</option>
          </select>
        </div>
      </div>

      {/* 分类浏览 */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">📂 按分类浏览</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {ecosystemCategories.map(category => (
            <Card key={category.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="text-3xl mb-3">{category.icon}</div>
              <h3 className="font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {category.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{category.companyCount} 公司</span>
                <span>{category.productCount} 产品</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 主要内容标签页 */}
      <Tabs defaultValue="companies" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="companies">重点公司</TabsTrigger>
          <TabsTrigger value="products">热门产品</TabsTrigger>
        </TabsList>

        <TabsContent value="companies" className="space-y-8">
          {/* 精选合作伙伴 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">⭐ 精选合作伙伴</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCompanies.map(company => (
                <Card key={company.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{company.logo}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{company.name}</h3>
                            {company.verified && (
                              <Verified className="h-4 w-4 text-blue-500" />
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {company.location} • {company.founded}
                          </div>
                        </div>
                      </div>
                      {company.partnerLevel && (
                        <Badge variant="outline" className="text-xs">
                          {company.partnerLevel}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                      {company.description}
                    </p>
                    
                    {/* 主要关注领域 */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {company.primaryFocus.slice(0, 3).map(focus => (
                        <Badge key={focus} variant="secondary" className="text-xs">
                          {focus}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* 产品数量和评分 */}
                    <div className="flex items-center justify-between text-sm mb-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500" />
                          <span>{company.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Building className="h-4 w-4" />
                          <span>{company.products.length} 产品</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 操作按钮 */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        查看详情
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 所有公司 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">🏢 所有公司</h2>
            <div className="space-y-4">
              {mockCompanies.filter(c => !c.featured).map(company => (
                <Card key={company.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{company.logo}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{company.name}</h3>
                          {company.verified && (
                            <Verified className="h-4 w-4 text-blue-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {company.category.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {company.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{company.location}</span>
                          <span>成立于 {company.founded}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3" />
                            <span>{company.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        查看详情
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={company.website} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-8">
          {/* 热门产品 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">🔥 热门产品 & API</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProducts.map(product => (
                <Card key={product.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <div className="text-sm text-gray-500 mb-2">
                        by {product.companyName}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {product.type} • {product.category}
                      </Badge>
                    </div>
                    <Badge variant="outline" className={`text-xs ${
                      product.pricing === 'free' ? 'border-green-500 text-green-600' :
                      product.pricing === 'freemium' ? 'border-blue-500 text-blue-600' :
                      'border-orange-500 text-orange-600'
                    }`}>
                      {product.pricing}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {product.description}
                  </p>
                  
                  {/* 特性 */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.features.slice(0, 3).map(feature => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{product.features.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  {/* 评分和状态 */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{product.rating}</span>
                      <span className="text-gray-500">({product.reviewCount})</span>
                    </div>
                    <Badge variant={product.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                      {product.status}
                    </Badge>
                  </div>
                  
                  {/* 操作按钮 */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      查看详情
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <a href={product.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 产品对比 */}
          <div>
            <h2 className="text-2xl font-bold mb-6">⚖️ 产品对比</h2>
            <Card className="p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">AI 模型对比分析</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  详细对比主流 AI 模型的性能、价格和特性
                </p>
                <Button>
                  查看对比表格
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 合作邀请 */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">加入 VC101 生态伙伴</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          如果您的公司专注于 AI 技术创新，欢迎加入我们的生态伙伴计划，一起推动 AI 编程领域的发展。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="gap-2">
            <Building className="h-5 w-5" />
            申请成为合作伙伴
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Globe className="h-5 w-5" />
            了解合作详情
          </Button>
        </div>
      </Card>
    </div>
  );
}