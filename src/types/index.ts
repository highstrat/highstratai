export type Phase = 'overview' | 'assessment' | 'design' | 'source' | 'implement' | 'contract' | 'optimize';

export interface DashboardData {
  metrics: {
    activeProjects: number;
    completionRate: number;
    roiGenerated: number;
    riskScore: string;
  };
  recentProjects: Project[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  category: Phase;
  icon: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
