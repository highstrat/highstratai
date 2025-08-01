import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Building, Database, Users, Shield } from 'lucide-react';
import { ToolCard } from '../ui/ToolCard';
import { DashboardData } from '../../types';
import { ApiService } from '../../services/ApiService';

interface AssessmentPhaseProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

export const AssessmentPhase: React.FC<AssessmentPhaseProps> = ({ dashboardData, loading }) => {
  const tools = [
    {
      id: 'org-assessment',
      title: 'Organizational Assessment',
      description: 'Evaluate company structure, culture, and AI readiness',
      icon: Building,
      action: () => ApiService.startTool('organizational-assessment'),
    },
    {
      id: 'data-audit',
      title: 'Data Maturity Audit',
      description: 'Assess data quality, governance, and infrastructure',
      icon: Database,
      action: () => ApiService.startTool('data-maturity-audit'),
    },
    {
      id: 'skills-analysis',
      title: 'Skills Gap Analysis',
      description: 'Identify talent needs and training requirements',
      icon: Users,
      action: () => ApiService.startTool('skills-gap-analysis'),
    },
    {
      id: 'risk-assessment',
      title: 'Risk Assessment',
      description: 'Evaluate potential risks and compliance requirements',
      icon: Shield,
      action: () => ApiService.startTool('risk-assessment'),
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-brand-white">AI Readiness Assessment</h2>
        <p className="text-brand-blue">Evaluate your organization's AI implementation readiness</p>
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
            actionLabel="Start Assessment"
          />
        ))}
      </div>
    </div>
  );
};
