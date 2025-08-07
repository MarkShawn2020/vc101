import Link from 'next/link';
import { 
  Brain, 
  Target,
  Rocket,
  Users,
  Globe,
  Award,
  Heart,
  Shield,
  Zap,
  TrendingUp,
  ChevronRight,
  Star,
  MessageSquare,
  BookOpen
} from 'lucide-react';

export default function AboutPage() {
  const milestones = [
    { year: '2024', event: 'VC101社区成立，专注AI编程协作' },
    { year: '2025 Q1', event: '升级为VibeGenius，推出Vibe智库' },
    { year: '2025 Q2', event: '用户突破5万，企业客户超过100家' },
    { year: '2025 Q3', event: '国际化扩展，支持多语言' },
    { year: '2025 Q4', event: '目标：成为全球领先的智能知识平台' }
  ];

  const team = [
    { role: 'CEO & 创始人', description: 'AI产品专家，10年互联网经验' },
    { role: 'CTO', description: '技术架构师，前字节跳动AI Lab' },
    { role: '产品总监', description: '知识管理专家，前阿里巴巴' },
    { role: 'AI研究主管', description: '清华大学博士，NLP专家' }
  ];

  const values = [
    {
      icon: Brain,
      title: '智能驱动',
      description: '以AI技术为核心，持续创新知识管理方式'
    },
    {
      icon: Users,
      title: '用户至上',
      description: '深度理解用户需求，创造卓越产品体验'
    },
    {
      icon: Heart,
      title: '开放协作',
      description: '构建开放生态，促进知识共享与协作'
    },
    {
      icon: Shield,
      title: '安全可信',
      description: '保护用户数据安全，建立长期信任关系'
    }
  ];

  const stats = [
    { label: '注册用户', value: '50,000+', growth: '+200%' },
    { label: '企业客户', value: '500+', growth: '+150%' },
    { label: '知识条目', value: '1M+', growth: '+500%' },
    { label: '每日活跃', value: '10,000+', growth: '+180%' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">关于VibeGenius</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              重新定义
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                智能知识管理
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              我们相信人类智慧与AI的结合将创造无限可能。VibeGenius致力于打造
              最先进的AI增强型知识平台，让每个人都能与AI一起创造卓越。
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="bg-card rounded-xl p-8 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">我们的使命</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                通过AI技术democratize知识管理，让每个个人和组织都能高效地收集、
                评估、组织和利用知识，在信息时代保持竞争优势。
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-8 border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Rocket className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">我们的愿景</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                成为全球领先的人机协同知识平台，推动人类智慧与AI的深度融合，
                创造一个知识自由流动、智慧不断涌现的未来。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">我们的故事</h2>
            
            <div className="prose prose-lg mx-auto text-muted-foreground">
              <p className="mb-6">
                VibeGenius的前身是VC101（Vibe Coding 101），一个专注于Human-AI协同编程的社区。
                我们最初的目标是帮助开发者更好地与AI助手（如Claude、GPT、Gemini）协作编程。
              </p>
              
              <p className="mb-6">
                在服务数万名开发者的过程中，我们发现了一个更大的机会：不仅仅是编程，
                各行各业的知识工作者都需要一个强大的AI增强型知识管理平台。
              </p>
              
              <p className="mb-6">
                2025年，我们正式升级为VibeGenius，推出了革命性的Vibe智库系统。
                通过5维度AI评估、个性化推荐、知识图谱等创新功能，
                我们正在重新定义知识管理的未来。
              </p>
              
              <p>
                今天，VibeGenius已经成为超过5万用户和500家企业信赖的智能知识平台。
                但这只是开始，我们的征途是星辰大海。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">核心价值观</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-4">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Stats */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">成长数据</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-green-600 font-medium">{stat.growth}</div>
              </div>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl border p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                发展里程碑
              </h3>
              <div className="space-y-3">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="text-sm font-medium text-primary min-w-[80px]">
                      {milestone.year}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {milestone.event}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">核心团队</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            由来自顶尖科技公司的专家组成，我们致力于创造最好的产品
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {team.map((member) => (
              <div key={member.role} className="bg-card rounded-xl border p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 mx-auto mb-4" />
                <h3 className="font-semibold mb-1">{member.role}</h3>
                <p className="text-sm text-muted-foreground">{member.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              我们正在快速扩张，寻找志同道合的伙伴
            </p>
            <Link 
              href="/careers"
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all"
            >
              查看开放职位
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">合作伙伴</h2>
          <p className="text-center text-muted-foreground mb-12">
            与行业领先企业合作，共同推动智能知识管理创新
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 max-w-4xl mx-auto">
            {['OpenAI', 'Anthropic', '阿里云', '腾讯云', '字节跳动', '百度'].map((partner) => (
              <div key={partner} className="px-6 py-3 bg-card rounded-lg border">
                <span className="text-muted-foreground font-medium">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-2xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              加入我们的旅程
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              无论您是个人用户、团队还是企业，我们都期待与您一起创造智能知识管理的未来
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all font-medium"
              >
                <Zap className="w-5 h-5" />
                免费开始
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-card border rounded-lg hover:bg-muted transition-all font-medium"
              >
                <MessageSquare className="w-5 h-5" />
                联系我们
              </Link>
              <Link 
                href="/docs"
                className="inline-flex items-center gap-2 px-8 py-3 bg-card border rounded-lg hover:bg-muted transition-all font-medium"
              >
                <BookOpen className="w-5 h-5" />
                查看文档
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}