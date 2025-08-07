import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import type { KnowledgeItem } from '@/types/vibe-tank';

// AI evaluation prompt template
const EVALUATION_PROMPT = `
你是一个专业的内容评估专家，需要从以下5个维度对给定的内容进行评分（0-100分）：

1. 可信度（Credibility）：内容来源是否明确、可靠，论据是否充分
2. 创新性（Innovation）：是否提出新颖的理论、方法或观点
3. 实践价值（Practical Value）：是否有真实案例或可实践的操作指南
4. 启发性（Inspiration）：能否启发读者产生新想法或行动
5. 长期影响（Long-term Impact）：在未来可能对领域产生的影响程度

内容信息：
标题：{title}
摘要：{summary}
内容：{content}
类别：{category}
来源：{source}

请返回JSON格式的评分结果：
{
  "credibility_score": 0-100,
  "innovation_score": 0-100,
  "practical_value_score": 0-100,
  "inspiration_score": 0-100,
  "long_term_impact_score": 0-100,
  "evaluation_reason": "简要说明评分理由"
}
`;

// Mock AI evaluation function (replace with actual AI API call)
async function evaluateWithAI(item: Partial<KnowledgeItem>): Promise<{
  credibility_score: number;
  innovation_score: number;
  practical_value_score: number;
  inspiration_score: number;
  long_term_impact_score: number;
  evaluation_reason: string;
}> {
  // In production, this would call OpenAI/Claude API
  // For now, return mock scores based on content analysis
  
  const titleLength = item.title?.length || 0;
  const contentLength = item.content?.length || 0;
  const hasUrl = !!item.url;
  const hasAuthor = !!item.author;
  
  // Simple heuristic scoring (replace with actual AI evaluation)
  const baseScore = 60;
  const credibilityBonus = (hasUrl ? 10 : 0) + (hasAuthor ? 10 : 0);
  const innovationBonus = Math.min(titleLength / 5, 15);
  const practicalBonus = contentLength > 500 ? 15 : 5;
  const inspirationBonus = Math.random() * 20; // Random for demo
  const impactBonus = item.category === 'llm_theory' ? 15 : 10;
  
  return {
    credibility_score: Math.min(100, baseScore + credibilityBonus + Math.random() * 10),
    innovation_score: Math.min(100, baseScore + innovationBonus + Math.random() * 15),
    practical_value_score: Math.min(100, baseScore + practicalBonus + Math.random() * 10),
    inspiration_score: Math.min(100, baseScore + inspirationBonus),
    long_term_impact_score: Math.min(100, baseScore + impactBonus + Math.random() * 10),
    evaluation_reason: '基于内容完整性、来源可靠性和领域相关性的综合评估'
  };
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get request body
    const body = await request.json();
    const { 
      title,
      content,
      summary,
      url,
      category,
      author,
      tags,
      source_id,
      knowledge_item_id // If evaluating existing item
    } = body;
    
    // Validate required fields
    if (!title || !category) {
      return NextResponse.json(
        { error: '标题和类别为必填项' },
        { status: 400 }
      );
    }
    
    // Perform AI evaluation
    const evaluation = await evaluateWithAI({
      title,
      content,
      summary,
      url,
      category,
      author
    });
    
    // If knowledge_item_id is provided, update existing item
    if (knowledge_item_id) {
      const { data, error } = await supabase
        .from('knowledge_items')
        .update({
          credibility_score: Math.round(evaluation.credibility_score),
          innovation_score: Math.round(evaluation.innovation_score),
          practical_value_score: Math.round(evaluation.practical_value_score),
          inspiration_score: Math.round(evaluation.inspiration_score),
          long_term_impact_score: Math.round(evaluation.long_term_impact_score),
          updated_at: new Date().toISOString()
        })
        .eq('id', knowledge_item_id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating knowledge item:', error);
        return NextResponse.json(
          { error: '更新知识条目失败' },
          { status: 500 }
        );
      }
      
      return NextResponse.json({
        success: true,
        item: data,
        evaluation: {
          ...evaluation,
          overall_score: Math.round(
            (evaluation.credibility_score +
             evaluation.innovation_score +
             evaluation.practical_value_score +
             evaluation.inspiration_score +
             evaluation.long_term_impact_score) / 5
          )
        }
      });
    }
    
    // Create new knowledge item with evaluation scores
    const { data, error } = await supabase
      .from('knowledge_items')
      .insert({
        title,
        content,
        summary,
        url,
        category,
        author,
        tags,
        source_id,
        credibility_score: Math.round(evaluation.credibility_score),
        innovation_score: Math.round(evaluation.innovation_score),
        practical_value_score: Math.round(evaluation.practical_value_score),
        inspiration_score: Math.round(evaluation.inspiration_score),
        long_term_impact_score: Math.round(evaluation.long_term_impact_score),
        published_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating knowledge item:', error);
      return NextResponse.json(
        { error: '创建知识条目失败' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      item: data,
      evaluation: {
        ...evaluation,
        overall_score: Math.round(
          (evaluation.credibility_score +
           evaluation.innovation_score +
           evaluation.practical_value_score +
           evaluation.inspiration_score +
           evaluation.long_term_impact_score) / 5
        )
      }
    });
    
  } catch (error) {
    console.error('Error in AI evaluation:', error);
    return NextResponse.json(
      { error: '评估失败，请稍后重试' },
      { status: 500 }
    );
  }
}

// Batch evaluation endpoint
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { item_ids } = body;
    
    if (!item_ids || !Array.isArray(item_ids)) {
      return NextResponse.json(
        { error: '请提供要评估的条目ID列表' },
        { status: 400 }
      );
    }
    
    // Fetch items
    const { data: items, error: fetchError } = await supabase
      .from('knowledge_items')
      .select('*')
      .in('id', item_ids);
    
    if (fetchError) {
      console.error('Error fetching items:', fetchError);
      return NextResponse.json(
        { error: '获取知识条目失败' },
        { status: 500 }
      );
    }
    
    // Evaluate each item
    const evaluations = await Promise.all(
      items.map(async (item) => {
        const evaluation = await evaluateWithAI(item);
        
        // Update item with scores
        await supabase
          .from('knowledge_items')
          .update({
            credibility_score: Math.round(evaluation.credibility_score),
            innovation_score: Math.round(evaluation.innovation_score),
            practical_value_score: Math.round(evaluation.practical_value_score),
            inspiration_score: Math.round(evaluation.inspiration_score),
            long_term_impact_score: Math.round(evaluation.long_term_impact_score),
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id);
        
        return {
          item_id: item.id,
          title: item.title,
          ...evaluation
        };
      })
    );
    
    return NextResponse.json({
      success: true,
      evaluations,
      total: evaluations.length
    });
    
  } catch (error) {
    console.error('Error in batch evaluation:', error);
    return NextResponse.json(
      { error: '批量评估失败' },
      { status: 500 }
    );
  }
}