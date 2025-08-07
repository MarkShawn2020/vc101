'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Check,
  Star,
  Zap,
  Shield,
  Users,
  Award,
  ArrowRight,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const plans = {
    monthly: [
      {
        name: 'Free',
        price: '¥0',
        period: '/月',
        description: '个人探索版',
        features: [
          '基础AI评估功能',
          '每月100条知识条目',
          '公共知识库访问',
          '基础搜索功能',
          '社区支持',
          '基础数据导出'
        ],
        limitations: [
          '无API访问',
          '无团队协作',
          '无高级分析'
        ],
        cta: '免费开始',
        ctaLink: '/signup',
        highlighted: false,
        icon: Sparkles
      },
      {
        name: 'Pro',
        price: '¥199',
        originalPrice: '¥299',
        period: '/月',
        description: '专业创作者',
        features: [
          '高级AI全功能',
          '无限知识条目',
          '个性化推荐引擎',
          '知识图谱可视化',
          '优先技术支持',
          'API访问(1万次/月)',
          '高级数据分析',
          '自定义视角配置',
          '批量导入导出'
        ],
        limitations: [],
        cta: '立即升级',
        ctaLink: '/signup?plan=pro',
        highlighted: true,
        badge: '最受欢迎',
        icon: Zap
      },
      {
        name: 'Team',
        price: '¥699',
        originalPrice: '¥999',
        period: '/月/5人',
        description: '团队协作版',
        features: [
          'Pro版全部功能',
          '私有团队空间',
          '协作工作流',
          '团队分析仪表板',
          '权限管理系统',
          'API访问(10万次/月)',
          '团队知识库',
          '版本控制',
          'SSO单点登录',
          '专属客户经理'
        ],
        limitations: [],
        cta: '开始试用',
        ctaLink: '/contact?plan=team',
        highlighted: false,
        icon: Users
      },
      {
        name: 'Enterprise',
        price: '定制',
        period: '',
        description: '企业定制版',
        features: [
          '私有化部署选项',
          '专属AI模型训练',
          '无限API调用',
          '定制功能开发',
          'SLA服务保障',
          '7×24技术支持',
          '数据安全审计',
          '合规性认证',
          '专属实施团队',
          '定期培训服务'
        ],
        limitations: [],
        cta: '联系销售',
        ctaLink: '/contact?plan=enterprise',
        highlighted: false,
        icon: Shield
      }
    ],
    yearly: [
      {
        name: 'Free',
        price: '¥0',
        period: '/年',
        description: '个人探索版',
        features: [
          '基础AI评估功能',
          '每月100条知识条目',
          '公共知识库访问',
          '基础搜索功能',
          '社区支持',
          '基础数据导出'
        ],
        limitations: [
          '无API访问',
          '无团队协作',
          '无高级分析'
        ],
        cta: '免费开始',
        ctaLink: '/signup',
        highlighted: false,
        icon: Sparkles
      },
      {
        name: 'Pro',
        price: '¥1990',
        originalPrice: '¥3588',
        period: '/年',
        description: '专业创作者',
        badge: '省2个月',
        features: [
          '高级AI全功能',
          '无限知识条目',
          '个性化推荐引擎',
          '知识图谱可视化',
          '优先技术支持',
          'API访问(1万次/月)',
          '高级数据分析',
          '自定义视角配置',
          '批量导入导出'
        ],
        limitations: [],
        cta: '立即升级',
        ctaLink: '/signup?plan=pro&billing=yearly',
        highlighted: true,
        icon: Zap
      },
      {
        name: 'Team',
        price: '¥6990',
        originalPrice: '¥11988',
        period: '/年/5人',
        description: '团队协作版',
        badge: '省2个月',
        features: [
          'Pro版全部功能',
          '私有团队空间',
          '协作工作流',
          '团队分析仪表板',
          '权限管理系统',
          'API访问(10万次/月)',
          '团队知识库',
          '版本控制',
          'SSO单点登录',
          '专属客户经理'
        ],
        limitations: [],
        cta: '开始试用',
        ctaLink: '/contact?plan=team&billing=yearly',
        highlighted: false,
        icon: Users
      },
      {
        name: 'Enterprise',
        price: '定制',
        period: '',
        description: '企业定制版',
        features: [
          '私有化部署选项',
          '专属AI模型训练',
          '无限API调用',
          '定制功能开发',
          'SLA服务保障',
          '7×24技术支持',
          '数据安全审计',
          '合规性认证',
          '专属实施团队',
          '定期培训服务'
        ],
        limitations: [],
        cta: '联系销售',
        ctaLink: '/contact?plan=enterprise',
        highlighted: false,
        icon: Shield
      }
    ]
  };

  const faqs = [
    {
      question: '如何选择适合的套餐？',
      answer: '如果您是个人用户探索AI知识管理，Free版本即可满足基础需求。专业创作者和知识工作者推荐Pro版，享受完整AI功能。团队协作请选择Team版，企业级需求请联系我们定制Enterprise方案。'
    },
    {
      question: '可以随时升级或降级吗？',
      answer: '是的，您可以随时升级到更高级的套餐，升级立即生效。降级将在下个计费周期生效。年付用户升级或降级将按比例计算差价。'
    },
    {
      question: 'API调用超出限制怎么办？',
      answer: 'Pro和Team版本的API调用限制是软限制，超出后我们会通知您。您可以购买额外的API调用包，每1万次¥50。Enterprise版本无调用限制。'
    },
    {
      question: '支持哪些支付方式？',
      answer: '我们支持支付宝、微信支付、银行转账和信用卡支付。企业客户可以选择对公转账和采购订单方式。'
    },
    {
      question: '有免费试用期吗？',
      answer: 'Pro版本提供14天免费试用，无需信用卡。Team版本提供30天免费试用。试用期间享受完整功能，试用结束后可选择是否付费继续。'
    },
    {
      question: '数据安全如何保障？',
      answer: '我们采用银行级加密技术，所有数据传输使用SSL/TLS加密。数据存储在阿里云，定期备份。Enterprise版本支持私有化部署，数据完全掌控在您手中。'
    }
  ];

  const currentPlans = plans[billingCycle];

  return (
    <div className="min-h-screen py-12">
      {/* Header */}
      <div className="container mx-auto px-4 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
          <Award className="w-4 h-4" />
          <span className="text-sm font-medium">灵活定价，满足各种需求</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          选择适合您的方案
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          从个人到企业，我们提供灵活的定价方案。所有付费套餐均可免费试用。
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md transition-all ${
              billingCycle === 'monthly' 
                ? 'bg-background shadow-sm font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            月付
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-md transition-all ${
              billingCycle === 'yearly' 
                ? 'bg-background shadow-sm font-medium' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            年付
            <span className="ml-2 text-xs text-green-600 font-medium">省2个月</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {currentPlans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-card rounded-xl p-6 ${
                plan.highlighted 
                  ? 'border-2 border-primary shadow-xl scale-105 lg:scale-110' 
                  : 'border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    <Star className="w-3 h-3" />
                    {plan.badge}
                  </span>
                </div>
              )}
              
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${
                  plan.highlighted ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <plan.icon className={`w-6 h-6 ${
                    plan.highlighted ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground">{plan.description}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limitations.map((limitation) => (
                  <li key={limitation} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 text-center">×</span>
                    <span>{limitation}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.ctaLink}
                className={`block w-full py-3 rounded-lg font-medium text-center transition-all ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Features Comparison */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">功能对比</h2>
          <div className="bg-card rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4">功能</th>
                  <th className="text-center p-4">Free</th>
                  <th className="text-center p-4">Pro</th>
                  <th className="text-center p-4">Team</th>
                  <th className="text-center p-4">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">知识条目</td>
                  <td className="text-center p-4">100/月</td>
                  <td className="text-center p-4">无限</td>
                  <td className="text-center p-4">无限</td>
                  <td className="text-center p-4">无限</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">AI评估</td>
                  <td className="text-center p-4">基础</td>
                  <td className="text-center p-4">高级</td>
                  <td className="text-center p-4">高级</td>
                  <td className="text-center p-4">定制</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">API访问</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">1万次/月</td>
                  <td className="text-center p-4">10万次/月</td>
                  <td className="text-center p-4">无限</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">团队协作</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr className="border-b">
                  <td className="p-4">私有化部署</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">-</td>
                  <td className="text-center p-4">✓</td>
                </tr>
                <tr>
                  <td className="p-4">技术支持</td>
                  <td className="text-center p-4">社区</td>
                  <td className="text-center p-4">优先</td>
                  <td className="text-center p-4">专属</td>
                  <td className="text-center p-4">7×24</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">常见问题</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card rounded-lg border">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-4 pb-4">
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            还有疑问？
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            我们的团队随时准备帮助您选择最适合的方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
            >
              联系销售团队
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="/docs/pricing"
              className="inline-flex items-center gap-2 px-8 py-3 bg-card border rounded-lg hover:bg-muted transition-all font-medium"
            >
              <HelpCircle className="w-4 h-4" />
              查看详细文档
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}