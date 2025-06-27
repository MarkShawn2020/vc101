"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Problem {
  id: string;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  inputFormat: string;
  outputFormat: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
}

interface ProblemDisplayProps {
  problem: Problem;
}

const difficultyColors = {
  easy: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  hard: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export default function ProblemDisplay({ problem }: ProblemDisplayProps) {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <Badge className={difficultyColors[problem.difficulty]}>
            {problem.difficulty === "easy" ? "简单" : 
             problem.difficulty === "medium" ? "中等" : "困难"}
          </Badge>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">题目描述</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {problem.description}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">输入格式</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {problem.inputFormat}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">输出格式</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {problem.outputFormat}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">示例</h2>
          {problem.examples.map((example, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">输入 {index + 1}:</h4>
                  <pre className="text-sm bg-white dark:bg-gray-900 p-2 rounded border">
                    {example.input}
                  </pre>
                </div>
                <div>
                  <h4 className="font-medium mb-2">输出 {index + 1}:</h4>
                  <pre className="text-sm bg-white dark:bg-gray-900 p-2 rounded border">
                    {example.output}
                  </pre>
                </div>
              </div>
              {example.explanation && (
                <div className="mt-3">
                  <h4 className="font-medium mb-1">解释:</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {example.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}