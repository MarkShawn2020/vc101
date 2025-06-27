export interface ToolAuthor {
  id: string;
  name: string;
  avatar: string;
  github?: string;
  website?: string;
}

export interface ToolCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
}

export interface AIModel {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ToolDownload {
  type: 'github' | 'npm' | 'direct' | 'chrome-extension' | 'vscode-extension' | 'mcp-server' | 'pip' | 'docker';
  url: string;
  command?: string; // for npm installations
  version?: string;
}

export interface MCPCapability {
  type: 'resources' | 'tools' | 'prompts' | 'logging';
  name: string;
  description: string;
}

export interface FunctionCall {
  name: string;
  description: string;
  parameters: {
    type: string;
    properties: Record<string, any>;
    required?: string[];
  };
  examples?: string[];
}

export interface MCPServer {
  protocol: 'stdio' | 'sse' | 'websocket';
  transport: string;
  capabilities: MCPCapability[];
  configuration?: Record<string, any>;
}

export interface ToolReview {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Tool {
  id: string;
  name: string;
  slug: string;
  tagline: string; // one-line description
  description: string;
  longDescription?: string;
  logo: string;
  screenshots: string[];
  category: ToolCategory;
  supportedModels: AIModel[];
  author: ToolAuthor;
  tags: string[];
  downloads: ToolDownload[];
  
  // Modern AI Integration Features
  mcpServer?: MCPServer;
  functionCalls?: FunctionCall[];
  supportsStreaming?: boolean;
  contextLength?: number;
  
  // Statistics
  downloadCount: number;
  starCount: number;
  rating: number;
  reviewCount: number;
  
  // Metadata
  version: string;
  license: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  verified: boolean; // verified by VC101 team
  
  // Status
  status: 'active' | 'deprecated' | 'beta';
  
  // Tool Types
  toolType: 'cli' | 'library' | 'api' | 'extension' | 'mcp-server' | 'function-toolkit' | 'agent' | 'plugin';
  
  // Additional info
  requirements?: string[];
  changelog?: string;
  documentation?: string;
  demoUrl?: string;
  
  // Integration Support
  integratesWithCursor?: boolean;
  integratesWithClaude?: boolean;
  integratesWithVSCode?: boolean;
}

export interface ToolListResponse {
  tools: Tool[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ToolFilters {
  category?: string;
  aiModel?: string;
  tags?: string[];
  featured?: boolean;
  sortBy?: 'latest' | 'popular' | 'rating' | 'downloads';
  search?: string;
}