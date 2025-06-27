import ProfessionalReport from '@/components/professional-report';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getProgressData } from '@/lib/progress-utils';
import { Calendar, TrendingUp, FileText } from 'lucide-react';

export default async function ReportPage() {
  const progressData = await getProgressData();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            📊 VC101 社区发展报告
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            详细的社区发展历程、重要里程碑和未来规划
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>最后更新：{progressData.lastUpdated}</span>
          </div>
        </div>

        {/* 社区大事记 */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              🎯 社区发展大事记
            </h2>
            <p className="text-gray-600 dark:text-gray-400">记录 VC101 社区的重要发展节点</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-green-500">2025-01</Badge>
                <h3 className="font-semibold">在线编程平台上线</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Monaco Editor 专业代码编辑器</li>
                <li>• Judge0 在线代码执行系统</li>
                <li>• 8种主流编程语言支持</li>
                <li>• 实时代码测试与结果展示</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-blue-500">2025-01</Badge>
                <h3 className="font-semibold">社区平台架构完善</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• Next.js 14 + React 19 技术栈</li>
                <li>• Supabase 后端服务集成</li>
                <li>• 响应式UI设计系统</li>
                <li>• 暗色主题支持</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-purple-500">2025-01</Badge>
                <h3 className="font-semibold">专业报告系统</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 企业级报告生成</li>
                <li>• PDF 高质量导出</li>
                <li>• 版本管理集成</li>
                <li>• 数据可视化展示</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="border-orange-500 text-orange-600">规划中</Badge>
                <h3 className="font-semibold">AI 编程助手</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 智能代码补全</li>
                <li>• 代码质量分析</li>
                <li>• 个性化学习建议</li>
                <li>• 自动化测试生成</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="border-cyan-500 text-cyan-600">规划中</Badge>
                <h3 className="font-semibold">实时协作功能</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 多人协作编程</li>
                <li>• 实时代码同步</li>
                <li>• 语音视频通话</li>
                <li>• 项目管理工具</li>
              </ul>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="border-pink-500 text-pink-600">愿景</Badge>
                <h3 className="font-semibold">全球社区生态</h3>
              </div>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li>• 国际化多语言支持</li>
                <li>• 移动端原生应用</li>
                <li>• 开发者认证体系</li>
                <li>• 企业级解决方案</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* 专业报告组件 */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
              <FileText className="h-6 w-6 text-green-600" />
              📋 详细发展报告
            </h2>
            <p className="text-gray-600 dark:text-gray-400">完整的社区发展数据分析和未来规划</p>
          </div>
          
          <ProfessionalReport 
            content={progressData.content}
            lastUpdated={progressData.lastUpdated}
            stats={progressData.stats}
          />
        </div>
      </div>
    </div>
  );
}