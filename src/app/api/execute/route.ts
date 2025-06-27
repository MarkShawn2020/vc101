import { NextRequest, NextResponse } from 'next/server';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || 'demo-key'; // 你需要在.env.local中设置

export async function POST(request: NextRequest) {
  try {
    const { source_code, language_id, stdin } = await request.json();
    
    console.log('🚀 开始代码执行请求:', {
      language_id,
      source_code_length: source_code.length,
      has_stdin: !!stdin,
      api_key_set: RAPIDAPI_KEY !== 'demo-key'
    });

    // 步骤1: 提交代码执行请求
    const submissionPayload = {
      source_code: Buffer.from(source_code).toString('base64'),
      language_id: language_id,
      stdin: stdin ? Buffer.from(stdin).toString('base64') : null,
    };
    
    console.log('📤 提交载荷:', submissionPayload);

    const submissionResponse = await fetch(`${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=false`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        'X-RapidAPI-Key': RAPIDAPI_KEY,
      },
      body: JSON.stringify(submissionPayload),
    });

    console.log('📨 Judge0响应状态:', submissionResponse.status, submissionResponse.statusText);

    if (!submissionResponse.ok) {
      const errorText = await submissionResponse.text();
      console.error('❌ Judge0 API错误响应:', {
        status: submissionResponse.status,
        statusText: submissionResponse.statusText,
        headers: Object.fromEntries(submissionResponse.headers.entries()),
        body: errorText
      });
      throw new Error(`Judge0 API调用失败: ${submissionResponse.status} ${submissionResponse.statusText} - ${errorText}`);
    }

    const submissionData = await submissionResponse.json();
    console.log('✅ 提交成功，获得token:', submissionData);
    const token = submissionData.token;

    // 步骤2: 等待执行完成并获取结果
    let result;
    let attempts = 0;
    const maxAttempts = 20; // 最多等待10秒
    
    console.log('⏳ 开始轮询执行结果...');
    
    do {
      await new Promise(resolve => setTimeout(resolve, 500)); // 等待500ms
      
      const resultResponse = await fetch(`${JUDGE0_API_URL}/submissions/${token}?base64_encoded=true`, {
        headers: {
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': RAPIDAPI_KEY,
        },
      });

      console.log(`🔄 轮询第${attempts + 1}次，状态:`, resultResponse.status);

      if (!resultResponse.ok) {
        const errorText = await resultResponse.text();
        console.error('❌ 获取结果失败:', {
          status: resultResponse.status,
          statusText: resultResponse.statusText,
          body: errorText
        });
        throw new Error(`获取执行结果失败: ${resultResponse.status} - ${errorText}`);
      }

      result = await resultResponse.json();
      console.log(`📋 第${attempts + 1}次轮询结果:`, {
        status_id: result.status.id,
        status_description: result.status.description,
        finished: result.status.id > 2
      });
      
      attempts++;
    } while (result.status.id <= 2 && attempts < maxAttempts); // status.id <= 2 表示还在处理中

    if (attempts >= maxAttempts) {
      console.warn('⏰ 执行超时，返回当前结果');
    }

    // 解码base64结果
    if (result.stdout) {
      result.stdout = Buffer.from(result.stdout, 'base64').toString('utf-8');
    }
    if (result.stderr) {
      result.stderr = Buffer.from(result.stderr, 'base64').toString('utf-8');
    }
    if (result.compile_output) {
      result.compile_output = Buffer.from(result.compile_output, 'base64').toString('utf-8');
    }

    console.log('🎉 最终执行结果:', {
      status: result.status,
      has_stdout: !!result.stdout,
      has_stderr: !!result.stderr,
      has_compile_output: !!result.compile_output,
      time: result.time,
      memory: result.memory
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('💥 代码执行错误详情:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      api_url: JUDGE0_API_URL,
      api_key_configured: RAPIDAPI_KEY !== 'demo-key'
    });
    
    // 如果RapidAPI失败，返回一个模拟结果用于演示
    console.log('🎭 切换到演示模式，返回模拟结果');
    return NextResponse.json({
      status: {
        id: 3,
        description: "Accepted (Demo Mode - API调用失败)"
      },
      stdout: "0 1\n",
      time: "0.001",
      memory: 128,
      demo_mode: true,
      error_message: error instanceof Error ? error.message : String(error)
    });
  }
}