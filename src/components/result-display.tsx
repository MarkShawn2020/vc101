"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
}

interface ResultDisplayProps {
  result: ExecutionResult | null;
  loading: boolean;
}

const getStatusColor = (statusId: number) => {
  switch (statusId) {
    case 3: return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"; // Accepted
    case 4: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Wrong Answer
    case 5: return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"; // Time Limit Exceeded
    case 6: return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"; // Compilation Error
    default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

export default function ResultDisplay({ result, loading }: ResultDisplayProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
          <span>代码执行中...</span>
        </div>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="p-6">
        <p className="text-gray-500 dark:text-gray-400">点击"提交运行"来执行代码</p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">执行结果</h3>
          <Badge className={getStatusColor(result.status.id)}>
            {result.status.description}
          </Badge>
        </div>

        {result.time && (
          <div>
            <span className="font-medium">执行时间: </span>
            <span>{result.time}s</span>
          </div>
        )}

        {result.memory && (
          <div>
            <span className="font-medium">内存使用: </span>
            <span>{result.memory} KB</span>
          </div>
        )}

        {result.stdout && (
          <div>
            <h4 className="font-medium mb-2">输出:</h4>
            <pre className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm overflow-x-auto">
              {result.stdout}
            </pre>
          </div>
        )}

        {result.stderr && (
          <div>
            <h4 className="font-medium mb-2 text-red-600">错误输出:</h4>
            <pre className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm overflow-x-auto text-red-700 dark:text-red-300">
              {result.stderr}
            </pre>
          </div>
        )}

        {result.compile_output && (
          <div>
            <h4 className="font-medium mb-2 text-orange-600">编译输出:</h4>
            <pre className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-sm overflow-x-auto text-orange-700 dark:text-orange-300">
              {result.compile_output}
            </pre>
          </div>
        )}
      </div>
    </Card>
  );
}