import React from 'react';
import { TrendingUp, BarChart3, Zap, RefreshCw } from 'lucide-react';
import { ToolCard } from '../ui/ToolCard';
import { DashboardData } from '../../types';
import { ApiService } from '../../services/ApiService';

interface OptimizePhaseProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

export const OptimizePhase: React.FC<OptimizePhaseProps> = ({ dashboardData, loading }) => {
  const tools = [
    {
      id: 'performance-monitor',
      title: 'Performance Monitor',
      description: 'Monitor and analyze AI system performance in real-time',
      icon: TrendingUp,
      action: () => ApiService.startTool('performance-monitor'),
    },
    {
      id: 'analytics-dashboard',
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and insights for AI implementations',
      icon: BarChart3,
      action: () => ApiService.startTool('analytics-dashboard'),
    },
    {
      id: 'optimization-engine',
      title: 'Optimization Engine',
      description: 'Automatically optimize AI models and system performance',
      icon: Zap,
      action: () => ApiService.startTool('optimization-engine'),
    },
    {
      id: 'continuous-improvement',
      title: 'Continuous Improvement',
      description: 'Implement feedback loops and continuous learning systems',
      icon: RefreshCw,
      action: () => ApiService.startTool('continuous-improvement'),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-white">Optimization & Analytics</h2>
        <p className="text-brand-blue">Continuously improve and optimize your AI implementations</p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool) => (
          <ToolCard
            key={tool.id}
            title={tool.title}
            description={tool.description}
            icon={tool.icon}
            onAction={tool.action}
            actionLabel="Launch Analytics"
          />
        ))}
      </div>
    </div>
  );
};
