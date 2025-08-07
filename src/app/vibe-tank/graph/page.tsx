'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Network,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Info,
  Brain,
  Sparkles,
  BookOpen,
  GitBranch,
  Link2,
  Eye
} from 'lucide-react';
import { CATEGORY_LABELS, RELATION_TYPE_LABELS } from '@/types/vibe-tank';
import type { KnowledgeCategory, RelationType } from '@/types/vibe-tank';

// Mock data for knowledge graph
const mockGraphData = {
  nodes: [
    { id: 'n1', label: 'GPT-5架构论文', category: 'llm_theory' as KnowledgeCategory, score: 93, x: 400, y: 200 },
    { id: 'n2', label: 'Transformer改进方案', category: 'llm_theory' as KnowledgeCategory, score: 85, x: 250, y: 150 },
    { id: 'n3', label: 'AgentOS框架', category: 'ai_agent' as KnowledgeCategory, score: 88, x: 550, y: 250 },
    { id: 'n4', label: 'AutoGPT企业版', category: 'ai_agent' as KnowledgeCategory, score: 82, x: 600, y: 350 },
    { id: 'n5', label: 'Anthropic订阅模式', category: 'business_model' as KnowledgeCategory, score: 87, x: 300, y: 400 },
    { id: 'n6', label: 'OpenAI API经济', category: 'business_model' as KnowledgeCategory, score: 90, x: 450, y: 450 },
    { id: 'n7', label: '多模态对齐技术', category: 'llm_theory' as KnowledgeCategory, score: 79, x: 350, y: 100 },
    { id: 'n8', label: 'LangChain生态', category: 'ai_agent' as KnowledgeCategory, score: 86, x: 700, y: 300 },
  ],
  edges: [
    { source: 'n1', target: 'n2', type: 'extends' as RelationType, strength: 85 },
    { source: 'n1', target: 'n3', type: 'inspired_by' as RelationType, strength: 70 },
    { source: 'n3', target: 'n4', type: 'implements' as RelationType, strength: 90 },
    { source: 'n1', target: 'n6', type: 'references' as RelationType, strength: 60 },
    { source: 'n5', target: 'n6', type: 'contradicts' as RelationType, strength: 75 },
    { source: 'n1', target: 'n7', type: 'extends' as RelationType, strength: 95 },
    { source: 'n3', target: 'n8', type: 'references' as RelationType, strength: 80 },
    { source: 'n4', target: 'n8', type: 'contradicts' as RelationType, strength: 65 },
  ]
};

const categoryColors = {
  llm_theory: '#3b82f6',
  ai_agent: '#8b5cf6',
  business_model: '#10b981'
};

const relationColors = {
  references: '#6b7280',
  extends: '#3b82f6',
  contradicts: '#ef4444',
  implements: '#10b981',
  inspired_by: '#f59e0b'
};

export default function KnowledgeGraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<KnowledgeCategory | 'all'>('all');
  const [selectedRelation, setSelectedRelation] = useState<RelationType | 'all'>('all');
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Filter nodes and edges based on selection
  const filteredNodes = mockGraphData.nodes.filter(node => 
    selectedCategory === 'all' || node.category === selectedCategory
  );
  
  const filteredEdges = mockGraphData.edges.filter(edge => {
    const sourceInFilter = filteredNodes.some(n => n.id === edge.source);
    const targetInFilter = filteredNodes.some(n => n.id === edge.target);
    const relationMatch = selectedRelation === 'all' || edge.type === selectedRelation;
    return sourceInFilter && targetInFilter && relationMatch;
  });

  // Draw the graph on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply zoom and offset
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(zoom, zoom);

    // Draw edges
    filteredEdges.forEach(edge => {
      const source = filteredNodes.find(n => n.id === edge.source);
      const target = filteredNodes.find(n => n.id === edge.target);
      if (!source || !target) return;

      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = relationColors[edge.type];
      ctx.lineWidth = edge.strength / 30;
      ctx.globalAlpha = 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Draw arrow
      const angle = Math.atan2(target.y - source.y, target.x - source.x);
      const arrowLength = 10;
      const arrowAngle = Math.PI / 6;
      
      const arrowX = target.x - 40 * Math.cos(angle);
      const arrowY = target.y - 40 * Math.sin(angle);
      
      ctx.beginPath();
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle - arrowAngle),
        arrowY - arrowLength * Math.sin(angle - arrowAngle)
      );
      ctx.moveTo(arrowX, arrowY);
      ctx.lineTo(
        arrowX - arrowLength * Math.cos(angle + arrowAngle),
        arrowY - arrowLength * Math.sin(angle + arrowAngle)
      );
      ctx.stroke();
    });

    // Draw nodes
    filteredNodes.forEach(node => {
      const isSelected = node.id === selectedNode;
      const isHovered = node.id === hoveredNode;
      const radius = 20 + (node.score / 10);

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = categoryColors[node.category];
      ctx.globalAlpha = isSelected || isHovered ? 1 : 0.8;
      ctx.fill();
      
      if (isSelected || isHovered) {
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // Node label
      ctx.fillStyle = '#000';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + radius + 15);

      // Score badge
      ctx.beginPath();
      ctx.arc(node.x + radius - 5, node.y - radius + 5, 10, 0, 2 * Math.PI);
      ctx.fillStyle = '#fff';
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.font = '10px sans-serif';
      ctx.fillText(node.score.toString(), node.x + radius - 5, node.y - radius + 8);
    });

    ctx.restore();
  }, [filteredNodes, filteredEdges, zoom, offset, selectedNode, hoveredNode]);

  // Handle canvas interactions
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    // Find clicked node
    const clickedNode = filteredNodes.find(node => {
      const radius = 20 + (node.score / 10);
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= radius;
    });

    setSelectedNode(clickedNode?.id || null);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      setOffset({
        x: offset.x + e.movementX,
        y: offset.y + e.movementY
      });
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left - offset.x) / zoom;
    const y = (e.clientY - rect.top - offset.y) / zoom;

    // Find hovered node
    const hoveredNode = filteredNodes.find(node => {
      const radius = 20 + (node.score / 10);
      const distance = Math.sqrt((x - node.x) ** 2 + (y - node.y) ** 2);
      return distance <= radius;
    });

    setHoveredNode(hoveredNode?.id || null);
    canvas.style.cursor = hoveredNode ? 'pointer' : isDragging ? 'grabbing' : 'grab';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Network className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-bold">追溯地图</h1>
        </div>
        <p className="text-muted-foreground">
          可视化展示知识之间的关联关系，追踪概念和理论的演进脉络
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2 flex-1">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as KnowledgeCategory | 'all')}
            className="px-4 py-2 bg-card border rounded-lg"
          >
            <option value="all">所有领域</option>
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          <select
            value={selectedRelation}
            onChange={(e) => setSelectedRelation(e.target.value as RelationType | 'all')}
            className="px-4 py-2 bg-card border rounded-lg"
          >
            <option value="all">所有关系</option>
            {Object.entries(RELATION_TYPE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setZoom(Math.min(zoom + 0.2, 2))}
            className="p-2 bg-card border rounded-lg hover:bg-muted transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 0.2, 0.5))}
            className="p-2 bg-card border rounded-lg hover:bg-muted transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setOffset({ x: 0, y: 0 });
            }}
            className="p-2 bg-card border rounded-lg hover:bg-muted transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="bg-card rounded-xl border overflow-hidden" style={{ height: '600px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          onClick={handleCanvasClick}
          onMouseMove={handleCanvasMouseMove}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => {
            setIsDragging(false);
            setHoveredNode(null);
          }}
        />
      </div>

      {/* Legend and Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Category Legend */}
        <div className="bg-card rounded-xl border p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            领域分类
          </h3>
          <div className="space-y-2">
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: categoryColors[key as KnowledgeCategory] }}
                />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Relation Legend */}
        <div className="bg-card rounded-xl border p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <GitBranch className="w-4 h-4" />
            关系类型
          </h3>
          <div className="space-y-2">
            {Object.entries(RELATION_TYPE_LABELS).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <div 
                  className="w-8 h-0.5" 
                  style={{ backgroundColor: relationColors[key as RelationType] }}
                />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Node Info */}
      {selectedNode && (
        <div className="mt-6 p-4 bg-card rounded-xl border">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Info className="w-4 h-4" />
            节点详情
          </h3>
          {(() => {
            const node = filteredNodes.find(n => n.id === selectedNode);
            if (!node) return null;
            
            const connections = filteredEdges.filter(e => 
              e.source === selectedNode || e.target === selectedNode
            );
            
            return (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">标题</div>
                  <div className="font-medium">{node.label}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">领域</div>
                  <div className="font-medium">{CATEGORY_LABELS[node.category]}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">评分</div>
                  <div className="font-medium">{node.score}</div>
                </div>
                <div className="md:col-span-3">
                  <div className="text-sm text-muted-foreground mb-1">关联节点</div>
                  <div className="flex flex-wrap gap-2">
                    {connections.map((conn, idx) => {
                      const otherId = conn.source === selectedNode ? conn.target : conn.source;
                      const otherNode = filteredNodes.find(n => n.id === otherId);
                      if (!otherNode) return null;
                      
                      return (
                        <span key={idx} className="px-2 py-1 bg-muted rounded text-sm">
                          {otherNode.label} ({RELATION_TYPE_LABELS[conn.type]})
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">{filteredNodes.length}</div>
          <div className="text-sm text-muted-foreground">知识节点</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">{filteredEdges.length}</div>
          <div className="text-sm text-muted-foreground">关联关系</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">
            {Math.round(filteredNodes.reduce((acc, n) => acc + n.score, 0) / filteredNodes.length) || 0}
          </div>
          <div className="text-sm text-muted-foreground">平均评分</div>
        </div>
        <div className="bg-card rounded-xl border p-4">
          <div className="text-2xl font-bold text-primary">
            {new Set(filteredNodes.map(n => n.category)).size}
          </div>
          <div className="text-sm text-muted-foreground">涉及领域</div>
        </div>
      </div>
    </div>
  );
}