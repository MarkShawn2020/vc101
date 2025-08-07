'use client';

import { useState } from 'react';
import { 
  Settings,
  User,
  Save,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Sliders,
  Target,
  Tag
} from 'lucide-react';
import { EVALUATION_CRITERIA, CATEGORY_LABELS } from '@/types/vibe-tank';
import type { UserPerspective, KnowledgeCategory } from '@/types/vibe-tank';

// Mock user perspectives
const mockPerspectives: UserPerspective[] = [
  {
    id: 'p1',
    user_id: 'user1',
    name: '理论研究视角',
    description: '重点关注理论创新和学术价值',
    credibility_weight: 25,
    innovation_weight: 30,
    practical_value_weight: 10,
    inspiration_weight: 20,
    long_term_impact_weight: 15,
    preferred_categories: ['llm_theory'],
    preferred_tags: ['研究', '论文', '理论'],
    is_active: true,
    created_at: '2025-01-01',
    updated_at: '2025-01-06'
  },
  {
    id: 'p2',
    user_id: 'user1',
    name: '工程实践视角',
    description: '关注技术落地和实际应用',
    credibility_weight: 20,
    innovation_weight: 15,
    practical_value_weight: 35,
    inspiration_weight: 15,
    long_term_impact_weight: 15,
    preferred_categories: ['ai_agent'],
    preferred_tags: ['开源', '框架', '工具'],
    is_active: false,
    created_at: '2025-01-03',
    updated_at: '2025-01-05'
  }
];

export default function PerspectivesPage() {
  const [perspectives, setPerspectives] = useState(mockPerspectives);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<UserPerspective>>({});
  const [isCreating, setIsCreating] = useState(false);

  const handleEdit = (perspective: UserPerspective) => {
    setEditingId(perspective.id);
    setFormData(perspective);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      credibility_weight: 20,
      innovation_weight: 20,
      practical_value_weight: 20,
      inspiration_weight: 20,
      long_term_impact_weight: 20,
      preferred_categories: [],
      preferred_tags: [],
      is_active: false
    });
  };

  const handleSave = () => {
    if (isCreating) {
      // Create new perspective
      const newPerspective: UserPerspective = {
        id: `p${perspectives.length + 1}`,
        user_id: 'user1',
        name: formData.name || '新视角',
        description: formData.description || '',
        credibility_weight: formData.credibility_weight || 20,
        innovation_weight: formData.innovation_weight || 20,
        practical_value_weight: formData.practical_value_weight || 20,
        inspiration_weight: formData.inspiration_weight || 20,
        long_term_impact_weight: formData.long_term_impact_weight || 20,
        preferred_categories: formData.preferred_categories || [],
        preferred_tags: formData.preferred_tags || [],
        is_active: formData.is_active || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setPerspectives([...perspectives, newPerspective]);
    } else if (editingId) {
      // Update existing perspective
      setPerspectives(perspectives.map(p => 
        p.id === editingId 
          ? { ...p, ...formData, updated_at: new Date().toISOString() }
          : p
      ));
    }
    
    setEditingId(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleDelete = (id: string) => {
    setPerspectives(perspectives.filter(p => p.id !== id));
  };

  const handleToggleActive = (id: string) => {
    setPerspectives(perspectives.map(p => ({
      ...p,
      is_active: p.id === id ? !p.is_active : false // Only one active at a time
    })));
  };

  const handleWeightChange = (dimension: string, value: number) => {
    setFormData({
      ...formData,
      [`${dimension}_weight`]: value
    });
  };

  const totalWeight = (data: Partial<UserPerspective>) => {
    return (data.credibility_weight || 0) +
           (data.innovation_weight || 0) +
           (data.practical_value_weight || 0) +
           (data.inspiration_weight || 0) +
           (data.long_term_impact_weight || 0);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">个人视角设置</h1>
        </div>
        <p className="text-muted-foreground">
          自定义您的评估权重和内容偏好，让AI根据您的视角生成个性化推荐
        </p>
      </div>

      {/* Current Perspectives */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">我的视角配置</h2>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            创建新视角
          </button>
        </div>

        <div className="grid gap-4">
          {perspectives.map(perspective => (
            <div 
              key={perspective.id} 
              className={`bg-card rounded-xl border p-6 ${
                perspective.is_active ? 'ring-2 ring-primary' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{perspective.name}</h3>
                    {perspective.is_active && (
                      <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                        当前使用
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{perspective.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(perspective.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title={perspective.is_active ? '停用' : '启用'}
                  >
                    {perspective.is_active ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(perspective)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(perspective.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weight Distribution */}
              <div className="grid grid-cols-5 gap-2 mb-4">
                {Object.entries(EVALUATION_CRITERIA).map(([key, criteria]) => {
                  const weight = perspective[`${key}_weight` as keyof UserPerspective] as number;
                  return (
                    <div key={key} className="text-center">
                      <div className="text-2xl mb-1">{criteria.icon}</div>
                      <div className="text-xs text-muted-foreground mb-1">{criteria.label}</div>
                      <div className="font-semibold">{weight}%</div>
                    </div>
                  );
                })}
              </div>

              {/* Preferences */}
              <div className="flex flex-wrap gap-2">
                {perspective.preferred_categories?.map(cat => (
                  <span key={cat} className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                    {CATEGORY_LABELS[cat]}
                  </span>
                ))}
                {perspective.preferred_tags?.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-muted rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit/Create Form */}
      {(editingId || isCreating) && (
        <div className="bg-card rounded-xl border p-6">
          <h2 className="text-xl font-semibold mb-6">
            {isCreating ? '创建新视角' : '编辑视角'}
          </h2>

          <div className="space-y-6">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-medium mb-2">视角名称</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
                placeholder="例如：理论研究视角"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">描述</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
                rows={2}
                placeholder="简要描述这个视角的关注点"
              />
            </div>

            {/* Weight Settings */}
            <div>
              <label className="block text-sm font-medium mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4" />
                评估权重分配
                <span className="text-muted-foreground">
                  (总计: {totalWeight(formData)}%)
                </span>
              </label>
              
              <div className="space-y-4">
                {Object.entries(EVALUATION_CRITERIA).map(([key, criteria]) => {
                  const weightKey = `${key}_weight` as keyof UserPerspective;
                  const weight = formData[weightKey] as number || 20;
                  
                  return (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{criteria.icon}</span>
                          <span className="text-sm font-medium">{criteria.label}</span>
                        </div>
                        <span className="text-sm font-semibold">{weight}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={weight}
                        onChange={(e) => handleWeightChange(key, parseInt(e.target.value))}
                        className="w-full"
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        {criteria.description}
                      </p>
                    </div>
                  );
                })}
              </div>
              
              {totalWeight(formData) !== 100 && (
                <p className="text-sm text-yellow-600 mt-2">
                  提示：权重总和建议为100%，当前为{totalWeight(formData)}%
                </p>
              )}
            </div>

            {/* Category Preferences */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                关注领域
              </label>
              <div className="flex gap-2">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => {
                  const isSelected = formData.preferred_categories?.includes(key as KnowledgeCategory);
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        const categories = formData.preferred_categories || [];
                        if (isSelected) {
                          setFormData({
                            ...formData,
                            preferred_categories: categories.filter(c => c !== key)
                          });
                        } else {
                          setFormData({
                            ...formData,
                            preferred_categories: [...categories, key as KnowledgeCategory]
                          });
                        }
                      }}
                      className={`px-3 py-1 rounded-lg transition-colors ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tag Preferences */}
            <div>
              <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                关注标签
              </label>
              <input
                type="text"
                value={formData.preferred_tags?.join(', ') || ''}
                onChange={(e) => setFormData({
                  ...formData,
                  preferred_tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 bg-background border rounded-lg"
                placeholder="输入标签，用逗号分隔"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setEditingId(null);
                  setIsCreating(false);
                  setFormData({});
                }}
                className="px-4 py-2 bg-muted hover:bg-muted/80 rounded-lg transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Save className="w-4 h-4" />
                保存
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-semibold mb-2">💡 使用提示</h3>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• 每个视角代表一种独特的信息筛选和评估标准</li>
          <li>• 权重分配决定了AI在评估内容时各维度的重要性</li>
          <li>• 关注领域和标签会影响推荐内容的优先级</li>
          <li>• 您可以创建多个视角，但同时只能激活一个</li>
        </ul>
      </div>
    </div>
  );
}