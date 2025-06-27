export interface QuestSponsor {
  id: string;
  name: string;
  logo: string;
  website: string;
  tier: 'platinum' | 'gold' | 'silver' | 'bronze';
}

export interface QuestJudge {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  bio: string;
  twitter?: string;
  github?: string;
  linkedin?: string;
}

export interface QuestPrize {
  id: string;
  rank: number;
  title: string;
  description: string;
  value: string;
  sponsor?: QuestSponsor;
}

export interface QuestParticipant {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  teamName?: string;
  joinedAt: string;
}

export interface QuestSubmission {
  id: string;
  questId: string;
  teamName: string;
  projectName: string;
  description: string;
  demoUrl?: string;
  codeUrl: string;
  videoUrl?: string;
  screenshots: string[];
  technologies: string[];
  teamMembers: {
    id: string;
    name: string;
    avatar: string;
    role: string;
    github?: string;
  }[];
  submittedAt: string;
  
  // 评分（如果已结束）
  judgeScores?: {
    judgeId: string;
    judgeName: string;
    innovation: number;
    technical: number;
    design: number;
    impact: number;
    overall: number;
    feedback?: string;
  }[];
  finalScore?: number;
  rank?: number;
}

export interface Quest {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  theme: string;
  coverImage: string;
  
  // 时间安排
  registrationStart: string;
  registrationEnd: string;
  eventStart: string;
  eventEnd: string;
  submissionDeadline: string;
  resultsAnnouncement: string;
  
  // 状态
  status: 'upcoming' | 'registration-open' | 'in-progress' | 'judging' | 'completed' | 'cancelled';
  
  // 参与信息
  maxParticipants?: number;
  maxTeamSize: number;
  minTeamSize: number;
  currentParticipants: number;
  
  // 要求和规则
  requirements: string[];
  rules: string[];
  judiciaCriteria: string[];
  allowedTechnologies?: string[];
  
  // 奖品和赞助
  prizes: QuestPrize[];
  sponsors: QuestSponsor[];
  judges: QuestJudge[];
  
  // 提交
  submissions: QuestSubmission[];
  submissionCount: number;
  
  // 元数据
  featured: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface QuestRegistration {
  id: string;
  questId: string;
  userId: string;
  teamName?: string;
  teamMembers?: {
    email: string;
    name: string;
    skills: string[];
  }[];
  motivation: string;
  skills: string[];
  registeredAt: string;
  status: 'pending' | 'approved' | 'rejected';
}