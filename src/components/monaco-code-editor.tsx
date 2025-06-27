"use client";

import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "next-themes";

const LANGUAGES = [
  { id: 71, name: "Python", value: "python", monacoLang: "python", icon: "🐍" },
  { id: 50, name: "C", value: "c", monacoLang: "c", icon: "⚡" },
  { id: 54, name: "C++", value: "cpp", monacoLang: "cpp", icon: "⚡⚡" },
  { id: 62, name: "Java", value: "java", monacoLang: "java", icon: "☕" },
  { id: 63, name: "JavaScript", value: "javascript", monacoLang: "javascript", icon: "🟨" },
  { id: 68, name: "PHP", value: "php", monacoLang: "php", icon: "🐘" },
  { id: 73, name: "Rust", value: "rust", monacoLang: "rust", icon: "🦀" },
  { id: 74, name: "TypeScript", value: "typescript", monacoLang: "typescript", icon: "🔷" },
];

const DEFAULT_CODE = {
  python: `def solve():
    # 在这里写你的代码解决两数之和问题
    n = int(input())
    nums = list(map(int, input().split()))
    target = int(input())
    
    # 使用哈希表查找两数之和
    num_map = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            print(num_map[complement], i)
            return
        num_map[num] = i

solve()`,
  c: `#include <stdio.h>

int main() {
    int n, target;
    scanf("%d", &n);
    
    int nums[n];
    for(int i = 0; i < n; i++) {
        scanf("%d", &nums[i]);
    }
    
    scanf("%d", &target);
    
    // 查找两数之和
    for(int i = 0; i < n; i++) {
        for(int j = i + 1; j < n; j++) {
            if(nums[i] + nums[j] == target) {
                printf("%d %d\\n", i, j);
                return 0;
            }
        }
    }
    
    return 0;
}`,
  cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

int main() {
    int n, target;
    cin >> n;
    
    vector<int> nums(n);
    for(int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    cin >> target;
    
    // 使用哈希表查找两数之和
    unordered_map<int, int> numMap;
    for(int i = 0; i < n; i++) {
        int complement = target - nums[i];
        if(numMap.find(complement) != numMap.end()) {
            cout << numMap[complement] << " " << i << endl;
            return 0;
        }
        numMap[nums[i]] = i;
    }
    
    return 0;
}`,
  java: `import java.util.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        
        int[] nums = new int[n];
        for(int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        
        int target = sc.nextInt();
        
        // 使用HashMap查找两数之和
        Map<Integer, Integer> map = new HashMap<>();
        for(int i = 0; i < n; i++) {
            int complement = target - nums[i];
            if(map.containsKey(complement)) {
                System.out.println(map.get(complement) + " " + i);
                return;
            }
            map.put(nums[i], i);
        }
    }
}`,
  javascript: `function solve() {
    // 读取输入
    const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n');
    const n = parseInt(input[0]);
    const nums = input[1].split(' ').map(Number);
    const target = parseInt(input[2]);
    
    // 使用Map查找两数之和
    const numMap = new Map();
    for(let i = 0; i < n; i++) {
        const complement = target - nums[i];
        if(numMap.has(complement)) {
            console.log(numMap.get(complement), i);
            return;
        }
        numMap.set(nums[i], i);
    }
}

solve();`,
  php: `<?php
$n = intval(trim(fgets(STDIN)));
$nums = array_map('intval', explode(' ', trim(fgets(STDIN))));
$target = intval(trim(fgets(STDIN)));

// 使用关联数组查找两数之和
$numMap = array();
for($i = 0; $i < $n; $i++) {
    $complement = $target - $nums[$i];
    if(array_key_exists($complement, $numMap)) {
        echo $numMap[$complement] . " " . $i . "\\n";
        exit;
    }
    $numMap[$nums[$i]] = $i;
}
?>`,
  rust: `use std::io;
use std::collections::HashMap;

fn main() {
    let mut input = String::new();
    io::stdin().read_line(&mut input).unwrap();
    let n: usize = input.trim().parse().unwrap();
    
    input.clear();
    io::stdin().read_line(&mut input).unwrap();
    let nums: Vec<i32> = input.trim()
        .split_whitespace()
        .map(|s| s.parse().unwrap())
        .collect();
    
    input.clear();
    io::stdin().read_line(&mut input).unwrap();
    let target: i32 = input.trim().parse().unwrap();
    
    // 使用HashMap查找两数之和
    let mut num_map = HashMap::new();
    for (i, &num) in nums.iter().enumerate() {
        let complement = target - num;
        if let Some(&index) = num_map.get(&complement) {
            println!("{} {}", index, i);
            return;
        }
        num_map.insert(num, i);
    }
}`,
  typescript: `function solve(): void {
    // 读取输入
    const input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n');
    const n: number = parseInt(input[0]);
    const nums: number[] = input[1].split(' ').map(Number);
    const target: number = parseInt(input[2]);
    
    // 使用Map查找两数之和
    const numMap = new Map<number, number>();
    for(let i = 0; i < n; i++) {
        const complement: number = target - nums[i];
        if(numMap.has(complement)) {
            console.log(numMap.get(complement), i);
            return;
        }
        numMap.set(nums[i], i);
    }
}

solve();`
};

interface MonacoCodeEditorProps {
  onSubmit?: (code: string, languageId: number) => void;
  loading?: boolean;
}

export default function MonacoCodeEditor({ onSubmit, loading = false }: MonacoCodeEditorProps) {
  const [code, setCode] = useState(DEFAULT_CODE.python);
  const [selectedLanguage, setSelectedLanguage] = useState("71");
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState<"on" | "off">("off");
  const editorRef = useRef<any>(null);
  const { theme } = useTheme();

  const currentLang = LANGUAGES.find(lang => lang.id.toString() === selectedLanguage);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    const lang = LANGUAGES.find(l => l.id.toString() === value);
    if (lang) {
      setCode(DEFAULT_CODE[lang.value as keyof typeof DEFAULT_CODE] || "");
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(code, parseInt(selectedLanguage));
    }
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    
    // 添加快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      handleSubmit();
    });
    
    // 设置编辑器选项
    editor.updateOptions({
      fontSize: fontSize,
      fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'DejaVu Sans Mono', monospace",
      fontLigatures: true,
      lineNumbers: 'on',
      wordWrap: wordWrap,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      tabSize: 4,
      insertSpaces: true,
      renderWhitespace: 'selection',
      bracketPairColorization: { enabled: true },
    });
  };

  const formatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run();
    }
  };

  const toggleWordWrap = () => {
    const newWrap = wordWrap === "on" ? "off" : "on";
    setWordWrap(newWrap);
    if (editorRef.current) {
      editorRef.current.updateOptions({ wordWrap: newWrap });
    }
  };

  const changeFontSize = (delta: number) => {
    const newSize = Math.max(10, Math.min(24, fontSize + delta));
    setFontSize(newSize);
    if (editorRef.current) {
      editorRef.current.updateOptions({ fontSize: newSize });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* 顶部工具栏 */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold">专业代码编辑器</h3>
            {currentLang && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <span>{currentLang.icon}</span>
                <span>{currentLang.name}</span>
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LANGUAGES.map((lang) => (
                  <SelectItem key={lang.id} value={lang.id.toString()}>
                    <span className="flex items-center gap-2">
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* 编辑器工具栏 */}
        <div className="flex items-center justify-between border-b pb-2">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={formatCode}>
              🎨 格式化代码
            </Button>
            <Button variant="outline" size="sm" onClick={toggleWordWrap}>
              {wordWrap === "on" ? "📏 取消换行" : "📏 自动换行"}
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => changeFontSize(-1)}>
              🔤-
            </Button>
            <span className="text-sm px-2">{fontSize}px</span>
            <Button variant="outline" size="sm" onClick={() => changeFontSize(1)}>
              🔤+
            </Button>
          </div>
        </div>
        
        {/* Monaco 编辑器 */}
        <div className="border rounded-lg overflow-hidden">
          <Editor
            height="400px"
            language={currentLang?.monacoLang || "python"}
            value={code}
            onChange={(value) => setCode(value || "")}
            onMount={handleEditorDidMount}
            theme={theme === "dark" ? "vs-dark" : "light"}
            options={{
              selectOnLineNumbers: true,
              roundedSelection: false,
              readOnly: false,
              cursorStyle: 'line',
              automaticLayout: true,
            }}
          />
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            💡 快捷键: Ctrl/Cmd + Enter 运行代码
          </div>
          
          <Button 
            onClick={handleSubmit} 
            disabled={loading || !code.trim()}
            className="px-6"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                运行中...
              </>
            ) : (
              <>🚀 提交运行</>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}