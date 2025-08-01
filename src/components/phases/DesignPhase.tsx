import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Lightbulb, Target, Workflow, FileText } from 'lucide-react';
import { ToolCard } from '../ui/ToolCard';
import { DashboardData } from '../../types';
import { ApiService } from '../../services/ApiService';

interface DesignPhaseProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

export const DesignPhase: React.FC<DesignPhaseProps> = ({ dashboardData, loading }) => {
  const tools = [
    {
      id: 'solution-architect',
      title: 'AI Solution Architect',
      description: 'Design comprehensive AI solutions tailored to your needs',
      icon: Lightbulb,
      action: () => ApiService.startTool('solution-architect'),
    },
    {
      id: 'use-case-generator',
      title: 'Use Case Generator',
      description: 'Identify and prioritize AI use cases for your business',
      icon: Target,
      action: () => ApiService.startTool('use-case-generator'),
    },
    {
      id: 'workflow-designer',
      title: 'Workflow Designer',
      description: 'Map out AI-enhanced business processes and workflows',
      icon: Workflow,
      action: () => ApiService.startTool('workflow-designer'),
    },
    {
      id: 'requirements-generator',
      title: 'Requirements Generator',
      description: 'Generate detailed technical and business requirements',
      icon: FileText,
      action: () => ApiService.startTool('requirements-generator'),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-white">AI Solution Design</h2>
        <p className="text-brand-blue">Design and architect your AI solutions with precision</p>
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
            actionLabel="Launch Designer"
          />
        ))}
      </div>
    </div>
  );
};
