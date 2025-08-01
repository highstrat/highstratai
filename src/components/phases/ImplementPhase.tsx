import React from 'react';
import { Settings, Code, TestTube, Rocket } from 'lucide-react';
import { ToolCard } from '../ui/ToolCard';
import { DashboardData } from '../../types';
import { ApiService } from '../../services/ApiService';

interface ImplementPhaseProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

export const ImplementPhase: React.FC<ImplementPhaseProps> = ({ dashboardData, loading }) => {
  const tools = [
    {
      id: 'project-manager',
      title: 'AI Project Manager',
      description: 'Manage AI implementation projects with intelligent tracking',
      icon: Settings,
      action: () => ApiService.startTool('project-manager'),
    },
    {
      id: 'code-generator',
      title: 'Code Generator',
      description: 'Generate boilerplate code and AI model implementations',
      icon: Code,
      action: () => ApiService.startTool('code-generator'),
    },
    {
      id: 'testing-suite',
      title: 'AI Testing Suite',
      description: 'Comprehensive testing tools for AI models and systems',
      icon: TestTube,
      action: () => ApiService.startTool('testing-suite'),
    },
    {
      id: 'deployment-manager',
      title: 'Deployment Manager',
      description: 'Deploy and manage AI solutions across environments',
      icon: Rocket,
      action: () => ApiService.startTool('deployment-manager'),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-white">AI Implementation</h2>
        <p className="text-brand-blue">Build, test, and deploy your AI solutions efficiently</p>
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
            actionLabel="Launch Tool"
          />
        ))}
      </div>
    </div>
  );
};
