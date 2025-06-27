"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ExecutionResult {
  status: {
    id: number;
    description: string;
  };
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  time?: string;
  memory?: number;
  demo_mode?: boolean;
  error_message?: string;
}

interface EnhancedResultDisplayProps {
  result: ExecutionResult | null;
  loading: boolean;
}

const getStatusColor = (statusId: number) => {
  switch (statusId) {
    case 3: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"; // Accepted
    case 4: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Wrong Answer
    case 5: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Time Limit Exceeded
    case 6: return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"; // Compilation Error
    case 7: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Runtime Error
    case 8: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Runtime Error (SIGKILL)
    case 9: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Runtime Error (SIGFPE)
    case 10: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Runtime Error (SIGSEGV)
    case 11: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Runtime Error (SIGXFSZ)
    case 12: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Runtime Error (SIGXCPU)
    case 13: return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"; // Internal Error
    case 14: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Exec Format Error
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const getStatusIcon = (statusId: number) => {
  switch (statusId) {
    case 3: return "✅"; // Accepted
    case 4: return "❌"; // Wrong Answer
    case 5: return "⏰"; // Time Limit Exceeded
    case 6: return "🔧"; // Compilation Error
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
    case 12: return "💥"; // Runtime Error
    case 13: return "⚠️"; // Internal Error
    case 14: return "🚫"; // Exec Format Error
    default: return "❓";
  }
};

export default function EnhancedResultDisplay({ result, loading }: EnhancedResultDisplayProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <div className="space-y-1">
            <div className="text-lg font-medium">代码执行中...</div>
            <div className="text-sm text-muted-foreground">正在编译和运行您的代码</div>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-2 bg-blue-600 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
          <div className="text-xs text-muted-foreground">执行进度...</div>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-lg font-semibold mb-2">准备就绪</h3>
          <p className="text-muted-foreground">
            编写您的代码，然后点击"提交运行"来执行
          </p>
        </div>
      </Card>
    );
  }

  const hasOutput = result.stdout || result.stderr || result.compile_output;

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* 状态头部 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getStatusIcon(result.status.id)}</span>
            <div>
              <h3 className="text-lg font-semibold">执行结果</h3>
              <Badge className={getStatusColor(result.status.id)}>
                {result.status.description}
              </Badge>
            </div>
          </div>
          
          {result.demo_mode && (
            <Badge variant="outline" className="text-xs">
              🎭 演示模式
            </Badge>
          )}
        </div>

        {/* 执行统计 */}
        <div className="grid grid-cols-2 gap-4">
          {result.time && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-blue-600 dark:text-blue-400">⏱️</span>
                <div>
                  <div className="text-sm font-medium">执行时间</div>
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {result.time}s
                  </div>
                </div>
              </div>
            </div>
          )}

          {result.memory && (
            <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-purple-600 dark:text-purple-400">💾</span>
                <div>
                  <div className="text-sm font-medium">内存使用</div>
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {result.memory} KB
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 输出内容 */}
        {hasOutput && (
          <Tabs defaultValue="stdout" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              {result.stdout && (
                <TabsTrigger value="stdout" className="flex items-center gap-2">
                  ✅ 标准输出
                </TabsTrigger>
              )}
              {result.stderr && (
                <TabsTrigger value="stderr" className="flex items-center gap-2">
                  ❌ 错误输出
                </TabsTrigger>
              )}
              {result.compile_output && (
                <TabsTrigger value="compile" className="flex items-center gap-2">
                  🔧 编译输出
                </TabsTrigger>
              )}
            </TabsList>

            {result.stdout && (
              <TabsContent value="stdout" className="mt-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-green-800 dark:text-green-200">
                    标准输出
                  </h4>
                  <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto">
                    {result.stdout}
                  </pre>
                </div>
              </TabsContent>
            )}

            {result.stderr && (
              <TabsContent value="stderr" className="mt-4">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-red-800 dark:text-red-200">
                    错误输出
                  </h4>
                  <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto text-red-700 dark:text-red-300">
                    {result.stderr}
                  </pre>
                </div>
              </TabsContent>
            )}

            {result.compile_output && (
              <TabsContent value="compile" className="mt-4">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                  <h4 className="font-medium mb-2 text-orange-800 dark:text-orange-200">
                    编译输出
                  </h4>
                  <pre className="text-sm bg-white dark:bg-gray-900 p-3 rounded border overflow-x-auto text-orange-700 dark:text-orange-300">
                    {result.compile_output}
                  </pre>
                </div>
              </TabsContent>
            )}
          </Tabs>
        )}

        {/* 错误消息 (演示模式) */}
        {result.error_message && result.demo_mode && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-yellow-800 dark:text-yellow-200">
              💡 提示信息
            </h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              当前为演示模式，真实API调用失败: {result.error_message}
            </p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              请配置正确的Judge0 API密钥以使用完整功能
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}