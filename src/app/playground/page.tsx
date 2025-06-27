"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MonacoCodeEditor from "@/components/monaco-code-editor";
import ProblemDisplay from "@/components/problem-display";
import EnhancedResultDisplay from "@/components/enhanced-result-display";

// 示例题目数据
const sampleProblem = {
  id: "1",
  title: "两数之和",
  difficulty: "easy" as const,
  description: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。`,
  inputFormat: `第一行包含一个整数 n，表示数组长度。
第二行包含 n 个整数，表示数组 nums。
第三行包含一个整数 target，表示目标值。`,
  outputFormat: `输出两个整数，表示两数之和等于目标值的下标（从0开始）。`,
  examples: [
    {
      input: `4
2 7 11 15
9`,
      output: `0 1`,
      explanation: "因为 nums[0] + nums[1] = 2 + 7 = 9，所以返回 [0, 1]。"
    },
    {
      input: `3
3 2 4
6`,
      output: `1 2`,
      explanation: "因为 nums[1] + nums[2] = 2 + 4 = 6，所以返回 [1, 2]。"
    }
  ]
};

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

export default function PlaygroundPage() {
  const [result, setResult] = useState<ExecutionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = async (code: string, languageId: number) => {
    setLoading(true);
    setResult(null);

    try {
      // 调用我们的API来执行代码
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
          stdin: "4\n2 7 11 15\n9" // 使用示例输入
        }),
      });

      if (!response.ok) {
        throw new Error('代码执行失败');
      }

      const executionResult = await response.json();
      setResult(executionResult);
    } catch (error) {
      console.error('执行错误:', error);
      setResult({
        status: {
          id: 6,
          description: "执行错误"
        },
        stderr: error instanceof Error ? error.message : "未知错误"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">VC 编程练习场 - Playground</h1>
          <p className="text-muted-foreground">
            专业级在线代码编辑器，支持多种编程语言，让你随时随地练习编程！
          </p>
          <div className="mt-4 flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/quests">
                ← 返回黑客松主页
              </Link>
            </Button>
            <div className="text-sm text-muted-foreground">
              💡 完成题目后可以参加我们的黑客松挑战
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左侧：题目显示 */}
          <div className="space-y-6">
            <ProblemDisplay problem={sampleProblem} />
            <EnhancedResultDisplay result={result} loading={loading} />
          </div>

          {/* 右侧：代码编辑器 */}
          <div>
            <MonacoCodeEditor onSubmit={handleCodeSubmit} loading={loading} />
          </div>
        </div>
      </div>
    </div>
  );
}