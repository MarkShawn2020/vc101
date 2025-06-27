"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LANGUAGES = [
  { id: 71, name: "Python", value: "python" },
  { id: 50, name: "C", value: "c" },
  { id: 54, name: "C++", value: "cpp" },
  { id: 62, name: "Java", value: "java" },
  { id: 63, name: "JavaScript", value: "javascript" },
];

interface CodeEditorProps {
  onSubmit?: (code: string, languageId: number) => void;
  loading?: boolean;
}

export default function CodeEditor({ onSubmit, loading = false }: CodeEditorProps) {
  const [code, setCode] = useState(`def solve():
    # 在这里写你的代码
    n = int(input())
    print(n * 2)

solve()`);
  const [selectedLanguage, setSelectedLanguage] = useState("71");

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(code, parseInt(selectedLanguage));
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">代码编辑器</h3>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.id} value={lang.id.toString()}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 p-4 font-mono text-sm border rounded-lg bg-gray-50 dark:bg-gray-900"
          placeholder="在这里输入你的代码..."
        />
        
        <Button 
          onClick={handleSubmit} 
          className="w-full" 
          disabled={loading || !code.trim()}
        >
          {loading ? "运行中..." : "提交运行"}
        </Button>
      </div>
    </Card>
  );
}